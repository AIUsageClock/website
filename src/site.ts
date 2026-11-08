/** Constants shared by the dictionaries and components. */

export const SITE_NAME = 'AI Usage Clock';

/** Shown in the hero, the download card and the footer. Update when a new release ships. */
export const VERSION = '1.1.0';

export const REPO = 'https://github.com/AIUsageClock/ai-usage-clock';

/**
 * The donation address (EIP-55 checksum case, a plain wallet on both Ethereum and Polygon). This is the only place it is written:
 * the dictionaries never repeat it, and the QR code in src/assets/donate-qr.svg is generated from this value by
 * scripts/make-donate-qr.py (which reads it from this line), so change it here and run that script again.
 */
export const DONATE_ADDRESS = '0x6c60bFCaDfb3AD63eC6D821baB0E6323361BFD4f';

/**
 * Documents that have a translated copy in the product repository, by locale code.
 * The file name is `<doc>.md` for English and `<doc>.<suffix>.md` for the others (docs/setup.zh-TW.md).
 * A language that is not listed, or a document that is not translated (mcp.md, SECURITY.md), links to the English file.
 * Paths were checked against `git ls-tree -r --name-only main` of the product repository.
 */
const DOC_SUFFIX: Record<string, string> = {
  'zh-tw': '.zh-TW',
  'zh-cn': '.zh-CN',
};

/** Link to a translated guide in the product repository, in the visitor's language when a translation exists. */
export function docLink(doc: 'setup' | 'usage', lang: string): string {
  return `${REPO}/blob/main/docs/${doc}${DOC_SUFFIX[lang] ?? ''}.md`;
}

/**
 * Every outbound link to the product repository.
 * `setup` and `usage` are the English guides; use `docLink()` where the page language is known.
 */
export const LINKS = {
  repo: REPO,
  releases: `${REPO}/releases/latest`,
  issues: `${REPO}/issues`,
  security: `${REPO}/blob/main/SECURITY.md`,
  setup: docLink('setup', 'en'),
  usage: docLink('usage', 'en'),
  mcp: `${REPO}/blob/main/docs/mcp.md`,
  changelog: `${REPO}/blob/main/CHANGELOG.md`,
  license: `${REPO}/blob/main/LICENSE`,
  /** The README's Donate section, which repeats the address so a visitor can compare the two copies. */
  donate: `${REPO}#donate`,
} as const;
