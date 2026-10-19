import { ThreatItem, VirusTotalSample, GameQuestion, SandboxStep } from '../types/security';

export const LESSON_OBJECTIVES = [
  'Hiểu được vì sao phải rà quét URL và tệp tin trước khi mở thay vì chỉ dựa vào cảm quan mắt thường.',
  'Đọc được cấu trúc địa chỉ URL và nhận diện các dấu hiệu giả mạo tinh vi (Typosquatting, Homograph, Subdomain bẫy, Link rút gọn, Đuôi lạ).',
  'Nhận diện 6 họ tệp tin độc hại thường gặp và kênh phát tán phổ biến tại Việt Nam (hóa đơn giả, CV độc, crack/key lậu).',
  'Thành thạo công cụ miễn phí & hợp pháp (VirusTotal, urlscan.io, Any.run, Google Safe Browsing, NCSC) để kiểm tra mà không cần mở trực tiếp trên máy thật.',
  'Khắc ghi "Công thức Cố định 5 Bước" và phản xạ an toàn khi tiếp nhận link/file lạ trong môi trường làm việc.'
];

export const TIMETABLE = [
  { section: '1. Lý thuyết', title: 'Cấu trúc URL, dấu hiệu giả mạo, các loại file độc hại, kênh phát tán tại VN', duration: '35 phút', color: 'border-cyan-500' },
  { section: '2. Thực hành 1', title: 'Rà quét URL với VirusTotal và urlscan.io, xem ảnh chụp cô lập & chuỗi Redirect', duration: '40 phút', color: 'border-blue-500' },
  { section: '3. Thực hành 2', title: 'Kiểm tra Hash file (MD5/SHA256) và đọc báo cáo Sandbox phân tích hành vi Any.run', duration: '40 phút', color: 'border-purple-500' },
  { section: '4. Tổng kết', title: 'Quy tắc an toàn 3 Không - 2 Báo, sổ tay tác chiến đánh giá nhanh', duration: '20 phút', color: 'border-emerald-500' },
];

export const VIETNAM_VECTOR_STATS = [
  { vector: 'Email hóa đơn / Hợp đồng giả mạo', percentage: 38, icon: 'Mail', victim: 'Kế toán, Mua hàng, Giám đốc', desc: 'Gửi hóa đơn quá hạn hoặc bảng kê công nợ kèm macro hoặc mã độc ransomware.' },
  { vector: 'Phần mềm Crack, Key kích hoạt lậu', percentage: 27, icon: 'Key', victim: 'Học sinh, Sinh viên, Game thủ, Thiết kế', desc: 'Yêu cầu người dùng chủ động tắt phần mềm diệt virus vì bảo "báo nhầm crack".' },
  { vector: 'Link giả mạo Google Drive / OneDrive', percentage: 16, icon: 'Cloud', victim: 'Nhân viên văn phòng, Giáo viên', desc: 'Gửi thông báo chia sẻ tài liệu, yêu cầu đăng nhập lại mật khẩu Google/Microsoft.' },
  { vector: 'CV / Hồ sơ ứng tuyển giả mạo', percentage: 12, icon: 'FileText', victim: 'Phòng Nhân sự (HR)', desc: 'Gửi file .docm chứa macro độc hại, HR hay mở file người lạ nên mất cảnh giác.' },
  { vector: 'Mã QR & Link qua Zalo / Telegram', percentage: 7, icon: 'QrCode', victim: 'Hội nhóm gia đình, Nhóm chat công ty', desc: 'Lợi dụng tài khoản người quen bị hack để gửi link độc vào nhóm.' }
];

