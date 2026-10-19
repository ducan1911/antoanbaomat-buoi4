import { useState, useMemo } from 'react';
import { Search, AlertOctagon, CheckCircle2, ShieldCheck, Eye, Sparkles, ArrowRight } from 'lucide-react';

interface PresetUrl {
  label: string;
  url: string;
  description: string;
}

const PRESET_URLS: PresetUrl[] = [
  {
    label: 'Subdomain Bẫy + Đuôi lạ .xyz',
    url: 'https://login.vietcombank.com.vn.security-verify.xyz/account?ref=sms',
    description: 'Bẫy Subdomain: Chữ vietcombank chỉ là tên miền phụ, tên miền thật là security-verify.xyz'
  },
  {
    label: 'Typosquatting "rn" giả "m"',
    url: 'https://vietcornbank.com.vn/ebanking/login',
    description: 'Chữ "rn" ghép lại nhìn lướt hệt chữ "m" trong vietcombank.'
  },
  {
    label: 'Typosquatting Shopee "shoppe.vn"',
    url: 'https://shoppe.vn/khuyen-mai-8-thang-3',
    description: 'Thừa một chữ "p", tên miền sàn thương mại điện tử thật là shopee.vn.'
  },
  {
    label: 'Homograph Ký tự La-tinh giả Cyrillic',
    url: 'https://xn--pple-43d.com/login (Hiển thị: https://аpple.com)',
    description: 'Ký tự "а" là chữ Cyrillic của Nga, không phải chữ "a" thường trong bảng chữ cái Latin.'
  },
  {
    label: 'Link rút gọn che giấu đích đến',
    url: 'https://bit.ly/nhan-thuong-tet-2026',
    description: 'Sử dụng dịch vụ rút gọn link để che giấu máy chủ lừa đảo phía sau.'
  },
  {
    label: 'Trang Cổng Dịch Vụ Công Chuẩn (.gov.vn)',
    url: 'https://dichvucong.gov.vn/pki/dang-nhap',
    description: 'Trang chính thống có đuôi .gov.vn được Bộ TTTT cấp phép định danh nhà nước.'
  }
];

