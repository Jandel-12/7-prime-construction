# Z PRIME CONSTRUCK Website

A responsive, industrial-style website for Z PRIME CONSTRUCK, a construction support services company (hauling, aggregates, heavy equipment rental, excavation, site preparation, subcontracting).

## 1. Features
- Sticky navigation with mobile hamburger menu and "Get a Quote" button
- Large hero, About, six service cards, Projects/Capabilities, Mission, Vision, Contact, Footer
- Smooth scrolling, active-link highlighting, scroll reveal, back-to-top button
- Quotation form with frontend validation (not connected to a backend yet)
- Honors the "reduce motion" setting; keyboard-focus styles included

## 2. Technologies
HTML5, CSS3 (Flexbox, Grid, variables), vanilla JavaScript (ES6+). No frameworks, no npm, no build tools. Fonts (Barlow, Barlow Condensed) load from Google Fonts if online; offline, fallback fonts are used automatically.

## 3. Folder structure
```
z-prime-construck/
├── index.html
├── README.md
├── css/styles.css
├── js/main.js
└── images/          <- put your photos here (backhoe.jpg, trucks.jpg)
```

## 4. Installation and how to run
**Nothing to install.** Download or copy the folder, then double-click `index.html`. It opens in your browser. To edit, use any text editor (VS Code, Notepad++, etc.) and refresh the browser after saving.

## 5. Replace the photographs
1. Copy your backhoe photo into `images/` and name it `backhoe.jpg`.
2. Copy your trucks photo into `images/` and name it `trucks.jpg`.
3. Refresh the page.

To use different file names or formats (e.g. `.png`), edit the `src` in `index.html`:
```html
<img src="images/backhoe.jpg" alt="Z PRIME CONSTRUCK backhoe on site">
```
Keep the `alt` text meaningful. Landscape photos (4:3 or 3:2), under about 500 KB each, load fastest. Until the files exist, a yellow label shows where each photo goes.

## 6. Change company details and services
- **Contact details:** in `index.html`, search for `[Add` and replace each placeholder (phone, email, address, Facebook link). They appear in the Contact section and in the footer.
- **Services:** each service is one `<article class="card reveal">` block. Edit the number, `<h3>` title and `<p>` text. Copy a whole block to add another service.
- **Service dropdown in the form:** edit the `<option>` list inside `<select id="service">`.
- **Mission/Vision/About text:** edit the paragraphs inside their `<section>` elements.

## 7. Change colors and styling
Open `css/styles.css`. The top `:root { ... }` block holds colors, fonts, max width and header height. Change `--yellow` once and it updates everywhere.

## 8. How the JavaScript works (`js/main.js`)
Each numbered comment in the file is one feature:
1. **Mobile nav:** the hamburger button toggles the `open` class on the menu and updates `aria-expanded`.
2. **Smooth scroll:** done in CSS with `scroll-behavior: smooth`.
3. **Active link:** an `IntersectionObserver` watches sections and highlights the matching nav link.
4. **Scroll reveal:** cards start hidden (`.reveal`) and get `.visible` when scrolled into view.
5. **Missing photos:** if an image fails to load, its frame shows a "Add images/..." label.
6. **Back to top:** a button appears after scrolling 600px.
7. **Footer year:** set automatically.
8. **Form validation:** each field has a rule in the `rules` object. Errors show under the field.

## 9. Configure the quotation form
Right now the form **validates only. It does not send or save anything**, and tells the visitor so. Options when you are ready:
- **Form service (easiest, free tiers exist):** Formspree, Web3Forms or Getform give you a URL. In `main.js`, replace the placeholder section with:
  ```js
  fetch("YOUR_FORM_ENDPOINT_URL", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(data)
  }).then(res => {
    status.textContent = res.ok ? "Thank you. We received your request." : "Something went wrong. Please call us instead.";
  }).catch(() => { status.textContent = "Network error. Please call us instead."; });
  ```
  Only show a success message when `res.ok` is true.
- **Your own backend:** since you know JavaScript and MongoDB, build a small Node.js/Express API with a `POST /quotes` route that saves to MongoDB, and point the `fetch` URL to it. Never put database credentials in front-end code.

## 10. Deploy with GitHub Pages
1. Create a GitHub account and a new public repository (e.g. `z-prime-construck`).
2. Upload everything inside the project folder so `index.html` is at the repository root.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute or two, your site appears at `https://YOUR-USERNAME.github.io/z-prime-construck/`.
5. To update, upload changed files again and commit.

## 11. Troubleshooting
- **Photos show a yellow label:** file names must match exactly (`backhoe.jpg`, `trucks.jpg`), including lowercase and extension.
- **Page has no styling:** keep the `css/`, `js/` and `images/` folders next to `index.html`.
- **Fonts look different offline:** expected; fallback fonts are used without internet.
- **Menu or form does nothing:** press F12, open the Console tab and check for errors. Make sure `js/main.js` is present.
- **Changes don't appear:** hard refresh with Ctrl+Shift+R (Cmd+Shift+R on Mac).
- **GitHub Pages shows 404:** confirm `index.html` is in the repository root and Pages is set to the `main` branch.
