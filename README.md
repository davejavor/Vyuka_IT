# IT Návody

Výukové materiály z informatiky pro žáky ZŠ — statický web hostovaný na GitHub Pages.

## Struktura souborů

```
Vyuka_IT/
├── index.html                # Rozcestník (hlavní stránka)
├── html.html                 # Kompletní přehled HTML
├── css.html                  # Kompletní přehled CSS
├── github.html               # Tvorba webových stránek přes GitHub
├── logicka_hradla.html       # Logická hradla — tahák
├── ip_dns.html               # IP adresy a DNS — tahák
├── Microbit - network.html   # Rádiová síť micro:bit
├── navod-sablona.html        # Prázdná šablona pro nové stránky
├── navody-print.css          # Hlavní stylesheet (sdílený všemi stránkami)
├── components.js             # Web Components (navigace, patička, hlavička)
└── favicon.ico
```

## Navigační systém (`components.js`)

Navigace je implementována jako Web Component `<site-nav>` v `components.js` — spravuje se na jednom místě.

### Přidání nové stránky do navigace

1. Přidej záznam do pole `NAV_PAGES` v `components.js`:
   ```js
   { href: "nova-stranka.html", label: "Název v menu" },
   ```
2. Aktivní odkaz se detekuje automaticky podle `window.location.pathname`.

### Použití v HTML souboru

Každá stránka musí obsahovat v `<head>`:
```html
<script src="components.js"></script>
```
A na místě navigace v `<body>`:
```html
<site-nav></site-nav>
```

## Vytvoření nové stránky

1. Zkopíruj šablonu:
   ```bash
   cp navod-sablona.html nova-stranka.html
   ```
2. Uprav `<title>` a `<body class="theme-...">` (dostupná témata: `theme-html`, `theme-css`, `theme-github`)
3. Vyplň obsah
4. Přidej stránku do `NAV_PAGES` v `components.js` (viz výše)

## CSS — přizpůsobení vzhledu

Všechny barvy, fonty a rozměry jsou v CSS proměnných na začátku `navody-print.css`:

```css
:root {
    --color-primary: #2c3e50;
    --color-secondary: #3498db;
    --font-size-base: 14px;
}
```

### Dostupné CSS třídy

| Třída | Použití |
|---|---|
| `.section` | Základní ohraničená sekce |
| `.step` | Krok v návodu |
| `.warning` | Žluté upozornění |
| `.tip` / `.info` | Zelený tip |
| `.no-print` | Skryje se při tisku |
| `.text-center`, `.text-right` | Zarovnání textu |
| `.text-muted` | Šedý text |
| `table.truth-table` | Kompaktní pravdivostní tabulka |
| `ol.steps` | Číslované kroky s čísly v kroužku |

## Tisk

- Tlačítko tisku je součástí navigace (skryje se ve vytištěném dokumentu)
- `<details>` se při tisku automaticky rozbalí
- Sekce se nerozdělují mezi stránky (`page-break-inside: avoid`)
- Doporučený prohlížeč: **Chrome** — v tiskovém dialogu zapni "Barvy a obrázky na pozadí"

## GitHub Pages

Web je dostupný na: `https://davejavor.github.io/Vyuka_IT/`

Nasazení: každý push do větve `main` se automaticky publikuje přes GitHub Pages (Settings → Pages → Source: main branch).

---

Autor: David | ZŠ Archa
Licence: CC BY-SA 4.0
