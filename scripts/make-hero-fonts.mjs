#!/usr/bin/env node
// Makes the three hero-tagline fonts: one small WOFF2 per language, holding only the characters of that language's
// hero.line1 and hero.line2 (zh-tw: UoqMunThenKhung, zh-cn: Long Cang, ja: Reggae One).
//
//   node scripts/make-hero-fonts.mjs          needs Node >= 22.18 and uv (https://docs.astral.sh/uv/)
//
// Run it again whenever hero.line1 or hero.line2 changes in zh-tw.ts, zh-cn.ts or ja.ts: the build stops until you do
// (src/i18n/hero-font-check.ts compares the tagline with the manifest and names the characters that are missing).
// The other languages (English, Spanish, French, German) keep Fraunces and need nothing.
//
// What it does, per language:
//   1. takes the tagline characters from the dictionary (src/i18n/hero-font-check.ts heroChars(), the same function the build check uses);
//   2. downloads the font and its OFL.txt from github.com/google/fonts at the pinned commit below (cached in _tmp/hero-fonts/)
//      and refuses to go on unless the SHA-256 of every downloaded file is the pinned one;
//   3. refuses to go on if the license names a Reserved Font Name (a subset may not keep a reserved name);
//   4. cuts the font down to those characters with scripts/subset-hero-font.py (fontTools, through `uv run`, stopped if it
//      takes longer than 10 minutes) into a staging folder (_tmp/hero-fonts/staged/), reading the file back to see which
//      characters it really holds;
//   5. only when all three languages have succeeded, puts the results in src/assets/fonts/hero/: the WOFF2 files, the OFL texts
//      (OFL-<Family>.txt), and manifest.json last. Every file is written to a temporary file next to its final place and then
//      renamed over it. A failure anywhere before this step leaves src/assets/fonts/hero/ exactly as it was, so the fonts and
//      the manifest never end up from different runs (src/i18n/hero-font-files.mjs checks the files against the manifest at build time).
// To use a different font or a newer copy of google/fonts: change FONTS / GOOGLE_FONTS_COMMIT below, run the script, and
// put the new SHA-256 values into the table (the script stops at the first mismatch and its message shows the downloaded value).

import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Node strips the TypeScript types on import; the dictionaries use explicit ".ts" paths for this reason.
import { en } from '../src/i18n/en.ts';
import { zhTw } from '../src/i18n/zh-tw.ts';
import { zhCn } from '../src/i18n/zh-cn.ts';
import { ja } from '../src/i18n/ja.ts';
import { heroChars } from '../src/i18n/hero-font-check.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'assets', 'fonts', 'hero');
const workDir = join(root, '_tmp', 'hero-fonts');
/** Where the subsets are made first. Nothing reaches outDir until every language has succeeded. */
const stagedDir = join(workDir, 'staged');

/** The subset step (uv resolves and installs fontTools on its first run) is stopped after this long. */
const UV_TIMEOUT_MS = 10 * 60 * 1000;

/** Version of this generator; written to the manifest. Raise it when the way the fonts are made changes. */
const GENERATOR_VERSION = 1;

/** google/fonts commit every download is taken from (a commit, never a branch name, so a rerun gets the same bytes). */
const GOOGLE_FONTS_COMMIT = '47d54ca1ebb14fd864695f1d39dc734f39017c33';
const RAW = `https://raw.githubusercontent.com/google/fonts/${GOOGLE_FONTS_COMMIT}/ofl`;

/**
 * One entry per language that has its own tagline font. `dict` is the language's dictionary; `dir` the folder in google/fonts/ofl;
 * `sha256` and `licenseSha256` are the SHA-256 of the downloaded font and OFL.txt; `out` the WOFF2 written to src/assets/fonts/hero/.
 * All three fonts have a single weight (400), so the page sets font-weight: 400 for them (Hero.astro).
 */