export const THREAT_ITEMS: ThreatItem[] = [
  {
    id: 'th-1',
    name: 'Tệp thực thi đội lốt tài liệu (Đuôi kép)',
    category: 'FILE',
    vector: 'EMAIL_INVOICE',
    technique: 'DOUBLE_EXTENSION',
    level: 'CRITICAL',
    vietnamPrevalence: 35,
    sampleName: 'HoaDon_TienDien_Q4_2026.pdf.exe',
    realDisguise: 'Đuôi kép: Windows mặc định ẩn đuôi file nên mắt thường chỉ thấy "HoaDon...pdf", icon đổi thành icon Adobe Acrobat.',
    actualPayload: 'Tệp thực thi Windows (.exe) chứa mã độc trojan/ransomware tải từ máy chủ điều khiển.',
    description: 'Kẻ tấn công đánh vào thói quen của người dùng văn phòng hay mở hóa đơn hàng tháng. Khi nhấp đúp, mã độc chạy ngầm ngay.',
    vietnamRealCase: 'Nhiều kế toán doanh nghiệp tại Hà Nội & TP.HCM bị mã hóa dữ liệu kế toán MISA sau khi mở file PDF giả đuôi .exe.',
    defenseRecommendation: 'Bật cài đặt "File name extensions" trong File Explorer để luôn nhìn thấy đuôi thật .exe cuối cùng.'
  },
  {
    id: 'th-2',
    name: 'Macro độc hại nhúng trong Word/Excel',
    category: 'FILE',
    vector: 'JOB_CV',
    technique: 'MACRO_OFFICE',
    level: 'HIGH',
    vietnamPrevalence: 28,
    sampleName: 'CV_UngVien_KySuTruong_2026.docm',
    realDisguise: 'File tài liệu .docm / .xlsm hiển thị thông báo "Tài liệu này được bảo mật, vui lòng nhấn Bật nội dung (Enable Content) để xem".',
    actualPayload: 'Mã kịch bản VBA ngầm kích hoạt PowerShell tải malware từ internet và âm thầm lây lan trong mạng LAN.',
    description: 'Người dùng tưởng rằng đó là tính năng mở khóa văn bản bình thường, nhưng nhấn "Enable Content" là trao quyền thực thi mã độc.',
    vietnamRealCase: 'Phòng nhân sự một chuỗi bán lẻ bị chiếm quyền điều khiển sau khi HR mở CV ứng viên dạng .docm gửi qua email tuyển dụng.',
    defenseRecommendation: 'Tuyệt đối KHÔNG bấm "Enable Content / Enable Macro" cho file từ người lạ, mở preview trên Google Drive trước.'
  },
  {
    id: 'th-3',
    name: 'Kịch bản Script ẩn trong file nén .zip / .rar',
    category: 'FILE',
    vector: 'ZALO_TELEGRAM_QR',
    technique: 'ARCHIVE_SCRIPT',
    level: 'HIGH',
    vietnamPrevalence: 15,
    sampleName: 'Anh_Chup_Bien_Ban_Thoa_Thuan.jpg.js',
    realDisguise: 'File nén chứa file có tên kết thúc bằng .jpg.js hoặc file script .vbs, .bat giả làm hình ảnh hoặc biên bản scan.',
    actualPayload: 'Script Windows Script Host (WSH) hoặc Node/Powershell tải backdoor và ghi đè registry khởi động.',
    description: 'Email hoặc tin nhắn Telegram gửi file nén để né bộ lọc quét file đính kèm của hệ thống email server.',
    vietnamRealCase: 'Phát tán qua nhóm chat Zalo nội bộ của trường học khi tài khoản lớp trưởng bị chiếm quyền điều khiển.',
    defenseRecommendation: 'Giải nén và quan sát cột "Type" trong File Explorer; nếu là "JScript Script File" thì xóa lập tức.'
  },
  {
    id: 'th-4',
    name: 'Tệp lối tắt độc hại Windows Shortcut (.lnk)',
    category: 'FILE',
    vector: 'PIRATED_SOFTWARE',
    technique: 'MALICIOUS_LNK',
    level: 'CRITICAL',
    vietnamPrevalence: 12,
    sampleName: 'Tailieu_OnThi_GiuaKy.lnk',
    realDisguise: 'Biểu tượng giống hệt thư mục màu vàng hoặc file Word thông thường.',
    actualPayload: 'Lệnh cmd.exe gọi certutil hoặc powershell ngầm tải tệp độc hại từ xa.',
    description: 'Thường ẩn hiện trên USB lạ hoặc trong các gói tài liệu chia sẻ trên diễn đàn crack/tài liệu sinh viên.',
    vietnamRealCase: 'Mã độc lây qua USB cắm vào máy in tại các tiệm photocopy đại học Bách Khoa, Quốc Gia.',
    defenseRecommendation: 'Kiểm tra Properties của file; nếu Target có chứa lệnh powershell hay cmd.exe thì hủy ngay.'
  },
  {
    id: 'th-5',
    name: 'Giả mạo tên miền gần giống (Typosquatting)',
    category: 'URL',
    vector: 'EMAIL_INVOICE',
    technique: 'TYPOSQUATTING',
    level: 'HIGH',
    vietnamPrevalence: 32,
    sampleName: 'https://vietcornbank.com.vn/ebanking',
    realDisguise: 'Thay thế chữ "m" bằng "rn" (vietcornbank thay vì vietcombank), hoặc "shoppe.vn" thay vì "shopee.vn".',
    actualPayload: 'Giao diện đăng nhập ngân hàng giả mạo để đánh cắp tên đăng nhập, mật khẩu và mã OTP SMS.',
    description: 'Kẻ tấn công đăng ký tên miền cố tình viết sai chính tả một chữ cái rất khó nhận ra khi đọc lướt nhanh.',
    vietnamRealCase: 'Chiến dịch lừa đảo khách hàng ngân hàng qua tin nhắn Brandname mạo danh dẫn link vietcornbank, techcombank-sms.com.',
    defenseRecommendation: 'Soi kỹ từng chữ cái trong tên miền chính; không click từ tin nhắn mà gõ trực tiếp tên miền chính thức.'
  },
  {
    id: 'th-6',
    name: 'Tấn công ký tự giống hình (Homograph Attack)',
    category: 'URL',
    vector: 'CLOUD_DRIVE_PHISHING',
    technique: 'HOMOGRAPH',
    level: 'CRITICAL',
    vietnamPrevalence: 10,
    sampleName: 'https://аpple.com/support (Ký tự "а" Cyrillic)',
    realDisguise: 'Dùng ký tự chữ La-tinh giả mạo từ bảng mã Cyrillic (chữ Nga) trông giống 100% mắt thường (Punycode: xn--...).',
    actualPayload: 'Trang web thu thập thông tin iCloud / Apple ID hoặc tài khoản doanh nghiệp.',
    description: 'Mắt người nhìn chữ "a" thường và "а" Cyrillic không khác gì nhau, nhưng máy chủ xử lý là 2 địa chỉ hoàn toàn khác.',
    vietnamRealCase: 'Các cuộc tấn công có chủ đích lừa nhân viên kỹ thuật nhấn vào link quản trị hệ thống giả mạo.',
    defenseRecommendation: 'Sao chép URL dán vào thanh Notepad hoặc VirusTotal để xem tên miền thực tế chuyển sang dạng Punycode (xn--).'
  },
  {
    id: 'th-7',
    name: 'Bẫy tên miền phụ Subdomain đánh lừa',
    category: 'URL',
    vector: 'CLOUD_DRIVE_PHISHING',
    technique: 'SUBDOMAIN_TRAP',
    level: 'HIGH',
    vietnamPrevalence: 25,
    sampleName: 'https://vietcombank.security-verify.xyz/login',
    realDisguise: 'Đặt tên thương hiệu thật ở phần Subdomain (vietcombank...), khiến người dùng tưởng là của ngân hàng.',
    actualPayload: 'Domain thực sự ở đây là security-verify.xyz (do hacker sở hữu).',
    description: 'Đánh vào tâm lý người dùng chỉ đọc từ bên trái sang phải mà không chú ý đến phần tên miền trước dấu gạch chéo đầu tiên.',
    vietnamRealCase: 'Rất nhiều trang giả mạo VCB Digibank, MB Bank, VNPT Pay dùng thủ đoạn này.',
    defenseRecommendation: 'Quy tắc: Nhìn ngược từ dấu gạch chéo đầu tiên (/), tìm 2 thành phần cuối cùng (domain.tld).'
  },
  {
    id: 'th-8',
    name: 'Đuôi tên miền lạ giá rẻ (.xyz, .top, .cc, .site)',
    category: 'URL',
    vector: 'EMAIL_INVOICE',
    technique: 'SUSPICIOUS_TLD',
    level: 'HIGH',
    vietnamPrevalence: 30,
    sampleName: 'https://hoadon-dienluc.xyz/tra-cuu',
    realDisguise: 'Thay vì đuôi chính thức .gov.vn hoặc .com.vn, kẻ gian dùng các TLD giá 1 USD để lập trang giả rồi bỏ sau 48h.',
    actualPayload: 'Trang bẫy thanh toán tiền điện thoại/tiền điện giả mạo để chiếm đoạt tiền trong tài khoản.',
    description: 'Các đuôi này không yêu cầu định danh (KYC) tại Việt Nam, đăng ký ẩn danh chỉ mất vài phút.',
    vietnamRealCase: 'Chiến dịch mạo danh Điện lực EVN gửi tin nhắn thông báo cắt điện yêu cầu nộp tiền qua link .top/.xyz.',
    defenseRecommendation: 'Các cơ quan nhà nước, ngân hàng tại Việt Nam luôn dùng .gov.vn hoặc .com.vn chính danh.'
  }
];

