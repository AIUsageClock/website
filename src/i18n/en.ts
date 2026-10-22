/**
 * English copy: the complete reference dictionary.
 * Other languages only need the keys they translate; `t()` fills the rest from here.
 *
 * Conventions
 *  - A key that ends in `Html` holds a small piece of trusted HTML (<strong>, <em>, <code>, <a>)
 *    and is rendered unescaped. Every other string is plain text.
 *    The build enforces this (html-check.ts): other tags, any attribute but a single href on <a>, and an href that does not
 *    start with https://, / or # stop it, in every language's dictionary.
 *  - Object keys are stable identifiers (they are also used for anchors and image lookup), not copy.
 */
import { LINKS, VERSION } from '../site.ts';

export const en = {
  meta: {
    title: 'AI Usage Clock — See every AI limit. Know every reset.',
    description:
      'One small desktop widget for the usage limits of your AI services. It also picks up Codex and Claude reset announcements.',
    /** Alt text of the link-preview image (public/og/<language>.png); describes what that picture shows. */
    ogAlt:
      'AI Usage Clock: "See every AI limit. Know every reset." next to a screenshot of the widget with usage bars for Claude, Codex, and Antigravity.',
  },

  a11y: {
    skip: 'Skip to content',
    language: 'Language',
    switchToDark: 'Switch to dark theme',
    switchToLight: 'Switch to light theme',
  },

  header: {
    download: 'Download',
  },

  hero: {
    kicker: 'Desktop widget · Open source',
    line1: 'See every AI limit.',
    line2: 'Know every reset.',
    lede: 'One small desktop widget for the usage limits of your AI services. It also picks up Codex and Claude reset announcements: a heads-up when a reset is announced ahead of time, and a place to look when your usage suddenly drops to zero.',
    download: 'Download',
    github: 'View on GitHub',
    fine: `v${VERSION} · Windows · macOS beta · Linux beta`,
  },

  stories: {
    heading: 'Why AI Usage Clock',
    problemLabel: 'The problem',
    fixLabel: 'The fix',
    items: {
      overview: {
        problem: 'Every AI service keeps its limits in its own corner.',
        heading: 'Your AI limits in one place.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot, OpenRouter, and Linear, side by side, each with its own usage bar. Active limits also show the time left next to the bar.',
        alt: 'AI Usage Clock full mode listing Claude, Codex, OpenCode, Copilot, and OpenRouter, each with usage bars and the time left',
        caption: 'One widget, several services, each with its own bar. Sample data.',
      },
      resets: {
        problem: 'Then your usage drops to zero, and you do not know why.',
        heading: 'A heads-up before some resets. A place to check after the sudden ones.',
        body: 'Turn on reset announcements and AI Usage Clock picks up Codex and Claude reset announcements. Some are announced ahead of time, so you can get ready. Others come out of nowhere: the tile keeps the latest announcement in view, with one click to the original post.',
        alt: 'The Codex Resets tile showing Reset, limits refilled, 1d ago, and the Claude Resets tile showing Banked, reset credit, 21d ago',
        caption:
          'The Codex Resets and Claude Resets tiles, captured from a running 1.0.0 release. Usage values reflect the time of capture.',
      },
      compact: {
        problem: 'Not every desk has room for another window.',
        heading: 'Small when you need it small.',
        body: 'Compact mode shrinks the widget to one pill per service.',
        alt: 'Compact mode: one pill per service',
        caption: 'Compact mode, one pill per service. Sample data.',
      },
    },
    also: {
      notify: {
        heading: 'Get notified when one appears',
        body: 'Optionally get a notification when a new announcement shows up (native notifications on Windows), with a separate switch for each type. Reset announcements and their notifications are off by default.',
      },
      local: {
        heading: 'It runs on your computer',
        body: "There is no AI Usage Clock account, server, or telemetry. API keys are kept in your operating system's secure storage.",
      },
    },
  },

  services: {
    label: 'Supported services',
    heading: 'What you see, and how it connects.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Plus the weekly Fable limit on plans that have one. Sign in through your browser (Google and passkeys work), or paste a session cookie.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Same as Claude: sign in through your browser, or paste a session cookie.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5-hour · Weekly',
        howHtml:
          'Gemini and Claude+GPT usage. Reads your local <code>agy</code> command-line tool; no account or key in the app.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'OpenCode API key.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Monthly AI credits',
        howHtml:
          "Used against your plan's allowance, resetting on the 1st. Fine-grained GitHub personal access token.",
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Spend today · This month',
        howHtml:
          'An optional daily budget; balance and model activity with a management key. OpenRouter API key.',
      },
      linear: {
        name: 'Linear',
        what: 'Issues · Free plan limit',
        howHtml:
          "A bar for the Free plan's limit of 250 unarchived issues; paid plans show <em>no limit</em>. Linear personal API key.",
      },
    },
    noteHtml:
      'Claude, Codex, and GitHub Copilot are on by default. The other services, and the reset announcements, are switched on in <strong>Settings</strong>. You can track more than one Claude, Codex, or OpenCode Go account.',
  },

  resets: {
    label: 'Reset announcements',
    heading: 'Three moments around a reset.',
    sub: 'AI Usage Clock picks up reset announcements, so you get a heads-up when one is announced ahead of time, and can see what happened when it was not.',
    items: {
      announced: {
        when: 'Ahead of time',
        tag: 'Announced',
        heading: 'A reset is announced before it happens.',
        body: 'That is your heads-up to get ready. This type comes from Codex. Beside it sits a Watch row, an AI forecast of how likely a reset is. It is not an announcement, and it never sends a notification.',
      },
      reset: {
        when: 'When it happens',
        tag: 'Reset',
        heading: 'Limits have been refilled.',
        body: 'The tile shows the latest event and how long ago it happened. Banked is a related type: you were granted a reset credit that you can redeem yourself. Claude shows Reset and Banked.',
      },
      silent: {
        when: 'Later, when usage reads zero',
        tag: '',
        heading: 'Some resets come out of nowhere.',
        body: 'When your usage suddenly drops to zero, open the tile to check whether a reset just happened. The latest announcement stays in view, with one click to the original post.',
      },
    },
    caveatHtml:
      '<strong>Optional, and off by default.</strong> Announcements come from two independent third-party trackers, codex-resets.com and claude-resets.com, and can be late or wrong, so check the original post. Notifications are optional too, with a separate switch for each type.',
  },

  faq: {
    label: 'FAQ',
    heading: 'Questions, answered plainly.',
    items: {
      howResets: {
        q: 'How do reset announcements work?',
        parasHtml: [
          'They are off by default. Turn them on under <strong>Settings → General</strong> with <strong>Codex Resets</strong> or <strong>Claude Resets</strong>. AI Usage Clock then reads codex-resets.com and claude-resets.com, asking each at most once every 15 minutes while the app runs.',
          'The tile shows the latest event and how long ago it happened, labeled <em>Announced</em> (Codex), <em>Reset</em>, or <em>Banked</em>. The data is compiled by third parties and can be late or wrong, so treat the original post as the source of truth.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Where does my data go?',
        parasHtml: [
          "Your settings, usage history, and sign-in sessions stay on your computer. Sessions and API keys are stored with your operating system's credential facilities. There is no telemetry and no AI Usage Clock server.",
          `The app connects directly to the services you turn on. If you enable reset announcements, it also contacts codex-resets.com and claude-resets.com; those sites see your IP address and the app's name and version. More in <a href="${LINKS.security}">SECURITY.md</a>.`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Is this affiliated with Anthropic, OpenAI, or Google?',
        parasHtml: [
          'No. AI Usage Clock is an independent open-source project, not made or endorsed by any of the services it shows. Provider pages and APIs can change without notice.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'SmartScreen or Gatekeeper warns on launch',
        parasHtml: ['The release builds are not code-signed, and SHA256 sums are published next to each archive.'],
        listHtml: [
          '<strong>Windows:</strong> click <strong>More info</strong>, then <strong>Run anyway</strong>.',
          '<strong>macOS:</strong> try to open the app once, then use <strong>Open Anyway</strong> in System Settings → Privacy &amp; Security. Or run <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code> once.',
          '<strong>Linux:</strong> make <code>ai-usage-clock</code> executable if it is not already.',
        ],
      },
      platforms: {
        q: 'Does it work on macOS and Linux?',
        parasHtml: [
          `Yes, with a caveat. Windows is the platform it is developed on and tested with real accounts. The macOS (a menu-bar item instead of a floating widget) and Linux builds are published, but refreshing real accounts has been verified on Windows 11 alone, so treat them as early-stage. Please <a href="${LINKS.issues}">open an issue</a> if something is off.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'Is it free?',
        parasHtml: [
          'Yes. It is free and open source under the MIT license. The services it shows need their own accounts or subscriptions.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Put every AI limit on your desktop.',
    body: 'Free and open source under the MIT license. Windows is the platform it is developed on; macOS and Linux builds are in beta.',
    download: 'Download',
    github: 'View on GitHub',
    smallHtml: `v${VERSION} · Windows · macOS beta · Linux beta. The builds are unsigned, so Windows or macOS may warn on the initial launch. <a href="#unsigned">Here is what to do.</a>`,
    iconAlt:
      'AI Usage Clock app icon: a clock face inside a ring that runs from green through yellow and orange to red',
  },

  footer: {
    tagline: 'See every AI limit. Know every reset.',
    links: {
      github: 'GitHub',
      download: 'Download',
      setup: 'Setup guide',
      usage: 'Daily use',
      mcp: 'MCP usage guard',
      changelog: 'Changelog',
      license: 'License (MIT)',
    },
    disclaimer:
      'AI Usage Clock is not affiliated with Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter, Linear, or any other provider. Product names belong to their owners.',
    version: `Current version ${VERSION} · Free and open source under the MIT license.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Choose your language',
  },

  /**
   * Used by the 404 page only. It is one file for every address, so it is not tied to one language: `heading` and `body` are
   * read from this (English) dictionary, and `back` is read from every language's dictionary, one link per language.
   * The root page has its own block above (`root`).
   */
  notFound: {
    heading: 'Page not found',
    body: 'This address does not lead to a page on this site. Check the link, or go back to the home page.',
    back: 'Back to the home page',
  },
};
