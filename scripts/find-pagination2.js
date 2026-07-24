const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

$("script").each((i, el) => {
  const t = $(el).html() || "";
  if (t.includes("rechercherMap") || t.includes("function rechercher")) {
    const start = Math.max(0, t.indexOf("rechercher") - 100);
    console.log(t.substring(start, start + 500));
    console.log("---");
  }
});
