# IT Návody

Výukové materiály z informatiky pro žáky 7.–9. třídy Montessori ZŠ Archa — statický web hostovaný na GitHub Pages.

**URL:** https://davejavor.github.io/Vyuka_IT/

## Struktura repozitáře

```
Vyuka_IT/
├── index.html              # Rozcestník — karty seskupené podle kategorií
├── navod-sablona.html      # Šablona pro nové materiály
├── navody-print.css        # Sdílený stylesheet
├── components.js           # Web Components — navigace
│
├── web/
│   ├── html.html           # Přehled HTML
│   ├── css.html            # Přehled CSS
│   └── github.html         # Tvorba webu přes GitHub
│
├── network/
│   └── ip_dns.html         # IP adresy a DNS
│
├── hardware/
│   ├── logicka_hradla.html # Logická hradla
│   └── microbit-net.html   # Rádiová síť micro:bit
│
├── bezpecnost/
│   └── digitalni-stopa.html # Digitální stopa a metadata
│
└── img/
    └── favicon.ico
```

## Navigace

Navigace je Web Component `<site-nav>` definovaná v `components.js`. Menu se spravuje v poli `NAV_MENU` — každá kategorie je dropdown, prázdné kategorie jsou zakomentované.

## Vytvoření nové stránky

1. Zkopíruj `navod-sablona.html` do příslušné složky
2. Uprav relativní cesty (`../navody-print.css`, `../components.js`, `../img/favicon.ico`)
3. Přidej záznam do `NAV_MENU` v `components.js`
4. Přidej kartu do `index.html`

Viz `.claude/commands/new-tutorial.md` pro podrobný postup.

## Tisk

- Optimalizováno pro A5, doporučený prohlížeč Chrome
- Zapnout "Barvy a obrázky na pozadí" v tiskovém dialogu

---

Autor: David | Montessori ZŠ Archa | Licence: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.cs)
