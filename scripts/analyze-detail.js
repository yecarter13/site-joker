const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-detail.html"), "utf-8");
const $ = cheerio.load(html);

console.log("=== Title ===");
console.log($("title").text());

console.log("\n=== Meta description ===");
console.log($('meta[name="description"]').attr("content"));

console.log("\n=== Full text (first 2000 chars) ===");
console.log($("body").text().trim().substring(0, 2000));

console.log("\n=== All images ===");
$("img").each((i, el) => {
  const src = $(el).attr("src") || "";
  const alt = $(el).attr("alt") || "";
  if (src.match(/photos?/i) || (alt && alt.length > 10)) {
    console.log(src, "->", alt.substring(0, 100));
  }
});

console.log("\n=== Detail sections ===");
$("[class*='detail'], [class*='desc'], [class*='caract'], #description, [class*='info']").each((i, el) => {
  const cls = $(el).attr("class") || "";
  if (cls && $(el).text().trim().length > 50) {
    console.log("Class:", cls);
    console.log("Text:", $(el).text().trim().substring(0, 500));
    console.log("---");
  }
});
