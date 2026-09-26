const fs = require('fs');
const cheerio = require('cheerio');

function updateExperience(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);
  
  let experienceList = null;
  // find the Experience heading
  $('.t-h3').each((i, el) => {
    if ($(el).text().trim() === 'Experience') {
      experienceList = $(el).next('.curr-cms').find('.curr-cms__wrp');
    }
  });

  if (experienceList && experienceList.length > 0) {
    if (!experienceList.text().includes('Vaedra Global')) {
      const newItem = `
        <div role="listitem" class="curr__cms-content w-dyn-item">
          <div class="divider"></div>
          <div class="card-wrp">
            <div id="vaedra-global" class="t-text1 _90year">Aug 2026 — Present</div>
            <div id="Backend Developer Intern" class="t-desc fullname">Backend Developer Intern, Vaedra Global — Currently working on RAG, NLP, AI based Systems</div>
          </div>
        </div>
      `;
      experienceList.prepend(newItem);
      fs.writeFileSync(file, $.html());
      console.log('Updated experience in ' + file);
    }
  }
}

updateExperience('about/index.html');
updateExperience('index.html');

// Now update Clients in work/index.html
function updateClients(file) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);

  let clientsList = null;
  // find the Clients heading
  $('.t-h2').each((i, el) => {
    if ($(el).text().trim() === 'Clients') {
      clientsList = $(el).nextAll('.curr-cms').first().find('.curr-cms__wrp');
    }
  });

  let needsSave = false;
  if (clientsList && clientsList.length > 0) {
    if (!clientsList.text().includes('TRIONA')) {
      const newItem = `
        <div role="listitem" class="curr__cms-content w-dyn-item">
          <div class="divider"></div>
          <div class="card-wrp">
            <div id="triona-client" class="t-text1 _90year">2026</div>
            <a href="#modal-triona" class="t-desc fullname modal-trigger" style="text-decoration: underline;">TRIONA — Websites and Backend CRM</a>
          </div>
        </div>
      `;
      clientsList.prepend(newItem);
      needsSave = true;
    }
  } else {
    // maybe there's an anchor with id="clients" and then a h2
    let clientsHeading = null;
    $('h2.t-h2').each((i, el) => {
      if ($(el).text().trim() === 'Clients') {
         clientsHeading = $(el);
      }
    });
    if (clientsHeading) {
       clientsList = clientsHeading.nextAll('.curr-cms').first().find('.curr-cms__wrp');
       if (clientsList.length > 0 && !clientsList.text().includes('TRIONA')) {
          const newItem = `
            <div role="listitem" class="curr__cms-content w-dyn-item">
              <div class="divider"></div>
              <div class="card-wrp">
                <div id="triona-client" class="t-text1 _90year">2026</div>
                <a href="#modal-triona" class="t-desc fullname modal-trigger" style="text-decoration: underline;">TRIONA — Websites and Backend CRM</a>
              </div>
            </div>
          `;
          clientsList.prepend(newItem);
          needsSave = true;
       }
    }
  }

  // Create Modal for TRIONA
  if ($('#modal-triona').length === 0) {
    const oteaseModal = $('#modal-otease');
    if (oteaseModal.length > 0) {
      const trionaModal = oteaseModal.clone();
      trionaModal.attr('id', 'modal-triona');
      trionaModal.find('.popup__title').text('TRIONA: Websites and Backend CRM');
      trionaModal.find('.popup__content.up .t-text2').html('<strong>Client Websites and CRM System</strong><br/><br/>Designed and developed the TRIONA websites, and engineered a custom backend CRM to manage client interactions, data, and workflows effectively.');
      
      const featuresText = `<strong>Core Features & Architecture:</strong><br><br>
<strong>Websites:</strong> Custom-built dynamic websites focused on user experience and brand identity.<br>
<strong>Backend CRM:</strong> A centralized Customer Relationship Management system built from scratch to streamline operations.<br>
<strong>Features:</strong><br>
- Client Data Management and Lead Tracking<br>
- Interactive Dashboards for analytics<br>
- Secure authentication and role-based access control<br>
- Automated workflow triggers and notifications<br><br>
<strong>Tech Stack:</strong><br>
<strong>Frontend:</strong> React, Tailwind CSS<br>
<strong>Backend:</strong> Node.js, Express / Python (FastAPI)<br>
<strong>Database:</strong> PostgreSQL / MongoDB`;

      trionaModal.find('.popup-full').html(featuresText);
      
      const opts = trionaModal.find('.popup__options');
      opts.empty();
      opts.append(`
        <div class="divider popup"></div>
        <div class="popup__options-item"><div class="t-capt2">Year</div><div class="t-capt2 popup__options-right">2026</div></div>
        <div class="divider popup"></div>
        <div class="popup__options-item"><div class="t-capt2">Type</div><div class="t-capt2 popup__options-right">Client Project</div></div>
        <div class="divider popup"></div>
      `);

      $('body').append(trionaModal);
      needsSave = true;
    }
  }
  
  if (needsSave) {
    let finalHtml = $.html();
    if (finalHtml.includes("const POPUPS = [") && !finalHtml.includes("'modal-triona'")) {
      finalHtml = finalHtml.replace("const POPUPS = [", "const POPUPS = [\n      'modal-triona',");
    }
    fs.writeFileSync(file, finalHtml);
    console.log('Updated clients/modals in ' + file);
  }
}

updateClients('work/index.html');
updateClients('index.html');
updateClients('about/index.html');
