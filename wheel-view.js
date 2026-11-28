// Emlove — koło emocji 3-poziomowe (obszar → grupa → słowo).
// Port komponentu z aplikacji mobilnej (wheel.tsx) na zwykły SVG.
//
// Dane pochodzą z wheel-reference.json — tego samego pliku, którego używa
// aplikacja mobilna. Dzięki temu koło w PWA i na telefonie są identyczne.
//
// Struktura JSON:
//   { "center": "Łaska",
//     "areas": [ { "name": "Szczęśliwy", "groups": [["Optymistyczny", ["Pełen nadziei", ...]]] } ] }
(function () {
  'use strict';

  // Kolory jak w aplikacji mobilnej — nawiązują do fotografii.
  const COLORS = ['#C7E6F3', '#E8E8E7', '#F1C1D7', '#D3DDF3', '#B5D7F0', '#E7ECD9', '#DCDCF4'];

  const ICONS = {
    'Słaby': '😮‍💨', 'Lękliwy': '😰', 'Rozgniewany': '😠', 'Zniesmaczony': '🤢',
    'Smutny': '😢', 'Szczęśliwy': '😊', 'Zaskoczony': '😲',
  };

  const INK = '#284C4B';
  const VIEW = 320, CENTER = 160, INNER = 54, OUTER = 151;
  const D_CENTER = 240;

  let data = null;
  let selected = null;   // indeks obszaru albo null
  let word = null;       // {label, id}
  let zoom = false;
  let failed = false;

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function wheelLocale(){return window.EmloveLocale?window.EmloveLocale.language():'pl';}
  function wheelTerm(value){const locale=wheelLocale();const res=window.EMLOVE_TRANSLATION_CATALOG?.['wheel-reference-locales'];const dict=res?.locales?.[locale]||{};return dict[value]||value;}
  function wheelUi(key,fallback){return window.EmloveLocale?.content('wheel-ui',key)||fallback||key;}
  function wheelData(){return data?{...data,center:wheelTerm(data.center),areas:data.areas.map(a=>({name:wheelTerm(a.name),sourceName:a.name,groups:a.groups.map(([g,words])=>[wheelTerm(g),words.map(wheelTerm)])}))}:null;}

  // ── geometria ───────────────────────────────────────────────
  function point(r, a) {
    return [CENTER + r * Math.cos(a), CENTER + r * Math.sin(a)];
  }

  function slicePath(index, count) {
    const step = (Math.PI * 2) / count;
    const start = -Math.PI / 2 - step / 2 + index * step;
    const end = start + step;
    const [x0, y0] = point(INNER, start);
    const [x1, y1] = point(OUTER, start);
    const [x2, y2] = point(OUTER, end);
    const [x3, y3] = point(INNER, end);
    return `M ${x0} ${y0} L ${x1} ${y1} A ${OUTER} ${OUTER} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${INNER} ${INNER} 0 0 0 ${x0} ${y0} Z`;
  }

  function dPoint(r, a) {
    return [D_CENTER + r * Math.cos(a), D_CENTER + r * Math.sin(a)];
  }

  function ringPath(a0, a1, r1, r2) {
    const [x0, y0] = dPoint(r1, a0);
    const [x1, y1] = dPoint(r2, a0);
    const [x2, y2] = dPoint(r2, a1);
    const [x3, y3] = dPoint(r1, a1);
    return `M ${x0} ${y0} L ${x1} ${y1} A ${r2} ${r2} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${r1} ${r1} 0 0 0 ${x0} ${y0} Z`;
  }

  /** Etykieta radialna — obrócona tak, żeby czytało się ją od środka. */
  function radialLabel(label, angle, radius, baseSize, maxWidth) {
    const [x, y] = dPoint(radius, angle);
    let deg = (angle * 180) / Math.PI;
    const norm = (deg + 360) % 360;
    if (norm > 90 && norm < 270) deg += 180;
    const size = Math.min(baseSize, maxWidth / (Math.max(label.length, 1) * 0.59));
    return `<g transform="translate(${x.toFixed(2)}, ${y.toFixed(2)}) rotate(${deg.toFixed(2)})" pointer-events="none">` +
      `<text x="0" y="0" text-anchor="middle" dominant-baseline="middle" font-size="${size.toFixed(2)}" font-weight="600" fill="#294C49">${esc(label)}</text></g>`;
  }

  // ── widok główny ────────────────────────────────────────────
  function mainSvg() {
    const viewData=wheelData();
    const count = viewData.areas.length;
    const step = (Math.PI * 2) / count;
    const paths = viewData.areas.map((area, i) =>
      `<path d="${slicePath(i, count)}" fill="${COLORS[i % COLORS.length]}" stroke="#FFFFFF" stroke-width="2" ` +
      `style="cursor:pointer" onclick="EmloveWheel.choose(${i})"><title>${esc(area.name)}</title></path>`
    ).join('');

    const labels = viewData.areas.map((area, i) => {
      const [x, y] = point(107, -Math.PI / 2 + i * step);
      return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}" text-anchor="middle" dominant-baseline="middle" ` +
        `font-size="9.5" font-weight="700" fill="#284446" pointer-events="none">${esc(area.name)}</text>`;
    }).join('');

    return `<svg viewBox="0 0 ${VIEW} ${VIEW}" width="100%" role="img" aria-label="${esc(wheelUi('title','Emotion wheel'))}">` +
      `${paths}<circle cx="${CENTER}" cy="${CENTER}" r="${INNER - 1}" fill="#FFFDFC" stroke="#DFEAE5" stroke-width="1.5"/>` +
      `${labels}` +
      `<text x="${CENTER}" y="${CENTER - 6}" text-anchor="middle" font-size="19" fill="#D386A6" pointer-events="none">♥</text>` +
      `<text x="${CENTER}" y="${CENTER + 12}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}" pointer-events="none">${esc(viewData.center)}</text>` +
      `</svg>`;
  }

  // ── widok szczegółowy ───────────────────────────────────────
  function detailSvg(area) {
    const groups = area.groups;
    const part = (Math.PI * 2) / groups.length;
    const color = COLORS[selected % COLORS.length];

    let out = '';
    groups.forEach(([group, words], i) => {
      const a0 = -Math.PI / 2 - part / 2 + i * part;
      const a1 = a0 + part;
      out += `<g>`;
      out += `<path d="${ringPath(a0, a1, 64, 140)}" fill="${color}" stroke="#FFF" stroke-width="2" ` +
        `style="cursor:pointer" onclick="EmloveWheel.pickGroup(${i})"><title>${esc(group)}</title></path>`;

      const per = part / Math.max(words.length, 1);
      words.forEach((term, j) => {
        const b0 = a0 + j * per;
        const b1 = a0 + (j + 1) * per;
        out += `<path d="${ringPath(b0, b1, 140, 230)}" fill="${color}" opacity="${j % 2 === 0 ? 0.72 : 0.5}" ` +
          `stroke="#FFF" stroke-width="1.5" style="cursor:pointer" onclick="EmloveWheel.pickWord(${i},${j})">` +
          `<title>${esc(term)}</title></path>`;
      });

      out += radialLabel(group, (a0 + a1) / 2, 102, 11, 68);
      words.forEach((term, j) => {
        out += radialLabel(term, a0 + (j + 0.5) * per, 185, 10.5, 82);
      });
      out += `</g>`;
    });

    out += `<circle cx="${D_CENTER}" cy="${D_CENTER}" r="63" fill="#FFFDFC" stroke="#DFEAE5" stroke-width="2"/>`;
    out += `<text x="${D_CENTER}" y="${D_CENTER - 4}" text-anchor="middle" font-size="19" pointer-events="none">${ICONS[area.sourceName||area.name] || ''}</text>`;
    out += `<text x="${D_CENTER}" y="${D_CENTER + 14}" text-anchor="middle" font-size="10" font-weight="700" fill="${INK}" pointer-events="none">${esc(area.name)}</text>`;

    return `<svg viewBox="0 0 480 480" width="${zoom ? '155%' : '100%'}" role="img" aria-label="${esc(wheelUi('chooseArea','Area: {name}').replace('{name}',area.name))}">${out}</svg>`;
  }

  // ── render ──────────────────────────────────────────────────
  function render() {
    const host = document.getElementById('wheelHost');
    if (!host) return;

    if (failed) {
      // Bez danych pokazujemy dotychczasowe koło — aplikacja ma działać.
      if (typeof window.legacyWheel === 'function') {
        // Stare koło siedzi w kontenerze z atrybutem hidden — trzeba go odsłonić.
        const legacy = host.parentElement && host.parentElement.querySelector('.grid-2');
        if (legacy) legacy.removeAttribute('hidden');
        host.innerHTML = '';
        window.legacyWheel();
        return;
      }
      host.innerHTML = `<p class="muted">${esc(wheelUi('loadError','Could not load the emotion wheel.'))} <code>wheel-reference.json</code>.</p>`;
      return;
    }
    if (!data) {
      host.innerHTML = `<p class="muted">${esc(wheelUi('loading','Loading the emotion wheel…'))}</p>`;
      return;
    }

    const viewData=wheelData();
    const area = selected === null ? null : viewData.areas[selected];
    const count = viewData.areas.length;

    const areaButtons = viewData.areas.map((a, i) =>
      `<button type="button" class="wheel-area${selected === i ? ' active' : ''}" ` +
      `style="background:${COLORS[i % COLORS.length]}" onclick="EmloveWheel.choose(${i})">${esc(a.name)}</button>`
    ).join('');

    host.innerHTML = `
      <div class="wheel-card">
        <p class="wheel-eyebrow">${esc(wheelUi('eyebrow','GET TO KNOW YOUR EMOTIONS'))}</p>
        <h2 class="wheel-title">${esc(wheelUi('title','Emotion wheel'))}</h2>
        <p class="wheel-intro">${esc(wheelUi('intro','Pause for a moment. Choose an area of the wheel, then explore the words below.'))}</p>

        <div class="wheel-canvas${zoom ? ' zoomed' : ''}">
          ${area === null ? mainSvg() : detailSvg(area)}
        </div>

        <p class="wheel-hint">${area ? esc(wheelUi('wordPrompt','Tap a word on the wheel or choose one from the list below')) : esc(wheelUi('areaHint','Tap a colour or choose a name below'))}</p>

        <button type="button" class="btn btn-ghost wheel-zoom" aria-pressed="${zoom?'true':'false'}" onclick="EmloveWheel.toggleZoom()">${esc(wheelUi(zoom?'zoomOut':'zoomIn',zoom?'Reduce wheel':'Enlarge wheel'))}</button>
        ${zoom ? `<p class="wheel-hint">${esc(wheelUi('zoomHint','Swipe sideways to explore the whole wheel.'))}</p>` : ''}

        <div class="wheel-areas">
          <button type="button" class="wheel-area home${selected === null ? ' active' : ''}" onclick="EmloveWheel.reset()">♥ ${esc(viewData.center)}</button>
          ${areaButtons}
        </div>

        ${word ? `<p class="wheel-selected" role="status">${esc(wheelUi('selectedWord','Selected word:'))} <strong>${esc(wheelTerm(word.label))}</strong></p>` : ''}
      </div>

      ${area ? detailCard(area) : `<div class="card wheel-empty">
        <h3>${esc(wheelUi('emptyTitle','Start where you are'))}</h3>
        <p class="muted">${esc(wheelUi('emptyText','Choose an area to see related words. There are no right or wrong answers.'))}</p>
      </div>`}

      <p class="wheel-disclaimer">${esc(wheelUi('disclaimer','The wheel is a reflection tool, not a diagnosis.'))}</p>
    `;
  }

  function detailCard(area) {
    const groups = area.groups.map(([group, words], index) => `
      <div class="wheel-group">
        <button type="button" class="wheel-group-btn${word && word.id === 'g-' + index ? ' selected' : ''}" onclick="EmloveWheel.pickGroup(${index})">${esc(group)}</button>
        <div class="wheel-words">
          ${words.map((term, j) =>
            `<button type="button" class="wheel-word${word && word.id === 'w-' + index + '-' + j ? ' selected' : ''}" onclick="EmloveWheel.pickWord(${index},${j})">${esc(term)}</button>`
          ).join('')}
        </div>
      </div>
    `).join('');

    return `<div class="card wheel-detail">
      <p class="wheel-eyebrow">${esc(wheelUi('selectedArea','SELECTED AREA'))}</p>
      <h3>${esc(area.name)}</h3>
      <p class="wheel-detail-intro">${esc(wheelUi('detailIntro','Which words best describe what you feel? Tap any word to explore it.'))}</p>
      ${groups}
      ${word ? `<div class="wheel-reflection" role="status">
        <p class="wheel-eyebrow">${esc(wheelUi('selectedWordLabel','SELECTED WORD'))}</p>
        <p class="wheel-reflection-word">${esc(wheelTerm(word.label))}</p>
        <p class="wheel-reflection-text">${esc(wheelUi('reflectionPrompt','What comes to mind when you think about this word?'))}</p>
        <p class="wheel-reflection-note">${esc(wheelUi('reflectionNote','This choice is just for reflection; it is not saved.'))}</p>
      </div>` : ''}
    </div>`;
  }

  // ── API ─────────────────────────────────────────────────────
  function choose(i) { selected = i; word = null; zoom = false; render(); }
  function reset() { selected = null; word = null; zoom = false; render(); }
  function pickGroup(i) {
    if (selected === null) return;
    const group = data.areas[selected].groups[i];
    word = {label: group[0], id: 'g-' + i};
    render();
  }
  function pickWord(i, j) {
    if (selected === null) return;
    const term = data.areas[selected].groups[i][1][j];
    word = {label: term, id: 'w-' + i + '-' + j};
    render();
  }
  function toggleZoom() {
    zoom = !zoom;
    const host = document.getElementById('wheelHost');
    const canvas = host && host.querySelector('.wheel-canvas');
    const svg = canvas && canvas.querySelector('svg');
    const button = host && host.querySelector('.wheel-zoom');
    if (!canvas || !svg || !button) { render(); return; }

    canvas.classList.toggle('zoomed', zoom);
    // Set the rendered width directly so the control responds immediately,
    // even when the SVG also has a presentation width attribute.
    const mobile = window.matchMedia && window.matchMedia('(max-width: 820px)').matches;
    svg.style.width = zoom ? (mobile ? 'min(180%, 720px)' : 'min(155%, 720px)') : 'min(100%, 580px)';
    svg.style.maxWidth = zoom ? 'none' : '580px';
    svg.style.maxHeight = zoom ? 'none' : '68vh';
    button.setAttribute('aria-pressed', zoom ? 'true' : 'false');
    button.textContent = wheelUi(zoom ? 'zoomOut' : 'zoomIn', zoom ? 'Reduce wheel' : 'Enlarge wheel');
  }

  async function mount() {
    try {
      const res = await fetch('wheel-reference.json', {cache: 'no-store'});
      if (!res.ok) throw new Error('HTTP ' + res.status);
      data = await res.json();
      if (!data || !Array.isArray(data.areas)) throw new Error('bad_shape');
    } catch (e) {
      failed = true;
    }
    render();
  }

  window.EmloveWheel = {mount, choose, reset, pickGroup, pickWord, toggleZoom, render};
})();