export function UrlDissector() {
  const [inputUrl, setInputUrl] = useState(
    'https://login.vietcombank.com.vn.security-verify.xyz/account?ref=sms'
  );

  // Analysis logic
  const analysis = useMemo(() => {
    let clean = inputUrl.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }

    try {
      const parsed = new URL(clean);
      const protocol = parsed.protocol;
      const host = parsed.hostname;
      const path = parsed.pathname;
      const search = parsed.search;

      // Detect tricks
      const hostParts = host.split('.');
      const tld = hostParts.slice(-2).join('.').includes('.com.vn') || hostParts.slice(-2).join('.').includes('.gov.vn')
        ? hostParts.slice(-2).join('.')
        : hostParts.slice(-1)[0];

      // Extract primary domain and subdomain
      let primaryDomain = '';
      let subdomain = '';

      if (tld.includes('.vn') && hostParts.length >= 3) {
        primaryDomain = hostParts.slice(-3, -2)[0] + '.' + tld;
        subdomain = hostParts.slice(0, -3).join('.');
      } else if (hostParts.length >= 2) {
        primaryDomain = hostParts.slice(-2, -1)[0] + '.' + tld;
        subdomain = hostParts.slice(0, -2).join('.');
      } else {
        primaryDomain = host;
      }

      const warnings: string[] = [];
      let isPhishing = false;
      let dangerScore = 0;

      // 1. Check Subdomain trick
      if (
        subdomain.toLowerCase().includes('vietcombank') ||
        subdomain.toLowerCase().includes('techcombank') ||
        subdomain.toLowerCase().includes('mbbank') ||
        subdomain.toLowerCase().includes('shopee')
      ) {
        if (!primaryDomain.toLowerCase().includes('vietcombank.com.vn') &&
            !primaryDomain.toLowerCase().includes('techcombank.com.vn') &&
            !primaryDomain.toLowerCase().includes('shopee.vn')) {
          warnings.push(
            `BẪY SUBDOMAIN ĐÁNH LỪA: Chữ "${subdomain}" nằm ở tiền tố subdomain! Tên miền thực sự mà trình duyệt kết nối tới là "${primaryDomain}".`
          );
          isPhishing = true;
          dangerScore += 65;
        }
      }

      // 2. Check Typosquatting
      if (host.includes('vietcorn') || host.includes('shoppe') || host.includes('teckcombank')) {
        warnings.push(
          `CẢNH BÁO TYPOSQUATTING: Tên miền chứa lỗi chính tả cố ý để mạo danh thương hiệu lớn ("corn" thay cho "com", "shoppe" thay cho "shopee").`
        );
        isPhishing = true;
        dangerScore += 50;
      }

      // 3. Check Suspicious TLD
      const cheapTlds = ['xyz', 'top', 'cc', 'site', 'click', 'info', 'vip'];
      const currentTldExt = hostParts[hostParts.length - 1].toLowerCase();
      if (cheapTlds.includes(currentTldExt)) {
        warnings.push(
          `ĐUÔI TÊN MIỀN LẠ GIÁ RẺ (.${currentTldExt}): Các ngân hàng và cơ quan chính thống tại Việt Nam luôn dùng .com.vn hoặc .gov.vn, không bao giờ dùng đuôi .xyz, .top giá rẻ!`
        );
        dangerScore += 40;
      }

      // 4. Check Shortener
      if (host.includes('bit.ly') || host.includes('tinyurl.com') || host.includes('t.co')) {
        warnings.push(
          `LINK RÚT GỌN CHE GIẤU: URL này không thể đánh giá được ngay bằng mắt thường vì bị rút gọn. Phải đưa vào urlscan.io để xem điểm đến thực tế!`
        );
        dangerScore += 35;
      }

      // 5. Homograph Punycode
      if (host.includes('xn--') || inputUrl.includes('аpple') || inputUrl.includes('а')) {
        warnings.push(
          `TẤN CÔNG KÝ TỰ GIỐNG HÌNH (HOMOGRAPH): Chứa ký tự Unicode giả mạo (ví dụ chữ Cyrillic). Trình duyệt quốc tế sẽ mã hóa sang mã Punycode "xn--..."!`
        );
        isPhishing = true;
        dangerScore += 70;
      }

      // 6. Safe verify
      if (
        primaryDomain === 'vietcombank.com.vn' ||
        primaryDomain === 'gov.vn' ||
        primaryDomain === 'dichvucong.gov.vn' ||
        primaryDomain === 'ncsc.gov.vn'
      ) {
        dangerScore = 0;
        isPhishing = false;
      }

      return {
        protocol,
        host,
        subdomain: subdomain || '(không có)',
        primaryDomain,
        tld,
        path: path || '/',
        search: search || '(trống)',
        warnings,
        isPhishing: isPhishing || dangerScore >= 40,
        dangerScore: Math.min(100, dangerScore)
      };
    } catch {
      return {
        protocol: 'https:',
        host: 'URL không hợp lệ',
        subdomain: '',
        primaryDomain: '',
        tld: '',
        path: '',
        search: '',
        warnings: ['Cú pháp URL chưa chính xác, vui lòng nhập đầy đủ theo mẫu https://...'],
        isPhishing: false,
        dangerScore: 0
      };
    }
  }, [inputUrl]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>THỰC HÀNH 1 · BÀI TẬP RÀ SOÁT CẤU TRÚC URL</span>
          <span aria-hidden="true">·</span>
          <span>KÍNH LÚP GIẢI MÃ TÊN MIỀN</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Mô Phỏng Phân Tích Cấu Trúc URL & Soi Dấu Hiệu Giả Mạo
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Công thức cốt lõi: <code className="text-cyan-300 font-mono">https://[subdomain.]domain.tld/path?query</code>. Phần quan trọng nhất cần kiểm tra là <strong>domain chính</strong>, không phải subdomain hay đường dẫn.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-medium">Chọn một trường hợp thực tế tại Việt Nam để thử nghiệm:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PRESET_URLS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => setInputUrl(preset.url)}
              className="text-left p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-900 transition-colors text-xs text-slate-300 space-y-1"
            >
              <div className="font-semibold text-white flex items-center justify-between">
                <span>{preset.label}</span>
                <span className="text-slate-500 font-mono">#{idx + 1}</span>
              </div>
              <div className="text-slate-400 line-clamp-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* URL Input Bar */}
      <div className="space-y-2">
        <label className="text-xs text-slate-300 font-medium flex items-center justify-between">
          <span>Nhập hoặc dán địa chỉ URL cần kiểm tra:</span>
          <span className="text-slate-500">Hỗ trợ phân tích tự động thời gian thực</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono text-sm focus:outline-none focus:border-cyan-400 shadow-inner"
            placeholder="https://..."
          />
          <button
            onClick={() => setInputUrl('https://login.vietcombank.com.vn.security-verify.xyz/account')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-cyan-300"
          >
            Mẫu VCB
          </button>
        </div>
      </div>

      {/* Interactive Anatomical Breakdown */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-slate-300">
          KẾT QUẢ BÓC TÁCH CÁC THÀNH PHẦN KỸ THUẬT:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Protocol */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">1. Giao thức (Protocol)</span>
            <div className="font-mono text-sm font-bold text-blue-400">{analysis.protocol}//</div>
            <div className="text-xs text-slate-400">
              {analysis.protocol === 'https:' ? 'Có mã hóa TLS/SSL' : 'Không an toàn (HTTP)'}
            </div>
          </div>

          {/* Subdomain */}
          <div className={`p-3.5 rounded-lg bg-slate-950 border space-y-1 ${
            analysis.subdomain.includes('vietcombank') ? 'border-amber-500/40 bg-amber-950/10' : 'border-slate-800'
          }`}>
            <span className="text-xs text-slate-500">2. Tên miền phụ (Subdomain)</span>
            <div className="font-mono text-sm font-bold text-amber-300 truncate">
              {analysis.subdomain}
            </div>
            <div className="text-xs text-slate-400">
              {analysis.subdomain.includes('vietcombank')
                ? '⚠️ Chứa tên giả mạo'
                : 'Tiền tố dịch vụ'}
            </div>
          </div>

          {/* Primary Domain Root */}
          <div className={`p-3.5 rounded-lg bg-slate-950 border space-y-1 ${
            analysis.isPhishing ? 'border-rose-500/50 bg-rose-950/10' : 'border-emerald-500/40'
          }`}>
            <span className="text-xs text-slate-500">3. TÊN MIỀN GỐC THẬT (Root Domain)</span>
            <div className="font-mono text-sm font-bold text-white truncate">
              {analysis.primaryDomain || '(Không xác định)'}
            </div>
            <div className={`text-xs font-medium ${analysis.isPhishing ? 'text-rose-400' : 'text-emerald-400'}`}>
              {analysis.isPhishing ? '❌ Máy chủ kẻ tấn công sở hữu' : '✅ Tên miền được trỏ đến'}
            </div>
          </div>

          {/* TLD & Path */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-500">4. Đuôi miền & Đường dẫn</span>
            <div className="font-mono text-sm font-bold text-purple-400 truncate">
              .{analysis.tld} {analysis.path}
            </div>
            <div className="text-xs text-slate-400">
              Tham số: {analysis.search}
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Assessment Banner */}
      <div className={`p-5 rounded-xl border space-y-3 ${
        analysis.isPhishing
          ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
          : 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-base">
            {analysis.isPhishing ? (
              <AlertOctagon className="w-5 h-5 text-rose-400" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            )}
            <span>{analysis.isPhishing ? 'CẢNH BÁO: PHÁT HIỆN DẤU HIỆU LỪA ĐẢO / PHISHING' : 'ĐỊA CHỈ HỢP PHÁP HOẶC KHÔNG PHÁT HIỆN BẪY RÕ RÀNG'}</span>
          </div>

          <div className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-slate-950 border border-current">
            Mức Độ Rủi Ro: {analysis.dangerScore}/100
          </div>
        </div>

        {analysis.warnings.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-rose-900/40 text-xs">
            {analysis.warnings.map((warn, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-rose-400 shrink-0 font-bold">•</span>
                <span className="leading-relaxed">{warn}</span>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-xs text-slate-400">
          <strong>Lời khuyên tác chiến:</strong> Không mở URL trực tiếp trong trình duyệt cá nhân. Sao chép địa chỉ này và chuyển sang thẻ <strong>"Giả Lập VirusTotal & urlscan.io"</strong> để kiểm tra chuỗi chuyển hướng và quét đa động cơ an toàn!
        </div>
      </div>
    </div>
  );
}
