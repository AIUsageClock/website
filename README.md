# AI Usage Clock website

Source code for [aiusageclock.com](https://aiusageclock.com), the website of
[AI Usage Clock](https://github.com/AIUsageClock/ai-usage-clock): a small desktop widget that shows the
usage limits of your AI services and picks up Codex and Claude reset announcements.

## Status

Work in progress. The site is built with [Astro](https://astro.build): the home page is in place in English,
Traditional Chinese and Simplified Chinese, and deployment to GitHub Pages is still to come.

## Development

Requires Node.js 22.22 or newer.

```sh
npm ci            # install the exact versions from package-lock.json
npm run dev       # dev server with live reload
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run check     # type-check the Astro and TypeScript sources
npm run og        # redraw the link-preview images (Windows with Microsoft Edge only, see below)
```

URLs: every language has its own prefix (`/en/`, `/zh-tw/`, `/zh-cn/`), and `/` is a small page that sends the
visitor to a saved or browser-matched language.

Adding a language: add an entry to `src/i18n/locales.ts`, create a dictionary next to `src/i18n/en.ts`
(start from `{}`; any missing text falls back to English) and register it in `src/i18n/index.ts`. A page whose
dictionary does not cover every English string is served with `<html lang="en">` and `noindex` until it does.

`public/apple-touch-icon.png` is the 1024px app icon scaled to 180px; `node scripts/make-apple-touch-icon.mjs`
regenerates it.

## Chinese pages

- Headings use Noto Serif TC on the Traditional page and Noto Serif SC on the Simplified page
  (`@fontsource-variable/noto-serif-tc` and `-sc`, pinned versions). Fraunces stays first in the font stack, so Latin
  letters and digits keep the English look and only Chinese characters and full-width punctuation use Noto Serif.
  Body text uses the system Chinese fonts (PingFang, Microsoft JhengHei or YaHei, Noto Sans).
- Each page links only its own font stylesheet, and the English page links none: `BaseLayout.astro` imports the two
  stylesheets as URLs (`?url`) and writes one `<link>` according to `<html lang>`. A plain `import` would be bundled
  into the one stylesheet that all three languages share, because they are a single route. The browser then downloads
  only the font chunks that the headings actually use.
- The Chinese typography (no italics, tracking, line height, punctuation) is the "Chinese pages" block in
  `src/styles/global.css` plus a short block at the end of each component that needs one. All of it keys on `:lang(zh)`.
- `docLink()` in `src/site.ts` points the setup and usage links at `docs/setup.zh-TW.md`, `docs/setup.zh-CN.md` and the
  matching usage files. Documents without a translation (MCP guard, security policy) link to the English file.

## Link-preview images

Each language has a 1200x630 picture for `og:image` and `twitter:image` (`public/og/en.png`, `zh-tw.png`, `zh-cn.png`),
and `branding/github-social-preview.png` (1280x640, English) is the repository's social preview. The `branding/` folder
is not served by the site: upload that file by hand under the repository's Settings, "Social preview".

The pictures are committed. Redraw them when the tagline, the brand or the screenshot changes:

```sh
npm run og
```

This needs Windows with Microsoft Edge: `scripts/render-og.mjs` writes one HTML page per picture into `_tmp/og/`, prints it to
PNG with headless Edge, checks the size and shrinks the file. Set `EDGE_PATH` if Edge is not in its standard folder.
The text comes from the language dictionaries (`hero.kicker`, `hero.line1`, `hero.line2`), the fonts from `node_modules`,
and the picture on the right from `src/assets/windows-1.0.0.png`. Look at the four PNGs before committing them.

## Related

- Product repository: https://github.com/AIUsageClock/ai-usage-clock
- Download the app: https://github.com/AIUsageClock/ai-usage-clock/releases/latest

## License

[MIT](LICENSE)
