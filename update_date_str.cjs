const fs = require('fs');

function updateDate(file) {
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  
  const oldStr = 'Sept 2025 - Present';
  const newStr = 'Sept 2025 - Sept 2026';
  
  if (html.includes(oldStr)) {
    html = html.split(oldStr).join(newStr);
    fs.writeFileSync(file, html);
    console.log('Updated date in ' + file);
  }
}

updateDate('work/index.html');
updateDate('about/index.html');
updateDate('index.html');
