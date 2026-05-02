import fs from 'fs';
import * as cheerio from 'cheerio';

const workFile = 'work/index.html';
const aboutFile = 'about/index.html';

// 1. Modify Work page Modals
if (fs.existsSync(workFile)) {
  const html = fs.readFileSync(workFile, 'utf8');
  const $ = cheerio.load(html);

  const projectModals = ['#modal-extractivism', '#modal-profesor', '#modal-govt-hospital'];
  
  projectModals.forEach(id => {
    const modal = $(id);
    if (modal.length > 0) {
      // Find the top category label (e.g. <div class="t-h2"><strong>Research</strong></div>)
      // and change it to Project
      const categoryLabel = modal.find('.t-h2').first();
      if (categoryLabel.text().includes('Research')) {
        categoryLabel.html('<strong>Project</strong>');
      }
    }
  });

  fs.writeFileSync(workFile, $.html());
}

// 2. Revert About page photo size
if (fs.existsSync(aboutFile)) {
  const html = fs.readFileSync(aboutFile, 'utf8');
  const $ = cheerio.load(html);

  const img = $('.about__bio-avatar');
  if (img.length > 0) {
    // Remove the custom inline styles added in the previous step
    img.removeAttr('style');
    img.parent().removeAttr('style');
  }

  fs.writeFileSync(aboutFile, $.html());
}

console.log("Changes applied: Modal titles updated to Project and Photo size reverted.");
