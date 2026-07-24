const { request } = require("undici");
const cheerio = require("cheerio");

async function main() {
  // Fetch pages 1-3 and compare first listings
  for (let page = 1; page <= 3; page++) {
    const resp = await request(`https://www.cdc-habitat.fr/recherche/vivelli?pagerGo=${page}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    const html = await resp.body.text();
    const $ = cheerio.load(html);
    
    const prices = [];
    $("article.residenceCard").each((_, el) => {
      prices.push($(".price", el).text().trim());
    });
    
    console.log(`Page ${page}: ${prices.length} listings`);
    console.log("  First 3 prices:", prices.slice(0, 3).join(", "));
    console.log("  Last 3 prices:", prices.slice(-3).join(", "));
    
    // Check total
    const bodyText = $("body").text();
    const totalMatch = bodyText.match(/(\d+)\s*logement/);
    if (totalMatch) console.log("  Total:", totalMatch[1]);
    console.log("---");
  }
}

main().catch(console.error);
