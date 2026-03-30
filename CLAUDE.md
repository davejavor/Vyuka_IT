# IT Návody — Projektový kontext pro Claude Code

## Co je tento projekt
Statický web na GitHub Pages s výukovými materiály z informatiky pro žáky 7.–9. třídy Montessori ZŠ Archa.
URL: https://davejavor.github.io/Vyuka_IT/

## Struktura repozitáře

```
├── index.html              # Rozcestník — karty seskupené podle kategorií
├── navod-sablona.html      # Šablona pro nové materiály (REFERENČNÍ VZOR)
├── navody-print.css        # Sdílený stylesheet (CSS proměnné, třídy, tisk)
├── components.js           # Web Components — navigace, patička, hlavička
├── CLAUDE.md               # Tento soubor
├── .claude/                # Příkazy a rozšířený kontext
│   └── commands/           # Slash příkazy (/new-tutorial, /add-to-nav, /check-links)
│
├── web/                    # HTML, CSS, GitHub tutoriály
├── network/                # IP, DNS, protokoly, internet
├── hardware/               # Logická hradla, micro:bit, Raspberry Pi, 3D tisk
├── bezpecnost/             # Digitální stopa, metadata, hesla, phishing
├── programovani/           # Scratch, algoritmy (zatím prázdná)
├── data/                   # Binární/hex kódování, tabulky (zatím prázdná)
├── ai/                     # Teachable Machine, ML principy (zatím prázdná)
└── img/                    # Favicony a ikony
```

## Navigační systém

Navigace je implementována jako Web Component `<site-nav>` v `components.js`.
Menu struktura je definována v poli `NAV_MENU` — každá kategorie = dropdown, položky = soubory ve složce.
Prázdné složky jsou v `NAV_MENU` ZAKOMENTOVANÉ (ne smazané).

### Přidání nové stránky:
1. Vytvoř HTML soubor ve správné složce
2. Přidej záznam do `NAV_MENU` v `components.js`
3. Přidej kartu do `index.html` (do správné sekce)

### Cesty v souborech:
- Soubory v kořeni: `navody-print.css`, `components.js`, `img/favicon.ico`
- Soubory ve složkách: `../navody-print.css`, `../components.js`, `../img/favicon.ico`

## HTML konvence pro tutoriály

### Povinná struktura každého tutoriálu:
```html
<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Název | IT Návody</title>
    <link rel="icon" type="image/x-icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../navody-print.css">
    <script src="../components.js"></script>
</head>
<body>
    <site-nav></site-nav>
    <header class="doc-header">
        <span class="badge">KATEGORIE</span>
        <h1>Název materiálu</h1>
        <p class="subtitle">Stručný popis</p>
    </header>
    <!-- obsah -->
    <footer>
        <p>
            Autor: <strong>David</strong> | Montessori ZŠ Archa<br>
            Licence: <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.cs" target="_blank" rel="noopener">CC BY-SA 4.0</a><br>
            <span class="text-small">Můžeš volně sdílet a upravovat s uvedením autora.</span>
        </p>
    </footer>
</body>
</html>
```

### Dostupné CSS třídy (z navody-print.css):
- `.section` — ohraničená sekce
- `.warning` — žluté upozornění (⚠️)
- `.tip` / `.info` — zelený tip (💡)
- `ol.steps` — číslované kroky s kroužky (CSS counter)
- `.two-col` — dvousloupcový layout
- `table.truth-table` — kompaktní pravdivostní tabulka
- `.no-print` — skryje se při tisku
- `.text-center`, `.text-right`, `.text-muted`
- `<details>/<summary>` — rozbalovací sekce (auto-expand při tisku)
- `<pre><code>` — tmavý code block se syntax highlightingem

### Dostupná témata (class na <body>):
`theme-html` | `theme-css` | `theme-github` | (bez třídy = výchozí)

## Barvy karet v index.html

Karty používají CSS třídy (ne inline `--card-color`):
- `card--html`     → `#1a56a0` (web / HTML)
- `card--css`      → `#1a7a3c` (web / CSS)
- `card--github`   → `#8b3a00` (web / GitHub)
- `card--network`  → `#1a6b5a` (sítě)
- `card--hardware` → `#2c3e50` (hardware)
- `card--security` → `#8b2a5c` (bezpečnost)

Pro nové kategorie (programovani, data, ai) přidej novou třídu do `<style>` v `index.html`.

## Styl psaní

- **Jazyk**: čeština
- **Osoba**: první osoba množného čísla ("ukážeme si", "projdeme", "naučíme se")
- **Tón**: stručný, konkrétní, přátelský — bez formálností
- **Příklady**: vždy konkrétní, ne abstraktní
- **Struktura**: krátké odstavce, hodně kódu, vizuální oddělení sekcí

## Tisk

- Tlačítko tisku je v navigaci (skryje se při tisku)
- `<details>` se při tisku automaticky rozbalí
- Sekce se nerozdělují mezi stránky (`page-break-inside: avoid`)
- Layout optimalizovaný pro A5
- Prohlížeč: Chrome — zapnout "Barvy a obrázky na pozadí"

## Důležitá pravidla

- VŽDY použij `navod-sablona.html` jako referenční vzor pro nové materiály
- NIKDY neupravuj `navody-print.css` bez explicitního pokynu
- Po vytvoření nového souboru VŽDY přidej do `NAV_MENU` v `components.js`
- Po vytvoření nového souboru VŽDY přidej kartu do `index.html`
- Relativní cesty: soubory ve složkách používají `../` prefix
- Licence: CC BY-SA 4.0 — patička v každém souboru
