# Mandara — Website

A fast, SEO-friendly, single-page website for **Mandara** (Thrissur, Kerala) —
stone-ground rice powders and cooking podis sourced directly from Kerala
farmers, ordered straight over WhatsApp.

Open `index.html` in a browser to preview it right now (it already works,
just with broken-image placeholders until you drop your photos in).

---

## 1. Add your images

Nothing to code — just save your photos with these **exact filenames**
into the `images/` folder (and its `products/` and `recipes/` subfolders)
and they'll appear automatically.

| Filename | Used for | Suggested size | Orientation |
|---|---|---|---|
| `images/hero-farm-field.jpg` | Hero background | 1920×1080 or larger | Landscape |
| `images/hero-powder-bowl.jpg` | Small floating photo over the hero | 800×800 | Square |
| `images/story-farmer-portrait.jpg` | "Our Story" section | 900×1125 | Portrait |
| `images/products/rice-powder.jpg` | Product card | 800×800 | Square |
| `images/products/turmeric-powder.jpg` | Product card | 800×800 | Square |
| `images/products/red-rice-powder.jpg` | Product card | 800×800 | Square |
| `images/products/chilli-powder.jpg` | Product card | 800×800 | Square |
| `images/products/coriander-powder.jpg` | Product card | 800×800 | Square |
| `images/products/ragi-powder.jpg` | Product card | 800×800 | Square |
| `images/delivery-kerala-bg.jpg` | "Delivery across Kerala" background | 1920×1200 | Landscape |
| `images/recipes/puttu.jpg` | Recipe grid (large tile) | 800×1000 | Portrait |
| `images/recipes/kanji.jpg` | Recipe grid | 800×600 | Landscape |
| `images/recipes/payasam.jpg` | Recipe grid | 800×600 | Landscape |
| `images/recipes/dosa.jpg` | Recipe grid | 800×600 | Landscape |
| `images/recipes/idiyappam.jpg` | Recipe grid | 800×600 | Landscape |
| `images/recipes/pathiri.jpg` | Recipe grid | 800×600 | Landscape |
| `images/cta-sunset-farmer.jpg` | Final "Thank You" banner | 1920×1200 | Landscape |
| `images/og-share-image.jpg` | Link preview on WhatsApp/Facebook/Google | 1200×630 (exact) | Landscape |

`images/favicon.svg` is already included (a small Mandara flower mark) —
replace it only if you want a different icon.

All images compress well as JPG at ~75–80% quality. Keep each file
under ~300KB where possible for fast loading.

---

## 2. Update these before going live

- **Domain** — the site currently uses `https://www.mandarakerala.com/` as
  a placeholder in the `<title>`, meta tags, JSON-LD, `sitemap.xml` and
  `robots.txt`. Once you register your real domain, find-and-replace
  `mandarakerala.com` across all files.
- **WhatsApp number** — every "Order on WhatsApp" button, the floating
  button, and the order form all point to `+91 8590801848`. This lives in
  one place: `WHATSAPP_NUMBER` at the top of `js/main.js`.
- **Email / social links** — `hello@mandarakerala.com` and the
  Instagram/Facebook/YouTube links in the footer are placeholders — update
  them in `index.html` (search for `mandarakerala`).
- **Stats** (30+ farmers, 14 districts, etc.) and the **3 testimonials**
  are realistic placeholders — swap in your real numbers and real customer
  quotes before launch, both for accuracy and for trust with visitors.
- **Business address** — the JSON-LD `LocalBusiness` block currently only
  has `Thrissur, Kerala, IN`. Add your exact street address/pincode there
  for better local SEO (Google Maps, "near me" searches).

---

## 3. How the fast-loading product slider works

You asked for the product section (lots of images) to only load after the
hero has finished loading — here's exactly what was done:

1. The product **markup, names, and descriptions are in the raw HTML** from
   the very first byte — so Google (and any visitor with JS disabled) can
   still read every product immediately. This matters for SEO: content
   hidden until JS runs is a common ranking mistake, so it was avoided.
2. The product **photos** are the only thing deferred. Each product image
   starts as a tiny inline placeholder and only gets its real `src` set
   once `js/main.js` sees the whole page — including the hero — has
   finished loading (`window.load`, nudged onto the browser's idle time
   via `requestIdleCallback`).
3. Every image below the hero also carries the browser-native
   `loading="lazy"` attribute, so even after that swap, images only
   download as the visitor actually scrolls near them.
4. The hero image is the opposite: it's marked `fetchpriority="high"` and
   preloaded in `<head>`, so it's the very first thing the browser fetches.
5. The slider itself is plain CSS scroll-snap (no heavy carousel library),
   so it stays light and works with touch swipe out of the box.

A short skeleton/shimmer placeholder shows in the product section until
the real cards are ready, so the layout never jumps around.

---

## 4. SEO checklist already handled

- Unique `<title>` and meta description, Open Graph + Twitter Card tags
- `rel="canonical"`
- `robots.txt` + `sitemap.xml`
- Structured data (JSON-LD): `LocalBusiness`, `WebSite`, `FAQPage`, and an
  `ItemList` of all 6 products — this makes you eligible for FAQ rich
  results and helps Google understand the business type and location
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`, `footer`)
  with one `<h1>` and a logical heading hierarchy
- Descriptive `alt` text on every image (also helps Google Images traffic)
- `width`/`height` on every image to prevent layout shift (good Core Web
  Vitals / CLS score)
- Mobile-first, fully responsive layout (tested down to ~360px wide)

### Still worth doing once the site is live
- Add the real business address to the JSON-LD for local search
- Submit `sitemap.xml` in [Google Search Console](https://search.google.com/search-console)
- Once you unzip the actual product photos, run them through a compressor
  (e.g. TinyPNG/Squoosh) if any file is over ~300KB
- Consider a blog/FAQ page later for long-tail keywords like
  "buy rice powder online Kerala"

---

## 5. Deploying

This is a plain static site — no build step, no server required. Any of
these work:

- **Netlify / Vercel**: drag-and-drop the whole `mandara-website` folder
- **GitHub Pages**: push the folder to a repo, enable Pages
- **Any shared hosting (cPanel, etc.)**: upload the contents of this
  folder into `public_html`

Just make sure `index.html`, `css/`, `js/`, `images/`, `robots.txt` and
`sitemap.xml` all stay in the same relative structure.

---

## File structure

```
mandara-website/
├── index.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    ├── favicon.svg          (included)
    ├── hero-farm-field.jpg
    ├── hero-powder-bowl.jpg
    ├── story-farmer-portrait.jpg
    ├── delivery-kerala-bg.jpg
    ├── cta-sunset-farmer.jpg
    ├── og-share-image.jpg
    ├── products/
    │   ├── rice-powder.jpg
    │   ├── turmeric-powder.jpg
    │   ├── red-rice-powder.jpg
    │   ├── chilli-powder.jpg
    │   ├── coriander-powder.jpg
    │   └── ragi-powder.jpg
    └── recipes/
        ├── puttu.jpg
        ├── kanji.jpg
        ├── payasam.jpg
        ├── dosa.jpg
        ├── idiyappam.jpg
        └── pathiri.jpg
```
