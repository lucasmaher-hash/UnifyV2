# Unify — Project Rebuild / Reopen Guide

This project is a static, multi-page website prototype for a mobile-style app experience. It is not a framework app (React, Vue, Next, etc.) and it does not require a build step.

If you close the project and reopen it later, you can reconstruct the app by opening the files in the web folder and serving them locally in a browser.

---

## What this project is

Unify contains four main screens:
- Home / landing screen
- Stundenplan / calendar + socials view
- Map with zoom, pan, floor toggle, and bottom sheet
- Settings screens (main, account, friends, preferences)

Everything is implemented as plain HTML, CSS, and JavaScript.

---

## Project structure

- [web/index.html](web/index.html) — home page / landing screen
- [web/stundenplan.html](web/stundenplan.html) — timetable and socials experience
- [web/map.html](web/map.html) — interactive map screen
- [web/settings.html](web/settings.html) — settings overview
- [web/settings-account.html](web/settings-account.html) — account screen
- [web/settings-friends.html](web/settings-friends.html) — friends screen
- [web/settings-preferences.html](web/settings-preferences.html) — preferences screen
- [web/styles.css](web/styles.css) — shared design tokens and base layout
- [web/stundenplan.css](web/stundenplan.css) — timetable/socials styling
- [web/map.css](web/map.css) — map-specific styling
- [web/assets](web/assets) — SVGs, PNGs, JPGs, and other visual assets

---

## How to reopen / reconstruct the app

### Option 1: Open directly in a browser
You can open the main page directly:
- Open [web/index.html](web/index.html) in a browser

This is the simplest option, but a local server is slightly safer for consistent asset loading.

### Option 2: Serve the site locally (recommended)
From the project root, run:

```bash
cd web
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

You can also use VS Code Live Server if preferred.

---

## Important notes for reconstruction

### 1. Keep the folder structure intact
The HTML files use relative paths such as:
- styles.css
- stundenplan.css
- map.css
- assets/...

If you move files around, the site may break unless the paths are updated.

### 2. Do not remove or rename the assets folder
The pages depend on the files in [web/assets](web/assets). That folder contains the SVGs, images, icons, posters, and figur assets used by the interface. Poster images used on the home page "socials" panel are a mix of pre-cropped circular PNGs (`poster_1.png`) and plain rectangular JPGs that get masked into circles purely with CSS (`border-radius:50%; object-fit:cover`) — no image editing needed to add a new one, just add an `<img class="poster">` and size it to match the others.

### 3. This is a static prototype
There is:
- no backend
- no database
- no login system
- no saved user state

If you close and reopen the project, the app will simply render from the static files again.

### 4. External fonts are used
The pages load Nunito from Google Fonts. A network connection is needed for the intended typography to appear correctly.

### 5. Interactions are powered by embedded JavaScript
The interactive behavior is mostly implemented directly inside the HTML files:
- home page typing animation and card expansion
- home page "connect now" friends and "socials" posters drift/pan gently and pulse in size on an infinite CSS animation loop (see `.friend`/`.poster` + `@keyframes drift-*` in styles.css)
- timetable week switching and tab switching
- map zoom/pan and floor selection
- map friend markers are generated from a JS `friends` data array (one entry per floor) and auto-cluster into grouped badges when zoomed out
- settings toggle behavior

If a page looks broken, check whether the linked CSS file and assets folder are still present in the same relative location.

---

## Quick recovery checklist

When reopening the project, make sure these items still exist:

- [web/index.html](web/index.html)
- [web/stundenplan.html](web/stundenplan.html)
- [web/map.html](web/map.html)
- [web/settings.html](web/settings.html)
- [web/settings-account.html](web/settings-account.html)
- [web/settings-friends.html](web/settings-friends.html)
- [web/settings-preferences.html](web/settings-preferences.html)
- [web/styles.css](web/styles.css)
- [web/stundenplan.css](web/stundenplan.css)
- [web/map.css](web/map.css)
- [web/assets](web/assets)

---

## If you want to edit the project

The main places to edit are:
- [web/index.html](web/index.html) for the home screen structure and inline scripts
- [web/stundenplan.html](web/stundenplan.html) for timetable/socials content
- [web/map.html](web/map.html) for map content and interactions
- [web/settings.html](web/settings.html) and the settings subpages for profile/settings UI
- [web/styles.css](web/styles.css) for shared colors, layout, and base phone shell styling
- [web/stundenplan.css](web/stundenplan.css) and [web/map.css](web/map.css) for page-specific styling

---

## Short version

To rebuild or reopen this app:
1. Keep the entire project folder intact.
2. Open [web/index.html](web/index.html) or serve the web folder locally.
3. Preserve the [web/assets](web/assets) folder and all HTML/CSS files.
4. Use a browser with internet access for the external fonts.
