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
// fonts are the Fontsource files in node_modules, and for the tagline of the Traditional Chinese, Simplified Chinese and Japanese
// pictures the subset fonts in src/assets/fonts/hero/ (the ones the site uses; see scripts/make-hero-fonts.mjs);
// the picture on the right is src/assets/windows-1.0.0.png.
// Nothing is fetched from the network.
//
// Edge is looked up in its two standard install folders; set EDGE_PATH to use another browser binary.
//
// Before it draws anything it makes the site build's two checks (src/i18n/index.ts), but for every language in the manifest
// (the build skips a language whose dictionary is incomplete; a picture uses the tagline font either way): the tagline of zh-tw, zh-cn and ja
// must use only characters its subset font covers, and the font files must be the ones manifest.json describes. After changing a
// tagline, make the fonts first (`node scripts/make-hero-fonts.mjs`), then run this script: otherwise the pictures would show the
// new characters in a fallback font, not the one the site uses. The script stops with a message when a check fails.

import { spawn, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
// sharp is a devDependency of this site, pinned to an exact version in package.json (Astro also uses it for image optimisation).
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
import { findHeroFontProblems } from '../src/i18n/hero-font-check.ts';
import { findHeroFontFileProblems } from '../src/i18n/hero-font-files.mjs';
import { SITE_NAME } from '../src/site.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const work = join(root, '_tmp', 'og');
const require = createRequire(import.meta.url);

/** Absolute file:// URL of a file inside a Fontsource package, e.g. fontCss('fraunces/opsz.css'). */
const fontCss = (spec) => pathToFileURL(require.resolve(`@fontsource-variable/${spec}`)).href;

/** Languages with their own tagline font (zh-tw, zh-cn, ja): code -> { family, file, ... } from the manifest that scripts/make-hero-fonts.mjs writes. */
const HERO_FONT_DIR = join(root, 'src', 'assets', 'fonts', 'hero');
const HERO_MANIFEST = JSON.parse(readFileSync(join(HERO_FONT_DIR, 'manifest.json'), 'utf8'));
const HERO_FONTS = HERO_MANIFEST.fonts;

/** Dictionary of every language in locales.ts. A new language must be added here too (the script stops if it is missing). */
const DICTS = { en, 'zh-tw': zhTw, 'zh-cn': zhCn, ja, es, fr, de };

// The site build's two checks (src/i18n/index.ts), for every language in the manifest, on the tagline each picture shows (English wherever a dictionary
// has no text, as in page() below): the characters against the manifest's list, then the font files against the manifest's size and
// SHA-256. Stop here when either fails, so no picture is drawn with a tagline font that does not match its tagline.
{
  const heroes = Object.fromEntries(
    Object.keys(HERO_FONTS).map((code) => {
      if (!(code in DICTS)) throw new Error(`manifest.json has a hero font for "${code}", but scripts/render-og.mjs has no dictionary for it.`);
      return [code, { ...en.hero, ...DICTS[code].hero }];
    }),
  );
  const problems = [...findHeroFontProblems(heroes, HERO_MANIFEST), ...findHeroFontFileProblems(HERO_MANIFEST, HERO_FONT_DIR)];
  if (problems.length > 0) {
    console.error('The hero tagline fonts do not match the taglines or manifest.json (the site build checks the same thing for complete languages):');
    for (const p of problems) console.error(`  ${p}`);
    console.error('Make the fonts again first (needs uv): node scripts/make-hero-fonts.mjs');
    console.error('Then run this script again.');
    process.exit(1);
  }
}

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
  // The tagline font of this language, if it has one: declared as "Hero Tagline" like on the site, Fraunces first (for "AI"),
  // weight 400 (the fonts have no other) and no synthesised bold or slant.
  const heroFont = HERO_FONTS[img.lang];
  const heroFace = heroFont
    ? `@font-face{font-family:"Hero Tagline";font-style:normal;font-weight:400;src:url("${pathToFileURL(join(HERO_FONT_DIR, heroFont.file)).href}") format("woff2")}`
    : '';
  const tagSerif = heroFont ? `"Fraunces Variable","Hero Tagline",${L.serif}` : L.serif;
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
  ${heroFace}
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
  h1{font:${heroFont ? 400 : 600} ${tagFs}px/${zh ? 1.2 : 1.02} ${tagSerif};${heroFont ? 'font-synthesis:none;' : ''}letter-spacing:${zh ? 0 : '-.04em'};${zh ? 'font-feature-settings:"halt";' : ''}}
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

/** How long Edge gets to write one picture before the script gives up on it. */
const EDGE_TIMEOUT_MS = 60_000;

/**
 * True once the file exists and has stopped growing. Edge's launcher returns at once; the picture is written a moment later.
 * `aborted` is polled on every round: when it returns true the wait ends at once with false (Edge could not be started).
 */
async function waitForFile(path, timeoutMs, aborted = () => false) {
  const end = Date.now() + timeoutMs;
  let last = -1;
  while (Date.now() < end) {
    if (aborted()) return false;
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

/**
 * Deletes a folder. A folder that something still holds open (a stray Edge from an earlier run that timed out) must not stop
 * the script: the problem is printed as a warning and false is returned, so the caller can use another folder.
 */
function removeDir(dir) {
  try {
    rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    return true;
  } catch (e) {
    console.warn(`WARN could not delete ${dir}: ${e.code ?? e.message}`);
    return false;
  }
}

/** Deletes a file, the same way: a file that cannot be deleted (a stray Edge still holds it) is a warning and false, not a crash. */
function removeFile(file) {
  try {
    rmSync(file, { force: true, maxRetries: 5, retryDelay: 200 });
    return true;
  } catch (e) {
    console.warn(`WARN could not delete ${file}: ${e.code ?? e.message}`);
    return false;
  }
}

/**
 * Ends every msedge.exe that was started with this --user-data-dir, and returns the ids of the processes it stopped.
 * Edge's launcher (the process spawn() starts) hands the work to a separate browser process and exits within about 130 ms, so
 * child.kill() cannot stop the browser itself. The browser, GPU and renderer processes all carry --user-data-dir in their command
 * line, which is how they are found. The folder reaches PowerShell through an environment variable and the script through
 * -EncodedCommand, so nothing needs quoting or escaping. Failures are printed as warnings; the script goes on.
 */
function stopEdgeUsing(profile) {
  const sys32 = join(process.env.SystemRoot ?? 'C:\\Windows', 'System32');
  const ps = join(sys32, 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  const script = [
    '$p = $env:OG_EDGE_PROFILE',
    "Get-CimInstance Win32_Process -Filter \"Name='msedge.exe'\" |",
    '  Where-Object { $_.CommandLine -and $_.CommandLine.IndexOf($p, [System.StringComparison]::OrdinalIgnoreCase) -ge 0 } |',
    '  ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue; $_.ProcessId }',
  ].join('\n');
  const r = spawnSync(ps, ['-NoProfile', '-NonInteractive', '-EncodedCommand', Buffer.from(script, 'utf16le').toString('base64')], {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
    windowsHide: true,
    timeout: 30_000,
    env: {
      ...process.env,
      OG_EDGE_PROFILE: profile,
      // Windows PowerShell 5.1 must not inherit a PowerShell 7 module path (its CIM cmdlets would not load).
      PSModulePath: [join(process.env.ProgramFiles ?? 'C:\\Program Files', 'WindowsPowerShell', 'Modules'), join(sys32, 'WindowsPowerShell', 'v1.0', 'Modules')].join(';'),
    },
  });
  if (r.error || r.status !== 0) {
    const why = r.error ? r.error.message : ((r.stderr ?? '').trim().split(/\r?\n/)[0] || `exit code ${r.status}`);
    console.warn(`WARN could not look for stray Edge processes: ${why}`);
    return [];
  }
  return r.stdout.split(/\s+/).filter(Boolean).map(Number);
}

mkdirSync(work, { recursive: true });
const edge = findEdge();
let failed = false;

for (const img of selected) {
  const id = img.out.replace(/[\\/]/g, '-').replace(/\.png$/, '');
  const html = join(work, `${id}.html`);
  const out = join(root, img.out);
  writeFileSync(html, page(img));
  // A stale picture must not be mistaken for Edge's new one, so a file that cannot be deleted is left alone and Edge writes to a fresh name.
  let raw = join(work, `${id}.raw.png`);
  if (!removeFile(raw)) raw = join(work, `${id}.raw-${Date.now()}.png`);

  // --user-data-dir: a separate profile per picture, so a running Edge window cannot swallow the command.
  // --allow-file-access-from-files: lets the page load the .woff2 files from node_modules over file://.
  // --virtual-time-budget: gives the page a few seconds to finish loading its fonts before the picture is taken.
  // A profile folder that cannot be deleted (a stray Edge from an earlier timeout still holds it) is left alone and a fresh one is used.
  let profile = join(work, `edge-profile-${id}`);
  if (!removeDir(profile)) profile = join(work, `edge-profile-${id}-${Date.now()}`);
  // A failed start reaches us in one of two ways, and both must end in the FAIL line below instead of crashing the script:
  // Node emits an 'error' event for EACCES, ENOENT, EAGAIN and a few more, and throws synchronously for the rest (EPERM, UNKNOWN).
  let child = null;
  let spawnError = null;
  try {
    child = spawn(
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
    child.on('error', (err) => {
      spawnError ??= err;
    });
  } catch (err) {
    spawnError = err;
  }
  const written = await waitForFile(raw, EDGE_TIMEOUT_MS, () => spawnError !== null);
  if (spawnError) {
    console.error(`FAIL ${img.out}: could not start Edge (${edge}): ${spawnError.code ?? ''} ${spawnError.message}`.replace(/\s+$/, ''));
    failed = true;
    continue;
  }
  child.kill();
  if (!written) {
    // The launcher is long gone by now, so child.kill() did nothing: end the browser by its profile folder.
    const stopped = stopEdgeUsing(profile);
    console.error(`FAIL ${img.out}: Edge produced no picture within ${EDGE_TIMEOUT_MS / 1000} s${stopped.length ? ` (stopped ${stopped.length} stray Edge process${stopped.length === 1 ? '' : 'es'})` : ''}.`);
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
