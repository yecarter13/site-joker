const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

$("article.residenceCard").each((i, el) => {
  if (i > 3) return false;
  console.log("=== Listing", i, "===");
  const content = $(el).html() || "";
  
  // Type (Appartement/Maison/Studio appears right before the details)
  const typeMatch = content.match(/>\s*(Appartement|Maison|Studio)\s*</);
  console.log("Type:", typeMatch ? typeMatch[1] : "?");
  
  // Detail line: "1 pièce - 1er étage - 34m²"
  const detailMatch = content.match(/(\d+)\s*pi[èe]ce.*?[-–].*?(\d+)\s*m[²2]/s);
  console.log("Detail match:", detailMatch ? detailMatch[0] : "?");
  console.log("Rooms:", detailMatch ? detailMatch[1] : "?");
  console.log("Surface:", detailMatch ? detailMatch[2] : "?");
  
  // Better price extraction
  const priceMatch = content.match(/(\d+[.,]?\d*)\s*&euro;/);
  console.log("Price euro entity:", priceMatch ? priceMatch[1] : "?");
  
  // City with zip - already working
  const cityMatch = content.match(/([A-ZÉÈÊËÎÏÔÛÙÜÇa-zéèêëîïôûüç\s'-]+)\s*\((\d{5})\)/);
  console.log("City:", cityMatch ? cityMatch[1].trim() + " (" + cityMatch[2] + ")" : "?");
  
  // Look at the raw HTML for the info section
  const infoMatch = content.match(/<div[^>]*class="[^"]*info[^"]*"[^>]*>([\s\S]*?)<\/div>/);
  if (infoMatch) {
    console.log("Info section:", cheerio.load(infoMatch[1]).text().trim().substring(0, 300));
  }
  
  console.log("---");
});
