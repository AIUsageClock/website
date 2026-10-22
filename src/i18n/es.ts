import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Latin-American Spanish (neutral es-419, not Castilian). Written natively in the voice of
 * https://github.com/AIUsageClock/ai-usage-clock/blob/main/README.es.md, not translated sentence by sentence; the facts follow en.ts key by key.
 * Address the reader as tú (as Microsoft and Apple do on their es-MX support pages). Latin-American vocabulary:
 * computadora, app, descargar, iniciar sesión, clave de API, costos; no vosotros, no ordenador.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Agreed wording: reset = reinicio, Banked = cupón de reinicio,
 * beta = beta, English-only docs are marked (en inglés).
 * OS strings: SmartScreen "Más información" / "Ejecutar de todas formas"; macOS "Configuración del Sistema",
 * "Privacidad y seguridad", "Abrir de todos modos" (support.apple.com/es-mx/guide/mac-help/mh40616/mac).
 */
export const es: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — Mira cada límite de IA. Entérate de cada reinicio.',
    description:
      'Un pequeño widget de escritorio que reúne los límites de uso de tus servicios de IA. También recoge los anuncios de reinicio de Codex y Claude.',
    ogAlt:
      'AI Usage Clock: "Mira cada límite de IA. Entérate de cada reinicio." junto a una captura del widget con barras de uso de Claude, Codex y Antigravity.',
  },

  a11y: {
    skip: 'Saltar al contenido',
    language: 'Idioma',
    switchToDark: 'Cambiar al tema oscuro',
    switchToLight: 'Cambiar al tema claro',
  },

  header: {
    download: 'Descargar',
  },

  hero: {
    kicker: 'Widget de escritorio · Código abierto',
    line1: 'Mira cada límite de IA.',
    line2: 'Entérate de cada reinicio.',
    lede: 'Un pequeño widget de escritorio que reúne los límites de uso de tus servicios de IA. También recoge los anuncios de reinicio de Codex y Claude: te enteras con tiempo cuando un reinicio se anuncia por adelantado, y tienes dónde revisar cuando tu uso cae a cero de repente.',
    download: 'Descargar',
    github: 'Ver en GitHub',
    fine: `v${VERSION} · Windows · macOS beta · Linux beta`,
  },

  stories: {
    heading: 'Qué hace por ti',
    problemLabel: 'El problema',
    fixLabel: 'La solución',
    items: {
      overview: {
        problem: 'Para ver los límites de cada IA, hay que entrar a cada servicio por separado.',
        heading: 'Tus límites de IA en un solo lugar.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot, OpenRouter y Linear, uno al lado del otro, cada uno con su propia barra de uso. En los límites que están en curso también verás, junto a la barra, cuánto tiempo queda.',
        alt: 'Modo completo de AI Usage Clock con Claude, Codex, OpenCode, Copilot y OpenRouter, cada uno con sus barras de uso y el tiempo restante',
        caption: 'Un widget, varios servicios, cada uno con su propia barra. Datos de ejemplo.',
      },
      resets: {
        problem: 'De pronto tu uso cae a cero y no sabes por qué.',
        heading: 'Si hay aviso, te enteras antes. Si no, sabes dónde revisar.',
        body: 'Activa los anuncios de reinicio y AI Usage Clock recogerá los anuncios de Codex y Claude. Algunos reinicios se anuncian por adelantado, así que puedes prepararte. Otros llegan sin aviso: la tarjeta deja a la vista el último anuncio, y la publicación original queda a un clic.',
        alt: 'La tarjeta Codex Resets muestra Reset (límites recargados, hace 1 día) y la tarjeta Claude Resets muestra Banked (cupón de reinicio, hace 21 días)',
        caption:
          'Las tarjetas Codex Resets y Claude Resets, capturadas de la versión 1.0.0 en ejecución. Los valores de uso corresponden al momento de la captura.',
      },
      compact: {
        problem: 'No en todos los escritorios cabe otra ventana.',
        heading: 'Pequeño cuando lo necesitas.',
        body: 'El modo compacto reduce el widget a una cápsula por servicio.',
        alt: 'Modo compacto: una cápsula por servicio',
        caption: 'Modo compacto, una cápsula por servicio. Datos de ejemplo.',
      },
    },
    also: {
      notify: {
        heading: 'Notificaciones cuando hay un anuncio nuevo',
        body: 'Si quieres, puedes recibir una notificación cada vez que aparece un anuncio nuevo (en Windows, con las notificaciones nativas del sistema) y activarlas por separado para cada tipo. Los anuncios de reinicio y sus notificaciones vienen desactivados de forma predeterminada.',
      },
      local: {
        heading: 'Se ejecuta en tu computadora',
        body: 'No hay cuenta de AI Usage Clock, ni servidor, ni telemetría. Las claves de API se guardan en el almacenamiento seguro de tu sistema operativo.',
      },
    },
  },

  services: {
    label: 'Servicios compatibles',
    heading: 'Qué ves de cada uno y cómo se conecta.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Más el límite semanal de Fable en los planes que lo tienen. Inicia sesión desde tu navegador (puedes entrar con Google o con una llave de acceso) o pega una cookie de sesión.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Igual que Claude: inicia sesión desde tu navegador o pega una cookie de sesión.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 horas · Weekly',
        howHtml:
          'Uso de Gemini y de Claude+GPT. Lee la herramienta de línea de comandos <code>agy</code> instalada en tu computadora; no necesitas cuenta ni clave en la app.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'Clave de API de OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Créditos de IA del mes',
        howHtml:
          'Frente a lo que incluye tu plan; el conteo se reinicia el día 1 de cada mes. Fine-grained personal access token de GitHub.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Gasto de hoy · Este mes',
        howHtml:
          'Presupuesto diario opcional; saldo y actividad por modelo si usas una clave de administración. Clave de API de OpenRouter.',
      },
      linear: {
        name: 'Linear',
        what: 'Issues · Límite del plan gratuito',
        howHtml:
          'Barra con el límite de 250 issues sin archivar del plan gratuito; los planes de pago muestran <em>no limit</em>. Clave de API personal de Linear.',
      },
    },
    noteHtml:
      'Claude, Codex y GitHub Copilot vienen activados de forma predeterminada. Los demás servicios, y los anuncios de reinicio, se activan en <strong>Settings</strong> (la configuración de la app). Puedes monitorear más de una cuenta de Claude, Codex u OpenCode Go.',
  },

  resets: {
    label: 'Anuncios de reinicio',
    heading: 'Antes, durante y después de un reinicio.',
    sub: 'AI Usage Clock recoge los anuncios de reinicio: te enteras con tiempo cuando uno se anuncia por adelantado, y puedes ver qué pasó cuando no hubo aviso.',
    items: {
      announced: {
        when: 'Por adelantado',
        tag: 'Announced (anunciado)',
        heading: 'Se anuncia un reinicio antes de que ocurra.',
        body: 'Es tu señal para prepararte. Este tipo viene de Codex. Al lado aparece una fila Watch (pronóstico), una estimación hecha por IA de qué tan probable es un reinicio. No es un anuncio y nunca envía notificaciones.',
      },
      reset: {
        when: 'Cuando ocurre',
        tag: 'Reset (reiniciado)',
        heading: 'Los límites se recargaron.',
        body: 'La tarjeta muestra el evento más reciente y hace cuánto ocurrió. Banked (cupón de reinicio) es un tipo relacionado: recibiste un cupón de reinicio que puedes canjear por tu cuenta. Claude muestra Reset y Banked.',
      },
      silent: {
        when: 'Después, cuando tu uso marca cero',
        tag: '',
        heading: 'Algunos reinicios llegan sin aviso.',
        body: 'Cuando tu uso cae a cero de repente, abre la tarjeta para comprobar si acaba de haber un reinicio. El último anuncio sigue a la vista, y la publicación original queda a un clic.',
      },
    },
    caveatHtml:
      '<strong>Opcional, y desactivado de forma predeterminada.</strong> Los anuncios vienen de dos sitios independientes, de terceros, codex-resets.com y claude-resets.com, y pueden llegar tarde o estar equivocados, así que confirma en la publicación original. Las notificaciones también son opcionales y se activan por separado para cada tipo.',
  },

  faq: {
    label: 'Preguntas frecuentes',
    heading: 'Respuestas sin rodeos.',
    items: {
      howResets: {
        q: '¿Cómo funcionan los anuncios de reinicio?',
        parasHtml: [
          'Vienen desactivados. Para usarlos, ve a <strong>Settings → General</strong> y activa <strong>Codex Resets</strong> o <strong>Claude Resets</strong>. A partir de ahí, AI Usage Clock consulta codex-resets.com y claude-resets.com, cada uno como máximo una vez cada 15 minutos mientras la app está abierta.',
          'La tarjeta muestra el evento más reciente y hace cuánto ocurrió, con la etiqueta <em>Announced</em> (anunciado, solo en Codex), <em>Reset</em> (reiniciado) o <em>Banked</em> (cupón de reinicio). Los datos los recopilan terceros y pueden llegar tarde o estar equivocados, así que toma la publicación original como la fuente confiable.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: '¿A dónde van mis datos?',
        parasHtml: [
          'Tu configuración, tu historial de uso y tus sesiones iniciadas se quedan en tu computadora. Las sesiones y las claves de API se guardan con los mecanismos de credenciales de tu sistema operativo. No hay telemetría ni servidor de AI Usage Clock.',
          `La app se conecta directamente a los servicios que actives. Si activas los anuncios de reinicio, también se conecta a codex-resets.com y claude-resets.com; esos sitios ven tu dirección IP y el nombre y la versión de la app. Más detalles en <a href="${LINKS.security}">SECURITY.md</a> (en inglés).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: '¿Tiene relación con Anthropic, OpenAI o Google?',
        parasHtml: [
          'No. AI Usage Clock es un proyecto independiente de código abierto: ninguno de los servicios que muestra lo creó ni lo respalda. Las páginas y las API de los proveedores pueden cambiar sin previo aviso.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'Aviso de SmartScreen o Gatekeeper al abrir la app',
        parasHtml: [
          'Las versiones publicadas no tienen firma de código, y junto a cada archivo comprimido se publican sus sumas SHA256.',
        ],
        listHtml: [
          '<strong>Windows:</strong> haz clic en <strong>Más información</strong> y luego en <strong>Ejecutar de todas formas</strong>.',
          '<strong>macOS:</strong> intenta abrir la app una vez y luego usa <strong>Abrir de todos modos</strong> en Configuración del Sistema → Privacidad y seguridad. También puedes ejecutar una vez <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>.',
          '<strong>Linux:</strong> si <code>ai-usage-clock</code> todavía no tiene permiso de ejecución, dáselo.',
        ],
      },
      platforms: {
        q: '¿Funciona en macOS y Linux?',
        parasHtml: [
          `Sí, con una salvedad. Windows es la plataforma donde se desarrolla y donde se prueba con cuentas reales. Las versiones para macOS (un elemento de la barra de menús en lugar de un widget flotante) y Linux están publicadas, pero actualizar los datos de cuentas reales solo se ha verificado en Windows 11, así que considéralas versiones beta. Si algo no funciona bien, <a href="${LINKS.issues}">abre un issue</a>.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '¿Es gratis?',
        parasHtml: [
          'Sí. Es gratuito y de código abierto, con licencia MIT. Los servicios que muestra requieren sus propias cuentas o suscripciones.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Lleva cada límite de IA a tu escritorio.',
    body: 'Gratuito y de código abierto, con licencia MIT. Se desarrolla en Windows; las versiones para macOS y Linux están en beta.',
    download: 'Descargar',
    github: 'Ver en GitHub',
    smallHtml: `v${VERSION} · Windows · macOS beta · Linux beta. Las versiones publicadas no tienen firma de código, así que Windows o macOS pueden mostrar una advertencia la primera vez que abras la app. <a href="#unsigned">Mira qué hacer.</a>`,
    iconAlt:
      'Ícono de AI Usage Clock: un reloj dentro de un anillo que pasa de verde a amarillo, naranja y rojo',
  },

  footer: {
    tagline: 'Mira cada límite de IA. Entérate de cada reinicio.',
    links: {
      github: 'GitHub',
      download: 'Descargar',
      setup: 'Guía de configuración (en inglés)',
      usage: 'Uso diario (en inglés)',
      mcp: 'Control de uso con MCP (en inglés)',
      changelog: 'Registro de cambios (en inglés)',
      license: 'Licencia (MIT)',
    },
    disclaimer:
      'AI Usage Clock no está afiliado a Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter, Linear ni a ningún otro proveedor. Los nombres de productos pertenecen a sus respectivos propietarios.',
    version: `Versión actual ${VERSION} · Gratuito y de código abierto, con licencia MIT.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Elige tu idioma',
  },

  notFound: {
    heading: 'Página no encontrada',
    body: 'Esta dirección no lleva a ninguna página de este sitio. Revisa el enlace o vuelve a la página de inicio.',
    back: 'Volver a la página de inicio',
  },
};
