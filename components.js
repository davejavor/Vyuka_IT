// Navigační struktura — každá kategorie = dropdown, prázdné složky zakomentovány
const NAV_MENU = [
  { href: "index.html", label: "Dom\u016f" },
  {
    label: "Web",
    items: [
      { href: "web/html.html",   label: "HTML"   },
      { href: "web/css.html",    label: "CSS"    },
      { href: "web/github.html", label: "GitHub" },
    ]
  },
  // { label: "Programov\u00e1n\u00ed", items: [] }, // pr\u00e1zdn\u00e1 slo\u017eka
  {
    label: "S\u00edt\u011b",
    items: [
      { href: "network/ip_dns.html", label: "IP adresy a DNS" },
    ]
  },
  {
    label: "Hardware",
    items: [
      { href: "hardware/microbit-display.html", label: "Micro:bit Basic" },
      { href: "hardware/logicka_hradla.html", label: "Logick\u00e1 hradla"  },
      { href: "hardware/microbit-net.html",   label: "Micro:bit Network" },
    ]
  },
  {
    label: "Bezpe\u010dnost",
    items: [
      { href: "bezpecnost/digitalni-stopa.html", label: "Digit\u00e1ln\u00ed stopa" },
    ]
  },
  // { label: "Data", items: [] }, // pr\u00e1zdn\u00e1 slo\u017eka
  // { label: "AI",   items: [] }, // pr\u00e1zdn\u00e1 slo\u017eka
];

// CSS pro dropdown — vloženo jednorázově do <head>
const DROPDOWN_CSS = `
/* === Dropdown navigace === */
nav.site-nav > ul {
  align-items: center;
}

/* Položky s dropdownem */
.has-dropdown {
  position: relative;
}

.nav-dropdown-btn {
  background: none;
  border: none;
  color: white;
  padding: 4px 10px;
  border-radius: var(--border-radius, 5px);
  cursor: pointer;
  font-family: var(--font-main, sans-serif);
  font-size: var(--font-size-base, 14px);
  white-space: nowrap;
  line-height: 1.4;
  display: flex;
  align-items: center;
  gap: 2px;
}

.nav-dropdown-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}

.nav-dropdown-btn.active {
  border-bottom: 2px solid var(--color-secondary, #3498db);
}

/* Dropdown panel */
.dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: #1a2636;
  border-radius: 0 0 var(--border-radius, 5px) var(--border-radius, 5px);
  min-width: 190px;
  z-index: 1000;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.35);
  flex-direction: column;
  padding: 4px 0;
  margin-top: 0;
}

.dropdown li {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown a {
  display: block;
  padding: 8px 16px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  white-space: nowrap;
  font-size: var(--font-size-base, 14px);
}

.dropdown a:hover {
  background: rgba(255, 255, 255, 0.12);
  color: white;
  text-decoration: none;
}

.dropdown a.active {
  color: white;
  border-left: 3px solid var(--color-secondary, #3498db);
  padding-left: 13px;
}

/* Desktop (hover zařízení): otevírá se POUZE přes CSS hover — bez .open */
@media (hover: hover) and (pointer: fine) {
  .has-dropdown:hover > .dropdown {
    display: flex;
  }
}

/* Dotyk (hover: none): otevírá se POUZE přes JS .open — bez hover */
@media (hover: none) {
  .has-dropdown.open > .dropdown {
    display: flex;
  }
}

/* === Mobilní dropdown (max-width: 600px) === */
@media screen and (max-width: 600px) {
  .has-dropdown {
    position: static;
    width: 100%;
  }

  .nav-dropdown-btn {
    width: 100%;
    text-align: left;
    padding: 6px 16px;
    justify-content: space-between;
  }

  .dropdown {
    position: static;
    box-shadow: none;
    min-width: 0;
    width: 100%;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.25);
    padding: 2px 0;
  }

  .dropdown a {
    padding: 6px 28px;
  }
}
`;

