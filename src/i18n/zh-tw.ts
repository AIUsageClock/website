import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Traditional Chinese (Taiwan). Wording follows repo/README.zh-TW.md and the zh-TW docs;
 * keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked) in English.
 */
export const zhTw: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — 看見每個 AI 額度，掌握每次重置。',
    description:
      '一個桌面小工具，把各家 AI 服務的用量上限集中在一處，並抓取 Codex 與 Claude 的重置公告。',
    ogAlt:
      'AI Usage Clock：「看見每個 AI 額度，掌握每次重置。」，旁邊是小工具的截圖，顯示 Claude、Codex 與 Antigravity 的用量條。',
  },

  a11y: {
    skip: '跳到主要內容',
    language: '語言',
    switchToDark: '切換為深色主題',
    switchToLight: '切換為淺色主題',
  },

  header: {
    download: '下載',
  },

  hero: {
    kicker: '桌面小工具 · 開放原始碼',
    line1: '看見每個 AI 額度，',
    line2: '掌握每次重置。',
    lede: '一個桌面小工具，把各家 AI 服務的用量上限集中在一處，並抓取 Codex 與 Claude 的重置公告：事先預告時讓你有心理準備，突然歸零時也有地方可以查看原因。',
    download: '下載',
    github: '在 GitHub 上查看',
    fine: `v${VERSION} · Windows · macOS 測試版 · Linux 測試版`,
  },

  stories: {
    heading: '為什麼選 AI Usage Clock',
    problemLabel: '問題',
    fixLabel: '解法',
    items: {
      overview: {
        problem: '每個 AI 服務都把額度放在各自的角落。',
        heading: '你的 AI 額度，一個地方看完。',
        body: 'Claude、Codex、Antigravity、OpenCode Go、GitHub Copilot 與 OpenRouter 並排顯示，每項各有一條用量條；進行中的額度，用量條旁還會標示剩餘時間。',
        alt: 'AI Usage Clock 的完整模式，列出 Claude、Codex、OpenCode、Copilot 與 OpenRouter，每項都有用量條與剩餘時間',
        caption: '一個小工具，多項服務，各有各的用量條。範例資料。',
      },
      resets: {
        problem: '然後你的用量歸零了，卻不知道為什麼。',
        heading: '提前預告有準備，突然歸零有原因。',
        body: '開啟重置公告後，AI Usage Clock 會抓取 Codex 與 Claude 的重置公告。有些重置會事先預告，讓你先有心理準備；有些來得很突然：方塊會一直保留最新的公告，並可一鍵開啟原始貼文。',
        alt: 'Codex Resets 方塊顯示「Reset」（額度已補滿，1 天前），Claude Resets 方塊顯示「Banked」（重置額度，21 天前）',
        caption:
          'Codex Resets 與 Claude Resets 方塊，擷取自執行中的 1.0.0 發行版本。用量數值為擷取當下的狀態。',
      },
      compact: {
        problem: '不是每個桌面都有空間再多一個視窗。',
        heading: '想要小，它就能很小。',
        body: '精簡模式會把小工具縮成每項服務一顆膠囊。',
        alt: '精簡模式：每項服務一顆膠囊',
        caption: '精簡模式，每項服務一顆膠囊。範例資料。',
      },
    },
    also: {
      notify: {
        heading: '新公告出現就通知你',
        body: '可選擇在新公告出現時發出通知（Windows 為原生通知），每種公告都能個別設定。重置公告與它的通知，預設都是關閉的。',
      },
      local: {
        heading: '在你的電腦上執行',
        body: '沒有 AI Usage Clock 帳號、伺服器或遙測。API 金鑰由作業系統的安全儲存機制保管。',
      },
    },
  },

  services: {
    label: '支援的服務',
    heading: '你會看到什麼，以及如何連線。',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          '方案有每週 Fable 額度時，也會一併顯示。透過瀏覽器登入（支援 Google 與密碼金鑰 passkey），或貼上工作階段 cookie。',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: '與 Claude 相同：透過瀏覽器登入，或貼上工作階段 cookie。',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 小時 · 每週',
        howHtml:
          'Gemini 與 Claude+GPT 的用量。讀取本機的 <code>agy</code> 命令列工具，程式內不需要帳號或金鑰。',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'OpenCode API 金鑰。',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: '每月 AI 點數',
        howHtml:
          '相對於方案內含額度計算，每月 1 日重置。fine-grained GitHub 個人存取權杖（PAT）。',
      },
      openrouter: {
        name: 'OpenRouter',
        what: '今日花費 · 本月花費',
        howHtml:
          '可選的每日預算；加上管理金鑰還能看餘額與各模型用量。OpenRouter API 金鑰。',
      },
    },
    noteHtml:
      'Claude、Codex 與 GitHub Copilot 預設啟用；其他服務與重置公告需要在 <strong>Settings</strong> 中開啟。Claude、Codex 與 OpenCode Go 都可以同時追蹤多個帳號。',
  },

  resets: {
    label: '重置公告',
    heading: '重置前後的三個時刻。',
    sub: 'AI Usage Clock 會抓取重置公告：事先預告時讓你有心理準備，沒有預告時也能看到發生了什麼事。',
    items: {
      announced: {
        when: '事先',
        tag: 'Announced（預告）',
        heading: '重置在發生前就先宣布。',
        body: '這就是讓你先有心理準備的提醒。這一類來自 Codex。旁邊另有一列 Watch，是 AI 預測的重置可能性，不是公告，也不會發通知。',
      },
      reset: {
        when: '發生當下',
        tag: 'Reset（已重置）',
        heading: '額度已經補滿。',
        body: '方塊會顯示最新一則事件，以及它發生至今的時間。Banked（重置額度）是相關的一類：你獲得一次可以自行兌換的重置額度。Claude 會顯示 Reset 與 Banked。',
      },
      silent: {
        when: '事後，用量歸零時',
        tag: '',
        heading: '有些重置來得很突然。',
        body: '用量突然歸零時，點開方塊看看是不是剛重置。方塊會一直保留最新的公告，並可一鍵開啟原始貼文。',
      },
    },
    caveatHtml:
      '<strong>選用，且預設關閉。</strong>公告來自兩個獨立的第三方追蹤站 codex-resets.com 與 claude-resets.com，可能延遲或誤判，請以原始貼文為準。通知也是選用的，每種類型都能個別設定。',
  },

  faq: {
    label: '常見問題',
    heading: '疑問，用白話回答。',
    items: {
      howResets: {
        q: '重置公告是怎麼運作的？',
        parasHtml: [
          '預設關閉。到 <strong>Settings → General</strong> 勾選 <strong>Codex Resets</strong> 或 <strong>Claude Resets</strong> 即可開啟。之後 AI Usage Clock 會讀取 codex-resets.com 與 claude-resets.com，程式執行期間，每個站最多每 15 分鐘查詢一次。',
          '方塊會顯示最新一則事件與發生至今的時間，並標明類型：<em>Announced</em>（預告，僅 Codex）、<em>Reset</em>（已重置）或 <em>Banked</em>（重置額度）。這些資料由第三方彙整，可能延遲或誤判，請以原始貼文為準。',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: '我的資料會傳到哪裡？',
        parasHtml: [
          '你的設定、用量歷史與登入工作階段都留在你的電腦上。工作階段與 API 金鑰存放在作業系統提供的安全儲存機制。沒有遙測，也沒有 AI Usage Clock 的伺服器。',
          `程式只會直接連到你開啟的服務。若開啟重置公告，另會連到 codex-resets.com 與 claude-resets.com，對方看得到你的 IP 位址，以及程式名稱與版本。詳見 <a href="${LINKS.security}">SECURITY.md</a>（英文）。`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: '它與 Anthropic、OpenAI 或 Google 有隸屬關係嗎？',
        parasHtml: [
          '沒有。AI Usage Clock 是獨立的開放原始碼專案，並非由它所顯示的任何服務製作，也未經這些服務認可。各服務的頁面與 API 可能隨時異動。',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: '首次啟動時出現 SmartScreen 或 Gatekeeper 警告',
        parasHtml: ['發行版本尚未經過程式碼簽署，每個壓縮檔旁都附有 SHA256 雜湊值可供核對。'],
        listHtml: [
          '<strong>Windows：</strong>若 SmartScreen 出現警告，點選<strong>其他資訊</strong>，再點選<strong>仍要執行</strong>。',
          '<strong>macOS：</strong>先試著開啟一次，再到「系統設定」→「隱私權與安全性」按下<strong>強制打開</strong>。或者執行一次 <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>。',
          '<strong>Linux：</strong>若 <code>ai-usage-clock</code> 還沒有執行權限，請先加上。',
        ],
      },
      platforms: {
        q: 'macOS 與 Linux 也能用嗎？',
        parasHtml: [
          `可以，但有但書。Windows 是主要的開發平台，也是用真實帳號測試過的平台。macOS（以選單列項目取代浮動小工具）與 Linux 版本也有發布，但以真實帳號重新整理用量，目前只在 Windows 11 驗證過，所以請把它們視為早期階段。遇到問題歡迎<a href="${LINKS.issues}">開 issue</a> 回報。`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '免費嗎？',
        parasHtml: [
          '免費，以 MIT 授權開放原始碼。你所查看的各項服務仍需要各自的帳號或訂閱。',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: '把每個 AI 額度放上你的桌面。',
    body: '免費，以 MIT 授權開放原始碼。Windows 是主要的開發平台；macOS 與 Linux 版本為測試版。',
    download: '下載',
    github: '在 GitHub 上查看',
    smallHtml: `v${VERSION} · Windows · macOS 測試版 · Linux 測試版。發行版本尚未簽署，第一次啟動時 Windows 或 macOS 可能會跳出警告，<a href="#unsigned">處理方式在這裡</a>。`,
    iconAlt:
      'AI Usage Clock 應用程式圖示：環內是一個鐘面，環的顏色由綠色經黃色、橘色漸變到紅色',
  },

  footer: {
    tagline: '看見每個 AI 額度，掌握每次重置。',
    links: {
      github: 'GitHub',
      download: '下載',
      setup: '設定指南',
      usage: '日常使用',
      mcp: 'MCP 用量防護（英文）',
      changelog: '變更記錄',
      license: '授權（MIT）',
    },
    disclaimer:
      'AI Usage Clock 與 Anthropic、OpenAI、Google、GitHub、Microsoft、OpenCode、OpenRouter 或任何其他服務供應商皆無隸屬關係。產品名稱歸各自的所有者所有。',
    version: `目前版本 ${VERSION} · 免費，以 MIT 授權開放原始碼。`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: '選擇你的語言',
  },

  notFound: {
    heading: '找不到頁面',
    body: '這個網址在本站沒有對應的頁面。請檢查連結，或回到首頁。',
    back: '回到首頁',
  },
};
