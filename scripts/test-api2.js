const { request } = require("undici");
const cheerio = require("cheerio");

async function main() {
  // First get the page to get CSRF token
  const pageResp = await request("https://www.cdc-habitat.fr/recherche/vivelli", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await pageResp.body.text();
  const $ = cheerio.load(html);
  
  // Get CSRF token
  const token = $('input[name="tokenCSRF"]').val();
  console.log("Token:", token);

  // Try GET /Recherche with pagerGo params
  const url = new URL("https://www.cdc-habitat.fr/Recherche");
  url.searchParams.set("cdTypage", "location");
  url.searchParams.set("pagerGo", "2");
  url.searchParams.set("order", "loyer_asc");
  
  const resp = await request(url.toString(), {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  
  const text = await resp.body.text();
  const $2 = cheerio.load(text);
  console.log("Page 2 via GET /Recherche:");
  console.log("Listings:", $2("article.residenceCard").length);
  $2("article.residenceCard").first().each((_, el) => {
    console.log("First price:", $2(".price", el).text().trim());
    console.log("First city:", $2(".location.small", el).text().trim());
  });
  
  // Also try GET /recherche/vivelli?pagerGo=2
  const resp3 = await request("https://www.cdc-habitat.fr/recherche/vivelli?pagerGo=2", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const text3 = await resp3.body.text();
  const $3 = cheerio.load(text3);
  console.log("\nvivelli?pagerGo=2:");
  console.log("Listings:", $3("article.residenceCard").length);
  $3("article.residenceCard").first().each((_, el) => {
    console.log("First city:", $3(".location.small", el).text().trim());
  });
}

main().catch(console.error);
