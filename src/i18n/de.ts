import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * German (Germany). Written natively in the voice of https://github.com/AIUsageClock/ai-usage-clock/blob/main/README.de.md, not translated
 * sentence by sentence; the facts follow en.ts key by key.
 * Address the reader as du, lowercase (as Apple's de-de support pages and most German open-source docs do).
 * Vocabulary: Rechner, herunterladen, anmelden, API-Schlüssel, Zugangsdaten, Benachrichtigung, Kachel (tile),
 * Kapsel (pill), Originalbeitrag (original post). Typography: „…“ quotes, spaced en dash, 15 Minuten.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Agreed wording: reset = der Reset, Banked = Reset-Gutschein, beta = Beta,
 * English-only docs are marked (englisch), as German Wikipedia marks English sources.
 * OS strings: SmartScreen "Weitere Informationen" / "Trotzdem ausführen" (third-party: pctipp.ch);
 * macOS "Systemeinstellungen", "Datenschutz & Sicherheit", "Dennoch öffnen"
 * (support.apple.com/de-de/guide/mac-help/mh40616/mac).
 * Length: the hero lines and the services `what` values are kept short (no long compounds). Measured with Fraunces at
 * 320px: each hero line wraps cleanly into two lines; "Jedes KI-Limit" was rejected because it breaks after "KI-".
 */
export const de: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock – Alle KI-Limits im Blick. Alle Resets auf dem Schirm.',
    description:
      'Ein kleines Desktop-Widget für die Nutzungslimits deiner KI-Dienste. Außerdem greift es Reset-Ankündigungen von Codex und Claude auf.',
    ogAlt:
      'AI Usage Clock: „Alle KI-Limits im Blick. Alle Resets auf dem Schirm.“ neben einem Screenshot des Widgets mit Verbrauchsbalken für Claude, Codex und Antigravity.',
  },

  a11y: {
    skip: 'Zum Inhalt springen',
    language: 'Sprache',
    switchToDark: 'Zum dunklen Design wechseln',
    switchToLight: 'Zum hellen Design wechseln',
  },

  header: {
    download: 'Herunterladen',
  },

  hero: {
    kicker: 'Desktop-Widget · Open Source',
    line1: 'Alle KI-Limits im Blick.',
    line2: 'Alle Resets auf dem Schirm.',
    lede: 'Ein kleines Desktop-Widget für die Nutzungslimits deiner KI-Dienste. Außerdem greift es Reset-Ankündigungen von Codex und Claude auf: Wird ein Reset vorab angekündigt, weißt du früher Bescheid, und steht dein Verbrauch plötzlich auf null, kannst du nachsehen, ob gerade einer stattgefunden hat.',
    download: 'Herunterladen',
    github: 'Auf GitHub ansehen',
    fine: `v${VERSION} · Windows · macOS Beta · Linux Beta`,
  },

  stories: {
    heading: 'Was das Tool kann',
    problemLabel: 'Das Problem',
    fixLabel: 'Die Lösung',
    items: {
      overview: {
        problem: 'Jeder KI-Dienst zeigt seine Limits woanders an.',
        heading: 'Deine KI-Limits an einem Ort.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot und OpenRouter nebeneinander, jeder Dienst mit eigenem Verbrauchsbalken. Bei laufenden Limits steht neben dem Balken außerdem die verbleibende Zeit.',
        alt: 'AI Usage Clock im Vollmodus mit Claude, Codex, OpenCode, Copilot und OpenRouter, jeweils mit Verbrauchsbalken und verbleibender Zeit',
        caption: 'Ein Widget, mehrere Dienste, jeder mit eigenem Balken. Beispieldaten.',
      },
      resets: {
        problem: 'Dann steht dein Verbrauch plötzlich auf null, und du weißt nicht, warum.',
        heading: 'Angekündigte Resets vorher sehen. Überraschende hinterher nachprüfen.',
        body: 'Schalte die Reset-Ankündigungen ein, dann greift AI Usage Clock die Ankündigungen von Codex und Claude auf. Manche Resets werden vorab angekündigt, sodass du dich darauf einstellen kannst. Andere kommen aus heiterem Himmel: Die Kachel zeigt immer die neueste Ankündigung, und der Originalbeitrag ist nur einen Klick entfernt.',
        alt: 'Die Kachel Codex Resets zeigt Reset (Limits aufgefüllt, vor 1 Tag), die Kachel Claude Resets zeigt Banked (Reset-Gutschein, vor 21 Tagen)',
        caption:
          'Die Kacheln Codex Resets und Claude Resets, aufgenommen von einem laufenden Release 1.0.0. Die Verbrauchswerte entsprechen dem Zeitpunkt der Aufnahme.',
      },
      compact: {
        problem: 'Nicht auf jedem Bildschirm ist Platz für noch ein Fenster.',
        heading: 'Klein, wenn es klein sein soll.',
        body: 'Im Kompaktmodus schrumpft das Widget auf eine Kapsel pro Dienst.',
        alt: 'Kompaktmodus: eine Kapsel pro Dienst',
        caption: 'Kompaktmodus, eine Kapsel pro Dienst. Beispieldaten.',
      },
    },
    also: {
      notify: {
        heading: 'Benachrichtigung bei neuen Ankündigungen',
        body: 'Auf Wunsch bekommst du eine Benachrichtigung, sobald eine neue Ankündigung auftaucht (unter Windows über die systemeigenen Benachrichtigungen); für jeden Typ gibt es einen eigenen Schalter. Reset-Ankündigungen und ihre Benachrichtigungen sind standardmäßig deaktiviert.',
      },
      local: {
        heading: 'Läuft auf deinem Rechner',
        body: 'Es gibt weder ein Konto noch einen Server von AI Usage Clock, und auch keine Telemetrie. API-Schlüssel liegen im sicheren Speicher deines Betriebssystems.',
      },
    },
  },

  services: {
    label: 'Unterstützte Dienste',
    heading: 'Was du siehst und wie die Verbindung läuft.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Dazu das wöchentliche Fable-Limit in Tarifen, die eines haben. Anmeldung über deinen Browser (Google-Konto und Passkeys funktionieren) oder per eingefügtem Session-Cookie.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Wie bei Claude: Anmeldung über deinen Browser oder per eingefügtem Session-Cookie.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 Stunden · Weekly',
        howHtml:
          'Nutzung von Gemini und von Claude+GPT. Liest dein lokales Kommandozeilentool <code>agy</code> aus; in der App brauchst du weder Konto noch Schlüssel.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'API-Schlüssel von OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'KI-Credits pro Monat',
        howHtml:
          'Gemessen am Kontingent deines Tarifs, Reset am Monatsersten. Fine-grained personal access token von GitHub.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Ausgaben heute · im Monat',
        howHtml:
          'Optional ein Tagesbudget; mit einem Management-Schlüssel auch Guthaben und Aktivität pro Modell. API-Schlüssel von OpenRouter.',
      },
    },
    noteHtml:
      'Claude, Codex und GitHub Copilot sind von Anfang an aktiv. Die übrigen Dienste und die Reset-Ankündigungen schaltest du unter <strong>Settings</strong> (den Einstellungen der App) ein. Von Claude, Codex und OpenCode Go kannst du jeweils auch mehrere Konten im Blick behalten.',
  },

  resets: {
    label: 'Reset-Ankündigungen',
    heading: 'Drei Momente rund um einen Reset.',
    sub: 'AI Usage Clock greift Reset-Ankündigungen auf: Wird ein Reset vorab angekündigt, weißt du früher Bescheid. Kam er unangekündigt, kannst du nachsehen, was passiert ist.',
    items: {
      announced: {
        when: 'Vorab',
        tag: 'Announced (angekündigt)',
        heading: 'Ein Reset wird angekündigt, bevor er passiert.',
        body: 'Das ist deine Vorwarnung, dich darauf einzustellen. Diesen Typ gibt es bei Codex. Daneben steht die Zeile Watch (Prognose), eine KI-Schätzung, wie wahrscheinlich ein Reset ist. Eine Ankündigung ist das nicht, und eine Benachrichtigung löst sie nie aus.',
      },
      reset: {
        when: 'Wenn es passiert',
        tag: 'Reset (zurückgesetzt)',
        heading: 'Die Limits wurden wieder aufgefüllt.',
        body: 'Die Kachel zeigt das jüngste Ereignis und wie lange es her ist. Verwandt ist der Typ Banked (Reset-Gutschein): Du hast einen Reset-Gutschein bekommen, den du selbst einlösen kannst. Claude zeigt Reset und Banked.',
      },
      silent: {
        when: 'Später, wenn der Verbrauch auf null steht',
        tag: '',
        heading: 'Manche Resets kommen aus heiterem Himmel.',
        body: 'Steht dein Verbrauch plötzlich auf null, öffne die Kachel und sieh nach, ob gerade ein Reset stattgefunden hat. Die neueste Ankündigung bleibt sichtbar, und der Originalbeitrag ist nur einen Klick entfernt.',
      },
    },
    caveatHtml:
      '<strong>Optional und standardmäßig deaktiviert.</strong> Die Ankündigungen stammen von zwei unabhängigen Trackern Dritter, codex-resets.com und claude-resets.com, und können verspätet oder falsch sein; maßgeblich ist der Originalbeitrag. Auch die Benachrichtigungen sind optional, mit einem eigenen Schalter für jeden Typ.',
  },

  faq: {
    label: 'Häufige Fragen',
    heading: 'Fragen, ohne Umschweife beantwortet.',
    items: {
      howResets: {
        q: 'Wie funktionieren die Reset-Ankündigungen?',
        parasHtml: [
          'Standardmäßig sind sie deaktiviert. Einschalten kannst du sie unter <strong>Settings → General</strong> mit <strong>Codex Resets</strong> oder <strong>Claude Resets</strong>. AI Usage Clock liest dann codex-resets.com und claude-resets.com und fragt jede der beiden Seiten höchstens alle 15 Minuten ab, solange die App läuft.',
          'Die Kachel zeigt das jüngste Ereignis und wie lange es her ist, gekennzeichnet als <em>Announced</em> (angekündigt, nur Codex), <em>Reset</em> (zurückgesetzt) oder <em>Banked</em> (Reset-Gutschein). Die Daten stammen von Dritten und können verspätet oder falsch sein; maßgeblich ist immer der Originalbeitrag.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Wohin gehen meine Daten?',
        parasHtml: [
          'Einstellungen, Nutzungsverlauf und Anmeldesitzungen bleiben auf deinem Rechner. Sitzungen und API-Schlüssel werden mit den Bordmitteln deines Betriebssystems für Zugangsdaten gespeichert. Es gibt keine Telemetrie und keinen Server von AI Usage Clock.',
          `Die App verbindet sich direkt mit den Diensten, die du einschaltest. Wenn du die Reset-Ankündigungen einschaltest, kontaktiert sie außerdem codex-resets.com und claude-resets.com; diese Seiten sehen deine IP-Adresse sowie Namen und Version der App. Mehr dazu in <a href="${LINKS.security}">SECURITY.md</a> (englisch).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Hat das etwas mit Anthropic, OpenAI oder Google zu tun?',
        parasHtml: [
          'Nein. AI Usage Clock ist ein unabhängiges Open-Source-Projekt, weder von einem der angezeigten Dienste entwickelt noch von einem befürwortet. Seiten und APIs der Anbieter können sich ohne Vorankündigung ändern.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'Warnung von SmartScreen oder Gatekeeper beim Start',
        parasHtml: [
          'Die Release-Builds sind nicht codesigniert. Neben jedem Archiv werden SHA256-Prüfsummen veröffentlicht.',
        ],
        listHtml: [
          '<strong>Windows:</strong> Klicke auf <strong>Weitere Informationen</strong> und dann auf <strong>Trotzdem ausführen</strong>.',
          '<strong>macOS:</strong> Versuche einmal, die App zu öffnen, und klicke dann unter Systemeinstellungen → Datenschutz &amp; Sicherheit auf <strong>Dennoch öffnen</strong>. Alternativ führst du einmal <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code> aus.',
          '<strong>Linux:</strong> Setze bei <code>ai-usage-clock</code> das Ausführungsrecht, falls es noch fehlt.',
        ],
      },
      platforms: {
        q: 'Läuft es auch unter macOS und Linux?',
        parasHtml: [
          `Ja, aber mit einer Einschränkung. Entwickelt wird unter Windows, und dort wird auch mit echten Konten getestet. Die Builds für macOS (dort ein Eintrag in der Menüleiste statt eines schwebenden Widgets) und Linux werden veröffentlicht, das Aktualisieren echter Konten ist bisher aber nur unter Windows 11 geprüft. Betrachte sie deshalb als Beta. Wenn etwas nicht stimmt, <a href="${LINKS.issues}">eröffne gern ein Issue</a>.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'Ist es kostenlos?',
        parasHtml: [
          'Ja. Es ist kostenlos und Open Source unter der MIT-Lizenz. Für die angezeigten Dienste brauchst du jeweils eigene Konten oder Abos.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Hol dir alle KI-Limits auf den Desktop.',
    body: 'Kostenlos und Open Source unter der MIT-Lizenz. Entwickelt wird unter Windows; die Builds für macOS und Linux sind im Beta-Stadium.',
    download: 'Herunterladen',
    github: 'Auf GitHub ansehen',
    smallHtml: `v${VERSION} · Windows · macOS Beta · Linux Beta. Die Builds sind nicht signiert, deshalb kann Windows oder macOS beim ersten Start warnen. <a href="#unsigned">So gehst du vor.</a>`,
    iconAlt:
      'App-Symbol von AI Usage Clock: ein Zifferblatt in einem Ring, der von Grün über Gelb und Orange zu Rot verläuft',
  },

  footer: {
    tagline: 'Alle KI-Limits im Blick. Alle Resets auf dem Schirm.',
    links: {
      github: 'GitHub',
      download: 'Herunterladen',
      setup: 'Einrichtungsanleitung (englisch)',
      usage: 'Tägliche Nutzung (englisch)',
      mcp: 'MCP-Nutzungswächter (englisch)',
      changelog: 'Änderungsprotokoll (englisch)',
      license: 'Lizenz (MIT)',
    },
    disclaimer:
      'AI Usage Clock steht in keiner Verbindung zu Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter oder anderen Anbietern. Produktnamen gehören ihren jeweiligen Inhabern.',
    version: `Aktuelle Version ${VERSION} · Kostenlos und Open Source unter der MIT-Lizenz.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Sprache wählen',
  },

  notFound: {
    heading: 'Seite nicht gefunden',
    body: 'Unter dieser Adresse gibt es auf dieser Website keine Seite. Prüfe den Link oder kehre zur Startseite zurück.',
    back: 'Zurück zur Startseite',
  },
};
