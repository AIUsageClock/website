import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Esperanto (standard orthography, Plena Ortografio: the letters ĉ ĝ ĥ ĵ ŝ ŭ, never the x-system). Written natively, not translated
 * sentence by sentence; the facts follow en.ts key by key. Address the reader as "vi". Computer vocabulary as used in the
 * Esperanto community: elŝuti, instali, ensaluti, API-ŝlosilo, komputilo, retumilo, labortablo.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Agreed wording: reset = restarigo, Banked = restarigkupono, tile = karto, default = norme,
 * usage bar = uzostrio, beta = beta, FAQ = oftaj demandoj, English-only docs are marked (en la angla).
 * Unconfirmed (native speaker please review): "passkeys, pasŝlosiloj", "ne ciferece subskribitaj" (code-signed), "karto" (tile),
 * "ĉifromono" (crypto), "uzostrio" (usage bar).
 * OS strings: Windows and macOS have no official Esperanto interface, so SmartScreen ("More info", "Run anyway") and the macOS
 * names ("System Settings", "Privacy & Security", "Open Anyway") stay in English, each followed by a short explanation in parentheses.
 */
export const eo: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — Vidu ĉiun AI-limon. Sciu ĉiun restarigon.',
    description:
      'Eta labortabla ilo por la uzlimoj de viaj AI-servoj. Ĝi ankaŭ kaptas la restarigajn anoncojn de Codex kaj Claude.',
    ogAlt:
      'AI Usage Clock: "Vidu ĉiun AI-limon. Sciu ĉiun restarigon." apud ekrankopio de la ilo kun uzostrioj por Claude, Codex kaj Antigravity.',
  },

  a11y: {
    skip: 'Salti al la enhavo',
    language: 'Lingvo',
    switchToDark: 'Ŝalti malhelan temon',
    switchToLight: 'Ŝalti helan temon',
  },

  header: {
    download: 'Elŝuti',
  },

  hero: {
    kicker: 'Labortabla ilo · Malfermita fonto',
    line1: 'Vidu ĉiun AI-limon.',
    line2: 'Sciu ĉiun restarigon.',
    lede: 'Eta labortabla ilo por la uzlimoj de viaj AI-servoj. Ĝi ankaŭ kaptas la restarigajn anoncojn de Codex kaj Claude: antaŭavizon, kiam restarigo estas anoncita antaŭtempe, kaj lokon por kontroli, kiam via uzo subite falas al nulo.',
    download: 'Elŝuti',
    github: 'Vidi en GitHub',
    fine: `v${VERSION} · Windows · macOS beta · Linux beta`,
  },

  stories: {
    heading: 'Kial AI Usage Clock',
    problemLabel: 'La problemo',
    fixLabel: 'La solvo',
    items: {
      overview: {
        problem: 'Ĉiu AI-servo tenas siajn limojn en sia propra angulo.',
        heading: 'Viaj AI-limoj en unu loko.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot, OpenRouter kaj Linear, flanko apud flanko, ĉiu kun sia propra uzostrio. Ĉe aktivaj limoj la restanta tempo aperas ankaŭ apud la strio.',
        alt: 'AI Usage Clock en plena reĝimo, listiganta Claude, Codex, OpenCode, Copilot kaj OpenRouter, ĉiun kun uzostrioj kaj restanta tempo',
        caption: 'Unu ilo, pluraj servoj, ĉiu kun sia propra strio. Ekzemplaj datumoj.',
      },
      resets: {
        problem: 'Poste via uzo falas al nulo, kaj vi ne scias kial.',
        heading: 'Antaŭavizo pri iuj restarigoj. Loko por kontroli post la subitaj restarigoj.',
        body: 'Ŝaltu la restarigajn anoncojn, kaj AI Usage Clock kaptos la anoncojn de Codex kaj Claude. Iuj estas anoncitaj antaŭtempe, do vi povas prepari vin. Aliaj okazas subite: la karto tenas la plej freŝan anoncon videbla, kun unu klako al la originala afiŝo.',
        alt: 'La karto Codex Resets montras Reset (limoj replenigitaj, antaŭ 1 tago), kaj la karto Claude Resets montras Banked (restarigkupono, antaŭ 21 tagoj)',
        caption:
          'La kartoj Codex Resets kaj Claude Resets, kaptitaj de funkcianta eldono 1.0.0. La uzaj valoroj respondas al la momento de la kapto.',
      },
      compact: {
        problem: 'Ne ĉiu labortablo havas lokon por ankoraŭ unu fenestro.',
        heading: 'Eta, kiam vi bezonas etan.',
        body: 'La kompakta reĝimo malgrandigas la ilon al unu kapsulo por ĉiu servo.',
        alt: 'Kompakta reĝimo: unu kapsulo por ĉiu servo',
        caption: 'Kompakta reĝimo, unu kapsulo por ĉiu servo. Ekzemplaj datumoj.',
      },
    },
    also: {
      notify: {
        heading: 'Sciigo, kiam aperas nova anonco',
        body: 'Laŭvole vi povas ricevi sciigon, kiam aperas nova anonco (sistemaj sciigoj de Windows), kun aparta ŝaltilo por ĉiu tipo. La restarigaj anoncoj kaj iliaj sciigoj estas norme malŝaltitaj.',
      },
      local: {
        heading: 'Ĝi funkcias en via komputilo',
        body: 'Ne ekzistas konto de AI Usage Clock, nek servilo, nek telemetrio. API-ŝlosiloj estas konservataj en la sekura stokejo de via operaciumo.',
      },
    },
  },

  services: {
    label: 'Subtenataj servoj',
    heading: 'Kion vi vidas, kaj kiel ĝi konektiĝas.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Krome la semajna limo de Fable ĉe planoj, kiuj havas tian. Ensalutu per via retumilo (Google kaj passkeys, pasŝlosiloj, funkcias), aŭ algluu seancan kuketon.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Same kiel Claude: ensalutu per via retumilo, aŭ algluu seancan kuketon.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 horoj · Weekly',
        howHtml:
          'Uzo de Gemini kaj de Claude+GPT. Ĝi legas vian lokan komandlinian ilon <code>agy</code>; nek konto nek ŝlosilo en la programo.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'API-ŝlosilo de OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Monataj AI-kreditoj',
        howHtml:
          'Kalkulitaj kontraŭ la inkluzivita kvanto de via plano, restarigataj je la 1-a. Fine-grained personal access token de GitHub.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Elspezo hodiaŭ · Ĉi tiu monato',
        howHtml:
          'Laŭvola taga buĝeto; saldo kaj agado de la modeloj per administra ŝlosilo. API-ŝlosilo de OpenRouter.',
      },
      linear: {
        name: 'Linear',
        what: 'Issues · Limo de la senpaga plano',
        howHtml:
          'Strio por la limo de 250 nearkivitaj issues en la senpaga plano; pagaj planoj montras <em>no limit</em>. Persona API-ŝlosilo de Linear.',
      },
    },
    noteHtml:
      'Claude, Codex kaj GitHub Copilot estas norme ŝaltitaj. La aliajn servojn, kaj la restarigajn anoncojn, vi ŝaltas en <strong>Settings</strong>. Vi povas sekvi pli ol unu konton de Claude, Codex aŭ OpenCode Go.',
  },

  resets: {
    label: 'Restarigaj anoncoj',
    heading: 'Tri momentoj ĉirkaŭ restarigo.',
    sub: 'AI Usage Clock kaptas restarigajn anoncojn, por ke vi ricevu antaŭavizon, kiam restarigo estas anoncita antaŭtempe, kaj povu vidi kio okazis, kiam ĝi ne estis.',
    items: {
      announced: {
        when: 'Antaŭtempe',
        tag: 'Announced (anoncita)',
        heading: 'Restarigo estas anoncita antaŭ ol ĝi okazas.',
        body: 'Tio estas via antaŭavizo por prepari vin. Ĉi tiu tipo venas de Codex. Apud ĝi staras vico Watch, AI-prognozo pri tio, kiom verŝajna estas restarigo. Ĝi ne estas anonco, kaj ĝi neniam sendas sciigon.',
      },
      reset: {
        when: 'Kiam ĝi okazas',
        tag: 'Reset (restarigo)',
        heading: 'La limoj estis replenigitaj.',
        body: 'La karto montras la plej freŝan eventon kaj kiom longe antaŭe ĝi okazis. Banked (restarigkupono) estas rilata tipo: oni donis al vi restarigkuponon, kiun vi mem povas eluzi. Claude montras Reset kaj Banked.',
      },
      silent: {
        when: 'Poste, kiam la uzo montras nulon',
        tag: '',
        heading: 'Iuj restarigoj okazas subite.',
        body: 'Kiam via uzo subite falas al nulo, malfermu la karton por kontroli, ĉu restarigo ĵus okazis. La plej freŝa anonco restas videbla, kun unu klako al la originala afiŝo.',
      },
    },
    caveatHtml:
      '<strong>Laŭvola, kaj norme malŝaltita.</strong> La anoncoj venas de du sendependaj triaj spurantoj, codex-resets.com kaj claude-resets.com, kaj povas malfruiĝi aŭ erari, do kontrolu la originalan afiŝon. Ankaŭ la sciigoj estas laŭvolaj, kun aparta ŝaltilo por ĉiu tipo.',
  },

  faq: {
    label: 'Oftaj demandoj',
    heading: 'Demandoj, respondataj simple.',
    items: {
      howResets: {
        q: 'Kiel funkcias la restarigaj anoncoj?',
        parasHtml: [
          'Ili estas norme malŝaltitaj. Ŝaltu ilin en <strong>Settings → General</strong> per <strong>Codex Resets</strong> aŭ <strong>Claude Resets</strong>. Tiam AI Usage Clock legas codex-resets.com kaj claude-resets.com, demandante ĉiun maksimume unufoje ĉiujn 15 minutojn dum la programo funkcias.',
          'La karto montras la plej freŝan eventon kaj kiom longe antaŭe ĝi okazis, markitan <em>Announced</em> (Codex), <em>Reset</em> aŭ <em>Banked</em>. La datumojn kompilas triaj flankoj, kaj la datumoj povas malfruiĝi aŭ erari, do rigardu la originalan afiŝon kiel la fidindan fonton.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Kien iras miaj datumoj?',
        parasHtml: [
          'Viaj agordoj, uzhistorio kaj ensalutaj seancoj restas en via komputilo. Seancoj kaj API-ŝlosiloj estas konservataj per la sekura stokado de via operaciumo. Ne ekzistas telemetrio, nek servilo de AI Usage Clock.',
          `La programo konektiĝas rekte al la servoj, kiujn vi ŝaltas. Se vi ŝaltas la restarigajn anoncojn, ĝi kontaktas ankaŭ codex-resets.com kaj claude-resets.com; tiuj retejoj vidas vian IP-adreson kaj la nomon kaj version de la programo. Pli en <a href="${LINKS.security}">SECURITY.md</a> (en la angla).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Ĉu ĝi estas ligita kun Anthropic, OpenAI aŭ Google?',
        parasHtml: [
          'Ne. AI Usage Clock estas sendependa malfermitkoda projekto, ne farita nek aprobita de iu el la servoj, kiujn ĝi montras. Paĝoj kaj API-oj de la provizantoj povas ŝanĝiĝi sen avizo.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'SmartScreen aŭ Gatekeeper avertas ĉe la lanĉo',
        parasHtml: ['La eldonaj versioj ne estas ciferece subskribitaj, kaj SHA256-sumoj estas publikigitaj apud ĉiu arkivo.'],
        listHtml: [
          '<strong>Windows:</strong> alklaku <strong>More info</strong> (Pliaj informoj), poste <strong>Run anyway</strong> (Tamen ruli).',
          '<strong>macOS:</strong> provu malfermi la programon unufoje, poste uzu <strong>Open Anyway</strong> (Tamen malfermi) en System Settings → Privacy &amp; Security (Sistemaj agordoj → Privateco kaj sekureco). Aŭ unufoje rulu <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>.',
          '<strong>Linux:</strong> faru <code>ai-usage-clock</code> rulebla, se ĝi ankoraŭ ne estas.',
        ],
      },
      platforms: {
        q: 'Ĉu ĝi funkcias en macOS kaj Linux?',
        parasHtml: [
          `Jes, kun averto. Windows estas la platformo, en kiu ĝi estas disvolvata kaj testata per realaj kontoj. La versioj por macOS (menubara ero anstataŭ flosanta ilo) kaj Linux estas publikigitaj, sed la aktualigo de realaj kontoj estas konfirmita nur en Windows 11, do rigardu ilin kiel fruajn. Bonvolu <a href="${LINKS.issues}">malfermi issue</a>, se io ne ĝustas.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'Ĉu ĝi estas senpaga?',
        parasHtml: [
          'Jes. Ĝi estas senpaga kaj malfermitkoda laŭ la MIT-licenco. La servoj, kiujn ĝi montras, bezonas siajn proprajn kontojn aŭ abonojn.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Metu ĉiun AI-limon sur vian labortablon.',
    body: 'Senpaga kaj malfermitkoda laŭ la MIT-licenco. Windows estas la platformo, en kiu ĝi estas disvolvata; la versioj por macOS kaj Linux estas beta.',
    download: 'Elŝuti',
    github: 'Vidi en GitHub',
    smallHtml: `v${VERSION} · Windows · macOS beta · Linux beta. La versioj ne estas ciferece subskribitaj, do Windows aŭ macOS povas averti ĉe la unua lanĉo. <a href="#unsigned">Jen kion fari.</a>`,
    iconAlt:
      'Piktogramo de AI Usage Clock: horloĝa ciferplato en ringo, kiu iras de verda tra flava kaj oranĝa al ruĝa',
  },

  donate: {
    heading: 'Donaci al AI Usage Clock',
    desc: 'AI Usage Clock estas publikigita laŭ la MIT-licenco. Ĝi estas senpage uzebla, ĉu vi kontribuas, ĉu ne. Se ĝi ŝparis al vi iom da tempo kaj vi volas danki, vi povas sendi ĉifromonon al la suba adreso. Ĝi iras al mi, DraftingDreamer, por miaj propraj disvolvaj kostoj, kaj aĉetas nek funkciojn, nek helpon, nek ian promeson pri tio, kio venos poste.',
    pay: 'Ajna ĵetono en Ethereum aŭ Polygon estas bonvena: ETH, POL, USDT, USDC aŭ io ajn alia. Ĝi estas la sama adreso en ambaŭ retoj.',
    copy: 'Kopii',
    copied: 'Kopiite',
    copyFail: 'Elektite. Premu Ctrl+C (⌘C en Mac) por kopii.',
    qrAlt: 'QR-kodo de la donaca adreso',
    note1: 'Nur transigoj en Ethereum (ERC20) kaj Polygon estas akceptataj. Se vi povas uzi ambaŭ, Polygon kutime havas pli malaltajn kostojn.',
    note2Html: `Komparu ĉi tiun adreson kun <a href="${LINKS.donate}">la kopio en GitHub</a> antaŭ ol sendi.`,
    note3: 'Ĉi tiu estas la sola oficiala adreso, kaj mi neniam petos vin sendi al alia. Transigoj ne povas esti malfaritaj, do ili ne povas esti repagitaj.',
    other: 'Stelumi AI Usage Clock en GitHub aŭ paroli pri ĝi al amiko ankaŭ helpas.',
  },

  footer: {
    tagline: 'Vidu ĉiun AI-limon. Sciu ĉiun restarigon.',
    links: {
      github: 'GitHub',
      donate: 'Donaci',
      download: 'Elŝuti',
      setup: 'Agorda gvidilo (en la angla)',
      usage: 'Ĉiutaga uzo (en la angla)',
      mcp: 'MCP-uzgardilo (en la angla)',
      changelog: 'Ŝanĝoprotokolo (en la angla)',
      license: 'Licenco (MIT)',
    },
    disclaimer:
      'AI Usage Clock ne estas ligita kun Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter, Linear, nek kun iu alia provizanto. Produktaj nomoj apartenas al siaj posedantoj.',
    version: `Aktuala versio ${VERSION} · Senpaga kaj malfermitkoda laŭ la MIT-licenco.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Elektu vian lingvon',
  },

  notFound: {
    heading: 'Paĝo ne trovita',
    body: 'Ĉi tiu adreso ne kondukas al paĝo en ĉi tiu retejo. Kontrolu la ligilon, aŭ iru reen al la hejmpaĝo.',
    back: 'Reen al la hejmpaĝo',
  },
};
