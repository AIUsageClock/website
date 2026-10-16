/**
 * Dictionary lookup with English fallback.
 *
 *   t('zh-tw')           -> every string for that language, English wherever it has no translation
 *   isComplete('zh-tw')  -> true only when the language translates every English key
 *   htmlLangFor('zh-tw') -> <html lang> to use: the language's own tag when complete, "en" otherwise
 *
 * Pages that are not fully translated are served with <html lang="en"> and <meta name="robots" content="noindex">,
 * so a half-translated page is never labelled as, or indexed as, the other language.
 */
import { en } from './en';
import { zhTw } from './zh-tw';
import { zhCn } from './zh-cn';
import { ja } from './ja';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { DEFAULT_LOCALE, getLocale } from './locales';

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

type Tree = string | Tree[] | { [key: string]: Tree };

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** English structure, overridden by whatever the translation provides. */
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

/** True when `over` provides every string that `base` has. */
function covers(base: Tree, over: unknown): boolean {
  if (typeof base === 'string') return typeof over === 'string';
  if (Array.isArray(base)) {
    if (base.length === 0) return true;
    return Array.isArray(over) && over.length === base.length && base.every((b, i) => covers(b, over[i]));
  }
  if (!isRecord(over)) return false;
  return Object.keys(base).every((key) => covers(base[key] as Tree, over[key]));
}

export function t(code: string): Messages {
  return merge(en as Tree, DICTS[code]) as Messages;
}

export function isComplete(code: string): boolean {
  return covers(en as Tree, DICTS[code]);
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
