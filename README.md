# 🎲 Náhodný Rozvrh Dňa

Webová aplikácia, ktorá vám pomôže vytvoriť náhodný denný plán na základe aktivít, ktoré si nastavíte.

## 📋 Popis

**Náhodný Rozvrh Dňa** je interaktívna webová aplikácia určená pre žiakov a študentov. Aplikácia umožňuje:

- ✅ Pridávanie aktivít s názvom, trvaním a kategóriou
- ✅ Generovanie náhodného denného plánu s automatickými prestávkami
- ✅ Vizuálne znázornenie rozvrhu v podobe farebného timeline
- ✅ Opätovné generovanie nového poradia aktivít
- ✅ Tlač rozvrhu
- ✅ Uloženie aktivít v `localStorage`
- ✅ Plná responzívnosť na všetkých zariadeniach

## 🎯 Hlavné Funkcie

### 1. Pridanie Aktivít
- Zadaj názov aktivity (napr. "Štúdium matematiky")
- Urči trvanie v minútach
- Vyber kategóriu:
  - 📚 **Štúdium**
  - 🏃 **Šport**
  - ☕ **Pauza**
  - 🎮 **Iné**
- Nastav čas začiatku dňa (predvolene 08:00)
- Klikni na "Pridať aktivitu"

### 2. Generovanie Rozvrhu
- Klikni na "🎲 Vygeneruj rozvrh"
- Aplikácia náhodne zamiešajú aktivity
- Automaticky pridajú 10-minútové prestávky po každých 2 aktivitách
- Zobrazí sa vizuálny timeline s farebnými blokmi

### 3. Vizuálne Znázornenie
- Každá aktivita sa zobrazí ako farebný blok
- Farby sú priradené podľa kategórií
- Zobrazuje sa čas začiatku a konca
- Čitateľné a intuitívne rozloženie

### 4. Ďalšie Funkcie
- 🔄 **Znova vygenerovať** - Nové náhodné poradie aktivít
- 🗑️ **Zmazať** - Odstránenie aktivity zo zoznamu
- 🖨️ **Tlačiť rozvrh** - Vytlačenie rozvrhu na papier
- 💾 **localStorage** - Automatické uloženie aktivít

## 📁 Štruktúra Projektu

```
vibe-coding-2.6/
├── index.html                 # Hlavný HTML súbor
├── assets/
│   ├── css/
│   │   └── style.css         # Všetky CSS štýly
│   ├── js/
│   │   └── script.js         # JavaScript kód
│   └── images/               # Priečinok pre obrázky
└── README.md                 # Tento súbor
```

## 🚀 Ako Používať

### Online verzia
Aplikácia je dostupná na GitHub Pages:
[https://srandykopec.github.io/Vibe-coding-2.6/](https://srandykopec.github.io/Vibe-coding-2.6/)

### Lokálne spustenie
1. Klon alebo stiahni repozitár
2. Otvor súbor `index.html` v prehliadači
3. Aplikácia je ihneď pripravená na použitie

## 💻 Technológie

### HTML5
- Sémantická štruktúra
- Formuláre s validáciou
- Media queries pre responzívnosť

### CSS3
- CSS Grid a Flexbox pre rozloženie
- Farebné schémy podľa kategórií
- Responzívny dizajn
- Print media styles
- Animácie a prechody

### JavaScript ES6+
- Manipulácia s DOM
- localStorage API
- Algoritmus náhodného poradia (Fisher-Yates shuffle)
- Výpočty s časom a dátumami
- Event handling

## 📱 Responzívnosť

Aplikácia je optimalizovaná pre:
- **Mobil** (od 375px)
- **Tablet** (od 768px)
- **Desktop** (od 1920px)

Všetky prvky sa správne zobrazujú na všetkých rozlíšeniach a sú plne interaktívne.

## 🎨 Farebná Schéma

| Kategória | Farba | Textová Farba |
|-----------|-------|---------------|
| 📚 Štúdium | Svetlomodrá | Tmavá modrá |
| 🏃 Šport | Svetlozelená | Tmavá zelená |
| ☕ Pauza | Svetlooranžová | Tmavá hnedá |
| 🎮 Iné | Svetlofialová | Tmavá fialová |

## 💾 Dátové Uloženie

Aplikácia automaticky ukladá zoznam aktivít do `localStorage` prehliadača. Dáta sa zachovajú aj po zatvorení aplikácie.

**Ako vymazať uložené dáta:**
1. Otvor aplikáciu
2. Zmaž všetky aktivity cez tlačidlo 🗑️
3. Alebo vymaž localStorage manuálne cez vývojárske nástroje prehliadača

## 🔧 Vlastnosti Algoritmu Rozvrhovania

1. **Náhodné Poriadenie** - Fisher-Yates shuffle algoritmus
2. **Automatické Prestávky** - Každých 2 aktivity sa pridajú 10-minútové prestávky
3. **Výpočet Časov** - Aplikácia automaticky vypočíta časy začiatku a konca
4. **Flex Časy** - Všetky časy sú vypočítané na základe nastaveného začiatku dňa

## 📖 Príklad Použitia

1. **Pridaj aktivity:**
   - Štúdium matematiky (45 minút)
   - Bezpečnosť na internete (30 minút)
   - Telocvik (60 minút)

2. **Nastav čas začiatku:** 08:00

3. **Klikni na "Vygeneruj rozvrh"**

4. **Aplikácia vygeneruje rozvrh:**
   - 08:00 – 08:30: Bezpečnosť na internete
   - 08:30 – 08:40: Prestávka
   - 08:40 – 09:25: Štúdium matematiky
   - 09:25 – 09:35: Prestávka
   - 09:35 – 10:35: Telocvik

## 🐛 Troubleshooting

**Aplikácia nezobrazuje moje aktivity po opätovnom otvorení**
- Skontroluj, či má prehliadač localStorage povolený
- Vymaž cookies a cache

**Timeline sa nezobrazuje**
- Skontroluj, či si hneď po pridaní aktivity klikol na "Vygeneruj rozvrh"
- Musí byť aspoň jedna aktivita

**Tlač rozvrhu vyzerá divne**
- Skús zmeniť orientáciu tlače (landscape)
- Zníž okraje pri tlači

## 📝 Licencia

Projekt je na účely vzdelávania. Voľne použiteľný pre osobnú a študijnú potrebu.

## 👨‍💻 Autor

Vytvorené ako projektová práca v rámci predmetu Vibe Coding.

---

**Verzia:** 1.0  
**Posledná aktualizácia:** 2026-06-08
