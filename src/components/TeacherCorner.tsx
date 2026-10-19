import { useState } from 'react';
import { TEACHER_FAQ, TECHNICAL_TERMS } from '../data/lessonData';
import { BookOpen, HelpCircle, AlertTriangle, ShieldCheck, ChevronDown, ChevronUp, Sparkles, Layers } from 'lucide-react';

export function TeacherCorner() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedBehaviorCategory, setSelectedBehaviorCategory] = useState<'TROJAN' | 'WORM' | 'RANSOMWARE' | 'SPYWARE' | 'ADWARE'>('TROJAN');

  const BEHAVIORS = [
    {
      id: 'TROJAN',
      title: 'Trojan (Mã độc giả dạng)',
      vietnamese: 'Đội lốt phần mềm hợp pháp',
      behavior: 'Không tự nhân bản, giả vờ là game/phần mềm/hóa đơn để lừa người dùng tự bấm chạy.',
      realExample: 'Phần mềm hack game, Ultraview/TeamViewer giả mạo, bản crack Office.'
    },
    {
      id: 'WORM',
      title: 'Worm (Sâu máy tính)',
      vietnamese: 'Tự nhân bản lây lan qua mạng',
      behavior: 'Tự động quét và lây lan qua các cổng mạng LAN/WAN mà không cần người dùng thao tác bấm mở.',
      realExample: 'WannaCry 2017 quét qua cổng SMB (Port 445) làm tê liệt hàng loạt bệnh viện và nhà máy.'
    },
    {
      id: 'RANSOMWARE',
      title: 'Ransomware (Mã độc tống tiền)',
      vietnamese: 'Mã hóa tài liệu đòi tiền chuộc',
      behavior: 'Âm thầm quét toàn bộ ổ đĩa, mã hóa file .docx, .xlsx, .pdf bằng thuật toán mã hóa mạnh (AES/RSA) rồi để lại thư đòi tiền ảo Bitcoin.',
      realExample: 'Tấn công công ty chứng khoán VNDIRECT và PVOIL năm 2024 tại Việt Nam.'
    },
    {
      id: 'SPYWARE',
      title: 'Spyware / Keylogger (Gián điệp)',
      vietnamese: 'Đánh cắp mật khẩu & Theo dõi bàn phím',
      behavior: 'Âm thầm ghi lại mọi phím gõ, chụp ảnh màn hình định kỳ và gửi mật khẩu, tài khoản ngân hàng về cho tin tặc.',
      realExample: 'RedLine Stealer lấy cắp cookie và mật khẩu lưu trong trình duyệt Chrome/Firefox.'
    },
    {
      id: 'ADWARE',
      title: 'Adware độc hại',
      vietnamese: 'Chèn quảng cáo & Đổi trang chủ',
      behavior: 'Tự động mở các tab quảng cáo cờ bạc, chiếm quyền kiểm soát công cụ tìm kiếm của trình duyệt.',
      realExample: 'Các extension trình duyệt giả mạo "Trình tải video TikTok/YouTube".'
    }
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>HỌC PHẦN 9 & 10 · KIẾN THỨC MỞ RỘNG & PHƯƠNG PHÁP SƯ PHẠM</span>
          <span aria-hidden="true">·</span>
          <span>SỔ TAY NÂNG CAO CHO GIẢNG VIÊN & HỌC VIÊN HIẾU HỌC</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Góc Chuyên Gia: Thuật Ngữ Kỹ Thuật & Giải Đáp Câu Hỏi Hóc Búa
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Tài liệu hỗ trợ giáo viên giải thích chắc tay các cơ chế mã độc, giải quyết thắc mắc chuyên sâu của học viên và xử lý tình huống phát sinh trong giờ thực hành.
        </p>
      </div>

      {/* Part 1: FAQ from Students (Accordion) */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
          4 Câu Hỏi Học Viên Thường Đặt Ra Nhất & Hướng Trả Lời Chuẩn
        </h4>

        <div className="space-y-3">
          {TEACHER_FAQ.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs md:text-sm font-semibold text-slate-200 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-cyan-400 font-mono text-xs">Q{idx + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs md:text-sm text-slate-300 leading-relaxed border-t border-slate-900 bg-slate-900/30">
                    <div className="text-emerald-400 font-medium text-xs mb-1">GỢI Ý GIẢI THÍCH CHO HỌC VIÊN:</div>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Technical Terminology (Payload, C2, Persistence, Zero-day, Polymorphic) */}
      <div className="space-y-4">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          5 Thuật Ngữ An Ninh Mạng Cốt Lõi Cần Nắm Chắc
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECHNICAL_TERMS.map((term, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-cyan-400">{term.term}</div>
                <div className="text-xs font-semibold text-white">{term.vietnamese}</div>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {term.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Behavior Classification Matrix */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Phân Loại Mã Độc Theo Hành Vi (Để Trả Lời Khi Học Viên Hỏi Khác Nhau Thế Nào)
          </h4>
          <p className="text-xs text-slate-400">
            Chọn từng loại mã độc để xem cách thức lây nhiễm và ví dụ điển hình:
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {BEHAVIORS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedBehaviorCategory(item.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedBehaviorCategory === item.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {(() => {
          const current = BEHAVIORS.find(b => b.id === selectedBehaviorCategory)!;
          return (
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs md:text-sm">
              <div className="font-bold text-white flex items-center justify-between">
                <span>{current.title}</span>
                <span className="text-cyan-400 text-xs font-normal">{current.vietnamese}</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                <strong>Hành vi đặc trưng:</strong> {current.behavior}
              </p>
              <div className="text-slate-400 text-xs pt-1 border-t border-slate-800">
                <strong>Ví dụ thực tế:</strong> {current.realExample}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Part 4: Safety Instructions for Teachers */}
      <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-xs md:text-sm">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>HƯỚNG DẪN XỬ LÝ TÌNH HUỐNG PHÁT SINH TRONG GIỜ THỰC HÀNH:</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-white">1. Nếu học sinh lỡ mở file thật ngoài kịch bản:</span>
            <p className="text-slate-400 leading-relaxed">
              Yêu cầu rút ngay cáp mạng hoặc tắt Wi-Fi máy đó lập tức. Không tắt nguồn vội để giữ bằng chứng bộ nhớ RAM cho IT xử lý.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-white">2. Nếu VirusTotal bị giới hạn lượt quét (Rate Limit):</span>
            <p className="text-slate-400 leading-relaxed">
              Sử dụng các mẫu báo cáo đã lưu sẵn trên nền tảng này hoặc dùng Any.run public submissions có sẵn trong kho công khai.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-semibold text-white">3. Nếu học sinh hỏi sâu về kỹ thuật viết mã độc:</span>
            <p className="text-slate-400 leading-relaxed">
              Chuyển hướng về góc độ phòng thủ: "Chúng ta học cách nhận diện và tự bảo vệ, không đi sâu vào cách tạo ra mã độc để đảm bảo đạo đức an toàn thông tin."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
