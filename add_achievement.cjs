const fs = require('fs');
const file = 'about/index.html';
let content = fs.readFileSync(file, 'utf8');

const targetStr = '<div role="listitem" class="curr__cms-content w-dyn-item"><div class="divider"></div><div class="card-wrp"></div></div>';
const replacement = '<div role="listitem" class="curr__cms-content w-dyn-item"><div class="divider"></div><div class="card-wrp"><div id="2026-propfirm" class="t-text1 _50year">2026</div><div id="Propfirm Payout" class="t-desc fullname">Propfirm Payout, Payout of 675 dollars twice from Funded Futures Family LLC(top 7 percent)</div></div></div>' + targetStr;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacement);
  fs.writeFileSync(file, content);
  console.log('Added achievement');
} else {
  console.log('Target string not found');
}
