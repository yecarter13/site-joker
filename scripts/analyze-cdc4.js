const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

// Get ALL the text inside residenceCard
$("article.residenceCard").each((i, el) => {
  if (i > 2) return false;
  console.log("=== ResidenceCard", i, "===");
  const fullHtml = $(el).html() || "";
  
  // Extract price - look for euro amounts
  const priceMatch = fullHtml.match(/(\d[\d\s]*,\d{2})\s*€/);
  console.log("Price match:", priceMatch ? priceMatch[0] : "none");
  
  // Extract info from class containing ville/city
  // Look for all text nodes
  console.log("All text:", $(el).text().trim().substring(0, 500));
  
  // Check data attributes on the card
  console.log("Data attrs:");
  const attrs = el.attribs;
  for (const key of Object.keys(attrs)) {
    if (key.startsWith("data-")) {
      console.log(" ", key, "=", attrs[key]);
    }
  }
  console.log("---");
});

// Also look for script that contains JSON listing data
console.log("\n=== Looking for JSON data in scripts ===");
$("script").each((i, el) => {
  const text = $(el).html() || "";
  if (text.includes("currentTableauLots") || text.includes("tableauLots")) {
    const match = text.match(/currentTableauLots\s*=\s*(\[[\s\S]*?\])\s*;/);
    if (match) {
      console.log("Found currentTableauLots! Length:", match[1].length);
      console.log("Preview:", match[1].substring(0, 1000));
    }
  }
  // Look for any JSON array with idLot
  if (text.includes("idLot")) {
    const match = text.match(/\{[\s\S]*?idLot[\s\S]*?\}[\s\S]*?\{[\s\S]*?idLot/);
    if (match) {
      console.log("Found idLot pattern in script", i);
    }
  }
});
