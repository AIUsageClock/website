import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * French (France). Written natively in the voice of runs/2026-10-16-i18n/fr/README.fr.md, not translated
 * sentence by sentence; the facts follow en.ts key by key. The reader is addressed as vous.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Agreed wording: limits = quotas / limites, reset = réinitialisation
 * (remise à zéro in the tagline), Banked = bon de réinitialisation, beta = bêta, English-only docs are marked (en anglais).
 * Typography: U+00A0 (not U+202F, which the site's Fraunces and Inter subsets lack) before ? ! : ; and inside « »,
 * and between a number and its unit; apostrophes are ’ (U+2019).
 * OS strings: SmartScreen « Informations complémentaires » / « Exécuter quand même »; macOS « Réglages Système »,
 * « Confidentialité et sécurité », « Ouvrir quand même » (support.apple.com/fr-fr/guide/mac-help/mh40616/mac).
 */
export const fr: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — Voyez tous vos quotas d’IA. Suivez chaque remise à zéro.',
    description:
      'AI Usage Clock rassemble les limites d’utilisation de vos services d’IA dans un petit widget de bureau. Il relève aussi les annonces de réinitialisation de Codex et de Claude.',
    ogAlt:
      'AI Usage Clock : « Voyez tous vos quotas d’IA. Suivez chaque remise à zéro. », à côté d’une capture du widget avec les jauges de consommation de Claude, Codex et Antigravity.',
  },

  a11y: {
    skip: 'Aller au contenu',
    language: 'Langue',
    switchToDark: 'Passer au thème sombre',
    switchToLight: 'Passer au thème clair',
  },

  header: {
    download: 'Télécharger',
  },

  hero: {
    kicker: 'Widget de bureau · Open source',
    line1: 'Voyez tous vos quotas d’IA.',
    line2: 'Suivez chaque remise à zéro.',
    lede: 'AI Usage Clock rassemble les limites d’utilisation de vos services d’IA dans un petit widget de bureau. Il relève aussi les annonces de réinitialisation de Codex et de Claude : quand une réinitialisation est annoncée à l’avance, vous êtes au courant ; quand votre consommation retombe brusquement à zéro, vous savez où vérifier.',
    download: 'Télécharger',
    github: 'Voir sur GitHub',
    fine: `v${VERSION} · Windows · macOS bêta · Linux bêta`,
  },

  stories: {
    heading: 'Ce que fait AI Usage Clock',
    problemLabel: 'Le problème',
    fixLabel: 'La solution',
    items: {
      overview: {
        problem: 'Chaque service d’IA range ses limites dans son coin.',
        heading: 'Tous vos quotas d’IA au même endroit.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot et OpenRouter, côte à côte, chacun avec sa propre jauge. Pour les limites en cours, le temps restant s’affiche à côté de la jauge.',
        alt: 'AI Usage Clock en mode complet : Claude, Codex, OpenCode, Copilot et OpenRouter, chacun avec ses jauges et le temps restant',
        caption: 'Un seul widget, plusieurs services, chacun avec sa jauge. Données d’exemple.',
      },
      resets: {
        problem: 'Et un jour, votre consommation retombe à zéro sans que vous sachiez pourquoi.',
        heading: 'Un préavis pour certaines réinitialisations. Un repère pour les autres.',
        body: 'Activez les annonces de réinitialisation, et AI Usage Clock relève celles de Codex et de Claude. Certaines sont annoncées à l’avance : vous avez le temps de vous organiser. D’autres tombent sans prévenir : la vignette garde la dernière annonce sous les yeux, et la publication d’origine s’ouvre en un clic.',
        alt: 'La vignette Codex Resets affiche Reset (quotas rechargés, il y a 1 jour) et la vignette Claude Resets affiche Banked (bon de réinitialisation, il y a 21 jours)',
        caption:
          'Les vignettes Codex Resets et Claude Resets, capturées sur la version 1.0.0 en fonctionnement. Les chiffres de consommation sont ceux du moment de la capture.',
      },
      compact: {
        problem: 'Il n’y a pas toujours de place pour une fenêtre de plus sur le bureau.',
        heading: 'Tout petit, quand il le faut.',
        body: 'Le mode compact réduit le widget à une pastille par service.',
        alt: 'Mode compact : une pastille par service',
        caption: 'Mode compact, une pastille par service. Données d’exemple.',
      },
    },
    also: {
      notify: {
        heading: 'Une notification quand une annonce tombe',
        body: 'Si vous le souhaitez, recevez une notification à chaque nouvelle annonce (notifications natives sous Windows), avec un réglage distinct pour chaque type. Les annonces de réinitialisation et leurs notifications sont désactivées par défaut.',
      },
      local: {
        heading: 'Tout se passe sur votre ordinateur',
        body: 'Pas de compte AI Usage Clock, pas de serveur, pas de télémétrie. Les clés d’API sont conservées dans le stockage sécurisé de votre système d’exploitation.',
      },
    },
  },

  services: {
    label: 'Services pris en charge',
    heading: 'Ce que vous voyez, et comment ça se connecte.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Plus la limite hebdomadaire Fable sur les forfaits qui en comportent une. Connectez-vous via votre navigateur (compte Google et clés d’accès acceptés) ou collez un cookie de session.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Comme pour Claude : connectez-vous via votre navigateur ou collez un cookie de session.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 heures · Weekly',
        howHtml:
          'Consommation Gemini et Claude+GPT. Lecture de votre outil en ligne de commande <code>agy</code> local ; aucun compte ni clé dans l’application.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'Clé d’API OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Crédits IA mensuels',
        howHtml:
          'Comparés à l’enveloppe de votre forfait, avec un compteur remis à zéro le premier du mois. Jeton d’accès personnel GitHub de type fine-grained.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Dépenses du jour · du mois',
        howHtml:
          'Budget quotidien facultatif ; solde et activité par modèle avec une clé de gestion. Clé d’API OpenRouter.',
      },
    },
    noteHtml:
      'Claude, Codex et GitHub Copilot sont activés par défaut. Les autres services, ainsi que les annonces de réinitialisation, s’activent dans <strong>Settings</strong> (les paramètres). Vous pouvez suivre plusieurs comptes Claude, Codex ou OpenCode Go.',
  },

  resets: {
    label: 'Annonces de réinitialisation',
    heading: 'Avant, pendant et après une réinitialisation.',
    sub: 'AI Usage Clock relève les annonces de réinitialisation : vous êtes au courant quand une réinitialisation est annoncée à l’avance, et vous pouvez voir ce qui s’est passé quand elle ne l’a pas été.',
    items: {
      announced: {
        when: 'À l’avance',
        tag: 'Announced',
        heading: 'Une réinitialisation est annoncée avant d’avoir lieu.',
        body: 'C’est le signal pour vous organiser. Ce type vient de Codex. Juste à côté, une ligne Watch (à surveiller) donne une prévision, établie par une IA, de la probabilité d’une réinitialisation. Ce n’est pas une annonce, et elle n’envoie jamais de notification.',
      },
      reset: {
        when: 'Au moment même',
        tag: 'Reset',
        heading: 'Les quotas sont rechargés.',
        body: 'La vignette affiche le dernier événement et depuis combien de temps il a eu lieu. Type voisin, Banked (bon de réinitialisation) signifie que vous avez reçu un bon à utiliser vous-même au moment de votre choix. Claude affiche Reset et Banked.',
      },
      silent: {
        when: 'Plus tard, quand la consommation affiche zéro',
        tag: '',
        heading: 'Certaines réinitialisations tombent sans prévenir.',
        body: 'Quand votre consommation retombe brusquement à zéro, ouvrez la vignette pour vérifier si une réinitialisation vient d’avoir lieu. La dernière annonce reste visible, et la publication d’origine s’ouvre en un clic.',
      },
    },
    caveatHtml:
      '<strong>Facultatif, et désactivé par défaut.</strong> Les annonces proviennent de deux sites de suivi tiers et indépendants, codex-resets.com et claude-resets.com, et peuvent arriver en retard ou se tromper : vérifiez la publication d’origine. Les notifications sont facultatives elles aussi, avec un réglage distinct pour chaque type.',
  },

  faq: {
    label: 'Questions fréquentes',
    heading: 'Des réponses sans détour.',
    items: {
      howResets: {
        q: 'Comment fonctionnent les annonces de réinitialisation ?',
        parasHtml: [
          'Elles sont désactivées par défaut. Activez-les dans <strong>Settings → General</strong> (réglages généraux) avec <strong>Codex Resets</strong> ou <strong>Claude Resets</strong>. AI Usage Clock consulte alors codex-resets.com et claude-resets.com, au plus une fois toutes les 15 minutes chacun, tant que l’application tourne.',
          'La vignette affiche le dernier événement et depuis combien de temps il a eu lieu, avec l’étiquette <em>Announced</em> (annoncée, Codex uniquement), <em>Reset</em> (réinitialisée) ou <em>Banked</em> (bon de réinitialisation). Les données sont compilées par des tiers et peuvent arriver en retard ou être erronées : c’est la publication d’origine qui fait foi.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Où vont mes données ?',
        parasHtml: [
          'Vos réglages, votre historique de consommation et vos sessions de connexion restent sur votre ordinateur. Sessions et clés d’API sont confiées aux mécanismes d’identification de votre système d’exploitation. Aucune télémétrie, aucun serveur AI Usage Clock.',
          `L’application se connecte directement aux services que vous activez. Si vous activez les annonces de réinitialisation, elle contacte aussi codex-resets.com et claude-resets.com ; ces sites voient votre adresse IP ainsi que le nom et la version de l’application. Plus de détails dans <a href="${LINKS.security}">SECURITY.md</a> (en anglais).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'AI Usage Clock est-il lié à Anthropic, à OpenAI ou à Google ?',
        parasHtml: [
          'Non. AI Usage Clock est un projet open source indépendant, ni conçu ni approuvé par aucun des services qu’il affiche. Les pages et les API des fournisseurs peuvent changer sans préavis.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'Avertissement SmartScreen ou Gatekeeper au lancement',
        parasHtml: ['Les versions publiées ne sont pas signées (pas de signature de code) ; des sommes de contrôle SHA256 sont publiées à côté de chaque archive.'],
        listHtml: [
          '<strong>Windows :</strong> cliquez sur <strong>Informations complémentaires</strong>, puis sur <strong>Exécuter quand même</strong>.',
          '<strong>macOS :</strong> essayez d’ouvrir l’application une fois, puis utilisez <strong>Ouvrir quand même</strong> dans Réglages Système → Confidentialité et sécurité. Ou lancez une fois <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>.',
          '<strong>Linux :</strong> rendez <code>ai-usage-clock</code> exécutable s’il ne l’est pas déjà.',
        ],
      },
      platforms: {
        q: 'Fonctionne-t-il sous macOS et Linux ?',
        parasHtml: [
          `Oui, avec une réserve. Windows est la plateforme de développement, et celle où l’application est testée avec de vrais comptes. Les versions macOS (un élément dans la barre des menus plutôt qu’un widget flottant) et Linux sont publiées, mais l’actualisation de vrais comptes n’a été vérifiée que sous Windows 11 : considérez-les comme des versions bêta. En cas de souci, <a href="${LINKS.issues}">ouvrez une issue</a>.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'Est-ce gratuit ?',
        parasHtml: [
          'Oui. C’est un logiciel gratuit et open source, sous licence MIT. Les services qu’il affiche nécessitent leurs propres comptes ou abonnements.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Tous vos quotas d’IA, sur votre bureau.',
    body: 'Gratuit et open source, sous licence MIT. Windows est la plateforme de développement ; les versions macOS et Linux sont en bêta.',
    download: 'Télécharger',
    github: 'Voir sur GitHub',
    smallHtml: `v${VERSION} · Windows · macOS bêta · Linux bêta. Les versions ne sont pas signées : Windows ou macOS peut afficher un avertissement au premier lancement. <a href="#unsigned">Voici la marche à suivre.</a>`,
    iconAlt:
      'Icône d’AI Usage Clock : un cadran d’horloge dans un anneau qui passe du vert au jaune, puis à l’orange et au rouge',
  },

  footer: {
    tagline: 'Voyez tous vos quotas d’IA. Suivez chaque remise à zéro.',
    links: {
      github: 'GitHub',
      download: 'Télécharger',
      setup: 'Guide de configuration (en anglais)',
      usage: 'Utilisation au quotidien (en anglais)',
      mcp: 'Garde-fou de consommation MCP (en anglais)',
      changelog: 'Journal des modifications (en anglais)',
      license: 'Licence (MIT)',
    },
    disclaimer:
      'AI Usage Clock n’est affilié ni à Anthropic, ni à OpenAI, ni à Google, ni à GitHub, ni à Microsoft, ni à OpenCode, ni à OpenRouter, ni à aucun autre fournisseur. Les noms de produits appartiennent à leurs propriétaires respectifs.',
    version: `Version actuelle ${VERSION} · Gratuit et open source, sous licence MIT.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Choisissez votre langue',
  },

  notFound: {
    heading: 'Page introuvable',
    body: 'Cette adresse ne mène à aucune page de ce site. Vérifiez le lien, ou revenez à la page d’accueil.',
    back: 'Retour à la page d’accueil',
  },
};
