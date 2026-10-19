import { useState } from 'react';
import { ShieldCheck, AlertOctagon, HelpCircle, CheckCircle, WifiOff, PhoneCall, Copy, Check, Printer } from 'lucide-react';

export function OperationalFormula() {
  const [selectedIncidentStage, setSelectedIncidentStage] = useState<'RECEIVED' | 'OPENED' | 'ENABLED_MACRO'>('RECEIVED');
  const [copiedSop, setCopiedSop] = useState(false);

  const SOP_TEXT = `========================================================
SỔ TAY TÁC CHIẾN AN TOÀN THÔNG TIN: CÔNG THỨC 5 BƯỚC BẤT BIẾN
(Áp dụng khi tiếp nhận mọi Đường Link & Tệp Tin trong công việc)
========================================================

BƯỚC 1: SOI TÊN MIỀN GỐC (DOMAIN ROOT INSPECTION)
- Đọc ngược từ dấu gạch chéo đầu tiên (/) sang trái để xác định đúng Domain + TLD.
- Bỏ qua toàn bộ subdomain đánh lừa (vd: vietcombank.com.vn.security-verify.xyz -> Domain thật là security-verify.xyz).
- Cảnh giác cao độ với đuôi lạ giá rẻ (.xyz, .top, .cc, .site).

BƯỚC 2: LỘT MẶT NẠ ĐUÔI TỆP (UNMASK DOUBLE EXTENSIONS)
- Bật File Explorer -> View -> File name extensions.
- Cấm tin vào icon hiển thị bên ngoài (vd: icon PDF đỏ nhưng đuôi thực là .exe, .js, .vbs).

BƯỚC 3: TRA HASH & QUÉT KÉP ĐA ĐỘNG CƠ (HASH & DUAL SCAN)
- Không tải file nhạy cảm lên web nếu chưa biết. Lấy mã SHA-256 (PowerShell: Get-FileHash) tra trên VirusTotal.
- Quét URL trên urlscan.io để xem ảnh chụp màn hình máy ảo và chuỗi chuyển hướng (Redirects).
- Ghi nhớ: Tỷ lệ 2/90 đã là báo động đỏ (Zero-day); 0/90 với domain mới mua 2 giờ không có nghĩa an toàn tuyệt đối.

BƯỚC 4: CÁCH LY CLOUD / SANDBOX (CLOUD PREVIEW & VM)
- Xem trước file tài liệu trên Google Drive / OneDrive preview trước khi tải về máy thật.
- Nếu cần chạy thử tệp lạ, chỉ thực hiện trong máy ảo Sandbox cô lập (Any.run, Hybrid Analysis).

BƯỚC 5: KỶ LUẬT 3 KHÔNG & 2 BÁO ĐỘNG (THE 3-DON'TS & 2-ACTIONS)
- 3 KHÔNG: Không bật Macro (Enable Content) · Không tắt Antivirus dù cài phần mềm crack yêu cầu · Không cắm USB lạ.
- 2 BÁO: Rút dây mạng / Tắt Wi-Fi ngay lập tức nếu nghi mở nhầm · Báo ngay bộ phận IT / NCSC ứng cứu.
========================================================`;

  const handleCopySop = () => {
    navigator.clipboard.writeText(SOP_TEXT);
    setCopiedSop(true);
    setTimeout(() => setCopiedSop(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>QUY CHUẨN VẬN HÀNH BẢO MẬT DOANH NGHIỆP</span>
          <span aria-hidden="true">·</span>
          <span>CÔNG THỨC CỐ ĐỊNH 5 BƯỚC</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Sổ Tay Tác Chiến: Công Thức Cố Định Dành Cho Học Viên
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Biến các kiến thức lý thuyết thành phản xạ hành vi tự động trong môi trường làm việc. Ghi nhớ và áp dụng công thức 5 bước bất biến mỗi khi tiếp nhận email, file tải về hoặc đường link lạ.
        </p>
      </div>

      {/* The 5 Immutable Steps Visual Flow */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-slate-300">
          5 BƯỚC BẤT BIẾN KHI TIẾP NHẬN BẤT KỲ LINK / FILE LẠ:
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">BƯỚC 1</span>
              <h4 className="text-sm font-bold text-white">Soi Tên Miền Gốc</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đọc ngược từ dấu gạch chéo (/) đầu tiên. Bóc trần Subdomain bẫy và đuôi tên miền lạ (.xyz, .top).
              </p>
            </div>
            <div className="pt-2 text-[11px] text-cyan-300/80 font-mono">
              Công cụ: urlscan.io
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">BƯỚC 2</span>
              <h4 className="text-sm font-bold text-white">Lột Đuôi Kép Tệp</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bật "File name extensions" trên Windows. Không tin vào icon PDF màu đỏ khi đuôi thật là .exe hay .js.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-cyan-300/80 font-mono">
              Windows Explorer View
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">BƯỚC 3</span>
              <h4 className="text-sm font-bold text-white">Tra Hash & Quét Đa Kênh</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Lấy mã SHA-256 tra trên VirusTotal để bảo mật nội dung file. Có 2-3 engine báo động là dừng ngay!
              </p>
            </div>
            <div className="pt-2 text-[11px] text-cyan-300/80 font-mono">
              Công cụ: VirusTotal
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-cyan-400 font-bold">BƯỚC 4</span>
              <h4 className="text-sm font-bold text-white">Cách Ly Cloud / Sandbox</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Xem trước file trên Google Drive Preview hoặc cho chạy thử trong máy ảo cô lập Any.run.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-cyan-300/80 font-mono">
              Công cụ: Any.run Sandbox
            </div>
          </div>

          {/* Step 5 */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs text-amber-400 font-bold">BƯỚC 5</span>
              <h4 className="text-sm font-bold text-white">3 Không & 2 Báo</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Không bật Macro · Không tắt Antivirus · Không cắm USB lạ. Rút cáp mạng ngay & báo IT xử lý.
              </p>
            </div>
            <div className="pt-2 text-[11px] text-amber-300/80 font-mono">
              Quy trình khẩn cấp
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Golden "DON'TS" Visual Pill-Free Callout */}
      <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
        <div className="text-xs font-bold text-amber-400 flex items-center gap-2">
          <AlertOctagon className="w-4 h-4" />
          <span>3 DẤU HIỆU CẢNH BÁO BẮT BUỘC DỪNG LẠI NGAY LẬP TỨC:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-white">1. Xuất hiện đuôi file kép:</span>
            <p className="text-slate-400 leading-relaxed">
              Tên file dạng <code className="text-rose-300">.pdf.exe</code> hoặc <code className="text-rose-300">.jpg.js</code>. Đuôi thực sự là đuôi cuối cùng bên phải!
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-white">2. Yêu cầu "Bật nội dung" (Enable Content/Macro):</span>
            <p className="text-slate-400 leading-relaxed">
              Word/Excel đòi bấm Enable Macro để xem tài liệu. Tuyệt đối không bấm với file nhận từ email lạ!
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-white">3. Yêu cầu tắt Antivirus để cài:</span>
            <p className="text-slate-400 leading-relaxed">
              Tải phần mềm crack báo cần tắt diệt virus vì "báo nhầm". Đây là dấu hiệu 99% phần mềm chứa mã độc!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Emergency Incident Response Decision Flow */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            Cây Ra Quyết Định Tương Tác: Tình Huống Bạn Đang Đối Mặt Là Gì?
          </h4>
          <p className="text-xs text-slate-400">
            Chọn trạng thái thực tế của bạn để nhận hướng dẫn xử lý ưu tiên ngay lập tức:
          </p>
        </div>

        {/* State selector buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedIncidentStage('RECEIVED')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              selectedIncidentStage === 'RECEIVED'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tình huống 1: Vừa nhận được link hoặc file lạ (Chưa mở)
          </button>
          <button
            onClick={() => setSelectedIncidentStage('OPENED')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              selectedIncidentStage === 'OPENED'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tình huống 2: Đã lỡ nhấp mở file nhưng chưa bấm gì thêm
          </button>
          <button
            onClick={() => setSelectedIncidentStage('ENABLED_MACRO')}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              selectedIncidentStage === 'ENABLED_MACRO'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            Tình huống 3: KHẨN CẤP — Đã bấm Enable Content / Chạy file .exe!
          </button>
        </div>

        {/* Render specific guidance based on selection */}
        {selectedIncidentStage === 'RECEIVED' && (
          <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs md:text-sm space-y-2">
            <div className="font-bold text-cyan-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>HƯỚNG XỬ LÝ AN TOÀN (BẢO TOÀN HỆ THỐNG):</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-5 list-disc leading-relaxed">
              <li>Không nhấp đúp vào file. Bật hiển thị đuôi file để kiểm tra xem có phải đuôi kép (.pdf.exe) không.</li>
              <li>Mở PowerShell chạy lệnh <code className="bg-slate-900 px-1 py-0.5 rounded text-cyan-300">Get-FileHash "tệp_tin"</code> rồi dán lên mục Search của VirusTotal.</li>
              <li>Nếu là URL: Dán vào ô quét của <strong>urlscan.io</strong> để xem ảnh chụp màn hình máy ảo mà không cần mở trình duyệt thật.</li>
              <li>Nếu nghi ngờ là tài liệu công việc quan trọng: Tải lên Google Drive và nhấn <strong>Xem trước (Preview)</strong>.</li>
            </ul>
          </div>
        )}

        {selectedIncidentStage === 'OPENED' && (
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs md:text-sm space-y-2">
            <div className="font-bold text-amber-300 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-amber-400" />
              <span>HÀNH ĐỘNG NGĂN CHẶN KỊP THỜI:</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-5 list-disc leading-relaxed">
              <li>Nếu Word/Excel hiện thanh cảnh báo màu vàng "Enable Content / Macro": <strong>Tuyệt đối KHÔNG BẤM!</strong> Đóng ứng dụng ngay.</li>
              <li>Nếu hiện hộp thoại Windows SmartScreen hoặc User Account Control (UAC) hỏi quyền Admin: Nhấn <strong>Don't run / No</strong> ngay lập tức.</li>
              <li>Xóa tệp tin khỏi thư mục Downloads và dọn sạch Thùng rác (Recycle Bin).</li>
              <li>Chạy trình quét toàn diện (Full Scan) bằng phần mềm diệt virus trên máy (Microsoft Defender / Bkav / Kaspersky).</li>
            </ul>
          </div>
        )}

        {selectedIncidentStage === 'ENABLED_MACRO' && (
          <div className="p-5 rounded-lg bg-rose-950/30 border border-rose-500/50 text-xs md:text-sm space-y-3">
            <div className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <WifiOff className="w-5 h-5 text-rose-400 shrink-0" />
              <span>QUY TRÌNH PHẢN ỨNG SỰ CỐ KHẨN CẤP (TRONG VÒNG 60 GIÂY ĐẦU TIÊN):</span>
            </div>
            <div className="space-y-2 text-slate-200 leading-relaxed">
              <div className="p-3 rounded bg-slate-900 border border-rose-900/50 flex items-start gap-2">
                <span className="font-bold text-rose-400 text-sm">1.</span>
                <div>
                  <strong className="text-white">NGẮT KẾT NỐI MẠNG NGAY LẬP TỨC:</strong> Rút cáp mạng LAN hoặc tắt công tắc Wi-Fi của máy tính này ngay. Hành động này sẽ cắt đứt đường truyền tới máy chủ điều khiển C2, ngăn mã độc tải Ransomware về hoặc lây lan sang các máy tính khác trong công ty.
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-rose-900/50 flex items-start gap-2">
                <span className="font-bold text-rose-400 text-sm">2.</span>
                <div>
                  <strong className="text-white">KHÔNG VỘI TẮT NGUỒN MÁY TÍNH:</strong> Để nguyên hiện trạng máy sau khi đã ngắt mạng. Việc tắt nguồn đột ngột có thể làm mất dấu vết tiến trình trong bộ nhớ RAM cần thiết cho đội ngũ ứng cứu sự cố phân tích.
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900 border border-rose-900/50 flex items-start gap-2">
                <span className="font-bold text-rose-400 text-sm">3.</span>
                <div>
                  <strong className="text-white">BÁO NGAY CHO BỘ PHẬN IT / AN NINH MẠNG:</strong> Gọi điện trực tiếp cho quản trị mạng công ty hoặc đường dây nóng an toàn thông tin (VNCERT / Cục ATTT) để tiến hành cách ly và rà quét bằng công cụ chuyên dụng.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Copy / Export Sổ Tay Tác Chiến */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="space-y-0.5">
          <div className="text-xs font-semibold text-white">Lưu Trữ Sổ Tay Tác Chiến Bỏ Túi</div>
          <div className="text-[11px] text-slate-400">Sao chép bản tóm tắt SOP để chia sẻ cho đồng nghiệp hoặc in ra dán tại bàn làm việc</div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySop}
            className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 text-xs flex items-center gap-1.5 transition-colors shadow-sm"
          >
            {copiedSop ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSop ? 'Đã sao chép SOP' : 'Sao chép Sổ Tay SOP'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