export const VIRUSTOTAL_PRESETS: VirusTotalSample[] = [
  {
    id: 'vt-sample-1',
    name: 'HoaDon_T10_2026.pdf.exe',
    type: 'FILE',
    detectionRatio: { detected: 68, total: 90 },
    sampleHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    fileSignatureMismatch: { displayed: 'Adobe Acrobat Document (.pdf)', actual: 'PE32+ executable (GUI) x86-64 for MS Windows (.exe)' },
    threatClass: 'Trojan.Downloader / Ransomware.LockBit',
    behaviorTags: ['ransomware', 'persistence', 'evades-sandbox', 'c2-beacon', 'disables-antivirus'],
    topEngines: [
      { name: 'Bkav Pro', result: 'Malicious' },
      { name: 'Kaspersky', result: 'Malicious' },
      { name: 'Microsoft Defender', result: 'Malicious' },
      { name: 'CMC Antivirus', result: 'Malicious' },
      { name: 'Sophos', result: 'Malicious' },
      { name: 'Bitdefender', result: 'Malicious' }
    ],
    didYouKnow: 'Tỷ lệ 68/90 thể hiện đây là mã độc đã bị cộng đồng an ninh mạng toàn cầu lập chỉ mục chữ ký nhận dạng (Signature).'
  },
  {
    id: 'vt-sample-2',
    name: 'BaoCao_Quy_ZeroDay.xlsm',
    type: 'FILE',
    detectionRatio: { detected: 3, total: 90 },
    sampleHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    threatClass: 'Heuristic.Macro.VBA.Agent (Zero-Day Mới Nổi)',
    behaviorTags: ['macro-embedded', 'powershell-execution', 'unindexed-hash', 'stealth'],
    topEngines: [
      { name: 'Bkav Pro', result: 'Clean' },
      { name: 'Kaspersky', result: 'Malicious' },
      { name: 'Microsoft Defender', result: 'Suspicious' },
      { name: 'CMC Antivirus', result: 'Clean' },
      { name: 'CrowdStrike Falcon', result: 'Malicious' },
      { name: 'Sophos', result: 'Clean' }
    ],
    didYouKnow: 'CỰC KỲ QUAN TRỌNG: 3/90 KHÔNG PHẢI LÀ AN TOÀN! Một biến thể mã độc mới (Zero-Day) trong 24 giờ đầu chỉ 2-3 hãng bắt được qua AI/Hành vi. Không cần chờ đủ đa số mới cảnh giác!'
  },
  {
    id: 'vt-sample-3',
    name: 'https://vietcombank.com.vn',
    type: 'URL',
    detectionRatio: { detected: 0, total: 90 },
    threatClass: 'Official Banking Portal (Trang ngân hàng chính thống)',
    behaviorTags: ['verified-ev-cert', 'clean-reputation', 'vn-gov-registered'],
    topEngines: [
      { name: 'Google Safe Browsing', result: 'Clean' },
      { name: 'Kaspersky Web Shield', result: 'Clean' },
      { name: 'Microsoft SmartScreen', result: 'Clean' },
      { name: 'Bkav Safe Web', result: 'Clean' },
      { name: 'Sophos Web Security', result: 'Clean' }
    ],
    didYouKnow: 'Tên miền chính thống có lịch sử hoạt động lâu năm, chứng thư SSL Tổ chức xác thực (EV/OV) và danh tiếng sạch.'
  },
  {
    id: 'vt-sample-4',
    name: 'https://login-vietcombank.security-verify.xyz/otp',
    type: 'URL',
    detectionRatio: { detected: 0, total: 90 },
    threatClass: 'Trang Phishing Mới Dựng (Vừa lập 2 giờ trước)',
    behaviorTags: ['freshly-registered-domain', 'subdomain-spoof', 'phishing-kit'],
    topEngines: [
      { name: 'Google Safe Browsing', result: 'Clean' },
      { name: 'Kaspersky Web Shield', result: 'Clean' },
      { name: 'Microsoft SmartScreen', result: 'Clean' },
      { name: 'Bkav Safe Web', result: 'Clean' },
      { name: 'Netcraft', result: 'Clean' }
    ],
    didYouKnow: 'BÀI HỌC CỐT LÕI: 0/90 KHÔNG ĐỒNG NGHĨA VỚI AN TOÀN TUYỆT ĐỐI! Kẻ tấn công vừa mua tên miền 2 giờ trước, các máy quét chưa kịp lập chỉ mục. Cần kết hợp soi cấu trúc Domain và sandbox urlscan.io!'
  }
];

