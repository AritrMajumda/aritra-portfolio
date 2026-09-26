const fs = require('fs');
const cheerio = require('cheerio');

function updateFile(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  let changed = false;

  // 1. Remove specific experience items
  $('.curr__cms-content').each((i, el) => {
    const text = $(el).text();
    if (text.includes('Ongoing') && text.includes('Building AI/ML projects')) {
      $(el).remove();
      changed = true;
    }
    if (text.includes('Sept 2025') && text.includes('Regime-Adaptive HFT')) {
      $(el).remove();
      changed = true;
    }
  });

  // 2. Update About text
  $('.t-text1').each((i, el) => {
    let text = $(el).html() || '';
    if (text.includes('My technical toolkit is anchored in LangGraph')) {
      // It's the first paragraph block
      // Replace the text starting from "My technical toolkit is anchored..."
      const oldStr1 = 'My technical toolkit is anchored in LangGraph, Docker, and causal inference, which I apply to high-performance pipelines processing massive financial datasets including over 12 aggregate years of financial tick data (3 instruments x 4 years).';
      const newStr1 = 'My technical toolkit is anchored in LangGraph, Docker, and causal inference, which I apply to high-performance pipelines processing massive datasets .';
      
      if (text.includes(oldStr1)) {
        $(el).html(text.replace(oldStr1, newStr1));
        changed = true;
      }
    }

    if (text.includes('Currently pursuing a B.Tech in Computer Science and Engineering')) {
      // It's the second paragraph block
      const oldStr2 = 'Currently pursuing a B.Tech in Computer Science and Engineering (Data Science) at the Heritage Institute of Technology (Kolkata). I am conducting Supervised Quantitative Research on non-stationary market dynamics, which I am applying to high-performance pipelines through stochastic control. My objective is to engineer autonomous agents that are not merely reactive, but truly adaptive to shifting, complex regimes across both financial and computational domains.';
      const newStr2 = 'Currently pursuing a B.Tech in Computer Science and Engineering (Data Science) at the Heritage Institute of Technology (Kolkata). For my undergraduate thesis, I conducted Supervised Quantitative Research on non-stationary market dynamics and high-frequency trading. I engineered the RAMM framework processing billions of ticker-level events from Binance Futures to predict toxic order flow and volatility by evaluating Deep LSTM networks against a highly efficient LightGBM baseline. By applying rigorous cross-asset zero-shot transfer testing as a structural regularizer and feeding these predictions into deterministic quoting simulators, my objective was to engineer market-making systems that were not merely reactive, but truly adaptive to shifting, complex regimes across both financial and computational domains.';
      
      if (text.includes(oldStr2)) {
         $(el).html(text.replace(oldStr2, newStr2));
         changed = true;
      }
    }
  });

  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log('Updated ' + file);
  }
}

updateFile('about/index.html');
updateFile('index.html');
updateFile('work/index.html');
