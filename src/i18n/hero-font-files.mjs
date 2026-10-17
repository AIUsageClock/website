/**
 * Build-time check that the hero tagline font files are the files manifest.json describes.
 *
 * hero-font-check.ts compares every tagline with the list of characters the manifest records for its font, but that list says
 * nothing about the WOFF2 itself: a font that was edited, replaced, or half written by an interrupted run of
 * scripts/make-hero-fonts.mjs would still pass. findHeroFontFileProblems() reads each WOFF2 and compares its size and
 * SHA-256 with the manifest; i18n/index.ts runs it when it is imported and throws on any problem, so the build stops and names
 * the file and the command that makes the fonts again.
 *
 * Plain JavaScript on purpose: it needs Node's fs and crypto, and this project has no Node type definitions (no @types/node),
 * so `astro check` would reject the same code in a .ts file. The JSDoc types below are what TypeScript sees at the call site.
 * It imports only Node built-ins, so Node can load it directly.
 */

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Folder that holds the fonts and manifest.json, taken from the working directory: the site root, where `astro build` and
 * `astro dev` run. Not from import.meta.url: in a build the code that imports this is bundled into dist/.prerender/chunks/,
 * which is nowhere near src/.
 * @returns {string}
 */
export function defaultHeroFontDir() {
  return join(process.cwd(), 'src', 'assets', 'fonts', 'hero');
}

/**
 * One message per language whose WOFF2 in `dir` is not the file the manifest describes: missing or unreadable, a different
 * size, or a different SHA-256 (empty when all is well). Every language is checked, so one run lists all the files that are wrong.
 * @param {{ fonts: Record<string, { file: string, bytes: number, sha256: string }> }} manifest what manifest.json records, per language code
 * @param {string} dir the folder that holds the WOFF2 files (`manifest.fonts[code].file` is a name inside it)
 * @returns {string[]}
 */
export function findHeroFontFileProblems(manifest, dir) {
  const problems = [];
  for (const [code, font] of Object.entries(manifest.fonts)) {
    const path = join(dir, font.file);
    let data;
    try {
      data = readFileSync(path);
    } catch (e) {
      problems.push(`"${code}": cannot read the hero font file ${path}: ${e instanceof Error ? e.message : String(e)}.`);
      continue;
    }
    const sha256 = createHash('sha256').update(data).digest('hex');
    const differences = [];
    if (data.length !== font.bytes) differences.push(`${data.length} bytes, manifest.json says ${font.bytes}`);
    if (sha256 !== font.sha256) differences.push(`SHA-256 ${sha256}, manifest.json says ${font.sha256}`);
    if (differences.length > 0) {
      problems.push(`"${code}": ${font.file} is not the file manifest.json describes (${differences.join('; ')}).`);
    }
  }
  return problems;
}
