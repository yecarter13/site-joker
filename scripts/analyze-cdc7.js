const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const html = fs.readFileSync(path.join(process.env.TEMP, "cdc-page.html"), "utf-8");
const $ = cheerio.load(html);

const count = $("article.residenceCard").length;
console.log("Total listings on page:", count);

// Check pagination
const paginationLinks = $("a:contains('Page'), a:contains('Suivant'), a:contains('suiv')");
console.log("Pagination links:", paginationLinks.length);
paginationLinks.each((i, el) => {
  console.log("  ", $(el).text().trim(), "->", $(el).attr("href"));
});

// Check for total results count
$("[class*='result']").each((i, el) => {
  const text = $(el).text().trim();
  if (text.match(/\d+ résultat/) || text.match(/\d+ annonce/) || text.match(/\d+ logement/)) {
    console.log("Results count:", text);
  }
});
