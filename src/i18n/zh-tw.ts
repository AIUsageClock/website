import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Traditional Chinese (Taiwan). Written natively in the voice of https://github.com/AIUsageClock/ai-usage-clock/blob/main/README.zh-TW.md, not translated
 * sentence by sentence; the facts follow en.ts key by key. Keep UI names that the app shows in English
 * (Settings, Codex Resets, Announced, Reset, Banked, Watch, Session, Weekly) in English.
 * Agreed wording: Banked = 重置券, FAQ = 常見問答, beta = 測試版.
 */
export const zhTw: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — 看見每個 AI 額度，掌握每次重置。',
    description:
      'AI Usage Clock 把各家 AI 的用量上限收進桌面上的小視窗，也會幫你抓 Codex 和 Claude 的重置公告。',
    ogAlt:
      'AI Usage Clock：「看見每個 AI 額度，掌握每次重置。」旁邊是小工具的截圖，上面有 Claude、Codex 和 Antigravity 的用量條。',
  },

  a11y: {
    skip: '跳到主要內容',
    language: '語言',
    switchToDark: '切換成深色主題',
    switchToLight: '切換成淺色主題',
  },

  header: {
    download: '下載',
  },

  hero: {
    kicker: '桌面小工具 · 開源',
    line1: '看見每個 AI 額度，',
    line2: '掌握每次重置。',
    lede: 'AI Usage Clock 把各家 AI 的用量上限收進桌面上的小視窗，也會幫你抓 Codex 和 Claude 的重置公告：有預告的先讓你知道，用量突然歸零的時候，也有地方可以確認是不是剛重置。',
    download: '下載',
    github: '前往 GitHub',
    fine: `v${VERSION} · Windows · macOS 測試版 · Linux 測試版`,
  },

  stories: {
    heading: '它能幫你做什麼',
    problemLabel: '痛點',
    fixLabel: '解法',
    items: {
      overview: {
        problem: '每家 AI 的額度，都要各自點進去看。',
        heading: '各家 AI 額度，一個視窗看完。',
        body: 'Claude、Codex、Antigravity、OpenCode Go、GitHub Copilot、OpenRouter 並排顯示，每個服務都有自己的用量條；使用中的額度，旁邊還會標出剩餘時間。',
        alt: 'AI Usage Clock 的完整模式：Claude、Codex、OpenCode、Copilot、OpenRouter 各有用量條和剩餘時間',
        caption: '一個小視窗，好幾個服務，各有各的用量條。範例資料。',
      },
      resets: {
        problem: '用量突然歸零了，卻不知道是怎麼回事。',
        heading: '有預告的先知道，沒預告的查得到。',
        body: '打開重置公告功能後，AI Usage Clock 會幫你抓 Codex 和 Claude 的重置公告。有些重置會事先預告，讓你有時間準備；有些則是突然就來了，所以區塊會一直留著最新一則公告，點一下就能打開原始貼文。',
        alt: 'Codex Resets 區塊顯示 Reset（額度已補滿，1 天前），Claude Resets 區塊顯示 Banked（重置券，21 天前）',
        caption:
          'Codex Resets 和 Claude Resets 區塊，從實際執行中的 1.0.0 發行版擷取；畫面上的用量是擷取當下的數字。',
      },
      compact: {
        problem: '桌面空間有限，不一定擺得下另一個視窗。',
        heading: '要小，也可以很小。',
        body: '精簡模式下，每個服務縮成一顆膠囊。',
        alt: '精簡模式：每個服務縮成一顆膠囊',
        caption: '精簡模式，每個服務一顆膠囊。範例資料。',
      },
    },
    also: {
      notify: {
        heading: '有新公告時通知你',
        body: '想要的話，可以在新公告出現時跳通知（Windows 用系統原生通知），每種公告類型都有自己的開關。重置公告和通知預設都是關的。',
      },
      local: {
        heading: '全部在你的電腦上跑',
        body: '不必註冊 AI Usage Clock 帳號，沒有伺服器，也沒有遙測。API 金鑰交給作業系統的安全儲存區保管。',
      },
    },
  },

  services: {
    label: '支援的服務',
    heading: '各服務看得到什麼、怎麼連。',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          '方案有每週 Fable 額度的話也會顯示。用瀏覽器登入（Google 帳號、密碼金鑰都能用），或貼上工作階段 Cookie。',
      },
      codex: {
        name: 'Codex（ChatGPT）',
        what: 'Session · Weekly',
        howHtml: '跟 Claude 一樣：用瀏覽器登入，或貼上工作階段 Cookie。',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 小時 · Weekly',
        howHtml:
          'Gemini 和 Claude+GPT 兩組用量。讀取你電腦上的 <code>agy</code> 命令列工具，不用在程式裡輸入帳號或金鑰。',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'OpenCode API 金鑰。',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: '每月 AI 點數',
        howHtml: '對照方案內含的額度，每月 1 號重置。GitHub 細粒度個人存取權杖（fine-grained PAT）。',
      },
      openrouter: {
        name: 'OpenRouter',
        what: '今天花費 · 本月花費',
        howHtml: '可另設每日預算；有管理金鑰的話，還看得到餘額和各模型的使用情形。OpenRouter API 金鑰。',
      },
    },
    noteHtml:
      '預設開啟的是 Claude、Codex 和 GitHub Copilot；其他服務和重置公告，要到 <strong>Settings</strong>（設定）自己打開。Claude、Codex、OpenCode Go 都可以同時追蹤好幾個帳號。',
  },

  resets: {
    label: '重置公告',
    heading: '重置前、重置時、重置後。',
    sub: 'AI Usage Clock 會幫你抓重置公告：有預告的先讓你知道；沒預告的，事後也看得到發生了什麼事。',
    items: {
      announced: {
        when: '事前',
        tag: 'Announced（預告）',
        heading: '還沒重置，就先公告。',
        body: '看到它，就可以先做準備。這一類只有 Codex 有。旁邊還有一列 Watch（觀察），是 AI 預測重置的機率有多高；它不是公告，也不會發任何通知。',
      },
      reset: {
        when: '重置時',
        tag: 'Reset（已重置）',
        heading: '額度已經補滿。',
        body: '區塊會顯示最新一筆事件和距今多久。另一種相關類型是 Banked（重置券）：你拿到一張重置券，可以留著自己兌換。Claude 會顯示 Reset 和 Banked 兩種。',
      },
      silent: {
        when: '事後，用量歸零時',
        tag: '',
        heading: '有些重置，說來就來。',
        body: '用量突然歸零時，打開區塊看看是不是剛重置。最新一則公告會一直留著，點一下就能打開原始貼文。',
      },
    },
    caveatHtml:
      '<strong>選用功能，預設關閉。</strong>公告來自兩個獨立的第三方追蹤站：codex-resets.com 和 claude-resets.com，可能會晚到或判斷錯誤，請以原始貼文為準。通知同樣是選用的，每種類型都有自己的開關。',
  },

  faq: {
    label: 'FAQ',
    heading: '常見問答',
    items: {
      howResets: {
        q: '重置公告是怎麼抓的？',
        parasHtml: [
          '預設是關的。到 <strong>Settings → General</strong>（一般）打開 <strong>Codex Resets</strong> 或 <strong>Claude Resets</strong>，AI Usage Clock 就會去讀 codex-resets.com 和 claude-resets.com；程式開著的時候，每個站最多每 15 分鐘問一次。',
          '區塊會顯示最新一筆事件和距今多久，並標上類型：<em>Announced</em>（預告，只有 Codex 有）、<em>Reset</em>（已重置）或 <em>Banked</em>（重置券）。這些資料是第三方整理的，可能會晚到或判斷錯誤，一切以原始貼文為準。',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: '我的資料會傳到哪裡？',
        parasHtml: [
          '設定、用量歷史和登入工作階段，都留在你自己的電腦上。工作階段和 API 金鑰交給作業系統的憑證機制保管。沒有遙測，也沒有 AI Usage Clock 伺服器。',
          `程式會直接連到你打開的服務。如果打開重置公告，程式還會連到 codex-resets.com 和 claude-resets.com，這兩個網站看得到你的 IP 位址，還有程式名稱和版本。詳情見 <a href="${LINKS.security}">SECURITY.md</a>（英文）。`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: '跟 Anthropic、OpenAI 或 Google 有關係嗎？',
        parasHtml: [
          '沒有。AI Usage Clock 是獨立的開源專案，不是畫面上任何一家服務做的，也沒有經過它們背書。各家網頁和 API 隨時可能改，事前不會通知。',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: '首次啟動時出現 SmartScreen 或 Gatekeeper 警告',
        parasHtml: ['發行版本沒有程式碼簽署，每個壓縮檔旁邊都附有 SHA256 雜湊值。'],
        listHtml: [
          '<strong>Windows：</strong>點<strong>其他資訊</strong>，再點<strong>仍要執行</strong>。',
          '<strong>macOS：</strong>先試著打開一次，再到「系統設定」→「隱私權與安全性」按<strong>強制打開</strong>。也可以直接執行一次 <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>。',
          '<strong>Linux：</strong>如果 <code>ai-usage-clock</code> 還沒有執行權限，幫它加上就好。',
        ],
      },
      platforms: {
        q: 'macOS 和 Linux 能用嗎？',
        parasHtml: [
          `能，但有一點要先說明。這個工具是在 Windows 上開發的，也在 Windows 上用真實帳號測過。macOS 版（是選單列項目，不是浮動小工具）和 Linux 版都有發布，不過用真實帳號重新整理用量，目前只在 Windows 11 上確認過，所以請當成測試版。用起來有什麼不對勁，歡迎<a href="${LINKS.issues}">開 issue</a> 回報。`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '免費嗎？',
        parasHtml: ['免費，以 MIT 授權開源。不過畫面上那些服務，本身還是要有帳號或訂閱。'],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: '把每個 AI 額度擺上桌面。',
    body: '免費，以 MIT 授權開源。開發平台是 Windows；macOS 和 Linux 版目前是測試版。',
    download: '下載',
    github: '前往 GitHub',
    smallHtml: `v${VERSION} · Windows · macOS 測試版 · Linux 測試版。下載的版本沒有程式碼簽署，第一次開啟時 Windows 或 macOS 可能會跳出警告，<a href="#unsigned">看這裡怎麼處理</a>。`,
    iconAlt: 'AI Usage Clock 圖示：圓環裡有一個鐘面，環的顏色從綠、黃、橘一路變成紅色',
  },

  footer: {
    tagline: '看見每個 AI 額度，掌握每次重置。',
    links: {
      github: 'GitHub',
      download: '下載',
      setup: '設定指南',
      usage: '日常使用',
      mcp: 'MCP 用量防護（英文）',
      changelog: '更新紀錄',
      license: '授權（MIT）',
    },
    disclaimer:
      'AI Usage Clock 和 Anthropic、OpenAI、Google、GitHub、Microsoft、OpenCode、OpenRouter 或其他任何服務商都沒有隸屬關係。各產品名稱屬於各自的所有者。',
    version: `目前版本 ${VERSION} · 免費，以 MIT 授權開源。`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: '選擇語言',
  },

  notFound: {
    heading: '找不到這個頁面',
    body: '這個網址在本站找不到對應的頁面。請檢查連結，或回到首頁。',
    back: '回到首頁',
  },
};