export const SANDBOX_PROCESS_TIMELINE: SandboxStep[] = [
  {
    timeOffset: '00:01s',
    process: 'HoaDon_TienDien.pdf.exe (PID: 4120)',
    parentProcess: 'Explorer.exe (Người dùng nhấp đúp)',
    action: 'Khởi tạo tiến trình giả dạng',
    type: 'PROCESS',
    detail: 'Mở cửa sổ trống 1 mili-giây, âm thầm trích xuất tệp nhị phân vào thư mục tạm %APPDATA%\\Roaming\\svchelp.tmp',
    isMalicious: true
  },
  {
    timeOffset: '00:03s',
    process: 'cmd.exe /c start /b powershell.exe -enc ... (PID: 4184)',
    parentProcess: 'HoaDon_TienDien.pdf.exe',
    action: 'Triệu hồi dòng lệnh thực thi mã độc',
    type: 'PROCESS',
    detail: 'Chạy PowerShell ở chế độ ẩn (-WindowStyle Hidden) giải mã tập lệnh Base64 nhằm vượt qua giám sát người dùng.',
    isMalicious: true
  },
  {
    timeOffset: '00:05s',
    process: 'powershell.exe',
    parentProcess: 'cmd.exe',
    action: 'Kết nối mạng máy chủ điều khiển C2',
    type: 'NETWORK',
    detail: 'Thực hiện kết nối HTTPS ra ngoài tới địa chỉ IP lạ: 185.220.101.5:8443 (đặt tại Đông Âu) để tải Payload mã hóa dữ liệu.',
    isMalicious: true
  },
  {
    timeOffset: '00:07s',
    process: 'powershell.exe',
    parentProcess: 'cmd.exe',
    action: 'Ghi Registry để duy trì tồn tại (Persistence)',
    type: 'REGISTRY',
    detail: 'Tạo khóa tại HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\\WinUpdate = "%APPDATA%\\svchelp.exe" để tự chạy mỗi khi máy bật.',
    isMalicious: true
  },
  {
    timeOffset: '00:10s',
    process: 'svchelp.exe (Ransomware Encryptor)',
    parentProcess: 'powershell.exe',
    action: 'Mã hóa tài liệu & Đòi tiền chuộc',
    type: 'FILESYSTEM',
    detail: 'Duyệt ổ đĩa D:\\ và C:\\, mã hóa các tệp .docx, .xlsx, .pdf sang đuôi .locked và tạo file README_RECOVER_FILES.txt.',
    isMalicious: true
  }
];

