const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

// Look at item elements
console.log("=== ITEM divs ===");
$(".item").each((i, el) => {
  if (i > 2) return false;
  console.log("--- Item", i, "---");
  console.log("HTML:", $(el).html().trim().substring(0, 500));
  console.log("---");
});

// Look for scripts with JSON data
console.log("\n=== SCRIPTS ===");
$("script").each((i, el) => {
  const text = $(el).html() || "";
  if (text.includes("lots") || text.includes("properties") || text.includes("logements") || text.includes("markers") || text.includes("tableau")) {
    console.log("Found relevant script", i, text.substring(0, 300));
  }
});

// Check for JSON-LD
console.log("\n=== JSON-LD ===");
$('script[type="application/ld+json"]').each((i, el) => {
  console.log("LD+JSON", i, $(el).html().substring(0, 300));
});

// Look for any JavaScript variables containing lot data
console.log("\n=== Searching for JSON-like patterns in scripts ===");
$("script").each((i, el) => {
  const text = $(el).html() || "";
  // Look for arrays of objects
  const matches = text.match(/\[\s*\{[^[]*?idLot[^[]*?\}\s*\]/);
  if (matches) {
    console.log("Found idLot array in script", i, matches[0].substring(0, 500));
  }
});
