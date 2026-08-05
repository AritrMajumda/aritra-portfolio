const fs = require('fs');
let content = fs.readFileSync('work/index.html', 'utf8');

// For Fixed Income
const fixedIncomeOld = '<div class="popup__options-item"><div class="t-capt2">Year</div><div class="t-capt2 popup__options-right">2026</div></div>';
const fixedIncomeNew = '<a href="https://github.com/AritrMajumda/FIXED-INCOME-AND-CREDIT-RISK-DECISION-ENGINE" class="button pdf popup w-inline-block"><div >GitHub Repo</div></a>\n<div class="divider popup"></div>\n' + fixedIncomeOld;

// For Portfolio Optimizer
const portfolioOld = '<div class="popup__options-item"><div class="t-capt2">Year</div><div class="t-capt2 popup__options-right">2025</div></div>';
const portfolioNew = '<a href="https://github.com/AritrMajumda/PORTFOLIO-OPTIMIZER" class="button pdf popup w-inline-block"><div >GitHub Repo</div></a>\n<div class="divider popup"></div>\n' + portfolioOld;

let changed = false;

// Let's do a more robust replace by targeting the block where the popup is defined
const fixedIncomeSplit = content.split('<div class="t-h3 popup__title extractivism">Fixed Income and Credit Risk Decision Engine</div>');
if (fixedIncomeSplit.length === 2) {
    fixedIncomeSplit[1] = fixedIncomeSplit[1].replace(fixedIncomeOld, fixedIncomeNew);
    content = fixedIncomeSplit.join('<div class="t-h3 popup__title extractivism">Fixed Income and Credit Risk Decision Engine</div>');
    changed = true;
}

const portfolioSplit = content.split('<div class="t-h3 popup__title extractivism">Portfolio Optimizer</div>');
if (portfolioSplit.length === 2) {
    portfolioSplit[1] = portfolioSplit[1].replace(portfolioOld, portfolioNew);
    content = portfolioSplit.join('<div class="t-h3 popup__title extractivism">Portfolio Optimizer</div>');
    changed = true;
}

if (changed) {
    fs.writeFileSync('work/index.html', content);
    console.log('Successfully updated work/index.html');
} else {
    console.log('No changes made, could not find the target strings');
}
