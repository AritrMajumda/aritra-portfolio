const fs = require('fs');
const cheerio = require('cheerio');

function updateWorkFile(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  let changed = false;

  const newTitle = "The RAMM Framework: Supervised Sequence Modeling for High-Frequency Market Making.";
  const newMainDesc = "Supervised Quantitative Research into non-stationary market dynamics using Supervised Sequence Modeling and a modified Avellaneda-Stoikov framework. The research evaluates Deep LSTM and LightGBM architectures for dynamic risk-aversion and introduces cross-asset zero-shot transfer learning as a structural regularizer. The full preprint and corresponding Python codebase are now open-source and publicly available.";
  
  const newModalDescPopup = "This Supervised Quantitative Research project investigates dynamic risk-aversion tuning within the Avellaneda-Stoikov market-making framework for high-frequency trading in non-stationary markets. The complete working paper and open-source codebase are now publicly available for review.   The research focuses on engineering robust, GPU-accelerated data pipelines to process billions of ticker-level L1 market events across multiple assets (BTC, ETH, and SOL). By analyzing top-of-book microstructure signals—specifically micro-volatility and Order Flow Imbalance (OFI)—the framework deterministically mitigates adverse selection and optimizes inventory management.";
  
  const newModalDescPopupFull = "The methodology replaces traditional stochastic control with Supervised Sequence Modeling. Key innovations include evaluating Deep LSTM networks against a highly efficient LightGBM baseline for regime detection, introducing cross-asset zero-shot transfer learning to combat the \"Aggressive Gamma\" overfitting flaw, and implementing dynamic gamma tuning for real-time risk-aversion adaptation under punitive 2-bps synthetic fee stress tests.";

  // Update Main Page Item
  $('.bc__item').each((i, el) => {
    const titleEl = $(el).find('.bc__title');
    if (titleEl.text().includes('Regime-Adaptive HFT')) {
      titleEl.text(newTitle);
      titleEl.attr('id', newTitle); // optionally update ID
      
      const descEl = $(el).find('.bc__desc');
      descEl.text(newMainDesc);
      descEl.attr('id', newMainDesc); // optionally update ID
      changed = true;
    }
  });

  // Update Modal
  const modal = $('#modal-giproteatr');
  if (modal.length > 0) {
    const titleEl = modal.find('.popup__title');
    titleEl.text(newTitle);
    titleEl.attr('id', newTitle);

    const popupTextEl = modal.find('.t-text2.popup');
    popupTextEl.text(newModalDescPopup);
    
    const popupFullTextEl = modal.find('.t-text2.popup-full');
    popupFullTextEl.text(newModalDescPopupFull);

    const optionsEl = modal.find('.popup__options');
    if (!optionsEl.html().includes('https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7490299')) {
      const linkHtml = `<a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=7490299" target="_blank" class="button pdf popup w-inline-block" style="margin-bottom: 10px; background-color: #333; color: white;"><div>Read Paper</div></a>`;
      // Prepend to options
      optionsEl.prepend(linkHtml);
    }
    
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, $.html());
    console.log('Updated ' + file);
  }
}

updateWorkFile('work/index.html');
