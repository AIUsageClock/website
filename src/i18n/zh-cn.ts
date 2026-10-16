import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Simplified Chinese (Mainland China). Wording follows repo/README.zh-CN.md and the zh-CN docs;
 * keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked) in English.
 */
export const zhCn: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — 看见每个 AI 额度，掌握每次重置。',
    description:
      '一个桌面小工具，把各家 AI 服务的用量上限集中在一处，并抓取 Codex 和 Claude 的重置公告。',
    ogAlt:
      'AI Usage Clock：“看见每个 AI 额度，掌握每次重置。”，旁边是小工具的截图，显示 Claude、Codex 和 Antigravity 的用量条。',
  },

  a11y: {
    skip: '跳到主要内容',
    language: '语言',
    switchToDark: '切换为深色主题',
    switchToLight: '切换为浅色主题',
  },

  header: {
    download: '下载',
  },

  hero: {
    kicker: '桌面小工具 · 开源',
    line1: '看见每个 AI 额度，',
    line2: '掌握每次重置。',
    lede: '一个桌面小工具，把各家 AI 服务的用量上限集中在一处，并抓取 Codex 和 Claude 的重置公告：提前预告时让你有心理准备，突然清零时也有地方可以查看原因。',
    download: '下载',
    github: '在 GitHub 上查看',
    fine: `v${VERSION} · Windows · macOS 测试版 · Linux 测试版`,
  },

  stories: {
    heading: '为什么选 AI Usage Clock',
    problemLabel: '问题',
    fixLabel: '解决办法',
    items: {
      overview: {
        problem: '每个 AI 服务都把额度放在各自的角落。',
        heading: '你的 AI 额度，一个地方看完。',
        body: 'Claude、Codex、Antigravity、OpenCode Go、GitHub Copilot 和 OpenRouter 并排显示，每项各有一条用量条；进行中的额度，用量条旁还会标示剩余时间。',
        alt: 'AI Usage Clock 的完整模式，列出 Claude、Codex、OpenCode、Copilot 和 OpenRouter，每项都有用量条和剩余时间',
        caption: '一个小组件，多项服务，各有各的用量条。示例数据。',
      },
      resets: {
        problem: '然后你的用量清零了，却不知道为什么。',
        heading: '提前预告有准备，突然清零有原因。',
        body: '开启重置公告后，AI Usage Clock 会抓取 Codex 和 Claude 的重置公告。有些重置会提前预告，让你先有心理准备；有些来得很突然：磁贴会一直保留最新的公告，并可一键打开原始帖子。',
        alt: 'Codex Resets 磁贴显示“Reset”（额度已补满，1 天前），Claude Resets 磁贴显示“Banked”（重置额度，21 天前）',
        caption:
          'Codex Resets 和 Claude Resets 磁贴，截取自运行中的 1.0.0 发行版。用量数值为截图时的状态。',
      },
      compact: {
        problem: '不是每个桌面都有空间再多一个窗口。',
        heading: '想要小，它就能很小。',
        body: '紧凑模式会把小组件缩成每项服务一颗胶囊。',
        alt: '紧凑模式：每项服务一颗胶囊',
        caption: '紧凑模式，每项服务一颗胶囊。示例数据。',
      },
    },
    also: {
      notify: {
        heading: '新公告出现就通知你',
        body: '可以选择在新公告出现时发出通知（Windows 为原生通知），每种公告都能单独设置。重置公告及其通知默认都是关闭的。',
      },
      local: {
        heading: '在你的电脑上运行',
        body: '没有 AI Usage Clock 账号、服务器或遥测。API 密钥由操作系统的安全存储机制保管。',
      },
    },
  },

  services: {
    label: '支持的服务',
    heading: '你会看到什么，以及如何连接。',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          '方案有每周 Fable 额度时，也会一并显示。通过浏览器登录（支持 Google 和通行密钥 passkey），或粘贴会话 Cookie。',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: '与 Claude 相同：通过浏览器登录，或粘贴会话 Cookie。',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 小时 · 每周',
        howHtml:
          'Gemini 和 Claude+GPT 的用量。读取本地的 <code>agy</code> 命令行工具，程序内不需要账号或密钥。',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'OpenCode API 密钥。',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: '每月 AI 积分',
        howHtml:
          '相对于方案内含额度计算，每月 1 日重置。fine-grained GitHub 个人访问令牌（PAT）。',
      },
      openrouter: {
        name: 'OpenRouter',
        what: '今日花费 · 本月花费',
        howHtml:
          '可选的每日预算；加上管理密钥还能看余额和各模型用量。OpenRouter API 密钥。',
      },
    },
    noteHtml:
      'Claude、Codex 和 GitHub Copilot 默认启用；其他服务和重置公告需要在 <strong>Settings</strong> 中开启。Claude、Codex 和 OpenCode Go 都可以同时跟踪多个账号。',
  },

  resets: {
    label: '重置公告',
    heading: '重置前后的三个时刻。',
    sub: 'AI Usage Clock 会抓取重置公告：提前预告时让你有心理准备，没有预告时也能看到发生了什么。',
    items: {
      announced: {
        when: '提前',
        tag: 'Announced（预告）',
        heading: '重置在发生之前就先宣布。',
        body: '这就是让你先有心理准备的提醒。这一类来自 Codex。旁边另有一行 Watch，是 AI 预测的重置可能性，不是公告，也不会发通知。',
      },
      reset: {
        when: '发生时',
        tag: 'Reset（已重置）',
        heading: '额度已经补满。',
        body: '磁贴会显示最新一条事件，以及它发生至今的时间。Banked（重置额度）是相关的一类：你获得了一次可以自行兑换的重置额度。Claude 会显示 Reset 和 Banked。',
      },
      silent: {
        when: '事后，用量清零时',
        tag: '',
        heading: '有些重置来得很突然。',
        body: '用量突然清零时，点开磁贴看看是不是刚重置。磁贴会一直保留最新的公告，并可一键打开原始帖子。',
      },
    },
    caveatHtml:
      '<strong>可选，且默认关闭。</strong>公告来自两个独立的第三方追踪站 codex-resets.com 和 claude-resets.com，可能延迟或误判，请以原始帖子为准。通知同样是可选的，每种类型都能单独设置。',
  },

  faq: {
    label: '常见问题',
    heading: '疑问，用大白话回答。',
    items: {
      howResets: {
        q: '重置公告是怎么运作的？',
        parasHtml: [
          '默认关闭。到 <strong>Settings → General</strong> 勾选 <strong>Codex Resets</strong> 或 <strong>Claude Resets</strong> 即可开启。之后 AI Usage Clock 会读取 codex-resets.com 和 claude-resets.com，程序运行期间，每个站最多每 15 分钟查询一次。',
          '磁贴会显示最新一条事件以及它发生至今的时间，并标明类型：<em>Announced</em>（预告，仅 Codex）、<em>Reset</em>（已重置）或 <em>Banked</em>（重置额度）。这些数据由第三方汇总，可能延迟或误判，请以原始帖子为准。',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: '我的数据会发到哪里？',
        parasHtml: [
          '你的设置、用量历史和登录会话都留在你的电脑上。会话和 API 密钥存放在操作系统提供的安全存储机制中。没有遥测，也没有 AI Usage Clock 的服务器。',
          `程序只会直接连接你开启的服务。如果开启重置公告，还会连接 codex-resets.com 和 claude-resets.com，对方能看到你的 IP 地址，以及程序名称和版本。详见 <a href="${LINKS.security}">SECURITY.md</a>（英文）。`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: '它与 Anthropic、OpenAI 或 Google 有关联吗？',
        parasHtml: [
          '没有。AI Usage Clock 是独立的开源项目，并非由它所显示的任何服务制作，也未经这些服务认可。各服务的页面和 API 可能随时变更。',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: '首次启动时出现 SmartScreen 或 Gatekeeper 警告',
        parasHtml: ['发行版本尚未经过代码签名，每个压缩包旁都附有 SHA256 哈希值可供核对。'],
        listHtml: [
          '<strong>Windows：</strong>如果 SmartScreen 弹出警告，点击 <strong>More info</strong>，再点击 <strong>Run anyway</strong>。',
          '<strong>macOS：</strong>先尝试打开一次，再到“系统设置”→“隐私与安全”点按<strong>仍要打开</strong>。或者运行一次 <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>。',
          '<strong>Linux：</strong>如果 <code>ai-usage-clock</code> 还没有执行权限，请先加上。',
        ],
      },
      platforms: {
        q: 'macOS 和 Linux 也能用吗？',
        parasHtml: [
          `可以，但有个前提。Windows 是主要的开发平台，也是用真实账号测试过的平台。macOS（用菜单栏项代替悬浮小组件）和 Linux 版本也有发布，但用真实账号刷新用量，目前只在 Windows 11 上验证过，所以请把它们视为早期阶段。遇到问题欢迎<a href="${LINKS.issues}">提交 issue</a> 反馈。`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '免费吗？',
        parasHtml: [
          '免费，以 MIT 许可证开源。你所查看的各项服务仍需要各自的账号或订阅。',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: '把每个 AI 额度放到你的桌面上。',
    body: '免费，以 MIT 许可证开源。Windows 是主要的开发平台；macOS 和 Linux 版本为测试版。',
    download: '下载',
    github: '在 GitHub 上查看',
    smallHtml: `v${VERSION} · Windows · macOS 测试版 · Linux 测试版。发行版本尚未签名，第一次启动时 Windows 或 macOS 可能会弹出警告，<a href="#unsigned">处理方式在这里</a>。`,
    iconAlt:
      'AI Usage Clock 应用图标：环内是一个钟面，环的颜色由绿色经黄色、橙色渐变到红色',
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
      'AI Usage Clock 与 Anthropic、OpenAI、Google、GitHub、Microsoft、OpenCode、OpenRouter 或任何其他服务提供商均无关联。产品名称归各自的所有者所有。',
    version: `当前版本 ${VERSION} · 免费，以 MIT 许可证开源。`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: '选择你的语言',
  },

  notFound: {
    heading: '找不到页面',
    body: '这个地址在本站没有对应的页面。请检查链接，或返回首页。',
    back: '返回首页',
  },
};
