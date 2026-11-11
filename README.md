# Tune Street — Pure HTML / CSS / JavaScript

Standalone version of the Tune Street demo (catalog + virtual garage + cart).

**No build tools, no Node, no React.** Just open the file in a browser or VS Code.

## How to run in VS Code

1. Open the `tune-street-html` folder in VS Code.
2. Right-click `index.html` → **Open with Live Server** (if you have the Live Server extension),  
   **or** simply open `index.html` in your browser (double-click or drag into Chrome/Firefox/Edge).

That’s it.

## What’s included

- **Home** — featured cars and popular parts
- **Catalog** — 16 branded parts with category filters (Wheels, Aero, Performance, Interior)
- **Virtual Garage** — pick car (R34 / Supra MK4 / RX-7), paint color, wheels, body kit, wing; live preview and running build price
- **Cart** — add parts or full builds, remove items, demo checkout

## Files

```
tune-street-html/
├── index.html
├── css/styles.css
├── js/data.js      ← cars, paints, wheels, kits, catalog parts
├── js/app.js       ← navigation, cart, garage logic
└── README.md
```

All code is plain HTML, CSS, and vanilla JavaScript.
