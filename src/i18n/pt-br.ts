import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Brazilian Portuguese (pt-BR, not European Portuguese). Written natively, not translated sentence by sentence; the facts
 * follow en.ts key by key.
 * Address the reader as você. Brazilian vocabulary: baixar, computador, app, entrar / fazer login, chave de API, custos;
 * no descarregar, ecrã, telemóvel, tu/vós.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Claude Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly, Rolling, Monthly) in English. Agreed wording: reset = redefinição, Banked = crédito de redefinição,
 * beta = beta, English-only docs are marked (em inglês).
 * OS strings: SmartScreen "Mais informações" / "Executar assim mesmo"; macOS "Ajustes do Sistema",
 * "Privacidade e Segurança", "Abrir Mesmo Assim" are confirmed by Apple pt-BR support (support.apple.com/pt-br/guide/mac-help/mh40617/mac);
 * "Executar assim mesmo" by Microsoft Learn pt-BR (smartscreen-reputation). Only "Mais informações" is unconfirmed (seen on third-party pages only).
 */
export const ptBr: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — Veja cada limite de IA. Fique por dentro de cada redefinição.',
    description:
      'Um pequeno widget de desktop que reúne os limites de uso dos seus serviços de IA. Ele também acompanha os anúncios de redefinição do Codex e do Claude.',
    ogAlt:
      'AI Usage Clock: "Veja cada limite de IA. Fique por dentro de cada redefinição." ao lado de uma captura do widget com barras de uso do Claude, do Codex e do Antigravity.',
  },

  a11y: {
    skip: 'Ir para o conteúdo',
    language: 'Idioma',
    switchToDark: 'Mudar para o tema escuro',
    switchToLight: 'Mudar para o tema claro',
  },

  header: {
    download: 'Baixar',
  },

  hero: {
    kicker: 'Widget de desktop · Código aberto',
    line1: 'Veja cada limite de IA.',
    line2: 'Fique por dentro de cada redefinição.',
    lede: 'Um pequeno widget de desktop que reúne os limites de uso dos seus serviços de IA. Ele também acompanha os anúncios de redefinição do Codex e do Claude: você é avisado quando uma redefinição é anunciada com antecedência e tem onde conferir quando o seu uso zera de repente.',
    download: 'Baixar',
    github: 'Ver no GitHub',
    fine: `v${VERSION} · Windows · macOS beta · Linux beta`,
  },

  stories: {
    heading: 'Por que usar o AI Usage Clock',
    problemLabel: 'O problema',
    fixLabel: 'A solução',
    items: {
      overview: {
        problem: 'Cada serviço de IA guarda os limites no seu próprio canto.',
        heading: 'Os limites das suas IAs em um só lugar.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot, OpenRouter e Linear, lado a lado, cada um com a sua barra de uso. Nos limites em andamento, o tempo restante também aparece ao lado da barra.',
        alt: 'Modo completo do AI Usage Clock listando Claude, Codex, OpenCode, Copilot e OpenRouter, cada um com barras de uso e o tempo restante',
        caption: 'Um widget, vários serviços, cada um com a sua barra. Dados de exemplo.',
      },
      resets: {
        problem: 'Aí o seu uso zera de repente, e você não sabe por quê.',
        heading: 'Um aviso antes de algumas redefinições. Um lugar para conferir as repentinas.',
        body: 'Ative os anúncios de redefinição e o AI Usage Clock passa a acompanhar os anúncios do Codex e do Claude. Alguns são anunciados com antecedência, para você se preparar. Outros surgem do nada: o card mantém o anúncio mais recente à vista, com um clique até a publicação original.',
        alt: 'O card Codex Resets mostrando Reset, limites recarregados, há 1 dia, e o card Claude Resets mostrando Banked, crédito de redefinição, há 21 dias',
        caption:
          'Os cards Codex Resets e Claude Resets, capturados de uma versão 1.0.0 em execução. Os valores de uso refletem o momento da captura.',
      },
      compact: {
        problem: 'Nem toda mesa tem espaço para mais uma janela.',
        heading: 'Pequeno quando você precisa que seja pequeno.',
        body: 'O modo compacto reduz o widget a uma pílula por serviço.',
        alt: 'Modo compacto: uma pílula por serviço',
        caption: 'Modo compacto, uma pílula por serviço. Dados de exemplo.',
      },
    },
    also: {
      notify: {
        heading: 'Receba uma notificação quando surgir um anúncio',
        body: 'Se quiser, você pode receber uma notificação quando aparecer um anúncio novo (notificações nativas no Windows), com uma opção independente para cada tipo. Os anúncios de redefinição e as notificações deles vêm desativados por padrão.',
      },
      local: {
        heading: 'Roda no seu computador',
        body: 'Não existe conta do AI Usage Clock, nem servidor, nem telemetria. As chaves de API ficam guardadas no armazenamento seguro do seu sistema operacional.',
      },
    },
  },

  services: {
    label: 'Serviços compatíveis',
    heading: 'O que você vê e como cada um se conecta.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Mais o limite semanal do Fable nos planos que têm um. Entre pelo navegador (login com Google e passkeys funcionam) ou cole um cookie de sessão.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Igual ao Claude: entre pelo navegador ou cole um cookie de sessão.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 horas · Weekly',
        howHtml:
          'Uso do Gemini e do Claude+GPT. Lê os dados da ferramenta de linha de comando <code>agy</code> instalada no seu computador; não precisa de conta nem de chave no app.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'Chave de API do OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Créditos de IA mensais',
        howHtml:
          'Consumo em relação ao que o seu plano inclui, com redefinição no dia 1º. Fine-grained personal access token do GitHub.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Gasto de hoje · Este mês',
        howHtml:
          'Um orçamento diário opcional; saldo e atividade por modelo com uma chave de gerenciamento. Chave de API do OpenRouter.',
      },
      linear: {
        name: 'Linear',
        what: 'Issues · Limite do plano gratuito',
        howHtml:
          'Uma barra para o limite de 250 issues não arquivadas do plano gratuito; os planos pagos mostram <em>no limit</em>. Chave de API pessoal do Linear.',
      },
    },
    noteHtml:
      'Claude, Codex e GitHub Copilot vêm ativados por padrão. Os outros serviços, e os anúncios de redefinição, são ativados em <strong>Settings</strong> (as configurações do app). Você pode acompanhar mais de uma conta do Claude, do Codex ou do OpenCode Go.',
  },

  resets: {
    label: 'Anúncios de redefinição',
    heading: 'Três momentos em torno de uma redefinição.',
    sub: 'O AI Usage Clock acompanha anúncios de redefinição: você é avisado quando um deles é anunciado com antecedência e consegue ver o que aconteceu quando não houve aviso.',
    items: {
      announced: {
        when: 'Com antecedência',
        tag: 'Announced (anunciado)',
        heading: 'Uma redefinição é anunciada antes de acontecer.',
        body: 'É o seu aviso para se preparar. Este tipo vem do Codex. Ao lado dele aparece uma linha Watch (monitoramento), uma previsão feita por IA de quão provável é uma redefinição. Ela não é um anúncio e nunca envia notificação.',
      },
      reset: {
        when: 'Quando acontece',
        tag: 'Reset (redefinido)',
        heading: 'Os limites foram recarregados.',
        body: 'O card mostra o evento mais recente e há quanto tempo ele aconteceu. Banked (crédito de redefinição) é um tipo relacionado: você recebeu um crédito de redefinição que pode resgatar por conta própria. O Claude mostra Reset e Banked.',
      },
      silent: {
        when: 'Depois, quando o uso marca zero',
        tag: '',
        heading: 'Algumas redefinições surgem do nada.',
        body: 'Quando o seu uso zera de repente, abra o card para conferir se acabou de acontecer uma redefinição. O anúncio mais recente continua à vista, com um clique até a publicação original.',
      },
    },
    caveatHtml:
      '<strong>Opcional e desativado por padrão.</strong> Os anúncios vêm de dois rastreadores independentes de terceiros, codex-resets.com e claude-resets.com, e podem chegar com atraso ou estar errados, então confira a publicação original. As notificações também são opcionais, com uma opção independente para cada tipo.',
  },

  faq: {
    label: 'Perguntas frequentes',
    heading: 'Perguntas, respondidas sem rodeios.',
    items: {
      howResets: {
        q: 'Como funcionam os anúncios de redefinição?',
        parasHtml: [
          'Eles vêm desativados. Ative em <strong>Settings → General</strong>, ativando <strong>Codex Resets</strong> ou <strong>Claude Resets</strong>. A partir daí, o AI Usage Clock consulta o codex-resets.com e o claude-resets.com, cada um no máximo uma vez a cada 15 minutos, enquanto o app está em execução.',
          'O card mostra o evento mais recente e há quanto tempo ele aconteceu, com o rótulo <em>Announced</em> (Codex), <em>Reset</em> ou <em>Banked</em>. Os dados são compilados por terceiros e podem chegar com atraso ou estar errados, então trate a publicação original como a fonte da verdade.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Para onde vão os meus dados?',
        parasHtml: [
          'Suas configurações, seu histórico de uso e suas sessões de login ficam no seu computador. As sessões e as chaves de API são guardadas no gerenciador de credenciais do seu sistema operacional. Não há telemetria nem servidor do AI Usage Clock.',
          `O app se conecta diretamente aos serviços que você ativar. Se você ativar os anúncios de redefinição, ele também acessa o codex-resets.com e o claude-resets.com; esses sites veem o seu endereço IP e o nome e a versão do app. Mais detalhes em <a href="${LINKS.security}">SECURITY.md</a> (em inglês).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Tem algum vínculo com a Anthropic, a OpenAI ou o Google?',
        parasHtml: [
          'Não. O AI Usage Clock é um projeto independente de código aberto, não criado nem endossado por nenhum dos serviços que ele mostra. As páginas e as APIs dos provedores podem mudar sem aviso.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'O SmartScreen ou o Gatekeeper avisa ao abrir',
        parasHtml: [
          'As versões publicadas não têm assinatura de código, e as hashes SHA256 são publicadas junto de cada arquivo compactado.',
        ],
        listHtml: [
          '<strong>Windows:</strong> clique em <strong>Mais informações</strong> e depois em <strong>Executar assim mesmo</strong>.',
          '<strong>macOS:</strong> tente abrir o app uma vez e depois use <strong>Abrir Mesmo Assim</strong> em Ajustes do Sistema → Privacidade e Segurança. Ou execute uma vez <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>.',
          '<strong>Linux:</strong> torne <code>ai-usage-clock</code> executável, se ele ainda não for.',
        ],
      },
      platforms: {
        q: 'Funciona no macOS e no Linux?',
        parasHtml: [
          `Sim, com uma ressalva. O Windows é a plataforma em que o app é desenvolvido e testado com contas reais. As versões para macOS (um item na barra de menus, em vez de um widget flutuante) e para Linux estão publicadas, mas a atualização com contas reais só foi verificada no Windows 11, então considere-as versões iniciais. Se algo não estiver certo, <a href="${LINKS.issues}">abra uma issue</a>.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'É grátis?',
        parasHtml: [
          'Sim. É gratuito e de código aberto, sob a licença MIT. Os serviços que ele mostra exigem as suas próprias contas ou assinaturas.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Coloque cada limite de IA na sua área de trabalho.',
    body: 'Gratuito e de código aberto, sob a licença MIT. O Windows é a plataforma em que ele é desenvolvido; as versões para macOS e Linux estão em beta.',
    download: 'Baixar',
    github: 'Ver no GitHub',
    smallHtml: `v${VERSION} · Windows · macOS beta · Linux beta. As versões publicadas não são assinadas, então o Windows ou o macOS podem exibir um aviso na primeira vez que você abrir o app. <a href="#unsigned">Veja o que fazer.</a>`,
    iconAlt:
      'Ícone do app AI Usage Clock: um mostrador de relógio dentro de um anel que vai do verde ao amarelo, ao laranja e ao vermelho',
  },

  donate: {
    heading: 'Doe para o AI Usage Clock',
    desc: 'O AI Usage Clock é distribuído sob a licença MIT. Usar é grátis, você contribuindo ou não. Se ele economizou o seu tempo e você quiser agradecer, pode enviar criptomoedas para o endereço abaixo. O valor vai para mim, DraftingDreamer, para os meus próprios custos de desenvolvimento, e não compra recursos, ajuda nem qualquer promessa sobre o que vem pela frente.',
    pay: 'Qualquer token na Ethereum ou na Polygon é bem-vindo: ETH, POL, USDT, USDC ou qualquer outro. O endereço é o mesmo nas duas redes.',
    copy: 'Copiar',
    copied: 'Copiado',
    copyFail: 'Selecionado. Pressione Ctrl+C (⌘C no Mac) para copiar.',
    qrAlt: 'QR code do endereço de doação',
    note1: 'Só são aceitas transferências na Ethereum (ERC20) e na Polygon. Se você puder usar qualquer uma das duas, a Polygon costuma ter taxas menores.',
    note2Html: `Compare este endereço com <a href="${LINKS.donate}">a cópia no GitHub</a> antes de enviar.`,
    note3: 'Este é o único endereço oficial, e eu nunca vou pedir que você envie para outro. As transferências não podem ser revertidas, então não é possível devolver o valor.',
    other: 'Dar uma estrela ao AI Usage Clock no GitHub ou indicá-lo a um amigo também ajuda.',
  },

  footer: {
    tagline: 'Veja cada limite de IA. Fique por dentro de cada redefinição.',
    links: {
      github: 'GitHub',
      donate: 'Doar',
      download: 'Baixar',
      setup: 'Guia de configuração (em inglês)',
      usage: 'Uso diário (em inglês)',
      mcp: 'Proteção de uso via MCP (em inglês)',
      changelog: 'Registro de alterações (em inglês)',
      license: 'Licença (MIT)',
    },
    disclaimer:
      'O AI Usage Clock não é afiliado à Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter, Linear nem a qualquer outro provedor. Os nomes de produtos pertencem aos seus respectivos donos.',
    version: `Versão atual ${VERSION} · Gratuito e de código aberto, sob a licença MIT.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Escolha o seu idioma',
  },

  notFound: {
    heading: 'Página não encontrada',
    body: 'Este endereço não leva a nenhuma página deste site. Confira o link ou volte para a página inicial.',
    back: 'Voltar para a página inicial',
  },
};
