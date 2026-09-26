const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('about/index.html', 'utf8');
const $ = cheerio.load(html);
console.log($.html($('.main-card').eq(1)));
