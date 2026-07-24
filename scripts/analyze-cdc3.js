const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

console.log("=== result-list-box.lot elements ===");
$(".result-list-box.lot").each((i, el) => {
  if (i > 0) return false;
  console.log("HTML:", $(el).html().trim().substring(0, 3000));
});

console.log("\n\n=== Cards container ===");
$("#cards, .cards").each((i, el) => {
  console.log("HTML:", $(el).html().trim().substring(0, 3000));
});

console.log("\n\n=== Full residenceCard ===");
$("article.residenceCard").each((i, el) => {
  if (i > 0) return false;
  console.log("HTML:", $(el).html().trim().substring(0, 3000));
});
