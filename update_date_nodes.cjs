const fs = require('fs');
const cheerio = require('cheerio');

function updateDate(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  let changed = false;

  // In work/index.html, we need to update the list item and the modal
  
  // 1. Update the list item date
  $('.t-text1').each((i, el) => {
    if ($(el).text().includes('Sept 2025')) {
      $(el).text('Sept 2025 - Sept 2026');
      changed = true;
    }
  });

  // 2. Update the modal date
  $('.popup__options-right').each((i, el) => {
    if ($(el).text().includes('Sept 2025')) {
      $(el).text('Sept 2025 - Sept 2026');
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log('Updated date in ' + file);
  }
}

updateDate('work/index.html');
updateDate('about/index.html');
updateDate('index.html');
