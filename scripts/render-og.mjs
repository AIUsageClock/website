#!/usr/bin/env node
// Renders the link-preview images:
//   public/og/<code>.png                     1200x630, one per language in src/i18n/locales.ts (og:image / twitter:image)
//   branding/github-social-preview.png       1280x640, English, for the repository's "Social preview" setting
//
// Not part of the site build: the PNGs are committed. Run it again when the tagline, the brand or the
// screenshot changes (`npm run og`). It needs Windows with Microsoft Edge: the pictures are an HTML page
// per image, printed to PNG by headless Edge, so the fonts come out exactly as they do on the site.
//
//   node scripts/render-og.mjs                 every language, plus the GitHub card
//   node scripts/render-og.mjs ja fr           only the listed languages (codes from locales.ts), and the GitHub card only if "github" is listed
//   node scripts/render-og.mjs --skip-github   every language, leave branding/github-social-preview.png alone
//
// Text comes from the language dictionaries (a language that has not translated a string yet shows the English one);
// fonts are the Fontsource files in node_modules; the picture on the right is src/assets/windows-1.0.0.png.
// Nothing is fetched from the network.
//
// Edge is looked up in its two standard install folders; set EDGE_PATH to use another browser binary.

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
// sharp is not a direct dependency: it is installed because Astro needs it for image optimisation.
import sharp from 'sharp';
// Node strips the TypeScript types on import; the dictionaries use explicit ".ts" paths for this reason.
import { en } from '../src/i18n/en.ts';
import { zhTw } from '../src/i18n/zh-tw.ts';
import { zhCn } from '../src/i18n/zh-cn.ts';
import { ja } from '../src/i18n/ja.ts';
import { es } from '../src/i18n/es.ts';
import { fr } from '../src/i18n/fr.ts';
import { de } from '../src/i18n/de.ts';
import { LOCALES } from '../src/i18n/locales.ts';
import { SITE_NAME } from '../src/site.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const work = join(root, '_tmp', 'og');
const require = createRequire(import.meta.url);

/** Absolute file:// URL of a file inside a Fontsource package, e.g. fontCss('fraunces/opsz.css'). */
const fontCss = (spec) => pathToFileURL(require.resolve(`@fontsource-variable/${spec}`)).href;

/** Dictionary of every language in locales.ts. A new language must be added here too (the script stops if it is missing). */
const DICTS = { en, 'zh-tw': zhTw, 'zh-cn': zhCn, ja, es, fr, de };

const LATIN = {
  css: [fontCss('fraunces/opsz.css'), fontCss('fraunces/opsz-italic.css'), fontCss('inter/wght.css')],
  serif: '"Fraunces Variable","Iowan Old Style","Palatino Linotype",Georgia,serif',
  sans: '"Inter Variable",system-ui,"Segoe UI",sans-serif',
  cjk: false,
  /** Tagline size the fit step starts from (px); it shrinks until each line fits the left column, down to `minFs`, then lets the lines wrap. */
  startFs: 68,
  minFs: 44,
};

/**
 * Per language, on top of LATIN: the extra heading font (Fraunces stays first, so Latin letters keep their look) and the
 * font stacks. Spanish, French and German need nothing extra: the Fraunces and Inter files carry the accented letters.
 */
const EXTRA = {
  'zh-tw': {
    css: [...LATIN.css, fontCss('noto-serif-tc/index.css')],
    serif: '"Fraunces Variable","Noto Serif TC Variable","Songti TC","PMingLiU",serif',
    sans: '"Inter Variable","PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,sans-serif',
    cjk: true,
    startFs: 62,
  },
  'zh-cn': {
    css: [...LATIN.css, fontCss('noto-serif-sc/index.css')],
    serif: '"Fraunces Variable","Noto Serif SC Variable","Songti SC","SimSun",serif',
    sans: '"Inter Variable","PingFang SC","Microsoft YaHei","Noto Sans SC",system-ui,sans-serif',
    cjk: true,
    startFs: 62,
  },
  ja: {
    css: [...LATIN.css, fontCss('noto-serif-jp/index.css')],
    serif: '"Fraunces Variable","Noto Serif JP Variable","Hiragino Mincho ProN","Yu Mincho",serif',
    sans: '"Inter Variable","Hiragino Sans","Yu Gothic UI","Meiryo","Noto Sans JP",system-ui,sans-serif',
    cjk: true,
    startFs: 60,
    minFs: 48,
  },
};

