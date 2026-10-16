# AI Usage Clock website

Source code for [aiusageclock.com](https://aiusageclock.com), the website of
[AI Usage Clock](https://github.com/AIUsageClock/ai-usage-clock): a small desktop widget that shows the
usage limits of your AI services and picks up Codex and Claude reset announcements.

## Status

Work in progress. The site is built with [Astro](https://astro.build): the home page is in place in seven
languages (English, Traditional Chinese, Simplified Chinese, Japanese, Latin-American Spanish, French and German),
and deployment to GitHub Pages is still to come.

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

## URLs and languages

Every language has its own prefix, and `/` is a small page that sends the visitor to a language:

| URL | Language | `<html lang>` | hreflang | og:locale |
|---|---|---|---|---|
| `/en/` | English | `en` | `en` | `en_US` |
| `/zh-tw/` | Traditional Chinese | `zh-Hant-TW` | `zh-TW` | `zh_TW` |
| `/zh-cn/` | Simplified Chinese | `zh-Hans-CN` | `zh-CN` | `zh_CN` |
| `/ja/` | Japanese | `ja` | `ja` | `ja_JP` |
| `/es/` | Spanish (Latin America, neutral) | `es-419` | `es` | `es_LA` |
| `/fr/` | French | `fr-FR` | `fr` | `fr_FR` |
| `/de/` | German | `de-DE` | `de` | `de_DE` |

The table lives in `src/i18n/locales.ts`; the language menu, the hreflang alternates (every page lists all seven
languages plus `x-default`, which points at `/`), the Astro i18n routing and the link-preview images all read from it.

**Root page (`/`)**: the script on it sends the visitor to the first of these that exists: the language saved by the
language menu (`localStorage` key `aiuc-lang`), then the first entry of the browser's language list that the site can
serve, then English. Chinese is told apart by script and region (`zh-TW`, `zh-HK`, `zh-MO` and `Hant` go to Traditional,
other Chinese to Simplified); every other language is matched by its base subtag, so `es-MX`, `es-ES` and `es-419` all go to
`/es/`, `fr-CA` to `/fr/`, `de-AT` to `/de/`, and a language the site does not have (`pt-BR`) is skipped.
Without JavaScript the page lists a link to each language.

**404 page**: one file for every address, so it explains in English and offers a "back to the home page" link in every
language (each to that language's home page; text from the dictionaries, English where a language has none yet).

## Adding a language

1. Add an entry to `src/i18n/locales.ts` (its position is its position in the language menu).
2. Create a dictionary next to `src/i18n/en.ts` (start from `{}`; any missing text falls back to English) and register
   it in `src/i18n/index.ts`. A page whose dictionary does not cover every English string is served with
   `<html lang="en">` and `noindex` until it does.
3. If the language has no translated guides in the product repository, nothing else is needed: `docLink()` in `src/site.ts`
   links the setup and usage guides to the English files. Add the language's file-name suffix to `DOC_SUFFIX` there once
   translated guides exist.
4. If the language needs its own heading font, import the font as a URL in `BaseLayout.astro`, choose it by `<html lang>`,
   and add the `:lang()` rules (see the Chinese and Japanese sections below).
5. Add the dictionary and, if needed, a font entry to `scripts/render-og.mjs`, then draw the link preview (`npm run og`).
6. `npm run check` and `npm run build`; the new `dist/<code>/index.html` must exist.

`public/apple-touch-icon.png` is the 1024px app icon scaled to 180px; `node scripts/make-apple-touch-icon.mjs`
regenerates it.

## Chinese pages

- Headings use Noto Serif TC on the Traditional page and Noto Serif SC on the Simplified page
  (`@fontsource-variable/noto-serif-tc` and `-sc`, pinned versions). Fraunces stays first in the font stack, so Latin
  letters and digits keep the English look and only Chinese characters and full-width punctuation use Noto Serif.
  Body text uses the system Chinese fonts (PingFang, Microsoft JhengHei or YaHei, Noto Sans).
- Each page links only its own font stylesheet, and the English and European-language pages link none: `BaseLayout.astro` imports the CJK font
  stylesheets as URLs (`?url`) and writes one `<link>` according to `<html lang>`. A plain `import` would be bundled
  into the one stylesheet that all languages share, because they are a single route. The browser then downloads
  only the font chunks that the headings actually use.
- The Chinese typography (no italics, tracking, line height, punctuation) is the "Chinese pages" block in
  `src/styles/global.css` plus a short block at the end of each component that needs one. All of it keys on `:lang(zh)`.
- `docLink()` in `src/site.ts` points the setup and usage links at `docs/setup.zh-TW.md`, `docs/setup.zh-CN.md` and the
  matching usage files. Documents without a translation (MCP guard, security policy) link to the English file.

## Japanese page

- Headings use Noto Serif JP (`@fontsource-variable/noto-serif-jp`, pinned). It is linked the same way as the Chinese fonts:
  `BaseLayout.astro` imports its stylesheet as a URL and writes one `<link>` only when `<html lang>` is `ja`, so no other
  language downloads or declares a Japanese `@font-face`. Fraunces stays first in the stack, so Latin letters and digits keep
  the English look. Body text names the Japanese system fonts after Inter: Hiragino Sans and Hiragino Kaku Gothic ProN, Yu Gothic UI,
  Meiryo, Noto Sans JP.
- The Japanese typography is the "Japanese page" block in `src/styles/global.css` plus a short block at the end of each component
  that needs one, all keyed on `:lang(ja)`: no faux italic (the second hero line is told apart by colour), no negative tracking,
  `line-break: strict`, `word-break: auto-phrase` on headings (a browser without it keeps the default), body line height 1.8,
  and a smaller hero size than English because kana lines are longer.
- Rules inside a component are written as `:global(:root:lang(ja)) .selector`: Astro's scoped selectors carry an attribute per
  compound selector, so only a rule written inside the component outranks them without `!important`.
- Two other mincho fonts (Shippori Mincho, Zen Old Mincho) are set beside Noto Serif JP on the font comparison page, in case the
  heading font should change.

## Spanish, French and German pages

- Nothing extra is downloaded: the Fraunces and Inter files from Fontsource have `latin` and `latin-ext` slices, which cover
  é, ñ, ü, ß, œ, ç and the guillemets « ». The browser fetches a slice only when a page uses a character in its range.
- Body text hyphenates (`hyphens: auto`, for `:lang(es)`, `:lang(fr)`, `:lang(de)`; it needs `<html lang>` to name the language,
  which a fully translated page does). Buttons and labels never hyphenate.
- Headings carry `overflow-wrap: break-word`, so a long German compound word breaks as a last resort instead of pushing the
  page wider than the screen.
- The language list opens under the header on a narrow screen (up to 560px wide) and lines up with the right edge of the page
  content, so it stays inside the window at 320px even with a long "Download" label such as "Herunterladen".

## Link-preview images

Each language has a 1200x630 picture for `og:image` and `twitter:image` (`public/og/<code>.png`, one for every language in
`src/i18n/locales.ts`), and `branding/github-social-preview.png` (1280x640, English) is the repository's social preview. The
`branding/` folder is not served by the site: upload that file by hand under the repository's Settings, "Social preview".

The pictures are committed. Redraw them when the tagline, the brand or the screenshot changes, and whenever a dictionary's
`hero.kicker`, `hero.line1` or `hero.line2` changes (a language whose dictionary has no text yet is drawn in English):

```sh
npm run og                              # every language and the GitHub card
node scripts/render-og.mjs ja fr        # only these languages (and "github" if you name it)
node scripts/render-og.mjs --skip-github  # every language, GitHub card left alone
```

This needs Windows with Microsoft Edge: `scripts/render-og.mjs` writes one HTML page per picture into `_tmp/og/`, prints it to
PNG with headless Edge, checks the size and shrinks the file. Set `EDGE_PATH` if Edge is not in its standard folder.
The text comes from the language dictionaries (`hero.kicker`, `hero.line1`, `hero.line2`), the fonts from `node_modules` (Japanese
uses Noto Serif JP, the Chinese pages Noto Serif TC and SC), and the picture on the right from `src/assets/windows-1.0.0.png`.
The tagline starts at a tuned size and shrinks until each line fits the left column; if it still does not fit at the smallest
size, the lines wrap between words (between phrases in Japanese). Look at the PNGs before committing them: every language in
`locales.ts` needs a dictionary entry in the script, which stops with a message when one is missing.

## Related

- Product repository: https://github.com/AIUsageClock/ai-usage-clock
- Download the app: https://github.com/AIUsageClock/ai-usage-clock/releases/latest

## License

[MIT](LICENSE)
