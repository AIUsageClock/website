# AI Usage Clock website

Source code for [aiusageclock.com](https://aiusageclock.com), the website of
[AI Usage Clock](https://github.com/AIUsageClock/ai-usage-clock): a small desktop widget that shows the
usage limits of your AI services and picks up Codex and Claude reset announcements.

## Status

Work in progress. The site is built with [Astro](https://astro.build): the English home page is in place,
the Traditional and Simplified Chinese pages are served with English text until their translations land, and
deployment to GitHub Pages is still to come.

## Development

Requires Node.js 22.22 or newer.

```sh
npm ci            # install the exact versions from package-lock.json
npm run dev       # dev server with live reload
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run check     # type-check the Astro and TypeScript sources
```

URLs: every language has its own prefix (`/en/`, `/zh-tw/`, `/zh-cn/`), and `/` is a small page that sends the
visitor to a saved or browser-matched language.

Adding a language: add an entry to `src/i18n/locales.ts`, create a dictionary next to `src/i18n/en.ts`
(start from `{}`; any missing text falls back to English) and register it in `src/i18n/index.ts`. A page whose
dictionary does not cover every English string is served with `<html lang="en">` and `noindex` until it does.

`public/apple-touch-icon.png` is the 1024px app icon scaled to 180px; `node scripts/make-apple-touch-icon.mjs`
regenerates it.

## Related

- Product repository: https://github.com/AIUsageClock/ai-usage-clock
- Download the app: https://github.com/AIUsageClock/ai-usage-clock/releases/latest

## License

[MIT](LICENSE)
