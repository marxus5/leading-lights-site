# Leading Lights static site

Plain HTML, CSS and JS. No build step. All pages share one stylesheet and one script.

```
index.html  404.html
html/    about-us.html  contact.html  support.html  mobile-mechanics.html
         upholstery-music.html  communication-skills.html  mentorship.html
css/     site.css (shared styles for every page)
js/      site.js (shared navigation, effects, and King Jesus Clothing products)
images/  add og-leading-lights.jpg and logo.png (see images/README.txt)
vercel.json  robots.txt  sitemap.xml  favicon.svg
```

## Deploy on Vercel
- Dashboard: Add New Project, import the repo or drag in this folder. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
- CLI: `npx vercel --prod`

`vercel.json` turns on clean URLs (`/about-us`, `/contact`, `/support`, and the service pages), rewrites those public URLs to the pages in `html/`, adds security headers, and redirects the old Wix pages `/blank` and `/donate` along with the former `/us-in-action` page URL.

## Preview locally
Run `python -m http.server 8000` from this folder, then open `http://localhost:8000/` in your browser. You can also use `npx serve .` or `npx vercel dev`.

The page-to-page links use relative HTML filenames so they also work when opened directly. `index.html` and `404.html` stay at the project root; the other pages are in `html/`. If VS Code shows “Forbidden. File does not reside within a trusted folder,” open this project folder in VS Code and trust the folder, or use the local server URL above instead of opening the HTML file through the editor preview.

The Contact Us form opens a prefilled message in the visitor's email app; it does not submit to a server. A direct email link is also provided as a fallback.

Page content and King Jesus Clothing product cards are present in the HTML, so the site's main content and product links remain available if JavaScript does not load. JavaScript enhances the page with scroll reveals, mobile menu toggling, and prefilled email composition; the contact email link remains available as a fallback.

## Before launch
- King Jesus Clothing product names, images, prices, and referral links are in `html/support.html`
- Add the two images in `images/`; download page photos from Wix into `images/`
- Confirm the contact email and add real social links to the JSON-LD in `index.html`
- Replace the `#` Terms / Privacy / Accessibility links
- Submit `sitemap.xml` in Google Search Console
