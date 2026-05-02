import fs from 'fs';
import * as cheerio from 'cheerio';

const aboutFile = 'about/index.html';
const workFile = 'work/index.html';
const cssFile = 'css/ksenias-fantastic-site-7f0d91.webflow.shared.2b65f49eb.css';

// 1. Fix CSS grid for 50-50 and leave blank on right side top
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  css = css.replace('grid-template-columns: 1fr 1fr 1fr;', 'grid-template-columns: 1fr 1fr 2fr;');
  fs.writeFileSync(cssFile, css);
}

// 2. Modify About page
if (fs.existsSync(aboutFile)) {
  const html = fs.readFileSync(aboutFile, 'utf8');
  const $ = cheerio.load(html);

  // Remove sections: Publications, Featured Work, Key Projects, Research & Development
  const sectionsToRemove = ['Publications', 'Featured Work', 'Key Projects', 'Research & Development'];
  
  $('.main-card').each((i, el) => {
    const title = $(el).find('.t-h3').text().trim();
    if (sectionsToRemove.includes(title)) {
      $(el).remove();
    }
    
    // Remove last two columns of Technical Skills
    if (title === 'Technical Skills') {
      const items = $(el).find('.curr__cms-content');
      if (items.length >= 5) {
        $(items[items.length - 1]).remove(); // 5th item
        $(items[items.length - 2]).remove(); // 4th item
      }
    }
  });

  fs.writeFileSync(aboutFile, $.html());
}

// 3. Modify Work page
if (fs.existsSync(workFile)) {
  const html = fs.readFileSync(workFile, 'utf8');
  const $ = cheerio.load(html);

  // Combine Profesor AI and Viva Voce Agent
  // I'll just remove 'Profesor AI' and rename 'Viva Voce AI Agent' to 'Viva Voce AI Agent (Profesor AI)'
  
  $('.curr__cms-content').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Profesor AI')) {
      $(el).remove();
    } else if (text.includes('Viva Voce AI Agent')) {
      // Find the strong tag and replace text
      const strong = $(el).find('strong');
      if (strong.length > 0) {
        strong.text('Viva Voce AI Agent (Profesor AI)');
      } else {
        // Fallback if structure is different
        const htmlContent = $(el).html();
        $(el).html(htmlContent.replace('Viva Voce AI Agent', 'Viva Voce AI Agent (Profesor AI)'));
      }
    }
  });

  fs.writeFileSync(workFile, $.html());
}

console.log("Cleanup script completed.");