const FONTS = {
  'zh-tw': {
    dict: zhTw,
    family: 'UoqMunThenKhung',
    dir: 'uoqmunthenkhung',
    file: 'UoqMunThenKhung-Regular.ttf',
    sha256: '943a23eb10d40ca85ee08491c0e3fb3adbc4bd111ef1f93526a4f766a8e66fbd',
    licenseSha256: '406ef62322951b6ea94f7a91989971ddd05441e0768e638528b27e5e677c3b91',
    out: 'uoqmunthenkhung-hero.woff2',
  },
  'zh-cn': {
    dict: zhCn,
    family: 'Long Cang',
    dir: 'longcang',
    file: 'LongCang-Regular.ttf',
    sha256: 'e5bf2c3f24ef2327c6f136d8f73e2f9dfdf44896fdbeb35a9515f44777bb91bc',
    licenseSha256: '603546b7219a94bb59bf8294458194a5010119486354092b66a09a3fd61aeacc',
    out: 'longcang-hero.woff2',
  },
  ja: {
    dict: ja,
    family: 'Reggae One',
    dir: 'reggaeone',
    file: 'ReggaeOne-Regular.ttf',
    sha256: 'aebe62598732d76036f30ec11bb0ec5f68938e373a06d1b4ceb6b9cf1abf3db2',
    licenseSha256: '2756c3dcd85ad997b742330f91332fb478afad302708d4149f7bcd4600543ce2',
    out: 'reggaeone-hero.woff2',
  },
};

const sha256 = (buf) => createHash('sha256').update(buf).digest('hex');

/** Bytes of `url`, from the cache in _tmp/hero-fonts/ when a cached copy has the pinned SHA-256, otherwise downloaded. Stops on a mismatch. */
async function fetchPinned(url, cacheName, expectedSha) {
  const cached = join(workDir, 'download', cacheName);
  if (existsSync(cached)) {
    const buf = readFileSync(cached);
    if (sha256(buf) === expectedSha) return buf;
  }
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(120_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      const got = sha256(buf);
      if (got !== expectedSha) {
        throw new Error(`SHA-256 mismatch for ${url}\n  pinned in this script: ${expectedSha}\n  downloaded:            ${got}`);
      }
      mkdirSync(dirname(cached), { recursive: true });
      writeFileSync(cached, buf);
      return buf;
    } catch (e) {
      if (String(e.message).startsWith('SHA-256 mismatch')) throw e; // different bytes: retrying cannot help
      lastError = e;
    }
  }
  throw new Error(`Could not download ${url}: ${lastError?.message ?? lastError}`);
}

/** First line of an OFL.txt: the copyright notice. */
const copyrightOf = (licenseText) => licenseText.split(/\r?\n/)[0].trim();

/** The part of an OFL.txt before the license text itself: the copyright statements, where a Reserved Font Name is declared. */
const headerOf = (licenseText) => licenseText.split(/This Font Software is licensed under/i)[0];

/** Writes `data` (a Buffer, or a string written as UTF-8) to `path` through a temporary file in the same folder, then renames it over `path`, so a file is never left half written. */
function writeFileAtomic(path, data) {
  const tmp = `${path}.tmp-${process.pid}`;
  try {
    writeFileSync(tmp, data);
    renameSync(tmp, path);
  } catch (e) {
    rmSync(tmp, { force: true });
    throw e;
  }
}

rmSync(stagedDir, { recursive: true, force: true }); // nothing left over from an earlier run
mkdirSync(stagedDir, { recursive: true }); // also creates workDir

const manifest = {
  _comment: 'Generated by scripts/make-hero-fonts.mjs. Do not edit by hand: change a tagline in a dictionary and run the script again.',
  generator: { script: 'scripts/make-hero-fonts.mjs', version: GENERATOR_VERSION, generated: new Date().toISOString().slice(0, 10) },
  source: { repository: 'https://github.com/google/fonts', commit: GOOGLE_FONTS_COMMIT },
  fonts: {},
};
/** What each finished language will put in outDir: its WOFF2, its OFL text, and the line to print. Filled in the loop, written after it. */
const staged = [];

