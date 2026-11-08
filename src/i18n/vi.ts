import type { DeepPartial, Messages } from './index';
import { LINKS, VERSION } from '../site.ts';

/**
 * Vietnamese. Written natively in a natural, plain, professional voice, not translated sentence by sentence;
 * the facts follow en.ts key by key. Address the reader as "bạn" and refer to the author as "tôi".
 * Vocabulary: tải xuống, cài đặt, đăng nhập, khóa API, chi phí, máy tính.
 * Keep UI names that the app shows in English (Settings, Codex Resets, Announced, Reset, Banked, Watch,
 * Session, Weekly) in English. Agreed wording: reset = đặt lại, Banked = phiếu đặt lại,
 * beta = beta, English-only docs are marked (tiếng Anh).
 * OS strings: macOS "Cài đặt hệ thống", "Quyền riêng tư & bảo mật", "Vẫn mở" confirmed at https://support.apple.com/vi-vn/102445;
 * Windows SmartScreen "Thông tin khác" / "Vẫn chạy" NOT CONFIRMED (no official source found).
 */
export const vi: DeepPartial<Messages> = {
  meta: {
    title: 'AI Usage Clock — Thấy mọi giới hạn AI. Biết mọi lần đặt lại.',
    description:
      'Một widget nhỏ trên màn hình nền, gom giới hạn sử dụng của các dịch vụ AI bạn dùng. Nó cũng nhận các thông báo đặt lại của Codex và Claude.',
    ogAlt:
      'AI Usage Clock: "Thấy mọi giới hạn AI. Biết mọi lần đặt lại." bên cạnh ảnh chụp widget với các thanh mức sử dụng của Claude, Codex và Antigravity.',
  },

  a11y: {
    skip: 'Chuyển đến nội dung chính',
    language: 'Ngôn ngữ',
    switchToDark: 'Chuyển sang giao diện tối',
    switchToLight: 'Chuyển sang giao diện sáng',
  },

  header: {
    download: 'Tải xuống',
  },

  hero: {
    kicker: 'Widget cho màn hình nền · Mã nguồn mở',
    line1: 'Thấy mọi giới hạn AI.',
    line2: 'Biết mọi lần đặt lại.',
    lede: 'Một widget nhỏ trên màn hình nền, gom giới hạn sử dụng của các dịch vụ AI bạn dùng. Nó cũng nhận các thông báo đặt lại của Codex và Claude: bạn được báo trước khi có lần đặt lại được công bố sớm, và có chỗ để xem lại khi mức sử dụng của bạn bỗng về 0.',
    download: 'Tải xuống',
    github: 'Xem trên GitHub',
    fine: `v${VERSION} · Windows · macOS beta · Linux beta`,
  },

  stories: {
    heading: 'Vì sao nên dùng AI Usage Clock',
    problemLabel: 'Vấn đề',
    fixLabel: 'Cách giải quyết',
    items: {
      overview: {
        problem: 'Mỗi dịch vụ AI giấu giới hạn của nó ở một góc riêng.',
        heading: 'Mọi giới hạn AI của bạn, ở một nơi.',
        body: 'Claude, Codex, Antigravity, OpenCode Go, GitHub Copilot, OpenRouter và Linear nằm cạnh nhau, mỗi dịch vụ có thanh mức sử dụng riêng. Với những giới hạn đang chạy, bên cạnh thanh còn hiện thời gian còn lại.',
        alt: 'Chế độ đầy đủ của AI Usage Clock liệt kê Claude, Codex, OpenCode, Copilot và OpenRouter, mỗi dịch vụ có các thanh mức sử dụng và thời gian còn lại',
        caption: 'Một widget, nhiều dịch vụ, mỗi dịch vụ một thanh riêng. Dữ liệu mẫu.',
      },
      resets: {
        problem: 'Rồi mức sử dụng của bạn bỗng về 0 mà bạn không biết vì sao.',
        heading: 'Được báo trước với một số lần đặt lại. Có nơi để kiểm tra những lần bất ngờ.',
        body: 'Bật thông báo đặt lại và AI Usage Clock sẽ nhận các thông báo đặt lại của Codex và Claude. Một số lần được công bố trước, nên bạn kịp chuẩn bị. Số khác đến bất ngờ: ô hiển thị luôn giữ thông báo mới nhất trong tầm mắt, và chỉ một cú nhấp là mở được bài đăng gốc.',
        alt: 'Ô Codex Resets hiện Reset, giới hạn đã được nạp lại, 1 ngày trước, và ô Claude Resets hiện Banked, phiếu đặt lại, 21 ngày trước',
        caption:
          'Các ô Codex Resets và Claude Resets, chụp từ bản phát hành 1.0.0 đang chạy. Các giá trị sử dụng là của thời điểm chụp.',
      },
      compact: {
        problem: 'Không phải bàn làm việc nào cũng còn chỗ cho thêm một cửa sổ.',
        heading: 'Nhỏ gọn khi bạn cần nhỏ gọn.',
        body: 'Chế độ thu gọn co widget lại thành một thanh gọn hình viên thuốc cho mỗi dịch vụ.',
        alt: 'Chế độ thu gọn: mỗi dịch vụ một thanh gọn hình viên thuốc',
        caption: 'Chế độ thu gọn, mỗi dịch vụ một thanh gọn hình viên thuốc. Dữ liệu mẫu.',
      },
    },
    also: {
      notify: {
        heading: 'Được nhắc khi có thông báo mới',
        body: 'Nếu muốn, bạn có thể nhận thông báo mỗi khi có một thông báo đặt lại mới (trên Windows dùng thông báo gốc của hệ thống), với công tắc riêng cho từng loại. Thông báo đặt lại và các lời nhắc của chúng đều tắt theo mặc định.',
      },
      local: {
        heading: 'Chạy ngay trên máy tính của bạn',
        body: 'Không có tài khoản AI Usage Clock, không có máy chủ, không có thu thập dữ liệu từ xa (telemetry). Khóa API được lưu trong kho lưu trữ bảo mật của hệ điều hành.',
      },
    },
  },

  services: {
    label: 'Dịch vụ được hỗ trợ',
    heading: 'Bạn thấy gì, và kết nối ra sao.',
    items: {
      claude: {
        name: 'Claude',
        what: 'Session · Weekly',
        howHtml:
          'Kèm giới hạn Fable theo tuần ở những gói có giới hạn này. Đăng nhập qua trình duyệt (dùng Google hoặc passkey đều được), hoặc dán cookie phiên.',
      },
      codex: {
        name: 'Codex (ChatGPT)',
        what: 'Session · Weekly',
        howHtml: 'Giống Claude: đăng nhập qua trình duyệt, hoặc dán cookie phiên.',
      },
      antigravity: {
        name: 'Antigravity',
        what: '5 giờ · Weekly',
        howHtml:
          'Mức sử dụng Gemini và Claude+GPT. Đọc công cụ dòng lệnh <code>agy</code> có sẵn trên máy của bạn; không cần tài khoản hay khóa trong ứng dụng.',
      },
      opencode: {
        name: 'OpenCode Go',
        what: 'Rolling · Weekly · Monthly',
        howHtml: 'Khóa API của OpenCode.',
      },
      copilot: {
        name: 'GitHub Copilot',
        what: 'Tín dụng AI hằng tháng',
        howHtml:
          'Tính trên mức gói của bạn cho phép, đặt lại vào ngày 1. Cần một personal access token dạng fine-grained của GitHub.',
      },
      openrouter: {
        name: 'OpenRouter',
        what: 'Chi tiêu hôm nay · Tháng này',
        howHtml:
          'Ngân sách theo ngày là tùy chọn; số dư và hoạt động theo từng mô hình cần khóa quản lý. Khóa API của OpenRouter.',
      },
      linear: {
        name: 'Linear',
        what: 'Issue · Giới hạn gói Free',
        howHtml:
          'Một thanh cho giới hạn 250 issue chưa lưu trữ của gói Free; các gói trả phí hiện <em>no limit</em>. Khóa API cá nhân của Linear.',
      },
    },
    noteHtml:
      'Claude, Codex và GitHub Copilot được bật theo mặc định. Các dịch vụ còn lại, cùng thông báo đặt lại, được bật trong <strong>Settings</strong>. Bạn có thể theo dõi nhiều hơn một tài khoản Claude, Codex hoặc OpenCode Go.',
  },

  resets: {
    label: 'Thông báo đặt lại',
    heading: 'Ba thời điểm quanh một lần đặt lại.',
    sub: 'AI Usage Clock nhận các thông báo đặt lại, để bạn được báo trước khi một lần đặt lại được công bố sớm, và xem được chuyện gì đã xảy ra khi không có thông báo nào.',
    items: {
      announced: {
        when: 'Trước đó',
        tag: 'Announced (đã công bố)',
        heading: 'Lần đặt lại được công bố trước khi xảy ra.',
        body: 'Đó là lời nhắc để bạn chuẩn bị. Loại này đến từ Codex. Bên cạnh có một hàng Watch (theo dõi), một dự báo do AI đưa ra về khả năng có lần đặt lại. Đó không phải là thông báo, và nó không bao giờ gửi nhắc nhở.',
      },
      reset: {
        when: 'Khi nó xảy ra',
        tag: 'Reset (đã đặt lại)',
        heading: 'Giới hạn đã được nạp lại.',
        body: 'Ô hiển thị sự kiện mới nhất và nó xảy ra cách đây bao lâu. Banked (phiếu đặt lại) là loại liên quan: bạn được cấp một phiếu đặt lại và có thể tự dùng khi cần. Claude hiển thị Reset và Banked.',
      },
      silent: {
        when: 'Sau đó, khi mức sử dụng về 0',
        tag: '',
        heading: 'Có những lần đặt lại đến bất ngờ.',
        body: 'Khi mức sử dụng của bạn bỗng về 0, hãy mở ô này để xem có phải vừa có lần đặt lại không. Thông báo mới nhất vẫn nằm trong tầm mắt, và chỉ một cú nhấp là mở được bài đăng gốc.',
      },
    },
    caveatHtml:
      '<strong>Tùy chọn, và tắt theo mặc định.</strong> Các thông báo đến từ hai trang theo dõi độc lập của bên thứ ba, codex-resets.com và claude-resets.com, nên có thể chậm hoặc sai, vì vậy hãy kiểm tra bài đăng gốc. Nhắc nhở cũng là tùy chọn, với công tắc riêng cho từng loại.',
  },

  faq: {
    label: 'FAQ',
    heading: 'Câu hỏi thường gặp, trả lời thẳng thắn.',
    items: {
      howResets: {
        q: 'Thông báo đặt lại hoạt động thế nào?',
        parasHtml: [
          'Chúng tắt theo mặc định. Hãy bật trong <strong>Settings → General</strong> với <strong>Codex Resets</strong> hoặc <strong>Claude Resets</strong>. Khi đó AI Usage Clock sẽ đọc codex-resets.com và claude-resets.com, hỏi mỗi trang tối đa 15 phút một lần khi ứng dụng đang chạy.',
          'Ô hiển thị sự kiện mới nhất và nó xảy ra cách đây bao lâu, kèm nhãn <em>Announced</em> (Codex), <em>Reset</em> hoặc <em>Banked</em>. Dữ liệu do bên thứ ba tổng hợp nên có thể chậm hoặc sai, vì vậy hãy xem bài đăng gốc là nguồn đáng tin cậy.',
        ],
        listHtml: [] as string[],
      },
      data: {
        q: 'Dữ liệu của bạn đi đâu?',
        parasHtml: [
          'Cài đặt, lịch sử sử dụng và các phiên đăng nhập của bạn nằm lại trên máy tính của bạn. Phiên đăng nhập và khóa API được lưu bằng cơ chế quản lý thông tin xác thực của hệ điều hành. Không có telemetry và không có máy chủ của AI Usage Clock.',
          `Ứng dụng kết nối trực tiếp tới các dịch vụ bạn bật. Nếu bạn bật thông báo đặt lại, nó cũng liên hệ với codex-resets.com và claude-resets.com; các trang đó thấy địa chỉ IP của bạn cùng tên và phiên bản của ứng dụng. Xem thêm trong <a href="${LINKS.security}">SECURITY.md</a> (tiếng Anh).`,
        ],
        listHtml: [] as string[],
      },
      affiliation: {
        q: 'Có liên quan gì đến Anthropic, OpenAI hay Google không?',
        parasHtml: [
          'Không. AI Usage Clock là một dự án mã nguồn mở độc lập, không do dịch vụ nào trong số mà nó hiển thị tạo ra hay bảo trợ. Trang và API của các nhà cung cấp có thể thay đổi mà không báo trước.',
        ],
        listHtml: [] as string[],
      },
      unsigned: {
        q: 'SmartScreen hoặc Gatekeeper cảnh báo khi mở ứng dụng',
        parasHtml: [
          'Các bản phát hành chưa được ký mã, và mã SHA256 được công bố cạnh từng tệp nén.',
        ],
        listHtml: [
          '<strong>Windows:</strong> nhấp <strong>Thông tin khác</strong>, rồi nhấp <strong>Vẫn chạy</strong>.',
          '<strong>macOS:</strong> thử mở ứng dụng một lần, rồi dùng <strong>Vẫn mở</strong> trong Cài đặt hệ thống → Quyền riêng tư &amp; bảo mật. Hoặc chạy một lần lệnh <code>xattr -dr com.apple.quarantine ai-usage-clock.app</code>.',
          '<strong>Linux:</strong> hãy cấp quyền thực thi cho <code>ai-usage-clock</code> nếu tệp chưa có quyền này.',
        ],
      },
      platforms: {
        q: 'Nó có chạy trên macOS và Linux không?',
        parasHtml: [
          `Có, nhưng cần lưu ý. Windows là nền tảng mà nó được phát triển và thử nghiệm với tài khoản thật. Bản macOS (một mục trên thanh menu thay vì widget nổi) và bản Linux đã được phát hành, nhưng việc làm mới dữ liệu tài khoản thật mới chỉ được kiểm chứng trên Windows 11, nên hãy xem chúng là bản thử nghiệm ban đầu. Nếu có gì không ổn, bạn vui lòng <a href="${LINKS.issues}">mở một issue</a>.`,
        ],
        listHtml: [] as string[],
      },
      free: {
        q: 'Nó có miễn phí không?',
        parasHtml: [
          'Có. Nó miễn phí và là mã nguồn mở theo giấy phép MIT. Các dịch vụ mà nó hiển thị cần có tài khoản hoặc gói đăng ký riêng.',
        ],
        listHtml: [] as string[],
      },
    },
  },

  download: {
    heading: 'Đưa mọi giới hạn AI lên màn hình nền của bạn.',
    body: 'Miễn phí và mã nguồn mở theo giấy phép MIT. Windows là nền tảng mà nó được phát triển; bản macOS và Linux đang ở giai đoạn beta.',
    download: 'Tải xuống',
    github: 'Xem trên GitHub',
    smallHtml: `v${VERSION} · Windows · macOS beta · Linux beta. Các bản phát hành chưa được ký mã, nên Windows hoặc macOS có thể cảnh báo ở lần mở đầu tiên. <a href="#unsigned">Đây là cách xử lý.</a>`,
    iconAlt:
      'Biểu tượng ứng dụng AI Usage Clock: một mặt đồng hồ nằm trong vòng tròn chuyển màu từ xanh lá qua vàng, cam rồi đỏ',
  },

  donate: {
    heading: 'Ủng hộ AI Usage Clock',
    desc: 'AI Usage Clock được phát hành theo giấy phép MIT. Bạn dùng miễn phí, dù có ủng hộ hay không. Nếu nó đã giúp bạn tiết kiệm chút thời gian và bạn muốn nói lời cảm ơn, bạn có thể gửi tiền mã hóa tới địa chỉ bên dưới. Khoản này thuộc về tôi, DraftingDreamer, dùng cho chi phí phát triển của riêng tôi, và không đổi lấy tính năng, sự hỗ trợ hay bất kỳ cam kết nào về những gì sẽ có sau này.',
    pay: 'Mọi token trên Ethereum hoặc Polygon đều được chào đón: ETH, POL, USDT, USDC hay bất kỳ token nào khác. Cả hai mạng dùng chung một địa chỉ.',
    copy: 'Sao chép',
    copied: 'Đã sao chép',
    copyFail: 'Đã chọn. Nhấn Ctrl+C (⌘C trên Mac) để sao chép.',
    qrAlt: 'Mã QR của địa chỉ ủng hộ',
    note1: 'Chỉ nhận chuyển khoản trên Ethereum (ERC20) và Polygon. Nếu bạn dùng được cả hai, Polygon thường có phí thấp hơn.',
    note2Html: `Hãy đối chiếu địa chỉ này với <a href="${LINKS.donate}">bản trên GitHub</a> trước khi gửi.`,
    note3: 'Đây là địa chỉ chính thức duy nhất, và tôi sẽ không bao giờ nhờ bạn gửi tới địa chỉ khác. Giao dịch không thể hoàn tác nên không thể hoàn tiền.',
    other: 'Gắn sao cho AI Usage Clock trên GitHub hoặc giới thiệu cho một người bạn cũng là một cách giúp đỡ.',
  },

  footer: {
    tagline: 'Thấy mọi giới hạn AI. Biết mọi lần đặt lại.',
    links: {
      github: 'GitHub',
      donate: 'Ủng hộ',
      download: 'Tải xuống',
      setup: 'Hướng dẫn cài đặt (tiếng Anh)',
      usage: 'Dùng hằng ngày (tiếng Anh)',
      mcp: 'Bảo vệ mức sử dụng MCP (tiếng Anh)',
      changelog: 'Nhật ký thay đổi (tiếng Anh)',
      license: 'Giấy phép (MIT)',
    },
    disclaimer:
      'AI Usage Clock không liên kết với Anthropic, OpenAI, Google, GitHub, Microsoft, OpenCode, OpenRouter, Linear hay bất kỳ nhà cung cấp nào khác. Tên sản phẩm thuộc về chủ sở hữu của chúng.',
    version: `Phiên bản hiện tại ${VERSION} · Miễn phí và mã nguồn mở theo giấy phép MIT.`,
  },

  root: {
    title: 'AI Usage Clock',
    choose: 'Chọn ngôn ngữ của bạn',
  },

  notFound: {
    heading: 'Không tìm thấy trang',
    body: 'Địa chỉ này không dẫn tới trang nào trên trang web này. Hãy kiểm tra lại liên kết, hoặc quay về trang chủ.',
    back: 'Quay về trang chủ',
  },
};
