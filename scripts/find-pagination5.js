const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

$("script").each((i, el) => {
  const t = $(el).html() || "";
  const idx = t.indexOf("searchLogementsMaps");
  if (idx >= 0) {
    const start = Math.max(0, idx - 100);
    console.log(t.substring(start, idx + 200));
    console.log("===");
  }

  // Find formRecherche
  if (t.includes('id="formRecherche"') || t.includes('name="formRecherche"') || t.includes("formRecherche")) {
    const idx2 = t.indexOf("formRecherche");
    const start2 = Math.max(0, idx2 - 50);
    console.log("Form reference:", t.substring(start2, idx2 + 100));
    console.log("===");
  }
});

// Also find the form HTML
$("#formRecherche").each((i, el) => {
  console.log("Form action:", $(el).attr("action"));
  console.log("Form method:", $(el).attr("method"));
});
