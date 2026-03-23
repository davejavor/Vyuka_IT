const NAV_PAGES = [
  { href: "index.html",          label: "Hlavní stránka" },
  { href: "html.html",           label: "HTML" },
  { href: "css.html",            label: "CSS" },
  { href: "github.html",         label: "GitHub" },
  { href: "logicka_hradla.html", label: "Logická hradla" },
  { href: "ip_dns.html",         label: "IP adresy a DNS"},
  { href: "microbit-net.html",    label: "Micro:bit Network"},
];

// Defining the site-nav component
class SiteNav extends HTMLElement {
    connectedCallback() {
        console.log('Site Navigation component loaded.');

        const pathname = window.location.pathname;

        const links = NAV_PAGES.map(page => {
            const isActive =
                page.href === "index.html"
                    ? pathname === "/" || pathname.endsWith("/index.html") || pathname.endsWith("/")
                    : pathname.endsWith(page.href);
            return `<li><a href="${page.href}"${isActive ? ' class="active"' : ''}>${page.label}</a></li>`;
        }).join('\n    ');

        this.innerHTML = `<nav class="site-nav no-print">
  <a class="nav-logo" href="index.html">&#128218; IT N&#225;vody</a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle">
  <label for="nav-toggle" class="nav-hamburger">&#9776;</label>
  <ul>
    ${links}
  </ul>
  <button class="btn-print" onclick="window.print()">&#128424; Tisk</button>
</nav>`;
    }
}

// Registering the custom element
customElements.define('site-nav', SiteNav);


// Defining the site-footer component
class SiteFooter extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<footer><slot></slot></footer>`;  // Slot for content
    }

    connectedCallback() {
        console.log('Site Footer component loaded.');
    }
}

// Registering the custom element
customElements.define('site-footer', SiteFooter);


// Defining the doc-header component
class DocHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<header><slot></slot></header>`;  // Slot for content
    }

    connectedCallback() {
        console.log('Document Header component loaded.');
    }
}

// Registering the custom element
customElements.define('doc-header', DocHeader);
