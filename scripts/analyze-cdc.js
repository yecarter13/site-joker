const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

console.log("=== ARTICLES ===");
$("article").each((i, el) => {
  console.log("--- Article", i, "---");
  console.log("Classes:", $(el).attr("class"));
  console.log("Text:", $(el).text().trim().substring(0, 300));
});

console.log("\n=== DIVS with lot/card/property/bien ===");
$("[class]").each((i, el) => {
  const cls = $(el).attr("class") || "";
  if (cls.match(/lot|card|property|listing|bien|annonce|result|item/i)) {
    console.log(cls);
  }
});

console.log("\n=== Elements with data-lot or data-id ===");
$("[data-lot], [data-id]").each((i, el) => {
  const tag = $(el).prop("tagName");
  const cls = $(el).attr("class") || "";
  const dataLot = $(el).attr("data-lot") || "";
  const dataId = $(el).attr("data-id") || "";
  console.log(tag, cls, "data-lot:", dataLot, "data-id:", dataId);
});

console.log("\n=== LINKS to detail pages ===");
$("a[href*='lot'], a[href*='detail'], a[href*='logement']").each((i, el) => {
  const href = $(el).attr("href");
  const text = $(el).text().trim().substring(0, 80);
  console.log(href, "->", text);
});
