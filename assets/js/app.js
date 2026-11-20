/* CLF-C02 Study Lab — single-page app, no build step, no backend.
   Progress lives in localStorage under one key ("clfc02.v1") and can be exported/imported as JSON. */
(function () {
  'use strict';

  // ---------------------------------------------------------------- data
  const CLF = window.CLF || {};
  const DOMAINS = CLF.domains || [];
  const LESSONS = (CLF.lessons || []).slice().sort((a, b) => cmpTask(a.id, b.id));
  const SERVICES = CLF.services || [];
  const CONCEPTS = CLF.concepts || [];
  const QUESTIONS = CLF.questions || [];
  const NOTES = CLF.notes || {};   // per-question { x: [note per option], s: [source URLs] }
  const QMAP = Object.fromEntries(QUESTIONS.map(q => [q.id, q]));
  const DMAP = Object.fromEntries(DOMAINS.map(d => [d.id, d]));
  const LMAP = Object.fromEntries(LESSONS.map(l => [l.id, l]));
  const TASKS = DOMAINS.flatMap(d => d.tasks.map(t => Object.assign({ d: d.id }, t)));
  const TMAP = Object.fromEntries(TASKS.map(t => [t.id, t]));
  const LETTERS = 'ABCDEFGH';
  const NUMWORD = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE'];

  function cmpTask(a, b) {
    const [a1, a2] = String(a).split('.').map(Number), [b1, b2] = String(b).split('.').map(Number);
    return a1 - b1 || a2 - b2;
  }

  // ---------------------------------------------------------------- store
  const KEY = 'clfc02.v1';
  const blank = () => ({ v: 1, theme: null, q: {}, bm: [], done: [], exams: [], cards: {}, active: null });
  let st = load();
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || 'null');
      return Object.assign(blank(), s && typeof s === 'object' ? s : {});
    } catch (e) { return blank(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(st)); } catch (e) { /* storage blocked: app still works for this visit */ } }
  function record(id, ok) {
    const r = st.q[id] || { n: 0, c: 0 };
    r.n++; if (ok) r.c++; r.l = ok ? 1 : 0; r.t = Date.now();
    st.q[id] = r;
  }
  const isBm = id => st.bm.includes(id);
  function toggleBm(id) {
    st.bm = isBm(id) ? st.bm.filter(x => x !== id) : st.bm.concat(id);
    save();
    return isBm(id);
  }

  // ---------------------------------------------------------------- helpers
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');
  const S = {};            // in-memory session state (practice, flashcards, filters)
  let A = {};              // actions for the current view (data-act="name")
  let onKey = null;        // keyboard handler for the current view
  let timers = [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
  const pct = (c, n) => n ? Math.round((c / n) * 100) : 0;
  const go = h => { if (location.hash === h) route(); else location.hash = h; };
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : String(m).padStart(2, '0')) + ':' + String(s).padStart(2, '0');
  }
  function fmtDate(t) {
    return new Date(t).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.hidden = false;
    clearTimeout(toast._t); toast._t = setTimeout(() => { t.hidden = true; }, 2200);
  }
  function modal(title, body, okLabel, onOk, danger) {
    const wrap = document.createElement('div');
    wrap.className = 'modal-back';
    wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
      <h3 id="mTitle">${esc(title)}</h3><p class="muted">${body}</p>
      <div class="row"><button class="btn ghost" data-m="no" type="button">Cancel</button>
      <button class="btn ${danger ? 'danger' : 'primary'}" data-m="ok" type="button">${esc(okLabel)}</button></div></div>`;
    document.body.appendChild(wrap);
    const close = () => wrap.remove();
    wrap.addEventListener('click', e => {
      const b = e.target.closest('[data-m]');
      if (e.target === wrap || (b && b.dataset.m === 'no')) close();
      else if (b && b.dataset.m === 'ok') { close(); onOk(); }
    });
    wrap.querySelector('[data-m="ok"]').focus();
  }
  const icon = {
    bm: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18l-6-4-6 4z"/></svg>',
    flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4 M5 4h11l-2 4 2 4H5"/></svg>',
    left: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>',
    grid: '<svg viewBox="0 0 24 24"><path d="M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z M4 21V5"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l4 4L19 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/></svg>',
    cards: '<svg viewBox="0 0 24 24"><path d="M7 4h12v14H7z M4 7v13h12"/></svg>',
    redo: '<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7 M3 4v5h5"/></svg>',
    search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
    grid4: '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4z M13 4h7v7h-7z M4 13h7v7H4z M13 13h7v7h-7z"/></svg>'
  };
  // The "Select TWO." line is rendered by the UI, so drop the inline "(Choose two.)" from the stem
  const qtext = q => q.q.replace(/\s*\((choose|select) (two|three|four)\.?\)\s*$/i, '');
  const optNote = (q, i) => { const n = NOTES[q.id]; return n && n.x && n.x[i] ? `<small class="opt-note">${esc(n.x[i])}</small>` : ''; };
  function sourcesHtml(q) {
    const n = NOTES[q.id];
    if (!n || !n.s || !n.s.length) return '';
    const label = u => u.replace(/^https?:\/\//, '').replace(/\/$/, '').replace(/\.html$/, '');
    return `<p class="refs src">AWS sources: ${n.s.map(u => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(label(u))}</a>`).join(' · ')}</p>`;
  }
  const dchip = d =>`<span class="chip ${d}"><span class="dot ${d}"></span>Domain ${DMAP[d] ? DMAP[d].n : ''}</span>`;

  // ---------------------------------------------------------------- stats
  function domainStats() {
    return DOMAINS.map(d => {
      const ids = QUESTIONS.filter(q => q.d === d.id).map(q => q.id);
      let seen = 0, ok = 0;
      ids.forEach(id => { const r = st.q[id]; if (r) { seen++; if (r.l) ok++; } });
      return { d, total: ids.length, seen, ok, acc: seen ? ok / seen : null };
    });
  }
  function readiness() {
    const ds = domainStats();
    const have = ds.filter(x => x.acc != null && x.seen >= 3);
    if (!have.length) return null;
    const w = have.reduce((s, x) => s + x.d.weight, 0);
    return Math.round(have.reduce((s, x) => s + x.acc * x.d.weight, 0) / w * 100);
  }
  const mistakes = () => Object.keys(st.q).filter(id => QMAP[id] && st.q[id].l === 0);

  // ---------------------------------------------------------------- router
  const ROUTES = {
    home: vHome, learn: vLearn, services: vServices, flashcards: vFlashcards, practice: vPractice,
    exam: vExam, review: vReview, bank: vBank, progress: vProgress, more: vMore, resources: vResources
  };
  function route() {
    timers.forEach(clearInterval); timers = [];
    A = {}; onKey = null;
    const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
    const name = ROUTES[parts[0]] ? parts[0] : 'home';
    document.querySelectorAll('[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === name ||
      (name === 'more' && false)));
    ROUTES[name](parts.slice(1));
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  view.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (!el || !view.contains(el)) return;
    const fn = A[el.dataset.act];
    if (fn) { e.preventDefault(); fn(el, e); }
  });
  document.addEventListener('keydown', e => {
    if (!onKey || e.target.matches('input, textarea, select') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (document.querySelector('.modal-back')) return;
    onKey(e);
  });

  // ---------------------------------------------------------------- theme
  const themeBtn = $('#themeBtn');
  function paintTheme() {
    if (st.theme) document.documentElement.setAttribute('data-theme', st.theme);
    else document.documentElement.removeAttribute('data-theme');
    $('#themeLabel').textContent = 'Theme: ' + (st.theme ? st.theme[0].toUpperCase() + st.theme.slice(1) : 'System');
  }
  function cycleTheme() {
    st.theme = st.theme === null ? 'light' : st.theme === 'light' ? 'dark' : null;
    save(); paintTheme();
    toast('Theme: ' + (st.theme || 'system'));
  }
  themeBtn.addEventListener('click', cycleTheme);

  // ================================================================ VIEWS
  // ---------------------------------------------------------------- Dashboard
  function vHome() {
    const ds = domainStats();
    const ready = readiness();
    const seen = Object.keys(st.q).filter(id => QMAP[id]).length;
    const best = st.exams.length ? Math.max(...st.exams.map(e => e.pct)) : null;
    const next = LESSONS.find(l => !st.done.includes(l.id)) || LESSONS[0];
    const mis = mistakes().length;
    const active = st.active;

    view.innerHTML = `
      <section class="hero">
        <div class="stack">
          <span class="eyebrow">AWS Certified Cloud Practitioner · CLF-C02</span>
          <h1>Learn it, drill it, then <span>sit the mock exam.</span></h1>
          <p class="lead">${LESSONS.length} lessons mapped to every task statement in the official exam guide, ${SERVICES.length} in-scope services, and a bank of ${QUESTIONS.length} original practice questions with full explanations.</p>
          <div class="row">
            ${active ? `<a class="btn primary" href="#/exam/run">${icon.clock} Resume mock exam</a>` :
              next ? `<a class="btn primary" href="#/learn/${next.id}">${icon.book} ${st.done.length ? 'Continue' : 'Start'}: Task ${next.id}</a>` : ''}
            <a class="btn" href="#/exam">${icon.clock} Mock exam</a>
            <a class="btn" href="#/practice">${icon.check} Quick practice</a>
          </div>
        </div>
        <div class="card" style="padding:0">
          <div class="exam-facts">
            <div><b>65</b><span>questions (50 scored + 15 unscored)</span></div>
            <div><b>90 min</b><span>exam time</span></div>
            <div><b>700</b><span>passing score on a 100–1,000 scale</span></div>
            <div><b>$100</b><span>exam fee (USD)</span></div>
          </div>
        </div>
      </section>

      <section class="card pad-lg" style="margin-bottom:22px">
        <div class="section-title"><h2>How the exam is weighted</h2><span class="muted small">Share of scored content</span></div>
        <div class="weight-strip" role="img" aria-label="Domain weights: ${DOMAINS.map(d => d.name + ' ' + d.weight + '%').join(', ')}">
          ${DOMAINS.map(d => `<i style="width:${d.weight}%;background:var(--${d.id})"></i>`).join('')}
        </div>
        <div class="weight-legend">
          ${DOMAINS.map(d => `<div><span class="dot ${d.id}"></span>${d.n}. ${esc(d.name)}<b>${d.weight}%</b></div>`).join('')}
        </div>
      </section>

      <div class="grid g4" style="margin-bottom:22px">
        <div class="card"><span class="eyebrow">Readiness</span><div class="big-num" style="margin-top:8px">${ready == null ? '—' : ready + '%'}</div><p class="small muted" style="margin-top:6px">${ready == null ? 'Answer a few questions per domain to see this.' : 'Weighted accuracy on your latest attempts.'}</p></div>
        <div class="card"><span class="eyebrow">Lessons</span><div class="big-num" style="margin-top:8px">${st.done.filter(id => LMAP[id]).length}<span class="muted" style="font-size:1rem"> / ${LESSONS.length}</span></div><p class="small muted" style="margin-top:6px">Task statements marked complete.</p></div>
        <div class="card"><span class="eyebrow">Questions seen</span><div class="big-num" style="margin-top:8px">${seen}<span class="muted" style="font-size:1rem"> / ${QUESTIONS.length}</span></div><p class="small muted" style="margin-top:6px">${mis ? `<a href="#/review">${mis} to re-check</a>` : 'No open mistakes.'}</p></div>
        <div class="card"><span class="eyebrow">Best mock</span><div class="big-num" style="margin-top:8px">${best == null ? '—' : best + '%'}</div><p class="small muted" style="margin-top:6px">${st.exams.length} mock exam${st.exams.length === 1 ? '' : 's'} taken.</p></div>
      </div>

      <div class="grid g2">
        <section class="card pad-lg">
          <div class="section-title"><h2>Accuracy by domain</h2><a class="small" href="#/practice">Practice</a></div>
          ${ds.map(x => `
            <div class="domain-row">
              <div class="name"><span class="dot ${x.d.id}"></span><span>${esc(x.d.name)}</span></div>
              <div class="bar ${x.d.id}" title="${x.seen} of ${x.total} answered"><i style="width:${x.acc == null ? 0 : Math.round(x.acc * 100)}%"></i></div>
              <div class="pct">${x.acc == null ? '—' : Math.round(x.acc * 100) + '%'}</div>
            </div>`).join('')}
          <p class="small muted" style="margin-top:12px">Aim for 80%+ in every domain before booking the exam. The exam is compensatory, so a strong Domain 3 can offset a weaker Domain 4, but not by much.</p>
        </section>
        <section class="stack">
          ${actionCard('#/flashcards', icon.cards, 'Flashcards', `${SERVICES.length + CONCEPTS.length} cards for services and key concepts. Spaced recall in two minutes.`)}
          ${actionCard('#/review', icon.redo, 'Review mistakes', mis ? `${mis} question${mis === 1 ? '' : 's'} you got wrong last time.` : 'Questions you miss land here automatically.')}
          ${actionCard('#/services', icon.grid4, 'Service catalog', 'Every in-scope service in one sentence, with the exam keyword that points to it.')}
        </section>
      </div>`;
  }
  function actionCard(href, ic, title, text) {
    return `<a class="card action-card" href="${href}"><span class="ic">${ic}</span><h3>${title}</h3><p class="small muted">${text}</p></a>`;
  }

  // ---------------------------------------------------------------- Learn
  function vLearn(p) {
    if (p[0] && LMAP[p[0]]) return vLesson(LMAP[p[0]]);
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Learn</span>
        <h1>Study notes by task statement</h1>
        <p class="lead">Each lesson covers one task statement from the official CLF-C02 exam guide, with diagrams, exam tips, and the traps that catch people.</p>
      </header>
      ${DOMAINS.map(d => {
        const ls = LESSONS.filter(l => l.d === d.id);
        const done = ls.filter(l => st.done.includes(l.id)).length;
        return `<section class="domain-block">
          <div class="domain-head">
            <div class="stack" style="gap:4px"><span class="eyebrow"><span class="dot ${d.id}"></span>Domain ${d.n} · ${d.weight}% of the exam</span><h2>${esc(d.name)}</h2></div>
            <span class="chip">${done}/${ls.length} done</span>
          </div>
          <div class="lesson-list">
            ${ls.map(l => `<a class="card lesson-item" href="#/learn/${l.id}">
              <span class="code" style="color:var(--${d.id})">${l.id}</span>
              <div><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p></div>
              <span class="check ${st.done.includes(l.id) ? 'on' : ''}" aria-label="${st.done.includes(l.id) ? 'Completed' : 'Not completed'}"></span>
            </a>`).join('')}
          </div>
        </section>`;
      }).join('')}`;
  }

  function vLesson(l) {
    const d = DMAP[l.d];
    const i = LESSONS.indexOf(l), prev = LESSONS[i - 1], next = LESSONS[i + 1];
    const nQ = QUESTIONS.filter(q => q.t === l.id).length;
    const done = st.done.includes(l.id);
    view.innerHTML = `
      <div class="lesson">
        <article class="stack-lg">
          <header class="page-head" style="margin:0">
            <span class="eyebrow"><a href="#/learn">Learn</a> / Domain ${d.n}: ${esc(d.name)}</span>
            <div class="row">${dchip(d.id)}<span class="chip">Task ${l.id}</span>${l.minutes ? `<span class="chip">${l.minutes} min read</span>` : ''}</div>
            <h1>${esc(l.title)}</h1>
            <p class="lead">${esc(l.summary)}</p>
          </header>
          <div class="prose" id="prose">${l.html}</div>
          <div class="card pad-lg row between">
            <div class="stack" style="gap:4px"><h3>Check yourself</h3><p class="small muted">${nQ} question${nQ === 1 ? '' : 's'} in the bank target Task ${l.id}.</p></div>
            <div class="row">
              <button class="btn" data-act="done" type="button">${done ? 'Mark as not done' : icon.check + ' Mark complete'}</button>
              <button class="btn primary" data-act="drill" type="button" ${nQ ? '' : 'disabled'}>Practice Task ${l.id}</button>
            </div>
          </div>
          <nav class="row between">
            ${prev ? `<a class="btn ghost" href="#/learn/${prev.id}">${icon.left} ${prev.id} ${esc(prev.title)}</a>` : '<span></span>'}
            ${next ? `<a class="btn ghost" href="#/learn/${next.id}">${next.id} ${esc(next.title)} ${icon.right}</a>` : ''}
          </nav>
        </article>
        <aside class="toc" id="toc" aria-label="On this page"></aside>
      </div>`;
    // Build the table of contents from the lesson's h2s
    const hs = [...view.querySelectorAll('#prose h2')];
    hs.forEach((h, k) => { h.id = 'sec-' + k; });
    $('#toc').innerHTML = hs.length ? '<span class="eyebrow" style="margin-bottom:6px">On this page</span>' +
      hs.map(h => `<a href="#" data-act="toc" data-to="${h.id}">${esc(h.textContent)}</a>`).join('') : '';
    A.toc = el => document.getElementById(el.dataset.to).scrollIntoView({ behavior: 'smooth', block: 'start' });
    A.done = () => {
      st.done = done ? st.done.filter(x => x !== l.id) : st.done.concat(l.id);
      save(); toast(done ? 'Marked as not done' : 'Lesson completed'); vLesson(l);
    };
    A.drill = () => startPractice({ task: l.id, count: Math.min(10, nQ), label: 'Task ' + l.id + ': ' + l.title });
  }

  // ---------------------------------------------------------------- Services
  function vServices() {
    const cats = [...new Set(SERVICES.map(s => s.c))];
    S.svc = S.svc || { q: '', c: 'All' };
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Reference</span>
        <h1>In-scope service catalog</h1>
        <p class="lead">The ${SERVICES.length} services listed as in scope for CLF-C02, grouped the way the exam guide groups them. Each one has the phrase that usually signals it in a question.</p>
      </header>
      <div class="filters">
        <input type="search" id="svcSearch" placeholder="Search services, e.g. 'threat detection' or 'NoSQL'" value="${esc(S.svc.q)}" aria-label="Search services">
        <div class="seg" id="svcCats">${['All'].concat(cats).map(c => `<button type="button" data-act="cat" data-c="${esc(c)}" aria-pressed="${S.svc.c === c}">${esc(c)}</button>`).join('')}</div>
      </div>
      <div id="svcList"></div>`;
    const draw = () => {
      const q = S.svc.q.trim().toLowerCase();
      const list = SERVICES.filter(s => (S.svc.c === 'All' || s.c === S.svc.c) &&
        (!q || (s.n + ' ' + s.d + ' ' + (s.k || '') + ' ' + s.c).toLowerCase().includes(q)));
      const groups = [...new Set(list.map(s => s.c))];
      $('#svcList').innerHTML = list.length ? groups.map(g => `
        <div class="cat-title"><h2>${esc(g)}</h2><span class="chip">${list.filter(s => s.c === g).length}</span></div>
        <div class="svc-grid">${list.filter(s => s.c === g).map(s => `
          <div class="card svc"><h3>${esc(s.n)}</h3><p>${esc(s.d)}</p>${s.k ? `<p class="tip"><b>Exam cue:</b> ${esc(s.k)}</p>` : ''}</div>`).join('')}
        </div>`).join('') : `<div class="empty">No service matches “${esc(S.svc.q)}”.</div>`;
    };
    draw();
    $('#svcSearch').addEventListener('input', e => { S.svc.q = e.target.value; draw(); });
    A.cat = el => {
      S.svc.c = el.dataset.c;
      view.querySelectorAll('#svcCats button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === S.svc.c));
      draw();
    };
  }

  // ---------------------------------------------------------------- Flashcards
  function allCards() {
    return SERVICES.map(s => ({ k: 's:' + s.n, front: s.n, sub: s.c, back: s.d, tip: s.k, group: 'svc', cat: s.c }))
      .concat(CONCEPTS.map(c => ({ k: 'c:' + c.f, front: c.f, sub: DMAP[c.d] ? 'Domain ' + DMAP[c.d].n + ' · ' + DMAP[c.d].name : 'Concept', back: c.b, group: 'con', cat: c.d })));
  }
  function vFlashcards() {
    const cards = allCards();
    const cats = [...new Set(SERVICES.map(s => s.c))];
    S.fcf = S.fcf || { deck: 'all', only: false };
    const build = () => {
      const f = S.fcf;
      let list = cards.filter(c => f.deck === 'all' || (f.deck === 'svc' && c.group === 'svc') || (f.deck === 'con' && c.group === 'con') ||
        (f.deck.startsWith('cat:') && c.cat === f.deck.slice(4)) || (f.deck.startsWith('dom:') && c.group === 'con' && c.cat === f.deck.slice(4)));
      if (f.only) list = list.filter(c => !st.cards[c.k]);
      S.fc = { list: shuffle(list), i: 0, flip: false };
    };
    if (!S.fc) build();
    const draw = () => {
      const F = S.fc, c = F.list[F.i];
      const known = cards.filter(x => st.cards[x.k]).length;
      $('#fcArea').innerHTML = !c ? `<div class="empty">${F.list.length ? 'Deck finished. Shuffle to go again.' : 'No cards left in this deck. Untick “Only cards I’m still learning” or pick another deck.'}</div>` : `
        <div class="progress-top"><span class="mono small tnum">${F.i + 1} / ${F.list.length}</span><div class="bar"><i style="width:${(F.i / F.list.length) * 100}%"></i></div></div>
        <div class="fc-stage">
          <button class="fc ${F.flip ? 'flip' : ''}" data-act="flip" type="button" aria-label="Flip card">
            <div class="fc-face fc-front"><span class="eyebrow">${esc(c.sub)}</span><h2>${esc(c.front)}</h2><span class="fc-hint">Click or press Space to flip</span></div>
            <div class="fc-face fc-back"><span class="eyebrow">${esc(c.front)}</span><p>${esc(c.back)}</p>${c.tip ? `<p class="small muted"><b style="color:var(--accent)">Exam cue:</b> ${esc(c.tip)}</p>` : ''}</div>
          </button>
        </div>
        <div class="row" style="justify-content:center;margin-top:18px">
          <button class="btn" data-act="prev" type="button" ${F.i ? '' : 'disabled'}>${icon.left} Back</button>
          <button class="btn" data-act="again" type="button">Still learning <kbd class="muted">1</kbd></button>
          <button class="btn primary" data-act="know" type="button">Got it <kbd>2</kbd></button>
        </div>`;
      $('#fcKnown').textContent = `${known} of ${cards.length} cards marked “Got it”`;
    };
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Flashcards</span>
        <h1>Recall before you recognise</h1>
        <p class="lead">Say the answer out loud before you flip. Cards you mark “Still learning” stay in the “still learning” filter until you get them.</p>
      </header>
      <div class="filters">
        <div class="row">
          <div class="field" style="flex:1;min-width:220px"><label for="fcDeck">Deck</label>
            <select id="fcDeck">
              <option value="all">Everything (${cards.length})</option>
              <option value="svc">All services (${SERVICES.length})</option>
              <option value="con">All concepts (${CONCEPTS.length})</option>
              <optgroup label="Concepts by domain">${DOMAINS.map(d => `<option value="dom:${d.id}">Domain ${d.n}: ${esc(d.name)}</option>`).join('')}</optgroup>
              <optgroup label="Services by category">${cats.map(c => `<option value="cat:${esc(c)}">${esc(c)}</option>`).join('')}</optgroup>
            </select></div>
          <label class="row small" style="gap:8px;margin-top:22px"><input type="checkbox" id="fcOnly" ${S.fcf.only ? 'checked' : ''}> Only cards I’m still learning</label>
          <button class="btn" data-act="shuffle" type="button" style="margin-top:22px">Shuffle</button>
        </div>
        <span class="small muted" id="fcKnown"></span>
      </div>
      <div id="fcArea" style="max-width:720px;margin:0 auto"></div>`;
    $('#fcDeck').value = S.fcf.deck;
    $('#fcDeck').addEventListener('change', e => { S.fcf.deck = e.target.value; build(); draw(); });
    $('#fcOnly').addEventListener('change', e => { S.fcf.only = e.target.checked; build(); draw(); });
    const advance = () => { S.fc.i++; S.fc.flip = false; draw(); };
    A.flip = () => { S.fc.flip = !S.fc.flip; $('.fc').classList.toggle('flip', S.fc.flip); };
    A.know = () => { const c = S.fc.list[S.fc.i]; if (!c) return; st.cards[c.k] = 1; save(); advance(); };
    A.again = () => { const c = S.fc.list[S.fc.i]; if (!c) return; delete st.cards[c.k]; save(); advance(); };
    A.prev = () => { if (S.fc.i) { S.fc.i--; S.fc.flip = false; draw(); } };
    A.shuffle = () => { build(); draw(); };
    onKey = e => {
      if (e.key === ' ') { e.preventDefault(); A.flip(); }
      else if (e.key === '1') A.again();
      else if (e.key === '2') A.know();
      else if (e.key === 'ArrowLeft') A.prev();
      else if (e.key === 'ArrowRight') advance();
    };
    draw();
  }

  // ---------------------------------------------------------------- Question card (shared)
  function optionOrder(q) {
    const idx = q.o.map((_, i) => i);
    return q.o.some(t => /\b(all|none|both) of the above\b/i.test(t)) ? idx : shuffle(idx);
  }
  function qcard(q, order, sel, o) {
    o = o || {};
    const multi = q.a.length > 1;
    const reveal = !!o.reveal;
    const ok = reveal && sameSet(sel, q.a);
    const correctLetters = order.map((oi, pos) => q.a.includes(oi) ? LETTERS[pos] : null).filter(Boolean).join(', ');
    const lesson = LMAP[q.t];
    return `<div class="q-card">
      <div class="q-meta">
        ${o.counter ? `<span class="chip mono">${o.counter}</span>` : ''}
        ${dchip(q.d)}<span class="chip">Task ${q.t}</span>
        ${multi ? `<span class="chip acc">Multiple response</span>` : ''}
      </div>
      <p class="q-text">${esc(qtext(q))}</p>
      ${multi ? `<p class="q-select">Select ${NUMWORD[q.a.length] || q.a.length}.</p>` : ''}
      <div class="opts" role="group" aria-label="Answer options">
        ${order.map((oi, pos) => {
          const picked = sel.includes(oi);
          let cls = 'opt' + (multi ? ' multi' : ''), tag = '';
          if (reveal) {
            if (q.a.includes(oi)) { cls += ' correct'; tag = picked ? 'Your answer ✓' : 'Correct'; }
            else if (picked) { cls += ' wrong'; tag = 'Your answer'; }
          }
          return `<button type="button" class="${cls}" data-act="pick" data-i="${oi}" aria-pressed="${!reveal && picked}" ${reveal ? 'disabled' : ''}>
            <span class="key">${LETTERS[pos]}</span><span>${esc(q.o[oi])}${reveal ? optNote(q, oi) : ''}</span><span class="tag">${tag}</span></button>`;
        }).join('')}
      </div>
      ${o.check && !reveal ? `<div class="row" style="margin-top:14px"><button class="btn primary" data-act="check" type="button" ${sel.length === q.a.length ? '' : 'disabled'}>Check answer</button><span class="small muted">${sel.length}/${q.a.length} selected</span></div>` : ''}
      ${reveal ? `<div class="explain ${ok ? 'ok' : 'no'}">
        <h4>${ok ? '✓ Correct' : (sel.length ? '✕ Not quite' : 'Not answered')} · Answer: ${correctLetters}</h4>
        <div>${q.e}</div>
        ${sourcesHtml(q)}
        ${lesson ? `<p class="refs"><a href="#/learn/${q.t}">Review lesson ${q.t}: ${esc(lesson.title)}</a></p>` : ''}
      </div>` : ''}
      ${o.footer || ''}
    </div>`;
  }

  // ---------------------------------------------------------------- Practice
  function pool(f) {
    let list = QUESTIONS.slice();
    if (f.d && f.d !== 'all') list = list.filter(q => q.d === f.d);
    if (f.task) list = list.filter(q => q.t === f.task);
    if (f.src === 'unseen') list = list.filter(q => !st.q[q.id]);
    if (f.src === 'wrong') list = list.filter(q => st.q[q.id] && st.q[q.id].l === 0);
    if (f.src === 'bm') list = list.filter(q => isBm(q.id));
    if (f.ids) list = f.ids.map(id => QMAP[id]).filter(Boolean);
    return list;
  }
  function startPractice(f) {
    let list = shuffle(pool(f));
    if (f.count && f.count !== 'all') list = list.slice(0, f.count);
    if (!list.length) { toast('No questions match that selection.'); return; }
    S.pr = { ids: list.map(q => q.id), i: 0, order: Object.fromEntries(list.map(q => [q.id, optionOrder(q)])), sel: [], res: {}, label: f.label || 'Practice set' };
    go('#/practice/run');
  }
  function vPractice(p) {
    if (p[0] === 'run') return vPracticeRun();
    S.pf = S.pf || { d: 'all', task: '', src: 'all', count: 10 };
    const f = S.pf;
    const tasks = TASKS.filter(t => f.d === 'all' || t.d === f.d);
    const avail = pool(f).length;
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Practice</span>
        <h1>Targeted practice</h1>
        <p class="lead">Instant feedback after every question, with an explanation of why each wrong option is wrong. Use it to learn; use the mock exam to measure.</p>
      </header>
      <div class="card pad-lg stack">
        <div class="field"><span class="label">Domain</span>
          <div class="seg">${[['all', 'All domains']].concat(DOMAINS.map(d => [d.id, d.n + '. ' + d.name])).map(([v, t]) =>
            `<button type="button" data-act="setd" data-v="${v}" aria-pressed="${f.d === v}">${esc(t)}</button>`).join('')}</div></div>
        <div class="field"><label for="pTask">Task statement</label>
          <select id="pTask"><option value="">All task statements</option>${tasks.map(t => `<option value="${t.id}" ${f.task === t.id ? 'selected' : ''}>${t.id} ${esc(t.title)}</option>`).join('')}</select></div>
        <div class="field"><span class="label">Questions</span>
          <div class="seg">${[['all', 'Any'], ['unseen', 'Not seen yet'], ['wrong', 'Got wrong'], ['bm', 'Bookmarked']].map(([v, t]) =>
            `<button type="button" data-act="setsrc" data-v="${v}" aria-pressed="${f.src === v}">${t}</button>`).join('')}</div></div>
        <div class="field"><span class="label">How many</span>
          <div class="seg">${[10, 20, 30, 'all'].map(v => `<button type="button" data-act="setn" data-v="${v}" aria-pressed="${String(f.count) === String(v)}">${v === 'all' ? 'All' : v}</button>`).join('')}</div></div>
        <div class="row between" style="margin-top:6px">
          <span class="muted small">${avail} question${avail === 1 ? '' : 's'} match.</span>
          <button class="btn primary" data-act="start" type="button" ${avail ? '' : 'disabled'}>Start practice ${icon.right}</button>
        </div>
      </div>
      ${S.pr && S.pr.i < S.pr.ids.length ? `<p class="small" style="margin-top:14px"><a href="#/practice/run">Continue your current set (${S.pr.i}/${S.pr.ids.length})</a></p>` : ''}`;
    $('#pTask').addEventListener('change', e => { f.task = e.target.value; vPractice([]); });
    A.setd = el => { f.d = el.dataset.v; f.task = ''; vPractice([]); };
    A.setsrc = el => { f.src = el.dataset.v; vPractice([]); };
    A.setn = el => { f.count = el.dataset.v === 'all' ? 'all' : Number(el.dataset.v); vPractice([]); };
    A.start = () => {
      const label = f.task ? 'Task ' + f.task : f.d === 'all' ? 'All domains' : 'Domain ' + DMAP[f.d].n + ': ' + DMAP[f.d].name;
      startPractice(Object.assign({}, f, { label }));
    };
  }
  function vPracticeRun() {
    const P = S.pr;
    if (!P) return go('#/practice');
    if (P.i >= P.ids.length) return vPracticeDone();
    const id = P.ids[P.i], q = QMAP[id], r = P.res[id];
    const multi = q.a.length > 1;
    const answered = Object.keys(P.res).length, right = Object.values(P.res).filter(x => x.ok).length;
    view.innerHTML = `
      <div class="row between" style="margin-bottom:10px">
        <span class="eyebrow">${esc(P.label)}</span>
        <span class="small muted tnum">${right}/${answered} correct</span>
      </div>
      <div class="progress-top"><span class="mono small tnum">${P.i + 1}/${P.ids.length}</span><div class="bar"><i style="width:${(P.i / P.ids.length) * 100}%"></i></div></div>
      ${qcard(q, P.order[id], r ? r.sel : P.sel, {
        reveal: !!r, check: multi,
        footer: `<div class="q-actions">
          <div class="row" style="gap:4px">
            <button class="icon-btn ${isBm(id) ? 'on' : ''}" data-act="bm" type="button">${icon.bm}${isBm(id) ? 'Bookmarked' : 'Bookmark'}</button>
            <button class="icon-btn" data-act="end" type="button">End set</button>
          </div>
          ${r ? `<button class="btn primary" data-act="next" type="button">${P.i + 1 < P.ids.length ? 'Next question' : 'See results'} ${icon.right}</button>` : `<span class="small muted">Keys: A–E to choose${multi ? ', Enter to check' : ''}</span>`}
        </div>`
      })}`;
    const submit = sel => {
      const ok = sameSet(sel, q.a);
      P.res[id] = { sel: sel.slice(), ok };
      record(id, ok); save(); P.sel = [];
      vPracticeRun();
    };
    A.pick = el => {
      if (r) return;
      const i = Number(el.dataset.i);
      if (!multi) return submit([i]);
      P.sel = P.sel.includes(i) ? P.sel.filter(x => x !== i) : (P.sel.length < q.a.length ? P.sel.concat(i) : P.sel);
      if (P.sel.length === q.a.length && !P.sel.includes(i)) toast(`Select exactly ${q.a.length}. Clear one first.`);
      vPracticeRun();
    };
    A.check = () => { if (P.sel.length === q.a.length) submit(P.sel); };
    A.next = () => { P.i++; P.sel = []; vPracticeRun(); window.scrollTo(0, 0); };
    A.bm = () => { toast(toggleBm(id) ? 'Bookmarked' : 'Bookmark removed'); vPracticeRun(); };
    A.end = () => { P.ids = P.ids.slice(0, Object.keys(P.res).length); P.i = P.ids.length; vPracticeRun(); };
    onKey = e => {
      const k = e.key.toUpperCase(), pos = LETTERS.indexOf(k);
      if (pos >= 0 && pos < q.o.length && k.length === 1 && !r) { const b = view.querySelectorAll('.opt')[pos]; if (b) A.pick(b); }
      else if (e.key === 'Enter') { if (r) A.next(); else if (multi) A.check(); }
    };
  }
  function vPracticeDone() {
    const P = S.pr;
    const ids = P.ids.filter(id => P.res[id]);
    const right = ids.filter(id => P.res[id].ok).length;
    const wrong = ids.filter(id => !P.res[id].ok);
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">${esc(P.label)}</span>
        <h1>${ids.length ? `${right} of ${ids.length} correct (${pct(right, ids.length)}%)` : 'Set ended'}</h1>
        <p class="lead">${!ids.length ? 'No questions answered.' : pct(right, ids.length) >= 80 ? 'Solid. Move on to the next topic or try a mock exam.' : 'Read the explanations below, then retry the ones you missed.'}</p>
        <div class="row">
          ${wrong.length ? `<button class="btn primary" data-act="retry" type="button">${icon.redo} Retry ${wrong.length} missed</button>` : ''}
          <a class="btn" href="#/practice">New practice set</a>
        </div>
      </header>
      <div class="stack">${ids.map((id, k) => reviewItem(QMAP[id], P.res[id].sel, k + 1)).join('')}</div>`;
    A.retry = () => startPractice({ ids: wrong, label: 'Retry missed questions' });
  }

  // Compact expandable review row used by results, review, and bank
  function reviewItem(q, sel, num, opts) {
    opts = opts || {};
    const answered = sel && sel.length;
    const ok = answered && sameSet(sel, q.a);
    const status = sel === null ? '' : ok ? '<span class="chip good">Correct</span>' : answered ? '<span class="chip bad">Wrong</span>' : '<span class="chip warn">Unanswered</span>';
    return `<details class="bank-q" ${opts.open ? 'open' : ''}>
      <summary><span class="q">${num ? `<span class="mono muted small">${num}. </span>` : ''}${esc(qtext(q))}</span><span class="row" style="gap:6px;align-items:flex-start">${opts.flag ? '<span class="chip warn">Flagged</span>' : ''}${status}</span></summary>
      <div class="inner stack" style="gap:12px">
        <div class="row" style="gap:6px">${dchip(q.d)}<span class="chip">Task ${q.t}</span>${q.a.length > 1 ? `<span class="chip acc">Select ${NUMWORD[q.a.length]}</span>` : ''}</div>
        <ul class="bank-opts">${q.o.map((t, i) => `<li class="${q.a.includes(i) ? 'ok' : ''}">${LETTERS[i]}. ${esc(t)}${sel && sel.includes(i) ? ` <b style="color:${q.a.includes(i) ? 'var(--good)' : 'var(--bad)'}">· your answer</b>` : ''}${optNote(q, i)}</li>`).join('')}</ul>
        <div class="explain"><div>${q.e}</div>${sourcesHtml(q)}${LMAP[q.t] ? `<p class="refs"><a href="#/learn/${q.t}">Lesson ${q.t}: ${esc(LMAP[q.t].title)}</a></p>` : ''}</div>
        <div><button class="icon-btn ${isBm(q.id) ? 'on' : ''}" data-act="bmrow" data-id="${q.id}" type="button">${icon.bm}${isBm(q.id) ? 'Bookmarked' : 'Bookmark'}</button></div>
      </div>
    </details>`;
  }
  function bindBmRow() {
    A.bmrow = el => {
      const on = toggleBm(el.dataset.id);
      el.classList.toggle('on', on);
      el.lastChild.textContent = on ? 'Bookmarked' : 'Bookmark';
      toast(on ? 'Bookmarked' : 'Bookmark removed');
    };
  }

  // ---------------------------------------------------------------- Mock exam
  const MODES = {
    full: { n: 65, min: 90, label: 'Full mock exam', desc: '65 questions · 90 minutes · weighted like the real exam' },
    half: { n: 33, min: 45, label: 'Half exam', desc: '33 questions · 45 minutes · same domain weights' },
    sprint: { n: 15, min: 20, label: 'Sprint', desc: '15 questions · 20 minutes · a quick check' }
  };
  const modeLabel = x => x.mode === 'set' ? 'Practice Test ' + (x.set + 1) : (MODES[x.mode] ? MODES[x.mode].label : 'Exam');
  const modeMin = x => x.mode === 'set' ? 90 : MODES[x.mode].min;
  // How many questions of each domain a test of n questions gets (largest remainder on the official weights)
  function domainQuota(n) {
    const ws = DOMAINS.map(d => ({ d: d.id, raw: n * d.weight / 100 }));
    ws.forEach(w => { w.k = Math.floor(w.raw); w.r = w.raw - w.k; });
    let left = n - ws.reduce((s, w) => s + w.k, 0);
    ws.slice().sort((a, b) => b.r - a.r).forEach(w => { if (left > 0) { w.k++; left--; } });
    return ws;
  }
  // Fixed practice tests: the bank is split into non-overlapping 65-question tests with a seeded shuffle,
  // so "Practice Test 3" contains the same questions on every device (as long as the bank is unchanged).
  const PRACTICE_SETS = (function () {
    let seed = 20261120;
    const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
    const quota = domainQuota(65);
    const pools = quota.map(w => {
      const ids = QUESTIONS.filter(q => q.d === w.d).map(q => q.id).sort();
      for (let i = ids.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [ids[i], ids[j]] = [ids[j], ids[i]]; }
      return { k: w.k, ids };
    });
    const count = Math.min(...pools.map(p => Math.floor(p.ids.length / p.k)));
    return Array.from({ length: count }, (_, s) => pools.flatMap(p => p.ids.slice(s * p.k, (s + 1) * p.k)));
  })();
  function weightedPick(n, preferUnseen) {
    const ws = domainQuota(n);
    let out = [];
    ws.forEach(w => {
      let qs = shuffle(QUESTIONS.filter(q => q.d === w.d));
      if (preferUnseen) qs.sort((a, b) => (st.q[a.id] ? 1 : 0) - (st.q[b.id] ? 1 : 0));
      out = out.concat(qs.slice(0, w.k));
    });
    if (out.length < n) out = out.concat(shuffle(QUESTIONS.filter(q => !out.includes(q))).slice(0, n - out.length));
    return shuffle(out);
  }
  function vExam(p) {
    if (p[0] === 'run') return vExamRun();
    if (p[0] === 'result') return vExamResult(Number(p[1] || 0));
    S.ef = S.ef || { mode: 'full', unseen: true };
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Mock exam</span>
        <h1>Simulate exam day</h1>
        <p class="lead">No feedback until you submit. Questions are drawn from the bank in proportion to the official domain weights. Flag anything you want to revisit, just like the real exam.</p>
      </header>
      ${st.active ? `<div class="card pad-lg row between" style="margin-bottom:16px;border-color:var(--accent)">
        <div class="stack" style="gap:4px"><h3>Exam in progress</h3><p class="small muted">${modeLabel(st.active)} · ${Object.keys(st.active.sel).filter(k => st.active.sel[k].length).length}/${st.active.ids.length} answered · ${fmtTime((st.active.endAt - Date.now()) / 1000)} left</p></div>
        <div class="row"><button class="btn danger" data-act="discard" type="button">Discard</button><a class="btn primary" href="#/exam/run">Resume</a></div></div>` : ''}
      <section style="margin-bottom:26px">
        <div class="section-title"><h2>Practice tests</h2><span class="muted small">${PRACTICE_SETS.length} fixed tests · 65 questions · 90 minutes · no overlap between tests</span></div>
        <div class="grid g4">${PRACTICE_SETS.map((ids, k) => {
          const tries = st.exams.filter(e => e.mode === 'set' && e.set === k);
          const best = tries.length ? Math.max(...tries.map(e => e.pct)) : null;
          return `<button type="button" class="card" data-act="set" data-k="${k}" style="text-align:left;cursor:pointer;font:inherit;color:inherit">
            <span class="eyebrow">Test ${k + 1}</span>
            <h3 style="margin:6px 0 8px">Practice Test ${k + 1}</h3>
            ${best == null ? '<span class="chip">Not taken</span>' : `<span class="chip ${best >= 80 ? 'good' : best >= 70 ? 'warn' : 'bad'} tnum">Best ${best}% · ${tries.length} ${tries.length === 1 ? 'try' : 'tries'}</span>`}
          </button>`;
        }).join('')}</div>
      </section>
      <div class="section-title"><h2>Random exam</h2><span class="muted small">New questions drawn each time</span></div>
      <div class="grid g3">
        ${Object.entries(MODES).map(([k, m]) => `
          <button type="button" class="card" data-act="mode" data-v="${k}" style="text-align:left;cursor:pointer;font:inherit;color:inherit;${S.ef.mode === k ? 'border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)' : ''}">
            <span class="eyebrow">${k === 'full' ? 'Recommended' : '&nbsp;'}</span>
            <h3 style="margin:6px 0 4px">${m.label}</h3><p class="small muted">${m.desc}</p></button>`).join('')}
      </div>
      <div class="card pad-lg stack" style="margin-top:16px">
        <label class="row small" style="gap:8px"><input type="checkbox" id="eUnseen" ${S.ef.unseen ? 'checked' : ''}> Prefer questions I haven’t seen yet</label>
        <ul class="small muted" style="margin:0;padding-left:1.1rem">
          <li>Unanswered questions count as wrong. There is no penalty for guessing, so answer everything.</li>
          <li>The score shown afterwards is your raw percentage plus a rough scaled estimate. AWS uses a compensating, scaled model, so treat 75–80% here as “ready”.</li>
          <li>Your progress is saved. You can close the tab and resume; the timer keeps running.</li>
        </ul>
        <div class="row between"><span class="small muted">${QUESTIONS.length} questions in the bank.</span>
          <button class="btn primary" data-act="begin" type="button">Start ${MODES[S.ef.mode].label.toLowerCase()} ${icon.right}</button></div>
      </div>
      <section class="card pad-lg stack" style="margin-top:16px">
        <h3>Free official practice from AWS</h3>
        <p class="small muted">Once you score 80%+ here, take AWS's own practice material for a final check. It uses the real exam style and is free with an AWS Skill Builder account.</p>
        <ul class="small" style="margin:0;padding-left:1.1rem">
          <li><a href="https://skillbuilder.aws/" target="_blank" rel="noopener">AWS Skill Builder</a>: search for “AWS Certified Cloud Practitioner Official Practice Question Set” and the Official Practice Exam.</li>
          <li><a href="https://aws.amazon.com/certification/certified-cloud-practitioner/" target="_blank" rel="noopener">Exam page</a>: the “Prepare for the exam” section links the exam guide and sample questions.</li>
        </ul>
      </section>
      ${st.exams.length ? `<section style="margin-top:28px"><div class="section-title"><h2>Past attempts</h2><a class="small" href="#/review">All history</a></div>
        <div class="card">${historyRows(st.exams.slice(0, 5))}</div></section>` : ''}`;
    $('#eUnseen').addEventListener('change', e => { S.ef.unseen = e.target.checked; });
    A.mode = el => { S.ef.mode = el.dataset.v; vExam([]); };
    A.discard = () => modal('Discard this exam?', 'Your answers in the current attempt will be lost. Nothing is added to your history.', 'Discard', () => { st.active = null; save(); vExam([]); }, true);
    A.begin = () => {
      const start = () => {
        const m = MODES[S.ef.mode];
        const qs = weightedPick(m.n, S.ef.unseen);
        st.active = { mode: S.ef.mode, ids: qs.map(q => q.id), order: Object.fromEntries(qs.map(q => [q.id, optionOrder(q)])), sel: {}, flag: {}, cur: 0, start: Date.now(), endAt: Date.now() + m.min * 60000 };
        save(); go('#/exam/run');
      };
      if (st.active) modal('Replace the exam in progress?', 'Starting a new exam discards the one you have not submitted.', 'Start new exam', start, true);
      else start();
    };
    A.set = el => {
      const k = Number(el.dataset.k);
      const start = () => {
        const qs = shuffle(PRACTICE_SETS[k]).map(id => QMAP[id]);
        st.active = { mode: 'set', set: k, ids: qs.map(q => q.id), order: Object.fromEntries(qs.map(q => [q.id, optionOrder(q)])), sel: {}, flag: {}, cur: 0, start: Date.now(), endAt: Date.now() + 90 * 60000 };
        save(); go('#/exam/run');
      };
      if (st.active) modal('Replace the exam in progress?', 'Starting a new exam discards the one you have not submitted.', 'Start Practice Test ' + (k + 1), start, true);
      else start();
    };
  }
  function historyRows(list) {
    return list.map(e => {
      const idx = st.exams.indexOf(e);
      return `<div class="history-row">
        <div><b>${modeLabel(e)}</b><div class="small muted">${fmtDate(e.at)} · ${fmtTime(e.used)} used</div></div>
        <span class="chip ${e.pct >= 80 ? 'good' : e.pct >= 70 ? 'warn' : 'bad'} tnum">${e.correct}/${e.n} · ${e.pct}%</span>
        <a class="btn sm" href="#/exam/result/${idx}">Review</a></div>`;
    }).join('');
  }
  function vExamRun() {
    const E = st.active;
    if (!E) return go('#/exam');
    if (Date.now() >= E.endAt) return finishExam(true);
    const id = E.ids[E.cur], q = QMAP[id];
    if (!q) { E.ids = E.ids.filter(x => QMAP[x]); E.cur = 0; save(); return vExamRun(); }
    const sel = E.sel[id] || [];
    const answered = E.ids.filter(x => (E.sel[x] || []).length).length;
    const flagged = !!E.flag[id];
    S.navOpen = S.navOpen || false;
    view.innerHTML = `
      <div class="exam-bar">
        <div class="stack" style="gap:2px"><span class="eyebrow">${modeLabel(E)}</span><span class="small tnum"><b>Question ${E.cur + 1}</b> of ${E.ids.length} · ${answered} answered</span></div>
        <div class="row" style="gap:8px">
          <span class="timer" id="timer" aria-label="Time remaining">${fmtTime((E.endAt - Date.now()) / 1000)}</span>
          <button class="btn sm" data-act="nav" type="button" aria-expanded="${S.navOpen}">${icon.grid} Overview</button>
          <button class="btn sm primary" data-act="submit" type="button">Submit</button>
        </div>
      </div>
      <div id="navPanel" class="card" style="margin-bottom:14px" ${S.navOpen ? '' : 'hidden'}>
        <div class="navgrid">${E.ids.map((x, k) => `<button type="button" data-act="jump" data-k="${k}" class="${(E.sel[x] || []).length ? 'ans' : ''} ${E.flag[x] ? 'flag' : ''} ${k === E.cur ? 'cur' : ''}" aria-label="Question ${k + 1}${E.flag[x] ? ', flagged' : ''}">${k + 1}</button>`).join('')}</div>
        <div class="legend"><span><i style="background:var(--accent-soft)"></i>Answered</span><span><i></i>Not answered</span><span><i style="background:var(--amber);border-radius:50%"></i>Flagged</span></div>
      </div>
      ${qcard(q, E.order[id], sel, {
        footer: `<div class="q-actions">
          <button class="icon-btn ${flagged ? 'on' : ''}" data-act="flag" type="button">${icon.flag}${flagged ? 'Flagged for review' : 'Flag for review'}</button>
          <div class="row" style="gap:8px">
            <button class="btn" data-act="prev" type="button" ${E.cur ? '' : 'disabled'}>${icon.left} Previous</button>
            ${E.cur + 1 < E.ids.length ? `<button class="btn primary" data-act="next" type="button">Next ${icon.right}</button>` : `<button class="btn primary" data-act="submit" type="button">Review &amp; submit</button>`}
          </div>
        </div>`
      })}
      <p class="small muted" style="margin-top:12px">Keys: A–E choose · ← → move · F flag</p>`;
    const tick = () => {
      const left = (E.endAt - Date.now()) / 1000;
      const t = $('#timer'); if (!t) return;
      t.textContent = fmtTime(left);
      t.classList.toggle('low', left < 300);
      if (left <= 0) finishExam(true);
    };
    timers.push(setInterval(tick, 1000)); tick();
    const move = k => { E.cur = Math.max(0, Math.min(E.ids.length - 1, k)); save(); vExamRun(); window.scrollTo(0, 0); };
    A.pick = el => {
      const i = Number(el.dataset.i);
      let s = E.sel[id] || [];
      if (q.a.length === 1) s = s[0] === i ? [] : [i];
      else if (s.includes(i)) s = s.filter(x => x !== i);
      else if (s.length < q.a.length) s = s.concat(i);
      else { toast(`Select exactly ${q.a.length}. Clear one first.`); return; }
      E.sel[id] = s; save(); vExamRun();
    };
    A.flag = () => { E.flag[id] = !E.flag[id]; if (!E.flag[id]) delete E.flag[id]; save(); vExamRun(); };
    A.prev = () => move(E.cur - 1);
    A.next = () => move(E.cur + 1);
    A.jump = el => move(Number(el.dataset.k));
    A.nav = () => { S.navOpen = !S.navOpen; vExamRun(); };
    A.submit = () => {
      const un = E.ids.length - E.ids.filter(x => (E.sel[x] || []).length).length;
      const fl = Object.keys(E.flag).length;
      modal('Submit your exam?', `${un ? `<b>${un} unanswered</b> question${un === 1 ? '' : 's'} will be marked wrong. ` : 'All questions answered. '}${fl ? `${fl} still flagged. ` : ''}You can’t change answers after submitting.`, 'Submit exam', () => finishExam(false));
    };
    onKey = e => {
      const k = e.key.toUpperCase(), pos = LETTERS.indexOf(k);
      if (k.length === 1 && pos >= 0 && pos < q.o.length) { const b = view.querySelectorAll('.opt')[pos]; if (b) A.pick(b); }
      else if (k === 'F') A.flag();
      else if (e.key === 'ArrowRight' && E.cur + 1 < E.ids.length) A.next();
      else if (e.key === 'ArrowLeft' && E.cur) A.prev();
    };
  }
  function finishExam(auto) {
    const E = st.active;
    if (!E) return;
    timers.forEach(clearInterval); timers = [];
    const per = {};
    DOMAINS.forEach(d => { per[d.id] = [0, 0]; });
    let correct = 0;
    const items = E.ids.filter(id => QMAP[id]).map(id => {
      const q = QMAP[id], sel = E.sel[id] || [], ok = sel.length > 0 && sameSet(sel, q.a);
      if (ok) correct++;
      per[q.d] = per[q.d] || [0, 0]; per[q.d][1]++; if (ok) per[q.d][0]++;
      if (sel.length) record(id, ok);
      return { id, sel, f: E.flag[id] ? 1 : 0 };
    });
    const n = items.length, p = pct(correct, n);
    st.exams.unshift({ at: Date.now(), mode: E.mode, set: E.set, n, correct, pct: p, used: Math.min((Date.now() - E.start) / 1000, modeMin(E) * 60), per, items, auto: !!auto });
    st.exams = st.exams.slice(0, 40);
    st.active = null; save();
    if (auto) toast('Time is up. Your exam was submitted.');
    go('#/exam/result/0');
  }
  function vExamResult(idx) {
    const e = st.exams[idx];
    if (!e) return go('#/exam');
    const scaled = Math.round(100 + 900 * e.correct / e.n);
    const status = e.pct >= 80 ? ['good', 'Ready', 'Comfortably above the pass line. Keep it there across a few more attempts.']
      : e.pct >= 70 ? ['warn', 'Borderline', 'Around the pass line. Review every miss below, then retake.']
      : ['bad', 'Not yet', 'Below the pass line. Work through the lessons for your weakest domain first.'];
    const C = 2 * Math.PI * 62;
    S.rf = S.rf || 'all';
    const filt = it => {
      const q = QMAP[it.id]; if (!q) return false;
      const ok = it.sel.length && sameSet(it.sel, q.a);
      return S.rf === 'all' || (S.rf === 'wrong' && !ok) || (S.rf === 'flag' && it.f) || (S.rf === 'un' && !it.sel.length);
    };
    const list = e.items.map((it, k) => Object.assign({ k }, it)).filter(filt);
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">${modeLabel(e)} · ${fmtDate(e.at)}${e.auto ? ' · submitted when time ran out' : ''}</span>
        <h1>Exam results</h1>
      </header>
      <section class="card pad-lg row" style="gap:28px;align-items:center;margin-bottom:18px">
        <svg class="score-ring" viewBox="0 0 150 150" role="img" aria-label="Score ${e.pct} percent">
          <circle class="bg" cx="75" cy="75" r="62"/>
          <circle class="fg" cx="75" cy="75" r="62" style="stroke:var(--${status[0]});stroke-dasharray:${C * e.pct / 100} ${C}"/>
          <text x="75" y="82" text-anchor="middle" font-size="30">${e.pct}%</text>
        </svg>
        <div class="stack" style="gap:10px;flex:1;min-width:220px">
          <span class="chip ${status[0]}" style="align-self:flex-start">${status[1]}</span>
          <p style="font-size:1.1rem"><b>${e.correct} of ${e.n}</b> correct in ${fmtTime(e.used)}. Rough scaled estimate: <b class="tnum">${scaled}</b> / 1000 (pass = 700).</p>
          <p class="muted small">${status[2]}</p>
          <div class="row"><a class="btn primary" href="#/exam">New exam</a>${e.items.some(it => !(it.sel.length && QMAP[it.id] && sameSet(it.sel, QMAP[it.id].a))) ? `<button class="btn" data-act="retry" type="button">${icon.redo} Practice the misses</button>` : ''}</div>
        </div>
      </section>
      <section class="card pad-lg" style="margin-bottom:22px">
        <h2 style="margin-bottom:8px">By domain</h2>
        ${DOMAINS.map(d => { const [c, n] = e.per[d.id] || [0, 0]; return `
          <div class="domain-row"><div class="name"><span class="dot ${d.id}"></span><span>${esc(d.name)}</span></div>
          <div class="bar ${d.id}"><i style="width:${pct(c, n)}%"></i></div><div class="pct tnum">${c}/${n}</div></div>`; }).join('')}
      </section>
      <div class="section-title"><h2>Answer review</h2>
        <div class="seg">${[['all', 'All'], ['wrong', 'Incorrect'], ['flag', 'Flagged'], ['un', 'Unanswered']].map(([v, t]) => `<button type="button" data-act="rf" data-v="${v}" aria-pressed="${S.rf === v}">${t}</button>`).join('')}</div>
      </div>
      <div class="stack">${list.length ? list.map(it => reviewItem(QMAP[it.id], it.sel, it.k + 1, { flag: it.f })).join('') : '<div class="empty">Nothing in this filter.</div>'}</div>`;
    A.rf = el => { S.rf = el.dataset.v; vExamResult(idx); };
    A.retry = () => startPractice({ ids: e.items.filter(it => QMAP[it.id] && !(it.sel.length && sameSet(it.sel, QMAP[it.id].a))).map(it => it.id), label: 'Misses from your mock exam' });
    bindBmRow();
  }

  // ---------------------------------------------------------------- Review
  function vReview() {
    S.rv = S.rv || 'wrong';
    const mis = mistakes(), bms = st.bm.filter(id => QMAP[id]);
    const tab = S.rv;
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Review</span>
        <h1>Close the gaps</h1>
        <p class="lead">A question leaves “Mistakes” as soon as you answer it correctly in practice or an exam.</p>
      </header>
      <div class="seg" style="margin-bottom:16px">
        <button type="button" data-act="tab" data-v="wrong" aria-pressed="${tab === 'wrong'}">Mistakes (${mis.length})</button>
        <button type="button" data-act="tab" data-v="bm" aria-pressed="${tab === 'bm'}">Bookmarked (${bms.length})</button>
        <button type="button" data-act="tab" data-v="hist" aria-pressed="${tab === 'hist'}">Exam history (${st.exams.length})</button>
      </div>
      <div id="rvBody"></div>`;
    const body = $('#rvBody');
    if (tab === 'hist') {
      body.innerHTML = st.exams.length ? `<div class="card">${historyRows(st.exams)}</div>` : '<div class="empty">No mock exams yet. <a href="#/exam">Take your first one</a>.</div>';
    } else {
      const ids = tab === 'wrong' ? mis : bms;
      body.innerHTML = ids.length ? `
        <div class="row between" style="margin-bottom:12px"><span class="small muted">${ids.length} question${ids.length === 1 ? '' : 's'}</span>
        <button class="btn primary" data-act="drill" type="button">${icon.redo} Practice these</button></div>
        <div class="stack">${ids.map(id => reviewItem(QMAP[id], null, 0)).join('')}</div>`
        : `<div class="empty">${tab === 'wrong' ? 'No open mistakes. Questions you get wrong will appear here.' : 'No bookmarks yet. Use the bookmark button on any question.'}</div>`;
      A.drill = () => startPractice({ ids: shuffle(ids), label: tab === 'wrong' ? 'Mistakes' : 'Bookmarked questions' });
    }
    A.tab = el => { S.rv = el.dataset.v; vReview(); };
    bindBmRow();
  }

  // ---------------------------------------------------------------- Question bank
  function vBank() {
    S.bf = S.bf || { q: '', d: 'all', t: '', n: 30 };
    const f = S.bf;
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Question bank</span>
        <h1>All ${QUESTIONS.length} questions</h1>
        <p class="lead">Browse and search every question with its answer and explanation. Handy for last-minute revision of one topic.</p>
      </header>
      <div class="filters">
        <input type="search" id="bSearch" placeholder="Search question text, options, explanations…" value="${esc(f.q)}" aria-label="Search questions">
        <div class="row">
          <select id="bDom" style="flex:1;min-width:180px" aria-label="Domain"><option value="all">All domains</option>${DOMAINS.map(d => `<option value="${d.id}" ${f.d === d.id ? 'selected' : ''}>Domain ${d.n}: ${esc(d.name)}</option>`).join('')}</select>
          <select id="bTask" style="flex:1;min-width:180px" aria-label="Task statement"><option value="">All task statements</option>${TASKS.filter(t => f.d === 'all' || t.d === f.d).map(t => `<option value="${t.id}" ${f.t === t.id ? 'selected' : ''}>${t.id} ${esc(t.title)}</option>`).join('')}</select>
        </div>
      </div>
      <div id="bList"></div>`;
    const draw = () => {
      const s = f.q.trim().toLowerCase();
      const list = QUESTIONS.filter(q => (f.d === 'all' || q.d === f.d) && (!f.t || q.t === f.t) &&
        (!s || (q.q + ' ' + q.o.join(' ') + ' ' + q.e).toLowerCase().includes(s)));
      $('#bList').innerHTML = `<p class="small muted" style="margin-bottom:10px">${list.length} match${list.length === 1 ? '' : 'es'}</p>
        <div class="stack">${list.slice(0, f.n).map(q => reviewItem(q, null, 0)).join('') || '<div class="empty">No questions match.</div>'}</div>
        ${list.length > f.n ? `<div class="row" style="justify-content:center;margin-top:16px"><button class="btn" data-act="more" type="button">Show 30 more</button></div>` : ''}`;
    };
    draw();
    $('#bSearch').addEventListener('input', e => { f.q = e.target.value; f.n = 30; draw(); });
    $('#bDom').addEventListener('change', e => { f.d = e.target.value; f.t = ''; f.n = 30; vBank(); });
    $('#bTask').addEventListener('change', e => { f.t = e.target.value; f.n = 30; draw(); });
    A.more = () => { f.n += 30; draw(); };
    bindBmRow();
  }

  // ---------------------------------------------------------------- Progress & backup
  function vProgress() {
    const seen = Object.keys(st.q).filter(id => QMAP[id]).length;
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Progress &amp; backup</span>
        <h1>Your data stays in this browser</h1>
        <p class="lead">There are no accounts. Progress is saved in this browser only, so export a backup if you switch devices or clear your browsing data.</p>
      </header>
      <div class="grid g4" style="margin-bottom:18px">
        <div class="card"><span class="eyebrow">Answered</span><div class="big-num" style="margin-top:8px">${seen}</div></div>
        <div class="card"><span class="eyebrow">Lessons done</span><div class="big-num" style="margin-top:8px">${st.done.length}</div></div>
        <div class="card"><span class="eyebrow">Exams</span><div class="big-num" style="margin-top:8px">${st.exams.length}</div></div>
        <div class="card"><span class="eyebrow">Bookmarks</span><div class="big-num" style="margin-top:8px">${st.bm.length}</div></div>
      </div>
      <div class="grid g2">
        <section class="card pad-lg stack">
          <h3>Back up or move devices</h3>
          <p class="small muted">Download a small JSON file with your progress, then import it on another device.</p>
          <div class="row"><button class="btn primary" data-act="export" type="button">Export progress</button>
          <label class="btn" for="importFile">Import file</label><input type="file" id="importFile" accept="application/json,.json" hidden></div>
        </section>
        <section class="card pad-lg stack">
          <h3>Appearance</h3>
          <p class="small muted">Follow your system setting or pick one.</p>
          <div class="seg">${[[null, 'System'], ['light', 'Light'], ['dark', 'Dark']].map(([v, t]) => `<button type="button" data-act="theme" data-v="${v || ''}" aria-pressed="${st.theme === v}">${t}</button>`).join('')}</div>
        </section>
        <section class="card pad-lg stack">
          <h3>Start over</h3>
          <p class="small muted">Erase all answers, lessons, bookmarks, flashcard marks, and exam history from this browser.</p>
          <div><button class="btn danger" data-act="reset" type="button">Reset all progress</button></div>
        </section>
        <section class="card pad-lg stack">
          <h3>About the content</h3>
          <p class="small muted">Lessons follow the official AWS CLF-C02 exam guide (version 1.3, October 2026) and its in-scope service list. All practice questions are original and written for this site; they are not real exam questions. Always check the <a href="https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html" target="_blank" rel="noopener">official exam guide</a> for the latest scope.</p>
        </section>
      </div>`;
    A.export = () => {
      const blob = new Blob([JSON.stringify(Object.assign({}, st, { exportedAt: new Date().toISOString() }), null, 1)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'clfc02-progress-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast('Progress exported');
    };
    $('#importFile').addEventListener('change', e => {
      const file = e.target.files[0]; if (!file) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const data = JSON.parse(r.result);
          if (!data || typeof data !== 'object' || !('q' in data)) throw new Error('bad');
          modal('Replace current progress?', 'The imported file will overwrite the progress stored in this browser.', 'Import', () => {
            st = Object.assign(blank(), data); delete st.exportedAt; save(); paintTheme(); toast('Progress imported'); vProgress();
          });
        } catch (err) { toast('That file is not a CLF-C02 Study Lab backup.'); }
      };
      r.readAsText(file);
      e.target.value = '';
    });
    A.theme = el => { st.theme = el.dataset.v || null; save(); paintTheme(); vProgress(); };
    A.reset = () => modal('Reset all progress?', 'This permanently erases your progress in this browser. Export a backup first if you might want it back.', 'Erase everything', () => {
      const theme = st.theme; st = blank(); st.theme = theme; save(); S.fc = null; S.pr = null; toast('Progress reset'); vProgress();
    }, true);
  }

  // ---------------------------------------------------------------- Resources
  function vResources() {
    const link = (href, title, text, tag) => `<a class="card svc" href="${href}" target="_blank" rel="noopener">
      <div class="row between" style="gap:8px"><h3>${title}</h3>${tag ? `<span class="chip ${tag === 'Free' ? 'good' : tag === 'Paid' ? 'warn' : 'acc'}">${tag}</span>` : ''}</div>
      <p class="small muted">${text}</p></a>`;
    const group = (title, intro, items) => `<section style="margin-bottom:30px">
      <div class="section-title"><h2>${title}</h2></div>${intro ? `<p class="small muted" style="margin:-4px 0 12px;max-width:70ch">${intro}</p>` : ''}
      <div class="svc-grid">${items.join('')}</div></section>`;
    view.innerHTML = `
      <header class="page-head">
        <span class="eyebrow">Resources</span>
        <h1>Where else to study</h1>
        <p class="lead">Use this site to learn and drill. Use the official AWS material to confirm you are ready. Everything here is legitimate; avoid “exam dump” sites, which break the AWS Certification Program Agreement and are often wrong.</p>
      </header>
      ${group('Official exam information', '', [
        link('https://aws.amazon.com/certification/certified-cloud-practitioner/', 'Certification page', 'Exam details, registration, and the official prep links.', 'Official'),
        link('https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02.html', 'CLF-C02 exam guide', 'Domains, task statements, and what is out of scope. Re-read it the week before the exam.', 'Official'),
        link('https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/clf-02-in-scope-services.html', 'In-scope services list', 'The services that can appear on the exam.', 'Official')
      ])}
      ${group('Official practice and training', 'Sign in to AWS Skill Builder with a free account and search for these titles.', [
        link('https://skillbuilder.aws/', 'Official Practice Question Set (CLF-C02)', 'Twenty questions written by AWS in the real exam style, with explanations. The best final check.', 'Free'),
        link('https://skillbuilder.aws/', 'AWS Cloud Practitioner Essentials', 'AWS\'s own foundational course: videos and knowledge checks covering every domain.', 'Free'),
        link('https://skillbuilder.aws/', 'Exam Prep Standard Course: CLF-C02', 'Domain-by-domain review of the exam guide with practice questions.', 'Free'),
        link('https://skillbuilder.aws/', 'Official Practice Exam and AWS Cloud Quest', 'A full-length practice exam and a role-playing game with hands-on labs. Included with a Skill Builder subscription.', 'Paid'),
        link('https://aws.amazon.com/education/awseducate/', 'AWS Educate', 'Free self-paced cloud training and labs for students, no credit card needed.', 'Free')
      ])}
      ${group('Read the source', 'Many exam questions paraphrase these pages.', [
        link('https://docs.aws.amazon.com/whitepapers/latest/aws-overview/introduction.html', 'Overview of Amazon Web Services', 'The six advantages, global infrastructure, and one paragraph per service.', 'Free'),
        link('https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', 'AWS Well-Architected Framework', 'The six pillars and their design principles.', 'Free'),
        link('https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/how-aws-pricing-works.html', 'How AWS Pricing Works', 'Pricing models, Free Tier, and cost tools.', 'Free'),
        link('https://aws.amazon.com/compliance/shared-responsibility-model/', 'Shared Responsibility Model', 'The official explanation with examples.', 'Free'),
        link('https://aws.amazon.com/premiumsupport/plans/', 'Compare AWS Support plans', 'The current plan lineup and response times.', 'Free'),
        link('https://aws.amazon.com/faqs/', 'AWS service FAQs', 'Short, exam-friendly answers for each service. Read the FAQ of any service you keep missing.', 'Free')
      ])}
      ${group('Hands-on and community', '', [
        link('https://aws.amazon.com/free/', 'AWS Free Tier', 'Try S3, EC2, IAM, and Lambda yourself. Create an AWS Budgets alert first.', 'Free'),
        link('https://repost.aws/', 'AWS re:Post', 'Ask questions and read answers from AWS experts and the community.', 'Free'),
        link('https://www.youtube.com/results?search_query=freecodecamp+aws+certified+cloud+practitioner', 'Full video courses on YouTube', 'freeCodeCamp and others publish complete free Cloud Practitioner courses.', 'Free')
      ])}
      ${group('Extra practice exams on other sites', 'When you finish this site, take these on their own platforms. Their questions are original and their terms do not allow copying, so they are linked here, not included.', [
        link('https://exampark.app/exams/aws-cloud-practitioner/', 'ExamPark', 'A free, full-length 65-question CLF-C02 exam with no sign-up, weighted like the real exam, with an explanation and AWS documentation links for every option. Five more sets are paid.', 'Free'),
        link('https://tutorialsdojo.com/', 'Tutorials Dojo', 'Practice exams and cheat sheets by Jon Bonso.', 'Paid'),
        link('https://www.udemy.com/courses/search/?q=aws%20certified%20cloud%20practitioner%20practice%20exams', 'Udemy practice exams', 'Practice test sets by instructors such as Stéphane Maarek and Neal Davis. Often on sale.', 'Paid')
      ])}
      <section class="card pad-lg stack">
        <h3>A simple 4-week plan</h3>
        <ol class="small" style="margin:0;padding-left:1.2rem;display:flex;flex-direction:column;gap:6px">
          <li><b>Week 1:</b> Lessons for Domains 1 and 2, flashcards daily, Practice by task statement.</li>
          <li><b>Week 2:</b> Lessons for Domains 3 and 4, the service catalog, Practice on “Not seen yet”.</li>
          <li><b>Week 3:</b> Practice Tests 1–4. Review every miss, then retry “Got wrong”.</li>
          <li><b>Week 4:</b> Practice Tests 5–8 (aim for 80%+), then AWS's Official Practice Question Set. Book the exam.</li>
        </ol>
      </section>`;
  }

  // ---------------------------------------------------------------- More (phone)
  function vMore() {
    view.innerHTML = `
      <header class="page-head"><span class="eyebrow">More</span><h1>Everything else</h1></header>
      <div class="stack">
        ${actionCard('#/flashcards', icon.cards, 'Flashcards', 'Services and concepts, flip to recall.')}
        ${actionCard('#/review', icon.redo, 'Review', 'Mistakes, bookmarks, and exam history.')}
        ${actionCard('#/services', icon.grid4, 'Service catalog', 'Every in-scope service in one line.')}
        ${actionCard('#/bank', icon.search, 'Question bank', 'Search all questions with answers.')}
        ${actionCard('#/resources', icon.book, 'Resources', 'Official AWS training, whitepapers, and other places to practice.')}
        ${actionCard('#/progress', icon.check, 'Progress & backup', 'Export, import, theme, reset.')}
      </div>`;
    document.querySelectorAll('.tabbar [data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav === 'more'));
  }

  // ---------------------------------------------------------------- boot
  paintTheme();
  route();
})();
