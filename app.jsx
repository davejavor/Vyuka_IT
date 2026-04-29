const { useState, useEffect, useRef } = React;

/* ── KATEGORIE ──────────────────────────── */
const CAT = {
  web:      { label: 'Web',        color: 'oklch(48% 0.22 228)', light: 'oklch(94% 0.06 228)', glow: '#ddeeff99' },
  network:  { label: 'Sítě',       color: 'oklch(46% 0.19 162)', light: 'oklch(94% 0.06 162)', glow: '#d4f0e899' },
  hardware: { label: 'Hardware',   color: 'oklch(46% 0.19 295)', light: 'oklch(94% 0.06 295)', glow: '#e8d8ff99' },
  security: { label: 'Bezpečnost', color: 'oklch(50% 0.21 38)',  light: 'oklch(94% 0.06 38)',  glow: '#ffe8d099' },
};

/* ── MATERIÁLY ──────────────────────────── */
const MATS = [
  { id:'html',     cat:'web',      badge:'HTML',  type:'Přehled', title:'HTML — Kompletní přehled',         desc:'HyperText Markup Language — základní stavební kámen každé webové stránky',        href: 'web/html.html' },
  { id:'css',      cat:'web',      badge:'CSS',   type:'Přehled', title:'CSS — Kompletní přehled',          desc:'Cascading Style Sheets — jak webové stránky vypadají',                           href: 'web/css.html' },
  { id:'github',   cat:'web',      badge:'GIT',   type:'Návod',   title:'GitHub — Tvorba webových stránek', desc:'Krok za krokem: od registrace po živý web na internetu',                         href: 'web/github.html' },
  { id:'tahak',    cat:'web',      badge:'HTML',  type:'Tahák',   title:'HTML/CSS — Tahák',                 desc:'Rychlý přehled nejdůležitějších HTML tagů a CSS vlastností pro tisk',            href: 'web/tahak.html' },
  { id:'ip_dns',   cat:'network',  badge:'NET',   type:'Tahák',   title:'IP adresy a DNS — Tahák',          desc:'Jak fungují IP adresy, DNS servery a jak se data dostávají na správné místo',   href: 'network/ip_dns.html' },
  { id:'hradla',   cat:'hardware', badge:'HW',    type:'Tahák',   title:'Logická hradla — Tahák',           desc:'Přehled základních logických operací, pravdivostní tabulky a schémata hradel',  href: 'hardware/logicka_hradla.html' },
  { id:'microbit', cat:'hardware', badge:'µBIT',  type:'Projekt', title:'Micro:bit — Rádiová síť',          desc:'Server-client architektura, rádiová komunikace a vizualizace dat přes micro:bit', href: 'hardware/microbit-net.html' },
  { id:'stopa',    cat:'security', badge:'SEC',   type:'Přehled', title:'Digitální stopa a metadata',       desc:'Co o tobě prozrazují fotky a dokumenty — EXIF, GPS, historie verzí',             href: 'bezpecnost/digitalni-stopa.html' },
];

/* ── SLOVNÍK ────────────────────────────── */
const GLOSSARY = [
  { term:'HTML',           tag:'Web',        cat:'web',      def:'HyperText Markup Language — značkovací jazyk pro tvorbu webových stránek.' },
  { term:'CSS',            tag:'Web',        cat:'web',      def:'Cascading Style Sheets — jazyk pro popis vzhledu HTML dokumentů (barvy, velikosti, rozmístění).' },
  { term:'Tag',            tag:'Web',        cat:'web',      def:'Značka v HTML ohraničená špičatými závorkami, např. <p> nebo <a>. Tagy definují strukturu dokumentu.' },
  { term:'Atribut',        tag:'Web',        cat:'web',      def:'Doplňkový parametr HTML tagu, který upřesňuje jeho chování. Např. href v <a href="...">.' },
  { term:'IP adresa',      tag:'Sítě',       cat:'network',  def:'Unikátní číselný identifikátor každého zařízení v síti. Příklad: 192.168.1.1 (IPv4) nebo 2001:db8::1 (IPv6).' },
  { term:'DNS',            tag:'Sítě',       cat:'network',  def:'Domain Name System — systém překladu doménových jmen (google.com) na IP adresy. Funguje jako telefonní seznam internetu.' },
  { term:'HTTP / HTTPS',   tag:'Sítě',       cat:'network',  def:'Protokol pro přenos webových stránek. HTTPS je šifrovaná (bezpečná) verze.' },
  { term:'Protokol',       tag:'Sítě',       cat:'network',  def:'Soubor pravidel a standardů, podle nichž spolu komunikují počítače v síti.' },
  { term:'Server',         tag:'Sítě',       cat:'network',  def:'Počítač nebo program poskytující služby (soubory, data, výpočty) ostatním zařízením v síti.' },
  { term:'Logické hradlo', tag:'Hardware',   cat:'hardware', def:'Základní elektronický obvod provádějící logické operace (AND, OR, NOT). Z hradel jsou složeny všechny procesory.' },
  { term:'EXIF',           tag:'Bezpečnost', cat:'security', def:'Exchangeable Image File Format — metadata uložená v každé fotografii: GPS poloha, datum, typ fotoaparátu.' },
  { term:'Digitální stopa',tag:'Bezpečnost', cat:'security', def:'Veškerá data, která o sobě zanecháme na internetu — příspěvky, fotky, logy přihlášení, metadata souborů.' },
  { term:'Firewall',       tag:'Bezpečnost', cat:'security', def:'Bezpečnostní systém (hardware nebo software) kontrolující síťový provoz a blokující neoprávněný přístup.' },
  { term:'Algoritmus',     tag:'Obecné',     cat:'hardware', def:'Přesný a konečný postup řešení úlohy — sled kroků, které vedou od zadaného problému k výsledku.' },
];

