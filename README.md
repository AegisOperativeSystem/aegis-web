# Aegis OS website

Public site for [Aegis OS](https://github.com/AegisOperativeSystem/aegis-os): product pages, wiki, and the ISO download list.

```bash
npm install
npm run dev
```

`npm run build` typechecks the project and writes a static site. On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` becomes the canonical origin. Set `SITE` when you build somewhere else.

The download page reads ISO assets from the `aegis-os` GitHub releases at build time and again in the browser.
