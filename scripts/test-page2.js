const { request } = require("undici");
const cheerio = require("cheerio");

async function main() {
  // Test page 2
  const r = await request("https://www.cdc-habitat.fr/recherche/vivelli/page-2/", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await r.body.text();
  const $ = cheerio.load(html);
  console.log("Page 2 listings:", $("article.residenceCard").length);
  console.log("First price:", $(".price").first().text().trim());
  console.log("First city:", $(".location.small").first().text().trim());

  // Test page 3
  const r3 = await request("https://www.cdc-habitat.fr/recherche/vivelli/page-3/", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html3 = await r3.body.text();
  const $3 = cheerio.load(html3);
  console.log("Page 3 listings:", $3("article.residenceCard").length);
  console.log("First city:", $3(".location.small").first().text().trim());
}

main().catch(console.error);