/* ── SYNTAX HIGHLIGHTER ─────────────────── */
function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderTag(tag) {
  let r = '', i = 0;
  r += '<span class="hl-bracket">&lt;</span>'; i = 1;
  if (tag[i] === '/') { r += '<span class="hl-bracket">/</span>'; i++; }
  if (tag[i] === '!') {
    r += '<span class="hl-doctype">' + esc(tag.slice(i, tag.length - 1)) + '</span>';
    r += '<span class="hl-bracket">&gt;</span>';
    return r;
  }
  let j = i;
  while (j < tag.length && !/[ \t\n>\/]/.test(tag[j])) j++;
  r += '<span class="hl-tagname">' + esc(tag.slice(i, j)) + '</span>';
  i = j;
  while (i < tag.length) {
    const c = tag[i];
    if (c === '>') { r += '<span class="hl-bracket">&gt;</span>'; i++; }
    else if (c === '/' && tag[i + 1] === '>') { r += '<span class="hl-bracket">/&gt;</span>'; i += 2; }
    else if (c === '"' || c === "'") {
      let k = i + 1;
      while (k < tag.length && tag[k] !== c) k++;
      r += '<span class="hl-string">' + esc(tag.slice(i, k + 1)) + '</span>';
      i = k + 1;
    } else if (/[a-zA-Z_-]/.test(c)) {
      let k = i;
      while (k < tag.length && /[a-zA-Z0-9_:-]/.test(tag[k])) k++;
      r += '<span class="hl-attr">' + esc(tag.slice(i, k)) + '</span>';
      i = k;
    } else { r += esc(c); i++; }
  }
  return r;
}

function highlight(code) {
  let out = '', i = 0;
  while (i < code.length) {
    if (code.slice(i, i + 4) === '<!--') {
      const e = code.indexOf('-->', i + 4);
      const end = e === -1 ? code.length : e + 3;
      out += '<span class="hl-comment">' + esc(code.slice(i, end)) + '</span>';
      i = end;
    } else if (code[i] === '<') {
      let j = i + 1, inS = false, sq = '';
      while (j < code.length) {
        if (!inS && (code[j] === '"' || code[j] === "'")) { inS = true; sq = code[j]; }
        else if (inS && code[j] === sq) inS = false;
        else if (!inS && code[j] === '>') { j++; break; }
        j++;
      }
      out += renderTag(code.slice(i, j));
      i = j;
    } else { out += esc(code[i]); i++; }
  }
  return out;
}

/* ── SDÍLENÉ KOMPONENTY ─────────────────── */
function Badge({ text, cat }) {
  const c = CAT[cat];
  return (
    <span className="badge" style={{ color: c.color, background: c.light, border: `1px solid ${c.color}30` }}>
      {text}
    </span>
  );
}

function CodeBlock({ lang = 'HTML', children }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="code-wrap">
      <div className="code-bar">
        <span className="code-lang">{lang}</span>
        <button className="copy-btn" onClick={copy}>{copied ? '✓ Hotovo' : 'Kopírovat'}</button>
      </div>
      <pre className="code-pre" dangerouslySetInnerHTML={{ __html: highlight(children) }} />
    </div>
  );
}

function CT({ headers, rows }) {
  return (
    <table className="ct">
      <thead><tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
    </table>
  );
}

