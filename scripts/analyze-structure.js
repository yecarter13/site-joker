const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

$("article.residenceCard").each((i, el) => {
  if (i > 2) return false;
  console.log("=== Listing", i, "===");
  
  // Get the description div
  const desc = $(el).find(".description");
  console.log("Description div length:", desc.length);
  if (desc.length) {
    console.log("Description HTML:", desc.html().substring(0, 500));
    console.log("Description children count:", desc.children().length);
    desc.children().each((j, child) => {
      const tag = child.tagName || "#text";
      const text = $(child).text().trim().substring(0, 100);
      console.log(`  Child ${j}: <${tag}> -> "${text}"`);
    });
  }
});
