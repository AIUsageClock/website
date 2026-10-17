// /sitemap.xml: one <url> per language home page, each with the hreflang alternates of all the languages plus x-default.
// The language list comes from i18n/locales.ts, so adding a language there adds it here with no change to this file.
// The alternates are the very list BaseLayout.astro writes into each page as <link rel="alternate">: both call
// hreflangAlternates() in i18n/alternates.ts, so the sitemap and the pages cannot disagree.
// A language whose dictionary is not complete yet (its page is noindex) is listed all the same: see alternates.ts.
// Not listed: "/" (a redirect page that only picks a language) and the 404 page.
import type { APIRoute } from 'astro';
import { LOCALES } from '../i18n/locales';
import { hreflangAlternates, localeUrl } from '../i18n/alternates';

const xmlEscape = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('sitemap.xml needs "site" in astro.config.mjs');

  const links = hreflangAlternates('', site)
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${xmlEscape(a.hreflang)}" href="${xmlEscape(a.href)}"/>`)
    .join('\n');
  const urls = LOCALES.map((l) => `  <url>\n    <loc>${xmlEscape(localeUrl(l.code, '', site))}</loc>\n${links}\n  </url>`).join('\n');

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    `${urls}\n` +
    '</urlset>\n';

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