export const COMPARISON_TOOLS = [
  {
    name: 'VirusTotal',
    site: 'virustotal.com',
    type: 'Quét đa động cơ (70+ Antivirus)',
    bestFor: 'Kiểm tra nhanh URL, mã Hash (MD5/SHA256) hoặc tệp tin nghi ngờ mà không cần mở.',
    pros: 'Tập hợp hơn 70 hãng bảo mật thế giới; kiểm tra bằng Hash cực nhanh mà không làm lộ nội dung bí mật.',
    caution: 'File tải lên VirusTotal trở thành công khai cho cộng đồng bảo mật; 0/90 không đảm bảo 100% an toàn với domain mới lập.'
  },
  {
    name: 'urlscan.io',
    site: 'urlscan.io',
    type: 'Sandbox trình duyệt web cô lập',
    bestFor: 'Soi website lạ: chụp ảnh màn hình trang đích thực sự, chuỗi chuyển hướng (Redirects) và yêu cầu mạng ngầm.',
    pros: 'Xem trang web mà trình duyệt của mình không bị dính mã độc; lột trần chuỗi redirect giấu mặt.',
    caution: 'Chế độ Public Scan sẽ công khai URL và ảnh chụp lên kho dữ liệu chung.'
  },
  {
    name: 'Any.run',
    site: 'any.run',
    type: 'Sandbox trực tuyến tương tác (Interactive VM)',
    bestFor: 'Cho phép "chạy thử" tệp tin nghi ngờ trong máy ảo cô lập, quan sát sơ đồ tiến trình (Process Tree), sửa Registry, kết nối C2.',
    pros: 'Xem trực quan chuột, bàn phím và hành vi máy ảo; an toàn 100% cho máy thật.',
    caution: 'Bản miễn phí có giới hạn lượt quét mỗi ngày; nên tham khảo các báo cáo công khai (Public Submissions).'
  },
  {
    name: 'Hybrid Analysis / Joe Sandbox',
    site: 'hybrid-analysis.com',
    type: 'Hệ thống phân tích mã độc chuyên sâu',
    bestFor: 'Đọc báo cáo kỹ thuật tĩnh và động, tra cứu mẫu mã độc tương tự đã từng xuất hiện trên thế giới.',
    pros: 'Kho dữ liệu mẫu khổng lồ, phân tích sâu đến cấp độ bộ nhớ và kỹ thuật né sandbox.',
    caution: 'Báo cáo kỹ thuật chi tiết phù hợp cho phân tích chuyên sâu hơn là kiểm tra nhanh.'
  },
  {
    name: 'Google Safe Browsing & NCSC',
    site: 'canhbao.ncsc.gov.vn',
    type: 'Cổng cảnh báo an toàn thông tin quốc gia',
    bestFor: 'Tra cứu domain lừa đảo tại Việt Nam, cập nhật danh sách đen lừa đảo tài chính và giả mạo thương hiệu.',
    pros: 'Sát sườn với tình hình lừa đảo tại Việt Nam, cập nhật bởi cơ quan quản lý.',
    caution: 'Cần kiểm tra song song với VirusTotal.'
  }
];

