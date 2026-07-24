const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

// Find the form
console.log("=== #formRecherche ===");
$("#formRecherche").each((i, el) => {
  console.log("Action:", $(el).attr("action"));
  console.log("Method:", $(el).attr("method"));
  console.log("HTML:", $(el).html().trim().substring(0, 2000));
});

console.log("\n=== #formRechercheMobile ===");
$("#formRechercheMobile").each((i, el) => {
  console.log("Action:", $(el).attr("action"));
  console.log("Method:", $(el).attr("method"));
  console.log("HTML:", $(el).html().trim().substring(0, 2000));
});

// Hidden inputs
console.log("\n=== Hidden inputs ===");
$('input[type="hidden"]').each((i, el) => {
  console.log($(el).attr("name"), "=", $(el).attr("value"));
});
