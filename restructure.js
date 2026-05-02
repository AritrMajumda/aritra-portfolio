import fs from 'fs';
import * as cheerio from 'cheerio';

const files = ['index.html', 'about/index.html', 'work/index.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const html = fs.readFileSync(file, 'utf8');
  const $ = cheerio.load(html);

  // 1. Remove news box
  $('.nav__item.news').remove();

  // 2 & 3. Update Social Links
  $('a[href*="github.com/aritramajumdar"]').attr('href', 'https://github.com/AritrMajumda');
  $('a[href*="linkedin.com/in/aritra-majumdar"]').attr('href', 'https://www.linkedin.com/in/aritra-majumdar-8930832bb/');

  if (file === 'about/index.html') {
    // 4. Remove 2016 education
    $('.curr__cms-content').each((i, el) => {
      const text = $(el).text();
      if (text.includes('2016') && text.includes('Higher School of Economics')) {
        $(el).remove();
      }
    });
  }

  if (file === 'work/index.html') {
    // Modify Page Nav
    $('.page-nav__anchor-wrp').empty();
    $('.page-nav__anchor-wrp').append(`
      <a href="#research" class="t-h3 page-nav__anchor"><strong>Research</strong></a>
      <a href="#projects" class="t-h3 page-nav__anchor"><strong>Projects</strong></a>
    `);

    // The top list is Research. It has Nexus and HFT.
    // Remove Nexus from the big cards
    $('.bc__item').each((i, el) => {
      const text = $(el).text();
      if (text.includes('Nexus')) {
        $(el).remove();
      }
    });

    // Let's find the first work-group and change to Projects
    const workGroups = $('.work-group').toArray();
    
    // First work-group is "Publications" -> "Projects"
    const firstGroup = $(workGroups[0]);
    firstGroup.find('h2.t-h2').html('<strong>Projects</strong>');
    firstGroup.find('#publications').attr('id', 'projects');

    // Remove all inner .main-card and create a fresh one for the requested projects
    firstGroup.find('.main-card').remove();

    const projectsList = [
      { year: '2024', name: 'Project Nexus-DS v2.0', desc: 'Autonomous, multi-agent system handling entire data science lifecycle with causal modeling and statistical stress tests.', link: '#modal-extractivism' },
      { year: '2024', name: 'AI Trading Indicator', desc: 'Developed for top 10 most volatile instruments using statistical methods with 20 years of historical data and 10,000 backtested scenarios.', link: '#' },
      { year: '2024', name: 'Viva Voce AI Agent', desc: 'RAG-based preparation helper using prompt chaining, PDF question generation, and Voice-to-Text with thematic modes.', link: '#' },
      { year: '2022', name: 'AI Portfolio Manager', desc: 'AI-driven portfolio management using live news, fundamentals, and quarterly results for dynamic weightage optimization.', link: '#' },
      { year: '2025', name: 'Profesor AI', desc: 'Advanced generative AI project.', link: '#' },
      { year: '2025', name: 'Govt Hospital Referral System', desc: 'Healthcare platform engineered to optimize the patient referral system across government hospitals.', link: '#' },
      { year: '2025', name: 'Amisha', desc: 'Innovative application architecture leveraging cutting-edge web and AI technologies.', link: '#' }
    ];

    let itemsHtml = '';
    projectsList.forEach(p => {
      itemsHtml += `
        <div role="listitem" class="curr__cms-content w-dyn-item">
          <div class="divider"></div>
          <a href="${p.link}" class="card-wrp w-inline-block">
            <div class="t-text1 _50year">${p.year}</div>
            <div class="t-desc fullname"><strong>${p.name}</strong> — ${p.desc}</div>
            <div class="t-text-btn read-btn work-btn">Read →</div>
          </a>
        </div>
      `;
    });

    firstGroup.append(`
      <div class="main-card">
        <div class="curr-cms w-dyn-list">
          <div role="list" class="curr-cms__wrp w-dyn-items">
            ${itemsHtml}
          </div>
        </div>
        <div class="divider"></div>
      </div>
    `);

    // Remove all other work groups (Teaching, Blockchain, etc)
    for (let i = 1; i < workGroups.length; i++) {
      $(workGroups[i]).remove();
    }
  }

  // Rewrite the file
  fs.writeFileSync(file, $.html());
}
console.log("Restructure completed.");
