import fs from 'fs';
import * as cheerio from 'cheerio';

const aboutFile = 'about/index.html';
if (fs.existsSync(aboutFile)) {
  const html = fs.readFileSync(aboutFile, 'utf8');
  const $ = cheerio.load(html);
  
  // Remove all links that have "download pdf" text or class "pdf"
  $('a').each((i, el) => {
    const text = $(el).text().toLowerCase();
    if (text.includes('download pdf') || $(el).hasClass('pdf')) {
      $(el).remove();
    }
  });
  
  fs.writeFileSync(aboutFile, $.html());
}
console.log("Removed all Download PDF options from About page.");