function Adv({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="adv">
      <button className="adv-btn" onClick={() => setOpen(o => !o)}>
        <span style={{ display: 'inline-block', transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .2s', fontSize: 9 }}>▶</span>
        Pro pokročilé: {title}
      </button>
      {open && <div className="adv-body">{children}</div>}
    </div>
  );
}

/* ── SLOVNÍČEK MODAL ─────────────────────── */
function GlossaryModal({ onClose }) {
  const [q, setQ] = useState('');
  const filtered = GLOSSARY.filter(g =>
    !q || g.term.toLowerCase().includes(q.toLowerCase()) || g.def.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-head">
          <span className="modal-title">Slovníček pojmů</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-search">
          <input placeholder="Hledat pojem…" value={q} onChange={e => setQ(e.target.value)} autoFocus />
        </div>
        <div className="modal-body">
          {filtered.map((g, i) => {
            const c = CAT[g.cat];
            return (
              <div key={i} className="gloss-item">
                <div className="gloss-term">
                  {g.term}
                  <span className="badge" style={{ color: c.color, background: c.light, border: `1px solid ${c.color}30`, fontSize: 10 }}>{g.tag}</span>
                </div>
                <div className="gloss-def">{g.def}</div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--tx-3)' }}>Nic nenalezeno</div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── INDEX VIEW ─────────────────────────── */
function IndexView({ dark, setDark }) {
  const [q, setQ] = useState('');
  const [showGloss, setShowGloss] = useState(false);

  const filtered = q.trim()
    ? MATS.filter(m => `${m.title} ${m.desc}`.toLowerCase().includes(q.toLowerCase()))
    : MATS;

  const catGroups = Object.entries(CAT)
    .map(([key, cat]) => ({ key, cat, items: filtered.filter(m => m.cat === key) }))
    .filter(g => g.items.length > 0);

  return (
    <>
      <header className="site-header">
        <div className="site-header-inner">
          <span className="logo-mark">IT Návody</span>
          <span className="header-sep">·</span>
          <span className="logo-school">ZŠ Archa</span>
          <div className="header-spacer"></div>
          <button className="icon-btn no-print" onClick={() => setShowGloss(true)}>📖 Slovníček</button>
          <button className="icon-btn no-print" onClick={() => setDark(d => !d)}>
            {dark ? '☀' : '☾'} {dark ? 'Světlý' : 'Tmavý'}
          </button>
        </div>
      </header>

      <div className="hero-wrap" style={{ '--hero-glow': CAT.web.glow }}>
        <div className="hero-dots"></div>
        <div className="hero-glow"></div>
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-tag">
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: CAT.web.color, display: 'inline-block' }}></span>
              Informatika · 7. – 9. třída
            </div>
            <h1 className="hero-h1">IT Návody</h1>
            <p className="hero-sub">Výukové materiály z informatiky — přehledy, taháky a návody připravené pro výuku i tisk.</p>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num" style={{ color: CAT.web.color }}>{MATS.length}</div>
              <div className="hero-stat-label">materiálů</div>
            </div>
            <div>
              <div className="hero-stat-num" style={{ color: CAT.hardware.color }}>{Object.keys(CAT).length}</div>
              <div className="hero-stat-label">kategorie</div>
            </div>
          </div>
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder="Hledat materiál…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && <button className="search-clear" onClick={() => setQ('')}>✕</button>}
        </div>
      </div>

      <main className="index-main">
        {catGroups.length === 0 && (
          <div className="cards"><div className="no-results">Nic nenalezeno pro „{q}"</div></div>
        )}
        {catGroups.map(({ key, cat, items }) => (
          <div key={key} className="cat-section">
            <div className="cat-header">
              <span className="cat-label" style={{ color: cat.color }}>{cat.label}</span>
              <span className="cat-count">{items.length}</span>
              <div className="cat-line"></div>
            </div>
            <div className="cards">
              {items.map(m => (
                <a
                  key={m.id}
                  className="card"
                  style={{ '--cc': cat.color }}
                  href={m.href}
                >
                  <div className="card-top">
                    <Badge text={m.badge} cat={m.cat} />
                    <span className="pill">{m.type}</span>
                  </div>
                  <div className="card-title">{m.title}</div>
                  <div className="card-desc">{m.desc}</div>
                  <div className="card-foot">
                    <span className="card-link">Otevřít materiál</span>
                    <span className="card-arrow">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '18px 32px', fontSize: 12, color: 'var(--tx-3)', display: 'flex', gap: 8 }}>
        <span>© David · Montessori ZŠ Archa</span>
        <span>·</span>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/" style={{ color: 'var(--tx-2)', textDecoration: 'none' }}>CC BY-SA 4.0</a>
      </footer>

      {showGloss && <GlossaryModal onClose={() => setShowGloss(false)} />}
    </>
  );
}

/* ── APP ─────────────────────────────────── */
function App() {
  const [dark, setDarkState] = useState(() => localStorage.getItem('dark') === 'true');

  const setDark = (fn) => {
    const next = typeof fn === 'function' ? fn(dark) : fn;
    setDarkState(next);
    localStorage.setItem('dark', next);
    document.documentElement.setAttribute('data-dark', next);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-dark', dark);
  }, []);

  return <IndexView dark={dark} setDark={setDark} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
