/**
 * Build-time check for the hero tagline fonts.
 *
 * The Traditional Chinese, Simplified Chinese and Japanese pages set the two big tagline lines (hero.line1, hero.line2) in
 * their own font, and ship it as a small WOFF2 that holds only the characters of those two lines
 * (src/assets/fonts/hero/, made by scripts/make-hero-fonts.mjs, which also writes manifest.json next to the fonts).
 * Change a tagline and the new characters are not in that file: the browser would quietly draw them in the next font of the stack.
 * findHeroFontProblems() compares every tagline with the characters its font file covers; i18n/index.ts runs it when it is
 * imported and throws on any problem, so the build stops and names the characters and the command that fixes it.
 *
 * heroChars() is also what scripts/make-hero-fonts.mjs uses to decide which characters to keep, so the two cannot disagree.
 * This module imports nothing, so Node can load it directly (the generator script does).
 *
 * This file only trusts manifest.json's list of characters. That the font files really are the ones the manifest describes
 * (size, SHA-256) is checked by hero-font-files.mjs, which i18n/index.ts runs next to this check. It is a plain .mjs file
 * because it needs Node's fs and crypto and this project has no Node type definitions (no @types/node).
 */

/** The tagline of a language: the two big hero lines. */
export interface HeroLines {
  line1: string;
  line2: string;
}

/** The part of manifest.json this check reads: for each language code, the characters its font file covers. */
export interface HeroFontManifest {
  fonts: Record<string, { family: string; chars: string }>;
}

/** Every distinct character (code point) of both tagline lines, spaces and punctuation included, in code point order. */
export function heroChars(hero: HeroLines): string {
  const seen = new Set<string>(hero.line1 + hero.line2);
  return [...seen].sort((a, b) => (a.codePointAt(0) as number) - (b.codePointAt(0) as number)).join('');
}

/** "看 (U+770B)": a character in the form the build message shows it. */
function describe(ch: string): string {
  const cp = (ch.codePointAt(0) as number).toString(16).toUpperCase().padStart(4, '0');
  return ch === ' ' ? `space (U+${cp})` : `${ch} (U+${cp})`;
}

/**
 * One message per language whose tagline uses a character that its font file does not cover (empty when all is well).
 * `heroes` maps a language code to its tagline as the page shows it (English wherever a dictionary has no text);
 * a language in the manifest with no tagline in `heroes` is a problem too.
 */
export function findHeroFontProblems(heroes: Record<string, HeroLines | undefined>, manifest: HeroFontManifest): string[] {
  const problems: string[] = [];
  for (const [code, font] of Object.entries(manifest.fonts)) {
    const hero = heroes[code];
    if (!hero) {
      problems.push(`"${code}": the manifest has a hero font (${font.family}) but there is no tagline for this language.`);
      continue;
    }
    const covered = new Set<string>(font.chars);
    const missing = [...heroChars(hero)].filter((ch) => !covered.has(ch));
    if (missing.length > 0) {
      problems.push(`"${code}": the tagline uses ${missing.length} character(s) that the hero font ${font.family} does not cover: ${missing.map(describe).join(', ')}.`);
    }
  }
  return problems;
}
