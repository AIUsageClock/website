/**
 * The one place that lists the site's languages.
 * The globe menu, the hreflang alternates (the <link rel="alternate"> tags of the pages and the entries of /sitemap.xml,
 * both made by alternates.ts), the sitemap's list of pages, the URL prefixes and the Astro i18n config
 * (astro.config.mjs) all read from here.
 *
 * To add a language:
 *   1. add an entry below (the order here is the order of the language menu),
 *   2. add a dictionary file next to en.ts (start from `{}`; missing keys fall back to English),
 *   3. register that dictionary in the DICTS map in index.ts,
 *   4. if the language needs its own heading font, add it in BaseLayout.astro and the :lang() rules in global.css,
 *   5. `npm run og` to draw the link-preview image public/og/<code>.png.
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
  /** Value of og:locale: language_TERRITORY with an underscore, as the Open Graph protocol writes it. */
  ogLocale: string;
}

export const DEFAULT_LOCALE = 'en';

export const LOCALES: readonly LocaleInfo[] = [
  { code: 'en', label: 'English', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US' },
  { code: 'zh-tw', label: '繁體中文', htmlLang: 'zh-Hant-TW', hreflang: 'zh-TW', ogLocale: 'zh_TW' },
  { code: 'zh-cn', label: '简体中文', htmlLang: 'zh-Hans-CN', hreflang: 'zh-CN', ogLocale: 'zh_CN' },
  { code: 'ja', label: '日本語', htmlLang: 'ja', hreflang: 'ja', ogLocale: 'ja_JP' },
  // Latin-American Spanish: <html lang="es-419"> tells browsers and screen readers which Spanish it is,
  // while hreflang and og:locale carry the broader codes that search engines and Open Graph expect.
  { code: 'es', label: 'Español', htmlLang: 'es-419', hreflang: 'es', ogLocale: 'es_LA' },
  { code: 'fr', label: 'Français', htmlLang: 'fr-FR', hreflang: 'fr', ogLocale: 'fr_FR' },
  { code: 'de', label: 'Deutsch', htmlLang: 'de-DE', hreflang: 'de', ogLocale: 'de_DE' },
];

export function getLocale(code: string): LocaleInfo {
  const found = LOCALES.find((l) => l.code === code);
  if (!found) throw new Error(`Unknown locale code: ${code}`);
  return found;
}
