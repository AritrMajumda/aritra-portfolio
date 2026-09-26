const fs = require('fs');
const cheerio = require('cheerio');

function updateDate(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  let changed = false;

  // In work/index.html, we need to update the list item and the modal
  
  // 1. Update the list item date
  $('.bc__item').each((i, el) => {
    const titleEl = $(el).find('.bc__title');
    if (titleEl.text().includes('The RAMM Framework')) {
      const dateEl = $(el).find('.t-text1');
      if (dateEl.text().includes('Sept 2025 - Present')) {
        dateEl.text('Sept 2025 - Sept 2026');
        changed = true;
      }
    }
  });

  // 2. Update the modal date
  const modal = $('#modal-giproteatr');
  if (modal.length > 0) {
    const optionsEl = modal.find('.popup__options-item');
    optionsEl.each((i, el) => {
      const label = $(el).find('.t-capt2').first().text();
      if (label === 'Year') {
        const valEl = $(el).find('.popup__options-right');
        if (valEl.text().includes('Sept 2025 - Present')) {
          valEl.text('Sept 2025 - Sept 2026');
          changed = true;
        }
      }
    });
  }

  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log('Updated date in ' + file);
  }
}

updateDate('work/index.html');
