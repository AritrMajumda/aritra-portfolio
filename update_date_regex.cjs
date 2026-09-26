const fs = require('fs');

function updateDate(file) {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  // Replace all instances of "Sept 2025 - Present" with "Sept 2025 - Sept 2026"
  // using Regex to handle possible variable whitespace
  const oldStrRegex = /Sept 2025\s*-\s*Present/g;
  
  if (oldStrRegex.test(html)) {
    html = html.replace(oldStrRegex, 'Sept 2025 - Sept 2026');
    fs.writeFileSync(file, html);
    console.log('Updated date in ' + file);
  }
}

updateDate('work/index.html');
updateDate('about/index.html');
updateDate('index.html');
