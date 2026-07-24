const { request } = require("undici");
const cheerio = require("cheerio");

(async () => {
  const r = await request("https://www.cdc-habitat.fr/recherche/libre", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const h = await r.body.text();
  const $ = cheerio.load(h);
  const c = $("article.residenceCard").length;
  const t = h.match(/(\d+)\s*logement/);
  console.log("Listings:", c, "Total:", t ? t[1] : "?");
  console.log("First city:", $(".location.small").first().text().trim());
  console.log("First price:", $(".price").first().text().trim());
})();
