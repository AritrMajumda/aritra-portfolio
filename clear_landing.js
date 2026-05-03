import fs from 'fs';
import * as cheerio from 'cheerio';

const indexFile = 'index.html';
if (fs.existsSync(indexFile)) {
  const html = fs.readFileSync(indexFile, 'utf8');
  const $ = cheerio.load(html);
  
  // Clear the body content
  $('body').empty();
  
  // Add the redirect script
  $('body').append('<script>window.location.pathname = "/about"</script>');
  
  fs.writeFileSync(indexFile, $.html());
}
console.log("Cleared landing page content and set redirect.");
