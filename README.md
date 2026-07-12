# Raveen Ratheesh — Developer Portfolio

A dark-themed, glassmorphism developer portfolio built with **vanilla HTML, CSS, and
JavaScript** (no frameworks, no build step). Generated from `Resume_raveen.docx` —
every fact on the page comes from that resume; anything not present on it is marked
with a clearly-labeled **placeholder** (see below).

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/     (empty — add your profile photo here)
│   ├── icons/       (empty — social icons are inline SVG, so this is free for extras)
│   └── resume.pdf   (auto-converted from your uploaded .docx — already working)
└── README.md
```

## What's a placeholder vs. real data

Everything in Hero, About, Skills, Experience, Projects, Education, Certifications, and
Contact is pulled directly from your resume. Two things were **not** on the resume and
are marked in-page with a small amber "placeholder" note so you can spot and fix them:

1. **Soft skills** — not listed on the resume. Add them in the About section
   (`about-facts`) and optionally in the last Skills card.
2. **Profile photo** — the resume had no photo, so the Hero uses a terminal/code
   visual instead. See below to add a real photo if you want one.
3. **Live demo links** — your two projects don't have live URLs on the resume, so
   each project shows a disabled "Live Demo — Coming Soon" button next to a working
   GitHub button.

## Replacing the profile picture

The design currently uses an animated terminal window in the Hero instead of a photo
(since none was in the resume). To swap in a real photo:

1. Add your image to `assets/images/`, e.g. `assets/images/profile.jpg`.
2. In `index.html`, find the `<div class="hero-visual reveal" ...>` block and replace
   the `.terminal` markup with:
   ```html
   <img src="assets/images/profile.jpg" alt="Raveen Ratheesh" class="hero-photo" />
   ```
3. Add matching CSS in `css/style.css` (e.g. `border-radius`, `object-fit: cover`,
   and reuse the existing `.glass` box-shadow for consistency).

## Replacing the resume

`assets/resume.pdf` was auto-generated from your uploaded `Resume_raveen.docx`, and
both the nav bar's "Resume" button and the Hero's "Download Resume" button already
point to it and work out of the box. To update it later, just replace
`assets/resume.pdf` with a new export (Word → "Save As PDF") — the filename must stay
`resume.pdf`, or you'll need to update the two `href="assets/resume.pdf"` links in
`index.html`.

## Connecting the contact form

The contact form validates input in the browser but doesn't send anywhere yet (there's
no backend). To make it functional, pick one:

- **Formspree** (easiest): create a form at formspree.io, then change the `<form>` tag
  to `<form action="https://formspree.io/f/yourFormId" method="POST">` and remove the
  `e.preventDefault()` block in `js/script.js`'s submit handler (or adapt it to `fetch()`
  the endpoint and show your own success message).
- **EmailJS**: include their SDK, then call `emailjs.send()` inside the existing submit
  handler instead of the placeholder status message.
- **Your own backend**: point the fetch call at your API route.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `raveen-portfolio`).
2. Push this folder's contents to the repo root:
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/wolfshake/raveen-portfolio.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Source → Deploy from a branch → `main` / `/root`**.
4. Your site will be live at `https://wolfshake.github.io/raveen-portfolio/` within a
   couple of minutes.

No build step, bundler, or `node_modules` is required — GitHub Pages serves the static
files directly.

## Design notes

- **Palette**: deep navy background (`#060810`) with a purple → blue gradient
  (`#8b5cf6 → #3b82f6`) and a cyan accent (`#22d3ee`) for interactive highlights.
- **Type**: Space Grotesk (headings), Inter (body copy), JetBrains Mono (labels, tags,
  the terminal window) — loaded from Google Fonts.
- **Signature element**: the Hero's terminal window (`whoami` / `stack --list`) stands
  in for a headshot and reinforces the developer identity without inventing a bio photo.
- All animations respect `prefers-reduced-motion`.
