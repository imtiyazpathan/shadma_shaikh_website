// Sample clips list - edit this array to add/remove clips.
// Each clip: { id, title, desc, type: "audio"|"video", src, thumb (optional) }
const clips = [{"id": "voice-first-internet", "title": "India’s Voice-First Internet", "desc": "How voice-AI is reshaping internet use for non-typing users.", "type": "link", "src": "https://www.livemint.com/technology/voice-ai-non-typing-internet-users-indiaai-mission-language-models-multilingual-voice-assistant-sarvam-gnani-chatgpt-11750067327087.html", "thumb": ""}, {"id": "ai-bet-startups", "title": "Inside India’s Offline AI Bet", "desc": "Startups are pushing AI beyond big cities.", "type": "link", "src": "https://www.livemint.com/companies/ai-bet-startups-smarter-chips-china-us-gpu-nvidia-hardware-netrasemi-intel-semicon-fabless-model-chatgpt-gemini-11753107818519.html", "thumb": ""}, {"id": "ai-child-growth", "title": "AI in Child Growth Monitoring", "desc": "How rural India is adopting AI-powered anthropometry tools.", "type": "link", "src": "https://www.livemint.com/ai/ai-children-child-healthcare-wadhwani-shishu-mapan-app-asha-workers-low-birth-weight-malnutrition-newborn-infant-growth-11751797326053.html", "thumb": ""}, {"id": "ai-independence", "title": "India’s Quest for AI Independence", "desc": "Exploring India’s strategic journey toward AI self-reliance.", "type": "link", "src": "https://www.technologyreview.com/2025/07/04/1119705/inside-indias-scramble-for-ai-independence/", "thumb": ""}, {"id": "kwai-csam", "title": "Kwai and CSAM in India", "desc": "Investigating harmful content on Chinese platforms.", "type": "link", "src": "https://factordaily.com/chinese-app-kwai-turns-a-blind-eye-to-videos-of-underage-girls-in-india/", "thumb": ""}];

function createThumbSVG(text){
  // Minimal inline SVG placeholder (returned as a DOM node)
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox','0 0 320 180');
  svg.setAttribute('width','320');
  svg.setAttribute('height','180');
  svg.innerHTML = `
    <rect width="100%" height="100%" rx="12" fill="#081827"/>
    <g transform="translate(16,16)">
      <rect width="288" height="120" rx="8" fill="#0b2233"/>
      <text x="24" y="64" fill="#9fb6c5" font-size="20" font-family="sans-serif">${text}</text>
    </g>
  `;
  return svg;
}

function renderClips(){
  const grid = document.getElementById('clips-grid');
  const tmpl = document.getElementById('clip-template');
  clips.forEach(c=>{
    const el = tmpl.content.cloneNode(true);
    const card = el.querySelector('.clip-card');
    el.querySelector('.title').textContent = c.title;
    el.querySelector('.desc').textContent = c.desc;

    const thumbWrap = el.querySelector('.thumb');
    if(c.thumb){
      const img = document.createElement('img');
      img.src = c.thumb;
      img.alt = c.title + " thumbnail";
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      thumbWrap.appendChild(img);
    } else {
      thumbWrap.appendChild(createThumbSVG(c.title));
    }

    const ctrl = el.querySelector('.controls');
    if(c.type === 'audio'){
      const a = document.createElement('audio');
      a.controls = true;
      const src = document.createElement('source');
      src.src = c.src;
      a.appendChild(src);
      ctrl.appendChild(a);
    } else if(c.type === 'video'){
      const v = document.createElement('video');
      v.controls = true;
      v.preload = 'metadata';
      v.style.maxHeight = '300px';
      const src = document.createElement('source');
      src.src = c.src;
      v.appendChild(src);
      ctrl.appendChild(v);
    }


        // Add share buttons
        const shareWrap = document.createElement('div');
        shareWrap.className = 'share-buttons';
        const url = encodeURIComponent(window.location.href + '#' + c.id);
        const text = encodeURIComponent(c.title + ' — ' + c.desc);
        shareWrap.innerHTML = `
          <a href="https://twitter.com/intent/tweet?url=${url}&text=${text}" target="_blank" rel="noopener" title="Share on Twitter">🐦</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" title="Share on LinkedIn">💼</a>
          <a href="https://api.whatsapp.com/send?text=${text}%20${url}" target="_blank" rel="noopener" title="Share on WhatsApp">📱</a>
        `;
        ctrl.appendChild(shareWrap);


    } else if(c.type === 'link'){
      const a = document.createElement('a');
      a.href = c.src;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = 'Read Article';
      a.className = 'link-button';
      ctrl.appendChild(a);

    grid.appendChild(el);
  });
}

document.addEventListener('DOMContentLoaded', renderClips);
