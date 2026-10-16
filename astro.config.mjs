// @ts-check
import { defineConfig } from 'astro/config';
import { LOCALES, DEFAULT_LOCALE } from './src/i18n/locales.ts';

// i18n option names and defaults verified against the installed Astro 7.3.8
// (node_modules/astro/dist/core/config/schemas/base.js):
//   routing.prefixDefaultLocale      default false  -> true here: /en/, /zh-tw/, /zh-cn/
//   routing.redirectToDefaultLocale  default false  -> kept false, so "/" is served by
//                                     src/pages/index.astro (a custom redirect page)
//                                     instead of a built-in redirect to /en/
export default defineConfig({
  site: 'https://aiusageclock.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES.map((l) => ({ path: l.code, codes: [l.hreflang] })),
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
