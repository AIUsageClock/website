#!/usr/bin/env node
// Renders the link-preview images:
//   public/og/en.png, zh-tw.png, zh-cn.png   1200x630, one per language (og:image / twitter:image)
//   branding/github-social-preview.png       1280x640, English, for the repository's "Social preview" setting
//
// Not part of the site build: the PNGs are committed. Run it again when the tagline, the brand or the
// screenshot changes (`npm run og`). It needs Windows with Microsoft Edge: the pictures are an HTML page
// per image, printed to PNG by headless Edge, so the fonts come out exactly as they do on the site.
//
// Text comes from the language dictionaries; fonts are the Fontsource files in node_modules; the picture on
// the right is src/assets/windows-1.0.0.png. Nothing is fetched from the network.
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
import { SITE_NAME } from '../src/site.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const work = join(root, '_tmp', 'og');
const require = createRequire(import.meta.url);

/** Absolute file:// URL of a file inside a Fontsource package, e.g. fontCss('fraunces/opsz.css'). */
const fontCss = (spec) => pathToFileURL(require.resolve(`@fontsource-variable/${spec}`)).href;

/** Per language: dictionary, <html lang>, and the font stacks (Fraunces first, so Latin keeps its look). */
const LANGS = {
  en: {
    dict: en,
    htmlLang: 'en',
    css: [fontCss('fraunces/opsz.css'), fontCss('fraunces/opsz-italic.css'), fontCss('inter/wght.css')],
    serif: '"Fraunces Variable","Iowan Old Style","Palatino Linotype",Georgia,serif',
    sans: '"Inter Variable",system-ui,"Segoe UI",sans-serif',
  },
  'zh-tw': {
    dict: zhTw,
    htmlLang: 'zh-Hant-TW',
    css: [fontCss('fraunces/opsz.css'), fontCss('fraunces/opsz-italic.css'), fontCss('inter/wght.css'), fontCss('noto-serif-tc/index.css')],
    serif: '"Fraunces Variable","Noto Serif TC Variable","Songti TC","PMingLiU",serif',
    sans: '"Inter Variable","PingFang TC","Microsoft JhengHei","Noto Sans TC",system-ui,sans-serif',
  },
  'zh-cn': {
    dict: zhCn,
    htmlLang: 'zh-Hans-CN',
    css: [fontCss('fraunces/opsz.css'), fontCss('fraunces/opsz-italic.css'), fontCss('inter/wght.css'), fontCss('noto-serif-sc/index.css')],
    serif: '"Fraunces Variable","Noto Serif SC Variable","Songti SC","SimSun",serif',
    sans: '"Inter Variable","PingFang SC","Microsoft YaHei","Noto Sans SC",system-ui,sans-serif',
  },
};

/**
 * The four pictures. `brand` is the size of the app icon and the wordmark (the GitHub card shows them larger, because
 * the repository page has no site name next to the image); `dial` is the diameter of the clock-dial ticks, a bezel around the screenshot.
 */
const IMAGES = [
  { lang: 'en', out: 'public/og/en.png', w: 1200, h: 630, icon: 64, brandFs: 30, tagFs: { en: 68, zh: 62 }, shotW: 430, shotX: 892, dial: 580, rot: 1.6 },
  { lang: 'zh-tw', out: 'public/og/zh-tw.png', w: 1200, h: 630, icon: 64, brandFs: 30, tagFs: { en: 68, zh: 62 }, shotW: 430, shotX: 892, dial: 580, rot: 1.6 },
  { lang: 'zh-cn', out: 'public/og/zh-cn.png', w: 1200, h: 630, icon: 64, brandFs: 30, tagFs: { en: 68, zh: 62 }, shotW: 430, shotX: 892, dial: 580, rot: 1.6 },
  { lang: 'en', out: 'branding/github-social-preview.png', w: 1280, h: 640, icon: 96, brandFs: 52, tagFs: { en: 56, zh: 52 }, shotW: 430, shotX: 972, dial: 580, rot: 1.6 },
];

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
  const zh = img.lang !== 'en';
  const tagFs = zh ? img.tagFs.zh : img.tagFs.en;
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

for (const img of IMAGES) {
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