/** Per language: dictionary, <html lang> (the one locales.ts gives a fully translated page), font stacks. */
const LANGS = Object.fromEntries(
  LOCALES.map((l) => {
    if (!(l.code in DICTS)) throw new Error(`No dictionary for "${l.code}" in scripts/render-og.mjs: import it and add it to DICTS.`);
    return [l.code, { ...LATIN, ...EXTRA[l.code], dict: DICTS[l.code], htmlLang: l.htmlLang }];
  }),
);

/**
 * The pictures: one link preview per language, plus the GitHub card. `brand` is the size of the app icon and the wordmark
 * (the GitHub card shows them larger, because the repository page has no site name next to the image); `dial` is the diameter
 * of the clock-dial ticks, a bezel around the screenshot; `startFs` overrides the language's starting tagline size.
 */
const IMAGES = [
  ...LOCALES.map((l) => ({ id: l.code, lang: l.code, out: `public/og/${l.code}.png`, w: 1200, h: 630, icon: 64, brandFs: 30, shotW: 430, shotX: 892, dial: 580, rot: 1.6 })),
  { id: 'github', lang: 'en', out: 'branding/github-social-preview.png', w: 1280, h: 640, icon: 96, brandFs: 52, startFs: 56, shotW: 430, shotX: 972, dial: 580, rot: 1.6 },
];

