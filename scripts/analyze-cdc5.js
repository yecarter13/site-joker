const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

// Extract ALL listings
$("article.residenceCard").each((i, el) => {
  if (i > 5) return false;
  console.log("=== Listing", i, "===");
  
  const htmlContent = $(el).html() || "";
  const fullText = $(el).text().trim();
  
  // Link
  const link = $(el).find("a").first().attr("href") || "";
  console.log("Link:", link);
  
  // Images
  const images = [];
  $(el).find(".carousel .item img").each((_, img) => {
    const src = $(img).attr("src");
    if (src) images.push(src);
  });
  console.log("Images:", images.length, images[0]);
  
  // Type (Appartement / Maison)
  const typeMatch = fullText.match(/^(Appartement|Maison|Studio)/m);
  console.log("Type:", typeMatch ? typeMatch[1] : "Unknown");
  
  // Rooms, floor, surface from pattern like "1 pièce - 1er étage - 34m²"
  const detailMatch = fullText.match(/(\d+)\s*pi[èe]ce.*?(\d+)\s*m[²2]/);
  console.log("Rooms:", detailMatch ? detailMatch[1] : "?");
  console.log("Surface:", detailMatch ? detailMatch[2] : "?");
  
  // Floor level
  const floorMatch = fullText.match(/(\d+)(?:er|e|eme|ème)?\s*étage|RDC/);
  console.log("Floor:", floorMatch ? floorMatch[0] : "?");
  
  // Price
  const priceMatch = fullText.match(/(\d[\d\s]*,\d{2})\s*€/);
  console.log("Price:", priceMatch ? priceMatch[1] : "?");
  
  // City
  const cityMatch = fullText.match(/([A-ZÉÈÊËÎÏÔÛÙÜÇ\s]+)\s*\((\d{5})\)/);
  console.log("City:", cityMatch ? cityMatch[1].trim() + " (" + cityMatch[2] + ")" : "?");
  
  // Features
  const featuresMatch = fullText.match(/Est|Ascenseur|Cuisine aménagée|Parking|Visiophonie|Exposition|Balcon|Terrasse|Garage|Cave/g);
  console.log("Features:", featuresMatch ? [...new Set(featuresMatch)].join(", ") : "?");
  
  // Logement neuf
  console.log("Neuf:", fullText.includes("Logement neuf") ? "Oui" : "Non");
  
  console.log("---");
});
