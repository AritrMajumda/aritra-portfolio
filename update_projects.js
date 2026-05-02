import fs from 'fs';
import * as cheerio from 'cheerio';

const workFile = 'work/index.html';
const cssFile = 'css/ksenias-fantastic-site-7f0d91.webflow.shared.2b65f49eb.css';

// 1. Update CSS grid to 1fr 1fr
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  // replace the 2fr with 1fr from our last change
  css = css.replace(/grid-template-columns:\s*1fr\s+1fr\s+2fr;/, 'grid-template-columns: 1fr 1fr;');
  // Also just in case it's still 1fr 1fr 1fr
  css = css.replace(/grid-template-columns:\s*1fr\s+1fr\s+1fr;/, 'grid-template-columns: 1fr 1fr;');
  fs.writeFileSync(cssFile, css);
}

// 2. Modify Work page
if (fs.existsSync(workFile)) {
  const html = fs.readFileSync(workFile, 'utf8');
  const $ = cheerio.load(html);

  // A. Modify Research Modal (HFT) -> id="modal-giproteatr"
  const hftModal = $('#modal-giproteatr');
  if (hftModal.length > 0) {
    // Remove the images and captions
    hftModal.find('.popup__cards').remove();
    
    // Fix the popup-full text to remove the historiographical debate sentence
    const fullTextEl = hftModal.find('.popup-full');
    let fullText = fullTextEl.html() || '';
    // Strip out the last sentence
    fullText = fullText.replace(/It contributes to broader historiographical debates on the history of the architectural profession, institutional history, and the role of experts and expertise in late Soviet governance\.<br\s*\/?>\s*<br\s*\/?>/, '');
    fullTextEl.html(fullText);

    // Remove the Funding section
    hftModal.find('.popup__options-item').each((i, el) => {
      const label = $(el).find('.t-capt2').first().text().trim();
      if (label === 'Funding') {
        $(el).prev('.divider').remove(); // remove divider before it
        $(el).remove();
      }
    });

    // Update Year to 2025 - Present
    hftModal.find('.popup__options-item').each((i, el) => {
      const label = $(el).find('.t-capt2').first().text().trim();
      if (label === 'Year') {
        $(el).find('.popup__options-right').text('2025 — Present');
      }
    });
  }

  // B. Remove Amisha from Projects list
  $('.curr__cms-content').each((i, el) => {
    if ($(el).text().includes('Amisha')) {
      $(el).remove();
    }
  });

  // Helper to format modal content
  const formatText = (text) => {
    return text.trim().split('\n').map(line => {
      if (line.trim() === '') return '<br/>';
      if (line.includes(':') && line.split(':')[0].split(' ').length <= 3) {
        return `<strong>${line.trim()}</strong><br/>`;
      }
      return `${line.trim()}<br/>`;
    }).join('');
  };

  const profesorText = `AI-Powered Academic Viva Voce Examination Simulator
Overview: Profesor is an intelligent examination platform that simulates rigorous academic viva voce (oral examinations) using AI. Upload any research paper as a PDF, and Profesor generates challenging, context-aware questions while evaluating your understanding.

Architecture & Tech Stack:
Frontend: React 19 + Vite 7 (modern, fast development)
PDF Processing: pdf.js for extraction and parsing
LLM Integration: Multi-provider support (Together AI, OpenRouter, Groq, Gemini APIs)
RAG Engine: Custom chunking + semantic embeddings for context-aware Q&A
Speech: Web Speech API (TTS) + Whisper API (STT) for voice interaction
Styling: Dual theme support (Academic Normal + Money Heist-inspired)
Language Composition: JavaScript (72.3%) | CSS (27.3%) | HTML (0.4%)

How It Works:
Upload a research paper (PDF format)
System chunks and indexes the content for retrieval-augmented generation
Profesor generates 5 rigorous viva-style questions targeting conceptual, methodological, and critical understanding
Answer questions via typing or voice input
Receive real-time evaluation (1-10 score) with detailed feedback
Track performance across sessions with built-in analytics

Key Features:
RAG-powered Q&A ensuring questions stay contextually relevant
Multi-language voice support (TTS/STT)
Session analytics dashboard
Strict evaluation mimicking real examiners
Multiple LLM provider flexibility`;

  const govtText = `Healthcare Blockchain Platform
Overview: A secure, decentralized blockchain solution designed for hospital bed referral systems and medical data management. Built with Byzantine Fault Tolerance consensus, it ensures data integrity and patient privacy in healthcare networks.

Architecture & Tech Stack:
Blockchain Core: Custom implementation with BFT consensus mechanism
Backend: Go 1.21+ (57.7% of codebase)
Networking: libp2p for P2P communication with NAT traversal
Storage: Hybrid approach
On-chain: RocksDB for fast, reliable data persistence
Off-chain: IPFS integration for scalability
Frontend: HTML (41.9%) + Go templates for UI
API: RESTful endpoints with authentication & rate limiting
Language Composition: Go (57.7%) | HTML (41.9%) | Batchfile (0.4%)

How It Works:
Hospitals register as validators on the network
Bed availability and patient referral requests are recorded on-chain
Role-based access control manages permissions (patients, doctors, hospitals, researchers)
Smart contracts enforce data access policies with expiration dates
Medical records are encrypted and stored (on-chain for critical data, IPFS for bulk)
Real-time consensus validation ensures data integrity

Core Features:
Byzantine Fault Tolerance: Secure consensus with support for multiple validators
Granular Access Control: Patient-centric data ownership with temporary access grants
Encrypted Storage: All medical records encrypted before storage
Scalable P2P Network: Efficient node discovery and communication
Comprehensive APIs: Hospital management, medical records, bed referrals, user authentication
Audit Trail: Complete access history for compliance

API Endpoints Include:
Blockchain operations (blocks, transactions)
Medical records management (CRUD + access control)
User registration and role management
Access history tracking`;

  // C. Create Modals for Profesor and Govt Hospital
  // We will clone the Nexus modal
  const nexusModal = $('#modal-extractivism');
  
  if (nexusModal.length > 0) {
    // 1. Update Nexus Modal itself
    const nexusOpts = nexusModal.find('.popup__options');
    nexusOpts.find('.button.pdf').attr('href', 'https://github.com/AritrMajumda/project-nexus');
    nexusOpts.find('.button.pdf div').text('GitHub Repo');
    nexusOpts.find('.button.pdf img').remove(); // remove pdf icon
    // Add Vercel Link
    nexusOpts.prepend(`<a href="https://project-nexus-blond.vercel.app/" target="_blank" class="button pdf popup w-inline-block" style="margin-bottom: 10px; background-color: #333; color: white;"><div>Live Demo</div></a>`);
    
    // Let's replace the link in the "Projects" list for Nexus to open this modal
    // (Already done in previous step where I used #modal-extractivism)

    // 2. Create Profesor Modal
    const profesorModal = nexusModal.clone();
    profesorModal.attr('id', 'modal-profesor');
    profesorModal.removeClass('popup-extractivism');
    profesorModal.find('.popup__title').text('Profesor AI');
    profesorModal.find('.popup__content.up .t-text2').html('<strong>AI-Powered Academic Viva Voce Examination Simulator</strong><br/><br/>Profesor is an intelligent examination platform that simulates rigorous academic viva voce (oral examinations) using AI.');
    profesorModal.find('.popup-full').html(formatText(profesorText));
    profesorModal.find('.popup__cards').remove(); // Remove Nexus images
    
    // Options
    const profOpts = profesorModal.find('.popup__options');
    profOpts.find('a[href*="project-nexus"]').remove(); // clear cloned links
    profOpts.find('.button').remove();
    profOpts.prepend(`
      <a href="https://github.com/AritrMajumda/Profesor" target="_blank" class="button pdf popup w-inline-block"><div>GitHub Repo</div></a>
      <a href="https://profesor-eight.vercel.app/" target="_blank" class="button pdf popup w-inline-block" style="margin-top: 10px; background-color: #333; color: white;"><div>Live Demo</div></a>
    `);
    
    // Update link in list
    $('.curr__cms-content').each((i, el) => {
      if ($(el).text().includes('Profesor')) {
        $(el).find('a').attr('href', '#modal-profesor');
        // add click event for manual handling in webflow
        $(el).find('a').addClass('modal-trigger');
      }
    });

    // 3. Create Govt Hospital Modal
    const govtModal = nexusModal.clone();
    govtModal.attr('id', 'modal-govt-hospital');
    govtModal.removeClass('popup-extractivism');
    govtModal.find('.popup__title').text('Govt Hospital Referral System');
    govtModal.find('.popup__content.up .t-text2').html('<strong>Healthcare Blockchain Platform</strong><br/><br/>A secure, decentralized blockchain solution designed for hospital bed referral systems and medical data management.');
    govtModal.find('.popup-full').html(formatText(govtText));
    govtModal.find('.popup__cards').remove(); // Remove Nexus images
    
    // Options
    const govtOpts = govtModal.find('.popup__options');
    govtOpts.find('a[href*="project-nexus"]').remove();
    govtOpts.find('.button').remove();
    govtOpts.prepend(`
      <a href="https://github.com/AritrMajumda/Govt-Hospital-Referral-System-for-Beds" target="_blank" class="button pdf popup w-inline-block"><div>GitHub Repo</div></a>
    `);

    // Update link in list
    $('.curr__cms-content').each((i, el) => {
      if ($(el).text().includes('Govt Hospital')) {
        $(el).find('a').attr('href', '#modal-govt-hospital');
        $(el).find('a').addClass('modal-trigger');
      }
    });

    // Append modals to body
    $('body').append(profesorModal);
    $('body').append(govtModal);

    // We also need to add these IDs to the POPOUPS array in index.html, work/index.html, about/index.html scripts!
  }

  fs.writeFileSync(workFile, $.html());
}

// 3. Add to POPUPS array in scripts
const files = ['index.html', 'about/index.html', 'work/index.html'];
for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes("const POPUPS = [")) {
      content = content.replace("const POPUPS = [", "const POPUPS = [\n      'modal-profesor',\n      'modal-govt-hospital',");
      fs.writeFileSync(file, content);
    }
  }
}

console.log("Projects and Modals updated successfully!");
