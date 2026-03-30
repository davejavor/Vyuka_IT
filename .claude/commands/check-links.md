# Kontrola odkazů a konzistence

Zkontroluj, že všechny odkazy a cesty v repozitáři jsou konzistentní.

## Kontroly
1. Spusť `grep -rn 'navody-print.css' . --include='*.html'` — ověř správnost cest (kořen vs složky)
2. Spusť `grep -rn 'components.js' . --include='*.html'` — totéž
3. Spusť `grep -rn 'favicon.ico' . --include='*.html'` — totéž
4. Porovnej položky v `NAV_MENU` (components.js) se skutečnými soubory — existují všechny odkazované soubory?
5. Porovnej karty v `index.html` s položkami v `NAV_MENU` — chybí nějaká karta?
6. Zkontroluj, jestli existují HTML soubory ve složkách, které NEJSOU v `NAV_MENU`
7. Vypiš zjištěné nesrovnalosti a nabídni opravu
