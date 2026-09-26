const fs = require('fs');
const cheerio = require('cheerio');
const $ = cheerio.load(fs.readFileSync('work/index.html', 'utf8'));
console.log($('a[href="#modal-otease"]').closest('.curr__cms-content').html());
