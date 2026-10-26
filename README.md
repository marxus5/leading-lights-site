# Leading Lights static site

Plain HTML, CSS and JS. No build step. All pages share one stylesheet and one script.

```
index.html  support.html  us-in-action.html  404.html
css/     site.css (shared styles for every page)
js/      site.js (shared navigation, effects, and King Jesus Clothing products)
images/  add og-leading-lights.jpg and logo.png (see images/README.txt)
vercel.json  robots.txt  sitemap.xml  favicon.svg
```

## Deploy on Vercel
- Dashboard: Add New Project, import the repo or drag in this folder. Framework Preset: **Other**. Leave Build Command and Output Directory empty.
- CLI: `npx vercel --prod`

`vercel.json` turns on clean URLs (`/support`, `/us-in-action`), adds security headers, and redirects the old Wix pages `/blank` and `/donate`. Check the old site for any other URLs worth redirecting.

## Preview locally
Run `python -m http.server 8000` from this folder, then open `http://localhost:8000/` in your browser. You can also use `npx serve .` or `npx vercel dev`.

The page-to-page links use relative HTML filenames so they also work when opened directly. If VS Code shows “Forbidden. File does not reside within a trusted folder,” open this project folder in VS Code and trust the folder, or use the local server URL above instead of opening the HTML file through the editor preview.

## Before launch
- Fill in the King Jesus Clothing products and affiliate suffix near the top of `js/site.js`
- Add the two images in `images/`; download page photos from Wix into `images/`
- Confirm the contact email and add real social links to the JSON-LD in `index.html`
- Replace the `#` Terms / Privacy / Accessibility links
- Submit `sitemap.xml` in Google Search Console
