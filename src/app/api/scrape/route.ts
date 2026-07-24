import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateReference } from "@/lib/utils";

const PER_PAGE = 16;

async function fetchPage(url: string) {
  const resp = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
  });
  return await resp.text();
}

function clean(t: string) {
  return t.replace(/\s+/g, " ").trim();
}

function parseListing(html: string, index: number) {
  // Simple regex-based extraction since we can't use cheerio in edge
  const getSection = (start: string, end: string) => {
    const s = html.indexOf(start);
    if (s === -1) return "";
    const e = html.indexOf(end, s + start.length);
    return e === -1 ? html.slice(s + start.length) : html.slice(s + start.length, e);
  };

  // Extract cards by splitting on residenceCard
  const cards = html.split('<article class="residenceCard">');
  if (cards.length <= index + 1) return null;
  const card = cards[index + 1].split("</article>")[0];

  if (!card) return null;

  const extract = (regex: RegExp) => {
    const m = card.match(regex);
    return m ? m[1].trim() : "";
  };

  const type = extract(/<div class="type small">([^<]+)<\/div>/);
  const detail = extract(/<h3 class="h4">([^<]+)<\/h3>/);
  const features = extract(/<div class="notes small">([^<]+)<\/div>/);
  const location = extract(/<div class="location small">([^<]+)<\/div>/);
  const priceText = extract(/<div class="price">([^<]+)<\/div>/);

  // Images
  const images: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let imgMatch;
  while ((imgMatch = imgRegex.exec(card)) !== null) {
    if (imgMatch[1].includes("referentiel-photos")) images.push(imgMatch[1]);
  }

  // Link
  const linkMatch = card.match(/href="([^"]+)"/);
  const link = linkMatch ? linkMatch[1] : "";
  const externalIdMatch = card.match(/addToFavourites(\d+)/);
  const externalId = externalIdMatch ? externalIdMatch[1] : "";

  const roomsMatch = detail.match(/(\d+)\s*pi[èe]ce/);
  const surfaceMatch = detail.match(/(\d+)\s*m[²2]/);
  const floorMatch = detail.match(/(\d+)(?:er|e|eme|ème)?\s*étage|RDC/);

  const rooms = roomsMatch ? parseInt(roomsMatch[1]) : null;
  const surface = surfaceMatch ? parseInt(surfaceMatch[1]) : null;
  const floor = floorMatch ? floorMatch[0] : null;
  let floorNum = null;
  if (floor) { const fm = floor.match(/(\d+)/); if (fm) floorNum = parseInt(fm[1]); }

  const price = parseFloat(priceText.replace(/\s/g, "").replace(",", ".").replace("€", "")) || null;

  let city = location;
  const cityMatch = location.match(/^(.+?)\s*\((\d{5})\)$/);
  if (cityMatch) city = cityMatch[1].trim();

  const resMatch = card.match(/Résidence\s+([^\n<]+)/);
  const residence = resMatch ? resMatch[1].trim() : null;

  const hasElevator = features.includes("Ascenseur");
  const hasParking = features.includes("Parking");
  const hasBalcony = features.includes("Balcon");
  const hasTerrace = features.includes("Terrasse");
  const furnished = features.includes("Meublé") ? true : null;

  const title = `${type} ${rooms ? rooms + " pièce" + (rooms > 1 ? "s" : "") : ""}${surface ? " " + surface + "m²" : ""} - ${city}`;
  const fullUrl = link.startsWith("http") ? link : `https://www.cdc-habitat.fr${link}`;
  const desc = `Logement ${type.toLowerCase()} disponible à ${city}.${floor ? " Situé au " + floor + "." : ""}${features ? " Équipements : " + features + "." : ""}${residence ? " Résidence " + residence + "." : ""} Source : CDC Habitat.`;

  return {
    externalId, title, description: desc, price, surface, rooms, floorNum,
    type, city, district: residence, features, images: images.slice(0, 10),
    fullUrl, hasElevator, hasParking, hasBalcony, hasTerrace, furnished,
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("mode");

    // Fix mode: clean up address field for CDC imports
    if (mode === "fix-address") {
      const all = await prisma.property.findMany({
        where: { reference: { contains: "CDC-" } },
        select: { id: true, address: true },
      });
      let fixed = 0;
      for (const p of all) {
        if (p.address && p.address.includes("cdc-habitat.fr")) {
          await prisma.property.update({ where: { id: p.id }, data: { address: null } });
          fixed++;
        }
      }
      return NextResponse.json({ success: true, fixed });
    }

    // Delete mode: remove all CDC-imported properties
    if (mode === "delete") {
      const cdc = await prisma.property.findMany({
        where: { reference: { contains: "CDC-" } },
        select: { id: true, title: true },
      });
      if (cdc.length === 0) {
        return NextResponse.json({ success: true, deleted: 0 });
      }
      await prisma.property.deleteMany({
        where: { reference: { contains: "CDC-" } },
      });
      return NextResponse.json({ success: true, deleted: cdc.length });
    }

    const url = searchParams.get("url") || "https://www.cdc-habitat.fr/recherche/vivelli";
    const baseUrl = url.split("?")[0];

    let imported = 0;
    let skipped = 0;
    let page = 1;
    const seenPrices = new Set();

    while (true) {
      const pageUrl = `${baseUrl}?pagerGo=${page}`;
      const html = await fetchPage(pageUrl);
      
      // Check for duplicate (pagination loop)
      const firstPriceMatch = html.match(/<div class="price">([^<]+)<\/div>/);
      if (firstPriceMatch) {
        const firstPrice = firstPriceMatch[1].trim();
        if (seenPrices.has(firstPrice)) break;
        seenPrices.add(firstPrice);
      }

      let pageImported = 0;
      let idx = 0;
      while (true) {
        const p = parseListing(html, idx);
        if (!p) break;
        idx++;

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
            address: null,
            type: p.type,
            status: "Disponible",
            images: JSON.stringify(p.images),
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
        pageImported++;
      }

      if (pageImported === 0) break;
      page++;
      if (page > 50) break;
    }

    return NextResponse.json({
      success: true,
      imported,
      skipped,
      pages: page - 1,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
