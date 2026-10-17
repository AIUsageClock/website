/**
 * The hreflang alternates of a page: the one list that both <link rel="alternate"> in BaseLayout.astro and the
 * <xhtml:link> entries of /sitemap.xml (pages/sitemap.xml.ts) are written from. It is a module of its own because both an
 * Astro layout and an API route need it, and the frontmatter of a .astro file cannot be imported.
 *
 * Every language in locales.ts is listed, plus x-default, which points at "/" (the page that sends the visitor to a language).
 * That includes a language whose dictionary is not complete yet: such a page is served with <html lang="en"> and
 * <meta name="robots" content="noindex"> (see i18n/index.ts), and it is still listed here and in the sitemap on purpose. The
 * alternates of a page must name all the language versions, and the same set on every one of them, so the version that is
 * not finished is not left out; once its dictionary is complete the page is in its place without anything to change here.
 */
import { LOCALES } from './locales';

export interface HreflangAlternate {
  /** Value of the hreflang attribute: a language code from locales.ts, or "x-default". */
  hreflang: string;
  /** Absolute URL of that language version. */
  href: string;
}

/** Absolute URL of a page under a language prefix: localeUrl('ja', '', site) is "https://example.com/ja/". `path` is "" for the home page. */
export function localeUrl(code: string, path: string, site: URL | undefined): string {
  if (!site) throw new Error('The site needs "site" in astro.config.mjs to build absolute URLs');
  return new URL(`/${code}/${path}`, site).href;
}

/**
 * hreflang alternates for a page that exists in every language: one per language in locales.ts, then x-default.
 * `path` is the page's path under each language prefix ("" for the home page, as `alternatePath` in BaseLayout.astro).
 */
export function hreflangAlternates(path: string, site: URL | undefined): HreflangAlternate[] {
  if (!site) throw new Error('The site needs "site" in astro.config.mjs to build the hreflang alternates');
  return [
    ...LOCALES.map((l) => ({ hreflang: l.hreflang, href: localeUrl(l.code, path, site) })),
    { hreflang: 'x-default', href: new URL('/', site).href },
  ];
}
