const fs = require('fs');
const cheerio = require('cheerio');

function fixClientsList(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);

  let clientsHeading = null;
  $('h2.t-h2').each((i, el) => {
    if ($(el).text().trim() === 'Clients') {
       clientsHeading = $(el);
    }
  });

  if (clientsHeading) {
     const clientsList = clientsHeading.nextAll('.main-card').first().find('.curr-cms__wrp');
     if (clientsList.length > 0 && !clientsList.text().includes('TRIONA')) {
        const newItem = `
          <div role="listitem" class="curr__cms-content w-dyn-item">
            <div class="divider"></div>
            <div class="card-wrp">
              <div id="triona-client" class="t-text1 _90year">2026</div>
              <a href="#modal-triona" class="t-desc fullname modal-trigger" style="text-decoration: underline;">TRIONA — Websites and Backend CRM</a>
            </div>
          </div>
        `;
        clientsList.prepend(newItem);
        fs.writeFileSync(file, $.html());
        console.log('Fixed clients in ' + file);
     } else {
        console.log('clientsList not found or TRIONA already present in ' + file);
     }
  }
}

fixClientsList('work/index.html');
