import fs from 'fs';
import * as cheerio from 'cheerio';

const workFile = 'work/index.html';
const aboutFile = 'about/index.html';

// 1. Modify Work page
if (fs.existsSync(workFile)) {
  const html = fs.readFileSync(workFile, 'utf8');
  const $ = cheerio.load(html);

  // A. Nexus Modal Cleanup
  const nexusModal = $('#modal-extractivism');
  if (nexusModal.length > 0) {
    // Remove the images and captions
    nexusModal.find('.popup__cards').remove();
    
    // Remove the Western Siberia text
    const fullTextEl = nexusModal.find('.popup-full');
    let fullText = fullTextEl.html() || '';
    fullText = fullText.replace(/The project investigates three spatial interventions pivotal to Western Siberia.*?imaginaries of portable architecture\.<br\s*\/?>\s*<br\s*\/?>/i, '');
    fullTextEl.html(fullText);

    // Update Year to 2026 - Present
    nexusModal.find('.popup__options-item').each((i, el) => {
      const label = $(el).find('.t-capt2').first().text().trim();
      if (label === 'Year') {
        $(el).find('.popup__options-right').text('2026 — Present');
      }
    });
  }

  // B. Update List Years
  $('.curr__cms-content').each((i, el) => {
    const text = $(el).text();
    const yearDiv = $(el).find('.t-text1._50year, .t-text1');
    if (text.includes('Project Nexus-DS')) {
      yearDiv.text('2026');
    } else if (text.includes('Profesor')) {
      yearDiv.text('2026');
    } else if (text.includes('Govt Hospital')) {
      yearDiv.text('2025');
    } else if (text.includes('AI Trading Indicator')) {
      yearDiv.text('2025');
    } else if (text.includes('Portfolio Manager')) {
      yearDiv.text('2025');
    }
  });

  // C. Update Research List (HFT)
  $('.bc__item').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Regime-Adaptive HFT')) {
      $(el).find('.t-text1').text('2025 — Present');
    }
  });

  // Update Profesor Year in its modal
  $('#modal-profesor').find('.popup__options-item').each((i, el) => {
    const label = $(el).find('.t-capt2').first().text().trim();
    if (label === 'Year') {
      $(el).find('.popup__options-right').text('2026');
    }
  });

  // Update Govt Hospital Year in its modal
  $('#modal-govt-hospital').find('.popup__options-item').each((i, el) => {
    const label = $(el).find('.t-capt2').first().text().trim();
    if (label === 'Year') {
      $(el).find('.popup__options-right').text('2025');
    }
  });

  fs.writeFileSync(workFile, $.html());
}

// 2. Modify About page photo
if (fs.existsSync(aboutFile)) {
  const html = fs.readFileSync(aboutFile, 'utf8');
  const $ = cheerio.load(html);

  const img = $('.about__bio-avatar');
  if (img.length > 0) {
    img.attr('style', 'transform: scale(1.2); transform-origin: center top;');
    img.parent().attr('style', 'overflow: visible;');
  }

  fs.writeFileSync(aboutFile, $.html());
}

console.log("Cleanup and years updated.");