export const GAME_QUESTIONS: GameQuestion[] = [
  {
    id: 1,
    title: 'Thử thách 1: Soi đường link tài khoản',
    scenario: 'Bạn nhận được tin nhắn SMS: "Tài khoản VCB của quý khách bị khóa do giao dịch bất thường. Đăng nhập ngay để mở lại: https://vietcornbank.com.vn/ebanking"',
    subject: 'https://vietcornbank.com.vn/ebanking',
    type: 'URL',
    isThreat: true,
    technique: 'Typosquatting (Giả mạo lỗi chính tả)',
    options: [
      'An toàn vì có đuôi .com.vn và giao thức https',
      'Độc hại vì dùng kỹ thuật Typosquatting: "vietcornbank" thay chữ "m" bằng "rn"',
      'An toàn vì ngân hàng gửi SMS có tên thương hiệu',
      'Cần bấm vào thử để xem giao diện có đúng không'
    ],
    correctOptionIndex: 1,
    explanation: 'Kẻ tấn công thay chữ "m" bằng hai ký tự "rn", khi hiển thị trên màn hình điện thoại trông rất giống chữ "m". Ngân hàng thật là vietcombank.com.vn.',
    tacticalTip: 'Luôn soi kỹ từng ký tự của tên miền chính, không bao giờ nhấp vào link trong tin nhắn báo khóa tài khoản!'
  },
  {
    id: 2,
    title: 'Thử thách 2: Bóc trần đuôi tệp tin hóa đơn',
    scenario: 'Bạn là kế toán, nhận được email từ đối tác quen với tệp đính kèm: "HoaDon_ThanhToan_VND_850Tr.pdf.exe". Icon hiển thị là logo màu đỏ của Adobe PDF.',
    subject: 'HoaDon_ThanhToan_VND_850Tr.pdf.exe',
    type: 'FILE',
    isThreat: true,
    technique: 'Double Extension (Đuôi file kép)',
    options: [
      'Đây là file PDF chuẩn, mở bình thường để in hóa đơn',
      'Đây là file thực thi (.exe) đội lốt PDF bằng kỹ thuật đuôi kép và làm giả icon',
      'Đây là file nén của phần mềm kế toán MISA',
      'Mở xem thử, nếu hỏi quyền Administrator mới từ chối'
    ],
    correctOptionIndex: 1,
    explanation: 'Windows mặc định ẩn phần mở rộng đã biết, nếu không bật tính năng hiển thị đuôi file thì mắt thường chỉ thấy "HoaDon...pdf". Đuôi thực sự của file là .exe, mở ra sẽ nhiễm mã độc.',
    tacticalTip: 'Vào File Explorer -> View -> Tích chọn "File name extensions" để lột trần đuôi thật của mọi file!'
  },
  {
    id: 3,
    title: 'Thử thách 3: Bẫy Subdomain ngân hàng',
    scenario: 'Nhận email cảnh báo nâng cấp bảo mật chứa link: https://vietcombank.com.vn.security-verify.top/auth',
    subject: 'https://vietcombank.com.vn.security-verify.top/auth',
    type: 'URL',
    isThreat: true,
    technique: 'Subdomain Trap (Bẫy tên miền phụ)',
    options: [
      'Thuộc sở hữu của Vietcombank vì có chữ vietcombank.com.vn ở đầu',
      'Là trang lừa đảo: Tên miền thực sự là security-verify.top, chữ vietcombank chỉ là subdomain đánh lừa',
      'Trang này an toàn do có chữ security-verify chứng thực',
      'Có giao thức https nên an toàn tuyệt đối'
    ],
    correctOptionIndex: 1,
    explanation: 'Quy tắc vàng: Tên miền gốc nằm ngay trước dấu gạch chéo đầu tiên (/). Ở đây domain thật là security-verify.top. Phần vietcombank.com.vn phía trước chỉ là tên subdomain do kẻ lừa đảo tự đặt!',
    tacticalTip: 'Đọc ngược từ dấu gạch chéo "/" đầu tiên sang trái để tìm ra tên miền và đuôi TLD thực sự.'
  },
  {
    id: 4,
    title: 'Thử thách 4: Email xin việc của HR',
    scenario: 'Phòng Nhân sự nhận hồ sơ ứng viên file "CV_UngVien_PhamVanNam.docm". Khi mở ra, Microsoft Word hiện thông báo màu vàng: "Macros have been disabled. [Enable Content]".',
    subject: 'CV_UngVien_PhamVanNam.docm',
    type: 'FILE',
    isThreat: true,
    technique: 'Malicious Office Macro (.docm)',
    options: [
      'Bấm "Enable Content" để đọc được toàn bộ chữ trong CV',
      'Tuyệt đối KHÔNG bấm Enable Content; CV chuẩn chỉ nên dùng PDF tĩnh (.pdf)',
      'Tắt phần mềm diệt virus rồi bấm Enable Content',
      'Gửi file này cho toàn bộ nhân viên trong phòng xem cùng'
    ],
    correctOptionIndex: 1,
    explanation: 'File .docm là định dạng Word chứa macro tự động. Kẻ tấn công lợi dụng việc HR bấm "Enable Content" để kích hoạt mã độc PowerShell ngầm tải ransomware vào máy công ty.',
    tacticalTip: 'Hồ sơ xin việc chuẩn luôn là file PDF tĩnh thông thường (.pdf). Không bao giờ cho phép kích hoạt Macro với file từ người lạ.'
  },
  {
    id: 5,
    title: 'Thử thách 5: Cập nhật trình duyệt trên web xem phim',
    scenario: 'Bạn vào trang xem phim lậu, bỗng hiện popup toàn màn hình: "Chrome của bạn đã lỗi thời và có lỗ hổng! Bấm vào đây để tải Chrome_Update_Patch_2026.bat ngay".',
    subject: 'Chrome_Update_Patch_2026.bat',
    type: 'FILE',
    isThreat: true,
    technique: 'Fake Browser Update (Bộ cài giả mạo)',
    options: [
      'Bấm tải và chạy ngay để bảo mật trình duyệt',
      'Lừa đảo: Google Chrome tự động cập nhật qua cài đặt trình duyệt, không bao giờ phát hành file cập nhật dạng .bat trên web lạ',
      'Đây là tính năng quét an toàn của Windows',
      'Chạy file bằng quyền Run as Administrator để cập nhật nhanh hơn'
    ],
    correctOptionIndex: 1,
    explanation: 'Thủ thuật "Fake Browser Update" rất phổ biến tại Việt Nam trên các trang web lậu. File .bat là tập lệnh dòng lệnh Windows có thể thực thi mọi câu lệnh nguy hiểm.',
    tacticalTip: 'Chỉ cập nhật trình duyệt qua menu: Trợ giúp -> Giới thiệu về Google Chrome (chrome://settings/help).'
  },
  {
    id: 6,
    title: 'Thử thách 6: Tra cứu VirusTotal báo 2/90',
    scenario: 'Học viên nhận được 1 file lạ, tra mã SHA-256 trên VirusTotal thấy kết quả: 2/90 engine bảo mật báo Malicious (Kaspersky và CrowdStrike gắn cờ, 88 hãng khác báo Clean). Học viên nên làm gì?',
    subject: 'Kết quả quét VirusTotal: 2/90 Engines',
    type: 'FILE',
    isThreat: true,
    technique: 'Zero-day / Polymorphic Early Warning',
    options: [
      'An toàn để mở vì 88 hãng khác (đa số) đều báo sạch',
      'Cực kỳ cảnh giác và KHÔNG mở: Có thể là mã độc mới (Zero-Day) hoặc biến thể chưa kịp cập nhật cho toàn bộ hãng',
      'Chờ khi nào đủ 50/90 hãng gắn cờ thì mới coi là độc',
      'Chắc chắn là báo nhầm nên cứ tắt diệt virus để mở'
    ],
    correctOptionIndex: 1,
    explanation: 'Mỗi hãng có công nghệ khác nhau. Một mã độc mới xuất hiện trong 24-48 giờ đầu thường chỉ bị 2-3 hãng tiên tiến phát hiện bằng AI/hành vi. Nguyên tắc phòng thủ: Có bất kỳ cảnh báo từ hãng uy tín nào đều phải coi là nguy hiểm!',
    tacticalTip: 'Nguyên tắc an ninh mạng: Thận trọng tối đa, không cần chờ đa số 90/90 mới xử lý.'
  }
];

