const fs = require('fs');
const cheerio = require('cheerio');

function fixFile(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  let changed = false;

  // 1. Remove any badly-formatted TRIONA list items
  $('.curr__cms-content').each((i, el) => {
    if ($(el).text().includes('TRIONA')) {
      $(el).remove();
      changed = true;
    }
  });

  // 2. Insert correct TRIONA list item in work/index.html
  if (file.includes('work')) {
    let clientsHeading = null;
    $('h2.t-h2').each((i, el) => {
      if ($(el).text().trim() === 'Clients') {
         clientsHeading = $(el);
      }
    });

    if (clientsHeading) {
       const clientsList = clientsHeading.nextAll('.main-card').first().find('.curr-cms__wrp');
       if (clientsList.length > 0) {
          const newItem = '<div role="listitem" class="curr__cms-content w-dyn-item"><div class="divider"></div><a href="#modal-triona" class="card-wrp w-inline-block modal-trigger"><div class="t-text1 _50year">2026</div><div class="t-desc fullname"><strong>TRIONA — Websites and Backend CRM</strong> — Client Websites and Custom CRM System. Features complete data management, interactive dashboards and role-based access.</div><div class="t-text-btn read-btn work-btn">Read →</div></a></div>';
          clientsList.prepend(newItem);
          changed = true;
       }
    }
    
    // Also update TRIONA modal to include website link
    const trionaModal = $('#modal-triona');
    if (trionaModal.length > 0) {
      // Find where Year is and insert Website before it, if not already there
      const opts = trionaModal.find('.popup__options');
      if (!opts.text().includes('Website')) {
        const websiteHtml = '<div class="divider popup"></div><div class="popup__options-item"><div class="t-capt2">Website</div><a href="https://triona.org.in/" target="_blank" class="t-capt2 popup__options-right custom-link" style="color: #FFFFFF;">triona.org.in</a></div>';
        // Prepend inside .popup__options, before the first divider popup
        opts.find('.popup__options-item').first().prev('.divider.popup').before(websiteHtml);
        changed = true;
      }
    }
  }

  // 3. Remove stray text nodes that might render as dots
  $('.curr-cms__wrp, .w-dyn-items').each((i, el) => {
    // iterate through children
    const childNodes = el.childNodes;
    for (let j = childNodes.length - 1; j >= 0; j--) {
      const node = childNodes[j];
      if (node.nodeType === 3) { // Text node
        const text = node.nodeValue || '';
        // If it's just whitespace OR it actually contains a literal dot '.'
        if (text.trim() === '' || text.includes('.')) {
          // If it includes a dot, maybe I literally inserted a dot by accident somewhere?
          // Let's just remove empty text nodes or text nodes with just dots/whitespace
          if (text.trim() === '' || text.trim() === '.') {
            $(node).remove();
            changed = true;
          }
        }
      }
    }
  });

  // Also search for any literal '.' text nodes in the whole body that are direct children of weird places?
  // Let's check body child nodes just in case
  $('body').contents().each((i, node) => {
    if (node.type === 'text') {
      const text = node.data;
      if (text.trim() === '.') {
        $(node).remove();
        changed = true;
      }
    }
  });

  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log('Fixed ' + file);
  }
}

fixFile('index.html');
fixFile('about/index.html');
fixFile('work/index.html');
