const { request } = require("undici");
const cheerio = require("cheerio");
const readline = require("readline");

const SITE_NAME = "CDC Habitat";
const PER_PAGE = 16;

async function fetchPage(url) {
  const resp = await request(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  return await resp.body.text();
}

function clean(t) { return t.replace(/\s+/g, " ").trim(); }

function parseListing($, el) {
  const type = clean($(el).find(".type.small").text()) || "Appartement";
  const detailText = clean($(el).find("h3.h4").text());
  const features = clean($(el).find(".notes.small").text());
  const locationText = clean($(el).find(".location.small").text());
  const priceText = clean($(el).find(".price").text());

  const images = [];
  $(el).find(".carousel .item img").each((__, img) => {
    const src = $(img).attr("src");
    if (src) images.push(src);
  });

  const link = $(el).find("a").first().attr("href") || "";
  const content = $(el).html() || "";
  const idMatch = content.match(/addToFavourites(\d+)/);
  const externalId = idMatch ? idMatch[1] : null;

  const roomsMatch = detailText.match(/(\d+)\s*pi[èe]ce/);
  const surfaceMatch = detailText.match(/(\d+)\s*m[²2]/);
  const floorMatch = detailText.match(/(\d+)(?:er|e|eme|ème)?\s*étage|RDC/);

  const rooms = roomsMatch ? parseInt(roomsMatch[1]) : null;
  const surface = surfaceMatch ? parseInt(surfaceMatch[1]) : null;
  const floor = floorMatch ? floorMatch[0] : null;

  let floorNum = null;
  if (floor) { const fm = floor.match(/(\d+)/); if (fm) floorNum = parseInt(fm[1]); }

  const price = parseFloat(priceText.replace(/\s/g, "").replace(",", ".").replace("€", "")) || null;

  let city = locationText;
  const cityMatch = locationText.match(/^(.+?)\s*\((\d{5})\)$/);
  if (cityMatch) city = cityMatch[1].trim();

  const fullText = $(el).text() || "";
  const resMatch = fullText.match(/Résidence\s+([^\n(]+)/);
  const residence = resMatch ? resMatch[1].trim() : null;

  const hasElevator = features.includes("Ascenseur");
  const hasParking = features.includes("Parking");
  const hasBalcony = features.includes("Balcon");
  const hasTerrace = features.includes("Terrasse");
  const furnished = features.includes("Meublé") ? true : null;

  const title = `${type} ${rooms ? rooms + " pièce" + (rooms > 1 ? "s" : "") : ""}${surface ? " " + surface + "m²" : ""} - ${city}`;
  const desc = `Logement ${type.toLowerCase()} disponible à ${city}.${floor ? " Situé au " + floor + "." : ""}${features ? " Équipements : " + features + "." : ""}${residence ? " Résidence " + residence + "." : ""} Source : ${SITE_NAME}.`;
  const fullUrl = link.startsWith("http") ? link : `https://www.cdc-habitat.fr${link}`;

  return {
    externalId, title, description: desc, price, surface, rooms, floorNum,
    type, city, district: residence, features, images, fullUrl,
    hasElevator, hasParking, hasBalcony, hasTerrace, furnished,
  };
}

async function scrapeAll(url) {
  // Determine base URL (remove any existing query params)
  const baseUrl = url.split("?")[0];
  let allListings = [];
  let page = 1;
  let total = 0;

  console.log(`\n🔍 Scrapage de ${baseUrl}\n`);

  const seenIds = new Set();

  while (true) {
    const pageUrl = `${baseUrl}?pagerGo=${page}`;
    process.stdout.write(`  Page ${page}...`);
    const html = await fetchPage(pageUrl);
    const $ = cheerio.load(html);
    const listings = [];
    $("article.residenceCard").each((_, el) => {
      listings.push(parseListing($, el));
    });

    if (listings.length === 0) break;

    // Detect duplicates (pagination loop)
    const firstId = listings[0].externalId || listings[0].price + listings[0].city;
    if (seenIds.has(firstId)) {
      console.log(` doublon détecté, arrêt.`);
      break;
    }
    seenIds.add(firstId);

    allListings = allListings.concat(listings);

    // Get total from first page
    if (page === 1) {
      const bodyText = $("body").text();
      const totalMatch = bodyText.match(/(\d+)\s*logement/);
      total = totalMatch ? parseInt(totalMatch[1]) : 0;
      const totalPages = Math.ceil(total / PER_PAGE);
      console.log(` ${listings.length} trouvés, ${total} total, ~${totalPages} pages`);
    } else {
      console.log(` ${listings.length} trouvés (total: ${allListings.length})`);
    }

    page++;
    if (page > 100) break;
  }

  return { listings: allListings, total };
}

function showPreview(listings) {
  console.log(`\n📋 Aperçu des ${listings.length} logements :\n`);
  const h = `  ${"#".padEnd(5)} ${"Titre".padEnd(52)} ${"Prix".padEnd(10)} ${"Surf.".padEnd(6)} ${"P".padEnd(3)} ${"Ville".padEnd(22)}`;
  console.log(h);
  console.log("  " + "-".repeat(h.length - 2));
  const show = Math.min(listings.length, 20);
  listings.slice(0, show).forEach((p, i) => {
    console.log(
      `  ${(i + 1).toString().padEnd(5)} ` +
      `${p.title.substring(0, 50).padEnd(52)} ` +
      `${(p.price ? p.price + " €" : "N/A").padEnd(10)} ` +
      `${(p.surface ? p.surface + "m²" : "N/A").padEnd(6)} ` +
      `${(p.rooms ? p.rooms + "p" : "N/A").padEnd(3)} ` +
      `${p.city.substring(0, 20).padEnd(22)}`
    );
  });
  if (listings.length > show) {
    console.log(`  ... et ${listings.length - show} autres`);
  }
}

function ask(q) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((r) => rl.question(q, (a) => { rl.close(); r(a); }));
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.log("Usage: node scripts/scrape-cdc.js <URL>");
    console.log("Ex: node scripts/scrape-cdc.js https://www.cdc-habitat.fr/recherche/vivelli");
    process.exit(1);
  }

  const { listings, total } = await scrapeAll(url);

  if (listings.length === 0) {
    console.log("\n❌ Aucun logement trouvé.");
    return;
  }

  showPreview(listings);

  const force = process.argv.includes("--force");
  let answer = "oui";
  if (!force) {
    answer = await ask(`\n👉 Importer ces ${listings.length} logements en PREMIUM ? (oui/non) `);
  }
  if (answer.toLowerCase() !== "oui") {
    console.log("❌ Annulé.");
    return;
  }

  const { PrismaClient } = require("@prisma/client");
  const prisma = new PrismaClient();

  let imported = 0, skipped = 0;

  for (const p of listings) {
    const ref = `CDC-${p.externalId || Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const existing = await prisma.property.findFirst({ where: { address: p.fullUrl } });
    if (existing) { skipped++; continue; }

    await prisma.property.create({
      data: {
        title: p.title,
        description: p.description,
        price: p.price || 0,
        surface: p.surface || 0,
        rooms: p.rooms || 1,
        floor: p.floorNum,
        city: p.city,
        district: p.district,
        address: p.fullUrl,
        type: p.type,
        status: "Disponible",
        images: JSON.stringify(p.images.slice(0, 10)),
        elevator: p.hasElevator || false,
        parking: p.hasParking || false,
        balcony: p.hasBalcony || false,
        terrace: p.hasTerrace || false,
        furnished: p.furnished,
        reference: ref,
        offreDuMoment: false,
        premium: true,
      },
    });
    imported++;
  }

  await prisma.$disconnect();
  console.log(`\n✅ Terminé : ${imported} importés, ${skipped} déjà existants ignorés.`);
}

main().catch((e) => {
  console.error("❌ Erreur :", e.message);
  process.exit(1);
});
