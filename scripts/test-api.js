const { request } = require("undici");
const cheerio = require("cheerio");

async function main() {
  // Try the search endpoint with pagerGo
  const resp = await request("https://www.cdc-habitat.fr/Recherche/searchLogementsMaps", {
    method: "POST",
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      cdTypage: "location",
      order: "loyer_asc",
      pagerGo: "2",
      newSearch: "false",
      lbLieu: "",
    }).toString(),
  });
  
  const text = await resp.body.text();
  console.log("Status:", resp.statusCode);
  console.log("Response (first 1000):", text.substring(0, 1000));
  console.log("\n---");
  
  // Try parsing as JSON
  try {
    const json = JSON.parse(text);
    console.log("JSON keys:", Object.keys(json));
    if (json.lots) console.log("Lots:", json.lots.length);
    if (json.html) console.log("HTML length:", json.html.length);
  } catch(e) {
    console.log("Not JSON");
  }
}

main().catch(console.error);