export const TEACHER_FAQ = [
  {
    q: 'Thầy/cô ơi, nếu em lỡ tải file về nhưng CHƯA MỞ thì có sao không?',
    a: 'Chỉ tải về (chưa mở, chưa kích hoạt chạy) thường an toàn vì mã độc chưa được hệ điều hành nạp vào bộ nhớ để thực thi. Tuy nhiên một số định dạng tệp (như PDF nhúng script tự chạy qua lỗ hổng viewer, hoặc Windows Explorer tự tạo ảnh thumbnail từ file ảnh độc) vẫn tiềm ẩn rủi ro. Cách an toàn nhất: Tuyệt đối không nhấp đúp, xóa ngay khỏi máy hoặc tra cứu mã Hash trên VirusTotal.'
  },
  {
    q: 'Tại sao VirusTotal báo 2/90 mà không phải 90/90 nếu đây thực sự là mã độc?',
    a: 'Mỗi hãng an ninh mạng (Kaspersky, Bkav, Microsoft, Crowdstrike...) sở hữu cơ sở dữ liệu mẫu, thuật toán và chu kỳ đồng bộ độc lập. Một mẫu mã độc mới phát tán (Zero-day hoặc Polymorphic) thường chỉ bị vài hãng phát hiện qua phân tích hành vi heuristic trong những giờ đầu. Sau 24-48 giờ, con số này mới tăng dần khi các hãng chia sẻ mẫu. Luôn ghi nhớ: Chỉ cần 1-2 hãng uy tín gắn cờ thì phải dừng lại ngay.'
  },
  {
    q: 'Mở file trong Google Drive / Google Docs xem trước (Preview) có an toàn hơn không?',
    a: 'Rất an toàn! Khi xem trước (Preview) trên Google Drive hoặc Microsoft OneDrive web, tệp tin được xử lý và render trên máy chủ đám mây của hãng, không có mã thực thi nào chạy trên vi xử lý (CPU) máy thật của bạn. Đây là mẹo thực tế cực kỳ hữu ích cho nhân viên văn phòng để kiểm tra nội dung trước khi quyết định tải về.'
  },
  {
    q: 'Sao phần mềm diệt virus trên máy em không báo gì mà máy vẫn dính mã độc?',
    a: 'Không một phần mềm diệt virus nào có thể phát hiện 100% mối nguy hại, đặc biệt là mã độc mới sinh (Zero-day) hoặc mã độc tự biến đổi cấu trúc (Polymorphic). Ngoài ra, kẻ tấn công thường lợi dụng mánh khóe tâm lý (Social Engineering) để lừa chính người dùng bấm "Tắt Antivirus" hoặc "Bật Macro", qua mặt hoàn toàn các lớp bảo vệ tự động.'
  }
];

