// Defining the site-nav component
class SiteNav extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `<nav><slot></slot></nav>`;  // Slot for content
    }

    connectedCallback() {
        console.log('Site Navigation component loaded.');
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