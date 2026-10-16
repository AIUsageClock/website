/** Constants shared by the dictionaries and components. */

export const SITE_NAME = 'AI Usage Clock';

/** Shown in the hero, the download card and the footer. Update when a new release ships. */
export const VERSION = '1.0.0';

export const REPO = 'https://github.com/AIUsageClock/ai-usage-clock';

/**
 * Every outbound link to the product repository.
 * Documentation paths were checked against `git ls-tree -r --name-only main` of the product repository.
 */
export const LINKS = {
  repo: REPO,
  releases: `${REPO}/releases/latest`,
  issues: `${REPO}/issues`,
  security: `${REPO}/blob/main/SECURITY.md`,
  setup: `${REPO}/blob/main/docs/setup.md`,
  usage: `${REPO}/blob/main/docs/usage.md`,
  mcp: `${REPO}/blob/main/docs/mcp.md`,
  changelog: `${REPO}/blob/main/CHANGELOG.md`,
  license: `${REPO}/blob/main/LICENSE`,
} as const;