export const TECHNICAL_TERMS = [
  {
    term: 'Payload',
    vietnamese: 'Phần tải trọng độc hại cốt lõi',
    explanation: 'Phần "nội dung thật" mà mã độc thực thi sau khi đã thâm nhập trót lọt (ví dụ: mã hóa tệp đòi tiền chuộc, đánh cắp mật khẩu trình duyệt, mở cửa hậu). File đính kèm ban đầu thường chỉ là lớp vỏ bọc nhẹ (dropper) để tải payload về sau.'
  },
  {
    term: 'C2 Server (Command & Control)',
    vietnamese: 'Máy chủ Điều khiển & Ra lệnh từ xa',
    explanation: 'Máy chủ bí mật mà tin tặc dựng lên để mã độc kết nối về sau khi lây nhiễm máy nạn nhân. Mã độc sẽ nhận lệnh tiếp theo từ C2 hoặc tải dữ liệu bị đánh cắp ngược về C2.'
  },
  {
    term: 'Persistence (Duy trì tồn tại)',
    vietnamese: 'Kỹ thuật sống sót qua lần khởi động lại máy',
    explanation: 'Kỹ thuật tin tặc can thiệp vào Registry Windows (Run keys), Scheduled Tasks hoặc Windows Services để dù nạn nhân có tắt máy hay khởi động lại, mã độc vẫn tự động trỗi dậy hoạt động.'
  },
  {
    term: 'Zero-Day',
    vietnamese: 'Lỗ hổng chưa có bản vá / Mã độc chưa có chữ ký',
    explanation: 'Lỗ hổng phần mềm chưa được nhà sản xuất phát hiện và phát hành bản vá. Do đó, các công cụ diệt virus theo chữ ký truyền thống chưa thể nhận diện được.'
  },
  {
    term: 'Polymorphic Malware',
    vietnamese: 'Mã độc đa hình (Tự đổi hình dạng)',
    explanation: 'Mã độc có khả năng tự thay đổi mã hóa hoặc cấu trúc bề ngoài mỗi lần lây sang một máy mới, làm thay đổi hoàn toàn mã băm (Hash) để né các bộ quét chữ ký cố định.'
  }
];