// Which pictures to draw: all, or the ones named on the command line (language codes, or "github").
const args = process.argv.slice(2);
const skipGithub = args.includes('--skip-github');
const named = args.filter((a) => !a.startsWith('--'));
for (const n of named) if (!IMAGES.some((i) => i.id === n)) throw new Error(`Unknown picture "${n}". Language codes: ${LOCALES.map((l) => l.code).join(', ')}; or "github".`);
const selected = IMAGES.filter((i) => (named.length ? named.includes(i.id) : true) && !(skipGithub && i.id === 'github'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The clock dial of the site's hero (components/Dial.astro): same tick radii, 60 ticks, 12 of them long.
 * Here the dial is a bezel around the screenshot, so the orange arc runs just outside the ticks instead of inside them.
 */
function dialSvg() {
  const pt = (deg, r) => `${(500 + r * Math.sin((deg * Math.PI) / 180)).toFixed(1)} ${(500 - r * Math.cos((deg * Math.PI) / 180)).toFixed(1)}`;
  let minor = '';
  let major = '';
  for (let i = 0; i < 60; i++) {
    const deg = i * 6;
    if (i % 5 === 0) major += `M${pt(deg, 480)}L${pt(deg, 434)}`;
    else minor += `M${pt(deg, 480)}L${pt(deg, 462)}`;
  }
  return `<svg class="dial" viewBox="0 0 1000 1000" aria-hidden="true">
    <path class="mn" d="${minor}"/><path class="mj" d="${major}"/>
    <path class="arc" d="M${pt(0, 530)}A530 530 0 0 1 ${pt(125, 530)}"/>
  </svg>`;
}

function page(img) {
  const L = LANGS[img.lang];
  const hero = { ...en.hero, ...L.dict.hero };
  const zh = L.cjk; // Chinese and Japanese: no italic, no negative tracking, a taller line
  const tagFs = img.startFs ?? L.startFs;
  const dialLeft = img.shotX - img.dial / 2;
  const iconUrl = pathToFileURL(join(root, 'src/assets/aiusageclockicon.png')).href;
  const shotUrl = pathToFileURL(join(root, 'src/assets/windows-1.0.0.png')).href;
  return `<!doctype html>
<html lang="${L.htmlLang}">
<head>
<meta charset="utf-8">
${L.css.map((href) => `<link rel="stylesheet" href="${href}">`).join('\n')}
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  html,body{width:${img.w}px;height:${img.h}px}
  body{position:relative;overflow:hidden;background:#f7f4ee;color:#1c1917;font-family:${L.sans};-webkit-font-smoothing:antialiased}

  /* clock-dial ticks, centred on the screenshot (the dial is wider than the picture's margin, so the paper covers its corners) */
  .dial{position:absolute;overflow:visible;width:${img.dial}px;height:${img.dial}px;left:${dialLeft}px;top:${img.h / 2 - img.dial / 2}px;color:#1c1917}
  .dial .mn{fill:none;stroke:currentColor;stroke-opacity:.2;stroke-width:3;stroke-linecap:round}
  .dial .mj{fill:none;stroke:currentColor;stroke-opacity:.34;stroke-width:6;stroke-linecap:round}
  .dial .arc{fill:none;stroke:#ea580c;stroke-opacity:.85;stroke-width:7;stroke-linecap:round}

  .left{position:absolute;left:72px;top:${img.h === 630 ? 60 : 64}px;bottom:${img.h === 630 ? 56 : 64}px;width:${img.shotX - img.shotW / 2 - 72 - 30}px;display:flex;flex-direction:column;justify-content:space-between}
  .brand{display:flex;align-items:center;gap:${Math.round(img.icon * 0.28)}px}
  .brand img{width:${img.icon}px;height:${img.icon}px}
  .brand span{font:600 ${img.brandFs}px/1 ${L.serif};letter-spacing:-.01em}
  .kicker{font:600 ${zh ? 17 : 15}px/1 ${L.sans};letter-spacing:${zh ? '.14em' : '.2em'};text-transform:uppercase;color:#57534e;margin-bottom:22px}
  h1{font:600 ${tagFs}px/${zh ? 1.2 : 1.02} ${L.serif};letter-spacing:${zh ? 0 : '-.04em'};${zh ? 'font-feature-settings:"halt";' : ''}}
  h1 span,h1 em{display:block;white-space:nowrap}
  /* set by the fit script below when a tagline line is too long for the column even at the smallest size: wrap it between words (phrases in Japanese) */
  h1.wrap span,h1.wrap em{white-space:normal;text-wrap:balance;word-break:auto-phrase;overflow-wrap:break-word}
  h1 em{color:#c2410c;${zh ? 'font-style:normal;' : 'font-style:italic;font-weight:500;letter-spacing:-.035em;'}}
  .url{display:flex;align-items:center;gap:14px;font:600 22px/1 ${L.sans};letter-spacing:.01em;color:#44403c}
  .url::before{content:"";width:30px;height:3px;border-radius:2px;background:#ea580c}

  .paper{position:absolute;left:${img.shotX - img.shotW / 2 - 14}px;top:50%;width:${img.shotW + 28}px;padding:14px;background:#fffdf8;border-radius:3px;
    transform:translateY(-50%) rotate(${img.rot}deg);
    box-shadow:0 1px 0 rgba(28,25,23,.05),0 2px 6px rgba(28,25,23,.08),0 26px 50px -22px rgba(28,25,23,.42)}
  /* the hairline ring (painted as a shape, so anti-aliased) hides the stair-steps a rotated bitmap's own edge gets */
  .paper img{display:block;width:${img.shotW}px;height:auto;border-radius:1px;box-shadow:0 0 0 1px rgba(28,25,23,.22)}
</style>
</head>
<body>
  ${dialSvg()}
  <div class="left">
    <div class="brand"><img src="${iconUrl}" alt=""><span>${esc(SITE_NAME)}</span></div>
    <div>
      <p class="kicker">${esc(hero.kicker)}</p>
      <h1><span>${esc(hero.line1)}</span><em>${esc(hero.line2)}</em></h1>
    </div>
    <p class="url">aiusageclock.com</p>
  </div>
  <div class="paper"><img src="${shotUrl}" alt=""></div>
<script>
/* Fit the tagline to the left column. It starts at the language's tuned size; a language whose lines are longer
   (French, German, Japanese) shrinks step by step until each line fits on one line, and below the smallest size the lines wrap.
   When every line already fits (English, Chinese) nothing changes. If scripts are blocked, the picture is drawn at the starting size. */
(function () {
  var START = ${tagFs}, MIN = ${Math.min(L.minFs, tagFs)};
  var col = document.querySelector('.left'), h1 = document.querySelector('h1'), lines = h1.children;
  function widest() { var w = 0; for (var i = 0; i < lines.length; i++) w = Math.max(w, lines[i].scrollWidth); return w; }
  function fit() {
    h1.classList.remove('wrap');
    var fs = START;
    h1.style.fontSize = fs + 'px';
    while (fs > MIN && widest() > col.clientWidth) { fs -= 2; h1.style.fontSize = fs + 'px'; }
    if (widest() > col.clientWidth) h1.classList.add('wrap');
  }
  fit();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
</script>
</body>
</html>
`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** True once the file exists and has stopped growing. Edge's launcher returns at once; the picture is written a moment later. */
async function waitForFile(path, timeoutMs) {
  const end = Date.now() + timeoutMs;
  let last = -1;
  while (Date.now() < end) {
    if (existsSync(path)) {
      const size = statSync(path).size;
      if (size > 0 && size === last) return true;
      last = size;
    }
    await sleep(400);
  }
  return false;
}

function findEdge() {
  const candidates = [
    process.env.EDGE_PATH,
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error(`Microsoft Edge not found. Looked in:\n  ${candidates.join('\n  ')}\nSet EDGE_PATH to a msedge.exe.`);
  return found;
}

mkdirSync(work, { recursive: true });
const edge = findEdge();
let failed = false;

for (const img of selected) {
  const id = img.out.replace(/[\\/]/g, '-').replace(/\.png$/, '');
  const html = join(work, `${id}.html`);
  const raw = join(work, `${id}.raw.png`);
  const out = join(root, img.out);
  writeFileSync(html, page(img));
  rmSync(raw, { force: true });

  // --user-data-dir: a separate profile per picture, so a running Edge window cannot swallow the command.
  // --allow-file-access-from-files: lets the page load the .woff2 files from node_modules over file://.
  // --virtual-time-budget: gives the page a few seconds to finish loading its fonts before the picture is taken.
  const profile = join(work, `edge-profile-${id}`);
  rmSync(profile, { recursive: true, force: true });
  const child = spawn(
    edge,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--no-first-run',
      '--force-device-scale-factor=1',
      '--allow-file-access-from-files',
      `--user-data-dir=${profile}`,
      `--window-size=${img.w},${img.h}`,
      '--virtual-time-budget=5000',
      `--screenshot=${raw}`,
      pathToFileURL(html).href,
    ],
    { stdio: 'ignore' },
  );
  const written = await waitForFile(raw, 60_000);
  child.kill();
  if (!written) {
    console.error(`FAIL ${img.out}: Edge produced no picture within 60 s.`);
    failed = true;
    continue;
  }

  const meta = await sharp(raw).metadata();
  if (meta.width !== img.w || meta.height !== img.h) {
    console.error(`FAIL ${img.out}: Edge made ${meta.width}x${meta.height}, expected ${img.w}x${img.h}.`);
    failed = true;
    continue;
  }

  // Palette PNG with dithering: the flat paper colour and soft shadows quantise well, and the files stay small.
  mkdirSync(dirname(out), { recursive: true });
  await sharp(raw).png({ palette: true, quality: 92, effort: 10, dither: 1, compressionLevel: 9 }).toFile(out);
  const final = await sharp(out).metadata();
  console.log(`${img.out}  ${final.width}x${final.height}  ${statSync(out).size} bytes`);
}

if (failed) process.exit(1);
