# AI Usage Clock website

Source code for [aiusageclock.com](https://aiusageclock.com), the website of
[AI Usage Clock](https://github.com/AIUsageClock/ai-usage-clock): a small desktop widget that shows the
usage limits of your AI services and picks up Codex and Claude reset announcements.

## Status

Work in progress. The site is built with [Astro](https://astro.build): the home page is in place in seven
languages (English, Traditional Chinese, Simplified Chinese, Japanese, Latin-American Spanish, French and German),
and every push to `main` is built and published to GitHub Pages (see [Deployment](#deployment)).

## Development

Requires Node.js 22.22 or newer.

```sh
npm ci            # install the exact versions from package-lock.json
npm run dev       # dev server with live reload
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
npm run check     # type-check the Astro and TypeScript sources
npm run test:html # test the markup rules for the `...Html` dictionary strings (no dependencies; exits 1 on a failure)
npm run og        # redraw the link-preview images (Windows with Microsoft Edge only, see below)
```

## Deployment

The site is published with GitHub Pages at <https://aiusageclock.com/> by `.github/workflows/deploy.yml`. Every push to `main`
runs it, and it can also be started by hand from the repository's Actions tab.

- **Build, then deploy.** The build job runs `npm ci`, `npm run check`, `npm run test:html` and `npm run build`, then uploads
  `dist/` as the Pages artifact. The deploy job runs only if all of that succeeded, so a broken build never replaces the live site.
- **Pages source.** The repository's Pages settings (Settings, Pages, Build and deployment) use "GitHub Actions" as the source.
- **Custom domain.** `aiusageclock.com` is set in the repository's Pages settings, and its DNS records are at the domain
  registrar. The site is deployed with GitHub Actions, so it does not need a `CNAME` file: according to GitHub's
  documentation on managing a custom domain, publishing from a custom workflow creates no `CNAME` file and ignores an
  existing one.
- **Served from the root of its domain.** `site` in `astro.config.mjs` is `https://aiusageclock.com`, and the pages link to
  `/_astro/...`, `/og/...` and the language prefixes from the root. Under the default `<owner>.github.io/<repo>/` address the
  styles, fonts and images would not load, so look at the site on the custom domain.
- **Pinned actions.** Every action in the workflow is pinned to a full commit SHA, with the release tag in a comment. The
  workflow's header comment says how to look up the SHA of a newer tag.
- **`robots.txt` and `sitemap.xml`.** `public/robots.txt` allows all crawlers and points at the sitemap.
  `src/pages/sitemap.xml.ts` writes `/sitemap.xml` at build time: one entry for each language's home page, each carrying the
  hreflang alternates of every language plus `x-default`. The alternates come from `hreflangAlternates()` in
  `src/i18n/alternates.ts`, the same function that writes the pages' own `<link rel="alternate">` tags in `BaseLayout.astro`,
  so the two cannot disagree. A language whose dictionary is not complete yet (its page is `noindex`) is listed in both on
  purpose. The root page `/` (a redirect) and the 404 page are not listed. A new language added to `locales.ts` shows up in
  the sitemap without any change to the sitemap file.

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

The table lives in `src/i18n/locales.ts`; the language menu, the hreflang alternates, the sitemap, the Astro i18n routing and the
link-preview images all read from it. The hreflang alternates are listed by each language page and by the root page: all
seven languages plus `x-default`, which points at `/`. The 404 page lists none. They are built in one place,
`hreflangAlternates()` in `src/i18n/alternates.ts`, which `BaseLayout.astro` and `/sitemap.xml` both call.

**Root page (`/`)**: the script on it sends the visitor to the first of these that exists: the language saved by the
language menu (`localStorage` key `aiuc-lang`), then the first entry of the browser's language list that the site can
serve, then English. Each tag is first compared whole (lower case) with the site's language codes, so a code that carries a
region is met exactly. Chinese that is not an exact code is told apart by script and region (`zh-TW`, `zh-HK`, `zh-MO` and `Hant`
go to Traditional, other Chinese to Simplified); every other language is matched by its base subtag, so `es-MX`, `es-ES` and
`es-419` all go to `/es/`, `fr-CA` to `/fr/`, `de-AT` to `/de/`, and a language the site does not have (`pt-BR`) is skipped.
Without JavaScript, a `<noscript>` meta refresh sends the visitor to `/en/`. The links to each language on the page are the
fallback for when the script's redirect fails or is blocked.

**404 page**: one file for every address, so it explains in English and offers a "back to the home page" link in every
language (each to that language's home page; text from the dictionaries, English where a language has none yet).

## Adding a language

1. Add an entry to `src/i18n/locales.ts` (its position is its position in the language menu). A code that carries a region
   (say `pt-br`) is matched whole by the root page's language detection before the base language is tried, so `pt-BR`
   reaches `/pt-br/` while `pt-PT` does not, unless there is a plain `pt` entry as well.
2. Create a dictionary next to `src/i18n/en.ts` (start from `{}`; any missing text falls back to English) and register
   it in `src/i18n/index.ts`. A page whose dictionary does not cover every English string is served with
   `<html lang="en">` and `noindex` until it does. The build still succeeds, but prints a warning that lists the missing key
   paths, and the lists that are shorter than English (for example `faq.items.unsigned.listHtml: en 3 / de 2`).
   A translated list that is longer than the English one does not make the page incomplete: the page keeps its own language,
   the extra items are dropped (they are never shown), and the build prints a separate warning that names the list
   (`faq.items.data.parasHtml: en 2 / de 3`).
   A key that ends in `Html` is rendered unescaped, so the build checks every such string in every dictionary and fails on
   anything but `<strong>`, `<em>`, `<code>` and `<a href="...">` whose href starts with `https://`, `/` or `#`
   (`src/i18n/html-check.ts`). It reports the problems of all the dictionaries at once. The check guards against typos and
   pasted markup (it also refuses `//`, `/\`, `/&` and `/` followed by a tab or line break), not against a hostile author:
   an `https://` link may go to any host. `npm run test:html` runs its test cases.
3. If the language has no translated guides in the product repository, nothing else is needed: `docLink()` in `src/site.ts`
   links the setup and usage guides to the English files. Add the language's file-name suffix to `DOC_SUFFIX` there once
   translated guides exist.
4. If the language needs its own heading font, import the font as a URL in `BaseLayout.astro`, choose it by `<html lang>`,
   and add the `:lang()` rules (see the Chinese and Japanese sections below). A tagline font of its own is a separate step:
   see "Hero tagline fonts" below.
5. Add the dictionary and, if needed, a font entry to `scripts/render-og.mjs`, then draw the link preview (`npm run og`).
6. `npm run check` and `npm run build`; the new `dist/<code>/index.html` must exist.

`public/apple-touch-icon.png` is the 1024px app icon scaled to 180px; `node scripts/make-apple-touch-icon.mjs`
regenerates it.

## Chinese pages

- Headings use Noto Serif TC on the Traditional page and Noto Serif SC on the Simplified page
  (`@fontsource-variable/noto-serif-tc` and `-sc`, pinned versions); the two hero tagline lines have their own font (see "Hero tagline fonts"). Fraunces stays first in the font stack, so Latin
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

- Headings use Noto Serif JP (`@fontsource-variable/noto-serif-jp`, pinned), except the two hero tagline lines (see "Hero tagline fonts"). It is linked the same way as the Chinese fonts:
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

## Hero tagline fonts

The two big tagline lines at the top of the home page (`hero.line1` and `hero.line2`) have a font of their own on three
languages; every other heading keeps Noto Serif TC, SC or JP, and English, Spanish, French and German keep Fraunces.

| Page | Font | Weight |
|---|---|---|
| Traditional Chinese (`zh-tw`) | UoqMunThenKhung | 400 |
| Simplified Chinese (`zh-cn`) | Long Cang | 400 |
| Japanese (`ja`) | Reggae One | 400 |

- The font files are tiny subsets: one WOFF2 per language holding only the characters of that language's two tagline lines,
  a few KB each. They are committed in `src/assets/fonts/hero/`, next to `manifest.json` (per language: font, characters
  covered, source URL, SHA-256, size) and the license texts.
- `BaseLayout.astro` picks the file by `<html lang>`, the same value that picks the Noto Serif stylesheet, and writes an inline
  `@font-face` (named `Hero Tagline`, `font-display: swap`) plus `<link rel="preload" as="font" type="font/woff2" crossorigin>`
  on that language's page only: no other page declares, preloads or links these fonts. `Hero.astro` puts Fraunces first
  (so "AI" keeps its Fraunces look), then `Hero Tagline`, then the usual Noto Serif and system fonts. The three fonts have a
  single weight, so the tagline is set at `font-weight: 400` with `font-synthesis: none`: the browser never emboldens or
  slants it. The second line stays upright and differs by colour only.
- **When the tagline changes, make the fonts again.** The build checks the tagline of every language whose dictionary is
  complete against `manifest.json` (`src/i18n/hero-font-check.ts`, run by `src/i18n/index.ts`) and fails if a character is not
  covered, naming the characters. (An incomplete language is served in English and does not load its tagline font, so it is
  skipped.)
  It also checks the font files themselves (`src/i18n/hero-font-files.mjs`): each WOFF2 must have the size and SHA-256 recorded
  in `manifest.json`, so a file that was edited, replaced or only half written fails the build too, naming the file.
  The fix is one command; it needs [uv](https://docs.astral.sh/uv/) (it runs `scripts/subset-hero-font.py`, a fontTools script
  with its dependencies pinned in the file itself) and Node 22.22 or newer (the `engines` field of `package.json`):

  ```sh
  node scripts/make-hero-fonts.mjs
  ```

  It reads the tagline characters from the dictionaries, downloads each font and its `OFL.txt` from
  [google/fonts](https://github.com/google/fonts) at the commit pinned in the script (cached in `_tmp/hero-fonts/`), refuses to
  go on unless every download has the SHA-256 pinned in the script, stops if a font declares a Reserved Font Name, makes all
  three subsets in `_tmp/hero-fonts/staged/` first and only when every language has succeeded writes the subsets, the
  `OFL-<Font>.txt` files and `manifest.json` into `src/assets/fonts/hero/` (a failed run leaves that folder as it was), then you
  commit the changed files. The WOFF2 subsets are deterministic: the same taglines, the same pinned fonts and the same tool versions
  (fontTools and brotli, recorded in `manifest.json`) give the same bytes. `manifest.json` itself differs on every
  run on a new day, because it records the date it was made (`generator.generated`), and when the tool versions change. The `uv`
  step is stopped after 10 minutes (a first run downloads Python and fontTools). To change a font or the google/fonts commit, edit the table at the top of the script; the mismatch message shows the
  new SHA-256.
- The link-preview images of these three languages use the same subset files (`scripts/render-og.mjs`), so redraw them
  (`npm run og`) after a tagline change as well, once the fonts have been made again (see "Link-preview images" for the order).
- **Giving another language a tagline font of its own** (steps 1 to 3 of "Adding a language" come first):
  1. In `scripts/make-hero-fonts.mjs`, import the language's dictionary and add an entry to the `FONTS` table: the font's folder
     and file name in google/fonts, its family name, the SHA-256 of the font and of its `OFL.txt` (the script stops at the first
     mismatch and shows the downloaded value), and the name of the WOFF2 to write.
  2. In `BaseLayout.astro`, import the new WOFF2 with the `?no-inline` suffix (like the three others) and add the language to
     the `cjk` choice by `<html lang>`, next to its heading stylesheet if it has one.
  3. In `Hero.astro`, add two rules like the Chinese and Japanese ones there: a `:global(:root:lang(xx)) .hero h1` rule that puts
     `"Hero Tagline"` after Fraunces in the font stack, with `font-weight: 400` and `font-synthesis: none`, and a
     `:global(:root:lang(xx)) .hero h1 em` rule for the second line (upright, weight 400, no negative letter spacing), because
     the second line's default style is italic, weight 500 and tightly spaced.
  4. Run `node scripts/make-hero-fonts.mjs`, which writes the WOFF2, its `OFL-<Font>.txt` and the new `manifest.json` entry,
     then `npm run og` (the tagline font of a picture comes from the manifest) and `npm run build`; commit the changed files.

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
`hero.kicker`, `hero.line1` or `hero.line2` changes (a language whose dictionary has no text yet is drawn in English).
When a tagline of zh-tw, zh-cn or ja changes, do it in this order: change the tagline, make the hero fonts again
(`node scripts/make-hero-fonts.mjs`, see "Hero tagline fonts"), then redraw. `scripts/render-og.mjs` makes the same checks as the
build (the tagline's characters against `manifest.json`, the font files against its size and SHA-256) and stops with that
instruction when they fail, so it never draws a tagline in a font that does not hold its characters.

```sh
npm run og                              # every language and the GitHub card
node scripts/render-og.mjs ja fr        # only these languages (and "github" if you name it)
node scripts/render-og.mjs --skip-github  # every language, GitHub card left alone
```

This needs Windows with Microsoft Edge: `scripts/render-og.mjs` writes one HTML page per picture into `_tmp/og/`, prints it to
PNG with headless Edge, checks the size and shrinks the file (with `sharp`, a devDependency pinned in `package.json`). Set `EDGE_PATH` if Edge is not in its standard folder.
The text comes from the language dictionaries (`hero.kicker`, `hero.line1`, `hero.line2`), the fonts from `node_modules` (Japanese
uses Noto Serif JP, the Chinese pages Noto Serif TC and SC; the tagline of those three languages uses the subset fonts in
`src/assets/fonts/hero/`), and the picture on the right from `src/assets/windows-1.0.0.png`.
The tagline starts at a tuned size and shrinks until each line fits the left column; if it still does not fit at the smallest
size, the lines wrap between words (between phrases in Japanese). Look at the PNGs before committing them: every language in
`locales.ts` needs a dictionary entry in the script, which stops with a message when one is missing.

## Related

- Product repository: https://github.com/AIUsageClock/ai-usage-clock
- Download the app: https://github.com/AIUsageClock/ai-usage-clock/releases/latest

## License

[MIT](LICENSE) for the site's own code and text.

Fonts are third-party and keep their own licenses:

- The three hero tagline subsets in `src/assets/fonts/hero/` are made from fonts under the
  [SIL Open Font License 1.1](https://openfontlicense.org): UoqMunThenKhung (Copyright 2025 The UoqMunThenKhung Project
  Authors), Long Cang (Copyright 2018 The Long Cang Project Authors) and Reggae One (Copyright 2020 The Reggae Project
  Authors). The full license text with the copyright notice is next to each file (`OFL-UoqMunThenKhung.txt`,
  `OFL-LongCang.txt`, `OFL-ReggaeOne.txt`, copied unchanged from google/fonts; `.gitattributes` stops Git from converting their
  line endings, so the committed bytes are the ones whose SHA-256 `manifest.json` records), and the notices are kept in each font's own
  name table. None of the three declares a Reserved Font Name, so a subset may keep the name. `manifest.json` records
  where each font was taken from.
- Fraunces, Inter and Noto Serif TC, SC and JP come from the `@fontsource-variable/*` packages (also OFL 1.1, each with its own
  `LICENSE` inside the package).
