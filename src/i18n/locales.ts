/**
 * The one place that lists the site's languages.
 * The globe menu, the hreflang alternates, the URL prefixes and the Astro i18n config
 * (astro.config.mjs) all read from here.
 *
 * To add a language:
 *   1. add an entry below,
 *   2. add a dictionary file next to en.ts (start from `{}`; missing keys fall back to English),
 *   3. register that dictionary in the DICTS map in index.ts.
 */
export interface LocaleInfo {
  /** URL path segment (/zh-tw/), the value saved in localStorage as `aiuc-lang`, and the dictionary key. */
  code: string;
  /** The language's own name, shown in the language menu. */
  label: string;
  /** Value of <html lang> on a fully translated page. */
  htmlLang: string;
  /** Value of hreflang on <link rel="alternate">. */
  hreflang: string;
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES: readonly LocaleInfo[] = [
  { code: 'en', label: 'English', htmlLang: 'en', hreflang: 'en' },
  { code: 'zh-tw', label: '繁體中文', htmlLang: 'zh-Hant-TW', hreflang: 'zh-TW' },
  { code: 'zh-cn', label: '简体中文', htmlLang: 'zh-Hans-CN', hreflang: 'zh-CN' },
];

export function getLocale(code: string): LocaleInfo {
  const found = LOCALES.find((l) => l.code === code);
  if (!found) throw new Error(`Unknown locale code: ${code}`);
  return found;
}