for (const [code, f] of Object.entries(FONTS)) {
  const hero = { ...en.hero, ...f.dict.hero };
  const chars = heroChars(hero);
  const fontUrl = `${RAW}/${f.dir}/${f.file}`;
  const licenseUrl = `${RAW}/${f.dir}/OFL.txt`;

  await fetchPinned(fontUrl, `${f.dir}-${f.file}`, f.sha256); // leaves the verified TTF in the cache; the subset step reads it from there
  const licenseBuf = await fetchPinned(licenseUrl, `${f.dir}-OFL.txt`, f.licenseSha256);
  const licenseText = licenseBuf.toString('utf8');
  if (/reserved font name/i.test(headerOf(licenseText))) {
    throw new Error(`${f.family}: the copyright statement of its OFL.txt names a Reserved Font Name, so a subset must not be published under the original name.\n  ${licenseUrl}`);
  }

  const sourceTtf = join(workDir, 'download', `${f.dir}-${f.file}`);
  const charsFile = join(workDir, `${code}.chars.txt`);
  const reportFile = join(workDir, `${code}.report.json`);
  const outFile = join(stagedDir, f.out); // staged here; copied to outDir only after every language has succeeded
  writeFileSync(charsFile, chars, 'utf8');
  rmSync(reportFile, { force: true }); // a report left by an earlier run must never be mistaken for this run's

  const run = spawnSync(
    'uv',
    ['run', '--quiet', '--script', join(root, 'scripts', 'subset-hero-font.py'), '--font', sourceTtf, '--text-file', charsFile, '--out', outFile, '--report', reportFile],
    { encoding: 'utf8', cwd: root, timeout: UV_TIMEOUT_MS },
  );
  if (run.error?.code === 'ETIMEDOUT') {
    throw new Error(
      `${code}: the subset step (uv run scripts/subset-hero-font.py) did not finish within ${UV_TIMEOUT_MS / 60_000} minutes and was stopped. ` +
        'On a first run uv downloads Python and fontTools, so the usual cause is a slow or blocked network; check the connection and run this script again. ' +
        'Nothing in src/assets/fonts/hero/ was changed.',
    );
  }
  if (run.error) {
    throw new Error(`Could not run uv (${run.error.code ?? run.error.message}). Install uv from https://docs.astral.sh/uv/ and run this script again.`);
  }
  if (run.status !== 0) {
    throw new Error(`${code}: the subset step failed (exit ${run.status})\n${(run.stderr || run.stdout || '').trim()}`);
  }
  const report = JSON.parse(readFileSync(reportFile, 'utf8'));
  if (report.missing !== '') throw new Error(`${code}: the font ${f.family} has no glyph for: ${report.missing}`);
  if (report.reservedFontNameInSource.length > 0) {
    throw new Error(`${f.family}: its name table declares a Reserved Font Name (${report.reservedFontNameInSource.join(' | ')}), so a subset must not be published under the original name.`);
  }

  const outBuf = readFileSync(outFile);
  manifest.generator.fontTools ??= report.fontTools;
  manifest.generator.brotli ??= report.brotli;
  manifest.fonts[code] = {
    family: f.family,
    license: 'OFL-1.1',
    copyright: copyrightOf(licenseText),
    weight: 400,
    sourceUrl: fontUrl,
    sourceSha256: f.sha256,
    licenseUrl,
    licenseSha256: f.licenseSha256,
    file: f.out,
    bytes: outBuf.length,
    sha256: sha256(outBuf),
    glyphs: report.glyphCount,
    chars: report.covered,
  };
  staged.push({
    woff2: { name: f.out, data: outBuf },
    license: { name: `OFL-${f.family.replace(/\s+/g, '')}.txt`, data: licenseBuf },
    summary: `${code.padEnd(6)} ${f.family.padEnd(16)} ${String([...report.covered].length).padStart(3)} characters  ${String(outBuf.length).padStart(6)} bytes  ${f.out}`,
  });
}

// Every language has succeeded. Only now does anything in outDir change: fonts and licenses first, manifest.json last,
// so a run that dies half way leaves a manifest that no longer matches the new fonts, which the build check reports.
mkdirSync(outDir, { recursive: true });
for (const s of staged) {
  writeFileAtomic(join(outDir, s.woff2.name), s.woff2.data);
  writeFileAtomic(join(outDir, s.license.name), s.license.data);
}
writeFileAtomic(join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
for (const s of staged) console.log(s.summary);
console.log(`wrote ${join('src', 'assets', 'fonts', 'hero', 'manifest.json')}`);
