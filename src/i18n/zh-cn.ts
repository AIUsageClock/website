import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Simplified Chinese (Mainland China), written natively rather than translated from en.ts.
 * Facts follow en.ts; wording follows the zh-CN README (https://github.com/AIUsageClock/ai-usage-clock/blob/main/README.zh-CN.md).
 * Terms: widget = 小组件, tile = 卡片, Banked = 重置券, FAQ = 常见问题, beta = 测试版.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch) in English.
 */
export const zhCn: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — 看见每个 AI 额度，掌握每次重置。',
    description:
      '把各家 AI 服务的用量额度收进桌面上的一个小组件，还能抓取 Codex 和 Claude 的重置公告。',
    ogAlt:
      'AI Usage Clock：标语“看见每个 AI 额度，掌握每次重置。”，旁边是小组件截图，显示 Claude、Codex 和 Antigravity 的进度条。',
  },

  a11y: {
    skip: '跳到主要内容',
    language: '语言',
    switchToDark: '切换到深色模式',
    switchToLight: '切换到浅色模式',
  },

  header: {
    download: '下载',
  },

  hero: {
    kicker: '桌面小组件 · 开源',
    line1: '看见每个 AI 额度，',
    line2: '掌握每次重置。',
    lede: '把各家 AI 服务的用量额度收进桌面上的一个小组件，还能抓取 Codex 和 Claude 的重置公告：有预告可以早做准备，用量突然清零也能查查是不是刚重置过。',
    download: '下载',
    github: '在 GitHub 上查看',
    fine: `v${VERSION} · Windows · macOS 测试版 · Linux 测试版`,
  },

  stories: {
    heading: '为什么用 AI Usage Clock',
    problemLabel: '痛点',
    fixLabel: '解决办法',
    items: {
      overview: {
        problem: '每家 AI 服务的额度，都各管各的。',
        heading: '各家额度，一处看完。',
        body: 'Claude、Codex、Antigravity、OpenCode Go、GitHub Copilot、OpenRouter 并排显示，每家单独一条进度条。已经开始计时的额度，进度条旁边还会显示剩余时间。',
        alt: 'AI Usage Clock 完整模式：Claude、Codex、OpenCode、Copilot、OpenRouter 各有进度条和剩余时间',
        caption: '一个小组件，几家服务，各有各的进度条。示例数据。',
      },
      resets: {
        problem: '用量清零了，却不知道是怎么回事。',
        heading: '有预告早知道，突然清零查得到。',
        body: '开启重置公告后，程序就会去抓 Codex 和 Claude 发的公告。有的重置会提前预告，可以早做准备；有的说来就来，卡片会一直显示最新一条公告，一键就能打开原帖。',
        alt: 'Codex Resets 卡片显示 Reset（额度已补满，1 天前），Claude Resets 卡片显示 Banked（重置券，21 天前）',
        caption:
          'Codex Resets 和 Claude Resets 卡片，截自实际运行的 1.0.0 发布版；图中用量是截图当时的数值。',
      },
      compact: {
        problem: '桌面就这么大，未必放得下再多一个窗口。',
        heading: '要它小，它就能很小。',
        body: '紧凑模式下，每个服务缩成一个胶囊。',
        alt: '紧凑模式：每个服务缩成一个胶囊',
        caption: '紧凑模式，每个服务一个胶囊。示例数据。',
      },
    },
    also: {
      notify: {
        heading: '新公告出来就通知',
        body: '可以设置在新公告出现时发通知（Windows 上是系统原生通知），每种类型单独开关。重置公告和通知默认都是关闭的。',
      },
      local: {
        heading: '在本机运行',
        body: '没有 AI Usage Clock 账号，没有服务器，也没有遥测。API 密钥存在操作系统的安全存储里。',
      },
    },
  },

  services: {
    label: '支持的服务',
    heading: '能看到什么，怎么接入。',
    items: {
      claude: {
        name: 'Claude',
        what: '会话 · 每周',
        howHtml:
          '套餐带每周 Fable 额度的，也会一起显示。用浏览器登录（支持 Google 账号和通行密钥），或者粘贴会话 Cookie。',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: '会话 · 每周',
        howHtml: '同 Claude：用浏览器登录，或者粘贴会话 Cookie。',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 小时 · 每周',
        howHtml:
          'Gemini、Claude+GPT 两组用量。读取本机的 <code>agy</code> 命令行工具，程序里不用登录账号，也不用填密钥。',
      },
      opencode: {
        name: 'OpenCode Go',
        what: '滚动窗口 · 每周 · 每月',
        howHtml: 'OpenCode API 密钥。',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: '每月 AI 积分',
        howHtml:
          '对照套餐内含的额度，每月 1 日重置。GitHub 细粒度个人访问令牌（fine-grained PAT）。',
      },
      openrouter: {
        name: 'OpenRouter',
        what: '今日花费 · 本月花费',
        howHtml:
          '可设每日预算；填了管理密钥，还能看余额和各模型用量。OpenRouter API 密钥。',
      },
    },
    noteHtml:
      'Claude、Codex 和 GitHub Copilot 默认开启；其他服务和重置公告要到 <strong>Settings</strong>（设置）里手动开启。Claude、Codex 和 OpenCode Go 都支持添加多个账号。',
  },

  resets: {
    label: '重置公告',
    heading: '一次重置，三个时刻。',
    sub: 'AI Usage Clock 会抓取重置公告：有预告的，提前知道；没预告的，事后也能查到发生了什么。',
    items: {
      announced: {
        when: '提前',
        tag: 'Announced（预告）',
        heading: '重置还没发生，就先公布了。',
        body: '这时候就可以早做准备。这一类只有 Codex 有。旁边还有一行 Watch（预测），是 AI 对重置可能性的预测，不是公告，也从不发通知。',
      },
      reset: {
        when: '发生时',
        tag: 'Reset（已重置）',
        heading: '额度补满了。',
        body: '卡片会显示最新一条事件和距今多久。还有相关的一类 Banked（重置券）：你获得了一张重置券，可以自己兑换。Claude 会显示 Reset 和 Banked。',
      },
      silent: {
        when: '事后，看到用量清零时',
        tag: '',
        heading: '有的重置，说来就来。',
        body: '用量突然清零时，看看卡片上是不是刚有重置。最新一条公告会一直留在卡片上，一键就能打开原帖。',
      },
    },
    caveatHtml:
      '<strong>选用功能，默认关闭。</strong>公告来自两个独立的第三方追踪网站 codex-resets.com 和 claude-resets.com，可能延迟，也可能判断错，请以原帖为准。通知同样可选，每种类型单独开关。',
  },

  faq: {
    label: 'FAQ',
    heading: '常见问题',
    items: {
      howResets: {
        q: '重置公告怎么用？',
        parasHtml: [
          '默认关闭。在 <strong>Settings → General</strong>（设置 → 常规）里开启 <strong>Codex Resets</strong> 或 <strong>Claude Resets</strong> 就行。之后程序会读取 codex-resets.com 和 claude-resets.com，运行期间每个网站最多每 15 分钟查询一次。',
          '卡片显示最新一条事件和距今多久，并标明类型：<em>Announced</em>（预告，只有 Codex 有）、<em>Reset</em>（已重置）或 <em>Banked</em>（重置券）。这些数据由第三方整理，可能延迟或出错，一切以原帖为准。',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: '数据存在哪？会连哪些网站？',
        parasHtml: [
          '设置、用量历史和登录会话都保存在本机。会话和 API 密钥交给操作系统的凭据存储保管。没有遥测，也没有 AI Usage Clock 服务器。',
          `程序直接连接你开启的服务。开启重置公告后，还会访问 codex-resets.com 和 claude-resets.com，这两个网站能看到你的 IP 地址，以及程序的名称和版本号。详见 <a href="${LINKS.security}">SECURITY.md</a>（英文）。`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: '和 Anthropic、OpenAI 或 Google 有关系吗？',
        parasHtml: [
          '没有。AI Usage Clock 是独立的开源项目，它显示的各家服务都没有参与开发，也没有为它背书。各家的页面和 API 随时可能变，不一定会提前通知。',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: '首次启动时出现 SmartScreen 或 Gatekeeper 警告',
        parasHtml: ['发行版没有做代码签名，每个压缩包旁边都附有 SHA256 校验值。'],
        listHtml: [
          '<strong>Windows：</strong>点击 <strong>更多信息</strong>，再点击 <strong>仍要运行</strong>。',
          '<strong>macOS：</strong>先尝试打开一次，然后在“系统设置”→“隐私与安全”里点击<strong>仍要打开</strong>。也可以运行一次 <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>。',
          '<strong>Linux：</strong>如果 <code>ai-usage-clock</code> 还没有可执行权限，先加上。',
        ],
      },
      platforms: {
        q: 'macOS 和 Linux 能用吗？',
        parasHtml: [
          `能用，不过目前是测试版。Windows 是主要开发平台，也用真实账号测过；macOS 版（以菜单栏图标代替悬浮小组件）和 Linux 版都已发布，但用真实账号刷新用量只在 Windows 11 上验证过。用着有问题，欢迎<a href="${LINKS.issues}">提 issue</a>。`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '免费吗？',
        parasHtml: ['免费，采用 MIT 许可证开源。它显示的各家服务，需要你自己有账号或订阅。'],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: '把每个 AI 额度都摆上桌面。',
    body: '免费，采用 MIT 许可证开源。Windows 是主要开发平台，macOS 和 Linux 版目前是测试版。',
    download: '下载',
    github: '在 GitHub 上查看',
    smallHtml: `v${VERSION} · Windows · macOS 测试版 · Linux 测试版。发行版没有做代码签名，第一次打开时 Windows 或 macOS 可能会弹出警告，<a href="#unsigned">解决办法看这里</a>。`,
    iconAlt: 'AI Usage Clock 图标：圆环里是一个钟面，圆环颜色从绿色经黄色、橙色过渡到红色',
  },

  footer: {
    tagline: '看见每个 AI 额度，掌握每次重置。',
    links: {
      github: 'GitHub',
      download: '下载',
      setup: '设置指南',
      usage: '日常使用',
      mcp: 'MCP 用量防护（英文）',
      changelog: '更新日志',
      license: '许可证（MIT）',
    },
    disclaimer:
      'AI Usage Clock 与 Anthropic、OpenAI、Google、GitHub、Microsoft、OpenCode、OpenRouter 以及其他任何服务商都没有关联。提到的产品名称归各自的所有者。',
    version: `当前版本 ${VERSION} · 免费，采用 MIT 许可证开源。`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: '选择语言',
  },

  notFound: {
    heading: '找不到页面',
    body: '本站没有这个地址对应的页面。检查一下链接，或者返回首页。',
    back: '返回首页',
  },
};
