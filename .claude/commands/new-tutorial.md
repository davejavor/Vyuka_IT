# Nový tutoriál

Vytvoř nový výukový materiál podle šablony `navod-sablona.html`.

## Vstupní parametry
Zeptej se na:
1. **Název** materiálu
2. **Složka** kam patří (web / network / hardware / bezpecnost / programovani / data / ai)
3. **Název souboru** (kebab-case, bez diakritiky, .html)
4. **Badge text** (krátký label: HTML, CSS, Sítě, Hardware, Bezpečnost...)
5. **Stručný popis** (1 věta pro subtitle)
6. **Osnova** — jaké sekce/kroky má materiál obsahovat

## Postup
1. Zkopíruj `navod-sablona.html` do cílové složky
2. Uprav relativní cesty (`../navody-print.css`, `../components.js`, `../img/favicon.ico`)
3. Vyplň `<title>`, badge, h1, subtitle
4. Vyplň obsah podle osnovy — použij styl psaní z CLAUDE.md
5. Přidej stránku do `NAV_MENU` v `components.js` (do správné kategorie)
6. Přidej kartu do `index.html` (do správné sekce, se správnou CSS třídou barvy)
7. Pokud je kategorie v `NAV_MENU` zakomentovaná, odkomentuj ji
8. Commitni všechny změněné soubory
