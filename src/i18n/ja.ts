import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Japanese. Written natively in the voice of runs/2026-10-16-i18n/ja/README.ja.md (desu/masu body,
 * plain-form headlines), not translated sentence by sentence; the facts follow en.ts key by key.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Half-width space between Japanese and half-width alphanumerics.
 * Agreed wording: Banked = リセット券 / beta = ベータ版 / English-only docs are marked （英語）.
 * OS strings: SmartScreen 「詳細情報」「実行」, macOS 「システム設定」「プライバシーとセキュリティ」「このまま開く」.
 */
export const ja: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — すべての AI の上限が見える。すべてのリセットがわかる。',
    description:
      'AI Usage Clock は、各サービスの AI 利用上限をデスクトップの小さなウィジェットにまとめて表示します。Codex と Claude のリセット告知も拾います。',
    ogAlt:
      'AI Usage Clock：「すべての AI の上限が見える。すべてのリセットがわかる。」の横に、Claude、Codex、Antigravity の使用量バーが並ぶウィジェットのスクリーンショット。',
  },

  a11y: {
    skip: 'コンテンツへスキップ',
    language: '言語',
    switchToDark: 'ダークテーマに切り替え',
    switchToLight: 'ライトテーマに切り替え',
  },

  header: {
    download: 'ダウンロード',
  },

  hero: {
    kicker: 'デスクトップウィジェット · オープンソース',
    line1: 'すべての AI の上限が見える。',
    line2: 'すべてのリセットがわかる。',
    lede: 'AI Usage Clock は、各サービスの AI 利用上限をデスクトップの小さなウィジェットにまとめて表示します。Codex と Claude のリセット告知も拾うので、予告されたリセットは前もって把握でき、使用量が急にゼロに戻ったときも、リセットがあったのかをここで確かめられます。',
    download: 'ダウンロード',
    github: 'GitHub で見る',
    fine: `v${VERSION} · Windows · macOS ベータ版 · Linux ベータ版`,
  },

  stories: {
    heading: 'できること',
    problemLabel: '課題',
    fixLabel: '解決策',
    items: {
      overview: {
        problem: 'AI ごとに、上限を確認する場所がばらばら。',
        heading: 'AI の上限を一か所に。',
        body: 'Claude、Codex、Antigravity、OpenCode Go、GitHub Copilot、OpenRouter を並べて表示し、サービスごとに使用量バーが付きます。期間が始まっている上限には、バーの横に残り時間も表示されます。',
        alt: 'AI Usage Clock のフルモード。Claude、Codex、OpenCode、Copilot、OpenRouter が並び、それぞれに使用量バーと残り時間が表示されている',
        caption: 'ひとつのウィジェットに複数のサービス。それぞれに使用量バーが付きます。サンプルデータ。',
      },
      resets: {
        problem: 'ある日、使用量がゼロに戻っている。でも理由がわからない。',
        heading: '予告があれば事前に。なくても、あとから確認できる。',
        body: 'リセット告知をオンにすると、AI Usage Clock が Codex と Claude のリセット告知を拾います。前もって予告されるリセットなら、準備をしておけます。何の前触れもなく来るリセットもありますが、タイルには最新の告知が表示され続け、元の投稿もワンクリックで開けます。',
        alt: 'Codex Resets のタイルに Reset（上限が回復、1 日前）、Claude Resets のタイルに Banked（リセット券、21 日前）と表示されている',
        caption:
          'Codex Resets と Claude Resets のタイル。実際に動いている 1.0.0 リリース版から撮影したもので、使用量は撮影時点の値です。',
      },
      compact: {
        problem: 'デスクトップに、ウィンドウを増やす余裕がないこともある。',
        heading: '小さくしたいときは、小さく。',
        body: 'コンパクトモードでは、サービスごとに小さなカプセル 1 つまで縮めて表示できます。',
        alt: 'コンパクトモード：サービスごとにカプセル型の表示が 1 つずつ並ぶ',
        caption: 'コンパクトモード。サービスごとにカプセル 1 つ。サンプルデータ。',
      },
    },
    also: {
      notify: {
        heading: '新しい告知が出たら通知',
        body: '希望すれば、新しい告知が出たときに通知を受け取れます（Windows ではシステム標準の通知）。通知は種類ごとに個別にオン・オフできます。リセット告知も通知も、初期設定ではオフです。',
      },
      local: {
        heading: '手元のコンピューターで動作',
        body: 'AI Usage Clock のアカウントも、サーバーも、テレメトリもありません。API キーは OS の安全な保管場所に保存します。',
      },
    },
  },

  services: {
    label: '対応サービス',
    heading: '何が見えるか、どうつなぐか。',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Fable の週上限があるプランでは、それも表示します。ブラウザーでログイン（Google アカウントやパスキーも可）するか、セッション Cookie を貼り付けます。',
      },
      codex: {
        name: 'Codex（ChatGPT）',
        what: 'Session · Weekly',
        howHtml: 'Claude と同じく、ブラウザーでログインするか、セッション Cookie を貼り付けます。',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 時間 · Weekly',
        howHtml:
          'Gemini と Claude+GPT の使用量。手元の <code>agy</code> コマンドラインツールを読み取るので、アプリにアカウントやキーを登録する必要はありません。',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'OpenCode の API キー。',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: '月間 AI クレジット',
        howHtml:
          '当月に使った分を、プランの利用枠と比べて表示します。毎月 1 日にリセット。GitHub の fine-grained personal access token を使います。',
      },
      openrouter: {
        name: 'OpenRouter',
        what: '今日の利用額 · 今月の利用額',
        howHtml:
          '任意で 1 日の予算を設定できます。管理キーがあれば、残高とモデル別のアクティビティも表示します。OpenRouter の API キー。',
      },
    },
    noteHtml:
      '初期状態で有効なのは Claude、Codex、GitHub Copilot です。ほかのサービスとリセット告知は、<strong>Settings</strong>（設定画面）でオンにします。Claude、Codex、OpenCode Go は、複数のアカウントを登録して追跡できます。',
  },

  resets: {
    label: 'リセット告知',
    heading: 'リセットの前、そのとき、そのあと。',
    sub: 'AI Usage Clock はリセット告知を拾います。予告があれば前もって知ることができ、予告がなかったときも、何が起きたのかをあとから確認できます。',
    items: {
      announced: {
        when: '事前',
        tag: 'Announced（予告）',
        heading: 'リセットの前に、告知が出る。',
        body: '準備を始める合図です。この種類は Codex から来ます。そばには Watch（予測）行もあり、AI がリセットの起こりやすさを予測しています。こちらは告知ではなく、通知も一切送りません。',
      },
      reset: {
        when: 'リセット時',
        tag: 'Reset（リセット済み）',
        heading: '上限が回復した。',
        body: 'タイルには、最新のイベントとそこからの経過時間が表示されます。関連する種類に Banked（リセット券）があり、自分の好きなタイミングで使えるリセット券が付与されたことを示します。Claude で表示されるのは Reset と Banked です。',
      },
      silent: {
        when: '事後、使用量がゼロのとき',
        tag: '',
        heading: '前触れのないリセットもある。',
        body: '使用量が急にゼロに戻っていたら、タイルを開いて、リセットがあったのかを確かめましょう。最新の告知は表示されたままで、元の投稿もワンクリックで開けます。',
      },
    },
    caveatHtml:
      '<strong>任意の機能で、初期設定ではオフです。</strong>告知は独立したサードパーティのトラッカー 2 つ（codex-resets.com と claude-resets.com）から取得しているため、遅れたり間違っていたりすることがあります。元の投稿で確認してください。通知も任意で、種類ごとに個別にオン・オフできます。',
  },

  faq: {
    label: 'FAQ',
    heading: 'よくある質問',
    items: {
      howResets: {
        q: 'リセット告知はどうやって取得していますか？',
        parasHtml: [
          '初期設定ではオフです。<strong>Settings → General</strong>（一般）で <strong>Codex Resets</strong> または <strong>Claude Resets</strong> をオンにすると、AI Usage Clock が codex-resets.com と claude-resets.com を読みに行きます。アプリの起動中、それぞれへの問い合わせは最大で 15 分に 1 回です。',
          'タイルには、最新のイベントとそこからの経過時間が、<em>Announced</em>（予告、Codex のみ）、<em>Reset</em>（リセット済み）、<em>Banked</em>（リセット券）のラベル付きで表示されます。データはサードパーティがまとめたもので、遅れたり間違っていたりすることがあります。正しい情報は元の投稿で確認してください。',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'データはどこに送られますか？',
        parasHtml: [
          '設定、使用量の履歴、ログインセッションは、お使いのコンピューターの中に保存されます。セッションと API キーの保存には、OS の資格情報の仕組みを使います。テレメトリはなく、AI Usage Clock のサーバーもありません。',
          `アプリは、オンにしたサービスに直接接続します。リセット告知をオンにした場合は、codex-resets.com と claude-resets.com にも接続します。これらのサイトからは、IP アドレスと、アプリの名前・バージョンが見えます。詳しくは <a href="${LINKS.security}">SECURITY.md</a>（英語）をご覧ください。`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Anthropic、OpenAI、Google と関係はありますか？',
        parasHtml: [
          'いいえ。AI Usage Clock は独立したオープンソースプロジェクトです。表示しているどのサービスが作ったものでもなく、どのサービスの公認も受けていません。各サービスのページや API は、予告なく変わることがあります。',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: '起動時に SmartScreen や Gatekeeper の警告が出る',
        parasHtml: ['リリース版のビルドにはコード署名をしていません。各アーカイブの横には SHA256 チェックサムを公開しています。'],
        listHtml: [
          '<strong>Windows：</strong><strong>詳細情報</strong>をクリックし、続けて<strong>実行</strong>をクリックします。',
          '<strong>macOS：</strong>一度アプリを開こうとしてから、「システム設定」→「プライバシーとセキュリティ」で<strong>このまま開く</strong>をクリックします。または、<code>xattr -dr com.apple.quarantine ai-usage-clock.app</code> を一度実行してもかまいません。',
          '<strong>Linux：</strong><code>ai-usage-clock</code> に実行権限が付いていなければ、付けてください。',
        ],
      },
      platforms: {
        q: 'macOS や Linux でも使えますか？',
        parasHtml: [
          `使えますが、注意点があります。開発は Windows で行っていて、実際のアカウントを使ったテストも Windows でしています。macOS 版（フローティングウィジェットではなく、メニューバーの項目として動きます）と Linux 版も公開していますが、実際のアカウントで使用量を更新できることを確認できているのは Windows 11 だけなので、ベータ版と考えてください。おかしな点があれば、<a href="${LINKS.issues}">Issue</a> で知らせてください。`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: '無料ですか？',
        parasHtml: [
          'はい。MIT ライセンスで公開している、無料のオープンソースソフトウェアです。ただし、表示する各サービスを使うには、それぞれのアカウントやサブスクリプションが必要です。',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'すべての AI の上限を、デスクトップに。',
    body: 'MIT ライセンスの無料オープンソースです。開発は Windows で行っていて、macOS 版と Linux 版はベータ版です。',
    download: 'ダウンロード',
    github: 'GitHub で見る',
    smallHtml: `v${VERSION} · Windows · macOS ベータ版 · Linux ベータ版。ビルドにはコード署名をしていないため、初回起動時に Windows や macOS が警告を出すことがあります。<a href="#unsigned">対処方法はこちら</a>。`,
    iconAlt: 'AI Usage Clock のアイコン：緑から黄、オレンジ、赤へと色が変わるリングの中に、時計の文字盤',
  },

  footer: {
    tagline: 'すべての AI の上限が見える。すべてのリセットがわかる。',
    links: {
      github: 'GitHub',
      download: 'ダウンロード',
      setup: 'セットアップガイド（英語）',
      usage: '日々の使い方（英語）',
      mcp: 'MCP による使用量ガード（英語）',
      changelog: '変更履歴（英語）',
      license: 'ライセンス（MIT）',
    },
    disclaimer:
      'AI Usage Clock は、Anthropic、OpenAI、Google、GitHub、Microsoft、OpenCode、OpenRouter をはじめ、どのサービス提供元とも提携関係にありません。各製品名は、それぞれの権利者に帰属します。',
    version: `現在のバージョン ${VERSION} · MIT ライセンスの無料オープンソースです。`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: '言語を選択',
  },

  notFound: {
    heading: 'ページが見つかりません',
    body: 'このアドレスに対応するページは、このサイトにはありません。リンクを確認するか、トップページに戻ってください。',
    back: 'トップページに戻る',
  },
};