// Injekce CSS do <head> (jednorázově)
function injectDropdownStyles() {
  if (document.getElementById('site-nav-dropdown-css')) return;
  const style = document.createElement('style');
  style.id = 'site-nav-dropdown-css';
  style.textContent = DROPDOWN_CSS;
  document.head.appendChild(style);
}

// Detekce hloubky — jsme v podsložce?
function getNavPrefix() {
  const SUBFOLDERS = ['web', 'network', 'hardware', 'bezpecnost', 'programovani', 'data', 'ai'];
  const parts = window.location.pathname.split('/');
  const currentDir = parts[parts.length - 2] || '';
  return SUBFOLDERS.includes(currentDir) ? '../' : '';
}

// Je tato stránka aktivní?
function isActivePage(href) {
  const pathname = window.location.pathname;
  if (href === 'index.html') {
    return pathname === '/' || pathname.endsWith('/') || pathname.endsWith('/index.html');
  }
  return pathname.endsWith('/' + href);
}

// Definice komponenty site-nav
class SiteNav extends HTMLElement {
  connectedCallback() {
    console.log('Site Navigation component loaded.');
    injectDropdownStyles();

    const prefix = getNavPrefix();

    const items = NAV_MENU.map(entry => {
      // Přímý odkaz (Domů)
      if (entry.href) {
        const active = isActivePage(entry.href);
        return `<li><a href="${prefix}${entry.href}"${active ? ' class="active"' : ''}>${entry.label}</a></li>`;
      }

      // Dropdown skupina
      const anyActive = entry.items && entry.items.some(item => isActivePage(item.href));
      const dropdownItems = entry.items.map(item => {
        const active = isActivePage(item.href);
        return `<li><a href="${prefix}${item.href}"${active ? ' class="active"' : ''}>${item.label}</a></li>`;
      }).join('\n        ');

      return `<li class="has-dropdown">
      <button class="nav-dropdown-btn${anyActive ? ' active' : ''}" type="button" aria-haspopup="true" aria-expanded="false">
        ${entry.label} <span aria-hidden="true">&#9662;</span>
      </button>
      <ul class="dropdown">
        ${dropdownItems}
      </ul>
    </li>`;
    }).join('\n    ');

    this.innerHTML = `<nav class="site-nav no-print">
  <a class="nav-logo" href="${prefix}index.html">&#128218; IT N&#225;vody</a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle">
  <label for="nav-toggle" class="nav-hamburger">&#9776;</label>
  <ul>
    ${items}
  </ul>
  <button class="btn-print" onclick="window.print()">&#128424; Tisk</button>
</nav>`;

    // Click toggle POUZE na dotykových zařízeních (hover: none).
    // Na hover zařízeních (myš) dropdown řídí výhradně CSS :hover — žádný JS toggle.
    const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isHoverDevice) {
      this.querySelectorAll('.nav-dropdown-btn').forEach(btn => {
        btn.addEventListener('click', e => {
          e.stopPropagation();
          const li = btn.closest('.has-dropdown');
          const isOpen = li.classList.contains('open');

          // Zavři všechny ostatní
          this.querySelectorAll('.has-dropdown.open').forEach(el => {
            if (el !== li) {
              el.classList.remove('open');
              el.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
            }
          });

          // Toggle aktuálního
          li.classList.toggle('open', !isOpen);
          btn.setAttribute('aria-expanded', String(!isOpen));
        });
      });

      // Klik mimo nav zavře dropdown
      document.addEventListener('click', () => {
        this.querySelectorAll('.has-dropdown.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Escape zavře všechny dropdowny (desktop i mobil)
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        this.querySelectorAll('.has-dropdown.open').forEach(el => {
          el.classList.remove('open');
          el.querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }
}

customElements.define('site-nav', SiteNav);


// Definice komponenty site-footer
class SiteFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<footer><slot></slot></footer>`;
  }

  connectedCallback() {
    console.log('Site Footer component loaded.');
  }
}

customElements.define('site-footer', SiteFooter);


// Definice komponenty doc-header
class DocHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<header><slot></slot></header>`;
  }

  connectedCallback() {
    console.log('Document Header component loaded.');
  }
}

customElements.define('doc-header', DocHeader);
