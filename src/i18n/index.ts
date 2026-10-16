/**
 * Dictionary lookup with English fallback.
 *
 *   t('zh-tw')            -> every string for that language, English wherever it has no translation
 *   isComplete('zh-tw')   -> true only when nothing English has is missing from that language
 *   missingPaths('zh-tw') -> what is missing: key paths, plus "faq.items.unsigned.listHtml: en 3 / zh-tw 2" for a list shorter than English
 *   extraPaths('zh-tw')   -> what is extra: "faq.items.data.parasHtml: en 2 / zh-tw 3" for a list longer than English
 *   htmlLangFor('zh-tw')  -> <html lang> to use: the language's own tag when complete, "en" otherwise
 *
 * Pages that are not fully translated are served with <html lang="en"> and <meta name="robots" content="noindex">,
 * so a half-translated page is never labelled as, or indexed as, the other language. The build does not fail for it, but
 * [lang]/index.astro prints missingPaths() as a warning, so a gap is never silent.
 * A list that is longer than English does not make the page incomplete (every English string is translated). Its extra items
 * are dropped by merge(), so they never appear on the page, and [lang]/index.astro prints extraPaths() as a warning for them.
 *
 * Importing this module also checks every `...Html` string of every dictionary (html-check.ts) and throws on markup that
 * is not allowed, which stops the build. The problems of all the dictionaries are reported together.
 */
import { en } from './en';
import { zhTw } from './zh-tw';
import { zhCn } from './zh-cn';
import { ja } from './ja';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { DEFAULT_LOCALE, getLocale } from './locales';
import { findHtmlProblems } from './html-check';

type Widen<T> = T extends string ? string : T extends readonly (infer U)[] ? Widen<U>[] : { [K in keyof T]: Widen<T[K]> };

/** The shape every dictionary follows, derived from the English one. */
export type Messages = Widen<typeof en>;

export type DeepPartial<T> = T extends readonly (infer U)[]
  ? DeepPartial<U>[]
  : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

/** Register a new language's dictionary here (and in locales.ts). */
const DICTS: Record<string, DeepPartial<Messages>> = {
  en,
  'zh-tw': zhTw,
  'zh-cn': zhCn,
  ja,
  es,
  fr,
  de,
};

// `set:html` renders the `...Html` strings unescaped, so refuse anything but the few allowed tags before any page is built.
// Every dictionary is checked before anything is thrown, so one run lists the problems of all of them, not only the first one's.
const markupReport: string[] = [];
for (const [code, dict] of Object.entries(DICTS)) {
  const problems = findHtmlProblems(dict);
  if (problems.length > 0) {
    markupReport.push(`  "${code}" (${problems.length}):`, ...problems.map((p) => `    ${p.path}: ${p.message}`));
  }
}
if (markupReport.length > 0) {
  throw new Error(`Markup that is not allowed in the dictionaries (see src/i18n/html-check.ts):\n${markupReport.join('\n')}`);
}

type Tree = string | Tree[] | { [key: string]: Tree };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * English structure, overridden by whatever the translation provides. A list longer than English has its extra items
 * dropped here (extraPaths() reports them), and a shorter one is filled up from English (missingPaths() reports it).
 */
function merge(base: Tree, over: unknown): Tree {
  if (typeof base === 'string') return typeof over === 'string' ? over : base;
  if (Array.isArray(base)) {
    const o = Array.isArray(over) ? over : [];
    return base.map((b, i) => merge(b, o[i]));
  }
  const o = isRecord(over) ? over : {};
  const out: Record<string, Tree> = {};
  for (const key of Object.keys(base)) out[key] = merge(base[key] as Tree, o[key]);
  return out;
}

/**
 * Compares `over` (the `code` dictionary) with `base` (English) and appends to
 *  - `missing`: the path of each missing string or sub-tree, and "path: en N / code M" for each list shorter than English;
 *  - `extra`: "path: en N / code M" for each list longer than English (merge() drops the extra items; nothing is missing).
 */
function gaps(base: Tree, over: unknown, path: string, code: string, missing: string[], extra: string[]): void {
  if (typeof base === 'string') {
    if (typeof over !== 'string') missing.push(path);
    return;
  }
  if (Array.isArray(base)) {
    if (over === undefined && base.length === 0) return;
    if (!Array.isArray(over)) {
      missing.push(path);
      return;
    }
    if (over.length < base.length) missing.push(`${path}: en ${base.length} / ${code} ${over.length}`);
    else if (over.length > base.length) extra.push(`${path}: en ${base.length} / ${code} ${over.length}`);
    for (let i = 0; i < Math.min(base.length, over.length); i++) gaps(base[i], over[i], `${path}[${i}]`, code, missing, extra);
    return;
  }
  if (!isRecord(over)) {
    missing.push(path || '(the whole dictionary)');
    return;
  }
  for (const key of Object.keys(base)) gaps(base[key] as Tree, over[key], path ? `${path}.${key}` : key, code, missing, extra);
}

export function t(code: string): Messages {
  return merge(en as Tree, DICTS[code]) as Messages;
}

/** Key paths where the language's dictionary lacks something English has (empty when it is complete); see gaps(). */
export function missingPaths(code: string): string[] {
  const missing: string[] = [];
  gaps(en as Tree, DICTS[code], '', code, missing, []);
  return missing;
}

/** Lists in the language's dictionary that are longer than English's: their extra items are never shown (merge() drops them); see gaps(). */
export function extraPaths(code: string): string[] {
  const extra: string[] = [];
  gaps(en as Tree, DICTS[code], '', code, [], extra);
  return extra;
}

/** True when nothing English has is missing. Extra list items do not count: every English string is still translated. */
export function isComplete(code: string): boolean {
  return missingPaths(code).length === 0;
}

/**
 * True when the language's own dictionary provides this string, e.g. hasKey('ja', 'notFound', 'back').
 * Lets a page that shows a single string of every language tag it with the language only when it really is in that language,
 * and with the fallback language (English) when it is not.
 */
export function hasKey(code: string, ...path: string[]): boolean {
  let node: unknown = DICTS[code];
  for (const key of path) {
    if (!isRecord(node)) return false;
    node = node[key];
  }
  return typeof node === 'string';
}

export function htmlLangFor(code: string): string {
  return isComplete(code) ? getLocale(code).htmlLang : getLocale(DEFAULT_LOCALE).htmlLang;
}
