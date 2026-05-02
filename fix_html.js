import fs from 'fs';

let c = fs.readFileSync('work/index.html', 'utf8');

// Find things like: <div id="AI Trading Indicator — Developed for top 10 most volatile instruments using statistical methods with 20 years of historical data and 10,000 backtested scenarios.</div>
// We need to close the quote, and possibly add the inner text or just close it cleanly.

// The regex matches: <div id="[Any characters except < and ">]+</div>
c = c.replace(/<div id="([^"<]+)<\/div>/g, '<div id="valid-id-1" class="t-desc">$1</div>');

fs.writeFileSync('work/index.html', c);
console.log('Fixed malformed HTML in work/index.html');
