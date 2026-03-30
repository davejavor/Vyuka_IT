# Přidání stránky do navigace

Přidej existující HTML soubor do navigačního menu a rozcestníku.

## Vstupní parametry
Zeptej se na:
1. **Cesta k souboru** (např. `hardware/novy-soubor.html`)
2. **Label v menu** (text zobrazený v dropdown)
3. **Label na kartě** (badge text pro index.html)
4. **Popis** (krátký text pro kartu v index.html)

## Postup
1. Přidej záznam do správné kategorie v `NAV_MENU` v `components.js`
2. Pokud je kategorie zakomentovaná, odkomentuj ji
3. Přidej kartu do správné sekce v `index.html`
4. Zvol CSS třídu barvy karty podle kategorie:
   - web/html:    `card--html`     (#1a56a0)
   - web/css:     `card--css`      (#1a7a3c)
   - web/github:  `card--github`   (#8b3a00)
   - network:     `card--network`  (#1a6b5a)
   - hardware:    `card--hardware` (#2c3e50)
   - bezpecnost:  `card--security` (#8b2a5c)
   - programovani / data / ai: přidej novou třídu do `<style>` v index.html
5. Commitni `components.js` a `index.html`
