import { LESSON_OBJECTIVES, TIMETABLE } from '../data/lessonData';
import { ShieldAlert, Terminal, Compass, Eye, PlayCircle, BookOpen } from 'lucide-react';

interface HeroOverviewProps {
  onStartSimulation: () => void;
  onStartLab: () => void;
  onStartGame: () => void;
}

export function HeroOverview({ onStartSimulation, onStartLab, onStartGame }: HeroOverviewProps) {
  return (
    <div className="space-y-12">
      {/* Hero Visual Banner & Core Purpose */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>GIÁO TRÌNH THỰC HÀNH AN TOÀN THÔNG TIN</span>
            <span aria-hidden="true">·</span>
            <span>THỜI LƯỢNG 135 PHÚT</span>
            <span aria-hidden="true">·</span>
            <span>BÀI 4</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight text-balance">
            Rà Quét URL & Phân Tích Tệp Tin Độc Hại
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Tài liệu giảng dạy và nền tảng tương tác chuyên sâu: Rèn luyện kỹ năng đọc vị mọi thủ thuật ngụy trang
            tên miền giả mạo, bóc trần tệp tin đuôi kép và macro độc, làm chủ các công cụ rà quét trực tuyến
            (VirusTotal, urlscan.io, Any.run Sandbox) mà không gây rủi ro cho máy tính thật.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartSimulation}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors flex items-center gap-2 shadow-md"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Thực Hành Rà Quét Mô Phỏng</span>
            </button>
            <button
              onClick={onStartLab}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Phòng Lab Hash Thực Tế</span>
            </button>
            <button
              onClick={onStartGame}
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Đấu Trường Thử Thách SOC</span>
            </button>
          </div>
        </div>

        {/* 4 Quantitative Rigor Callout Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-slate-800">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-mono font-bold text-cyan-400 tabular-nums">70+</div>
            <div className="text-xs text-slate-400">Động cơ diệt virus cùng quét trên VirusTotal</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-mono font-bold text-cyan-400 tabular-nums">100%</div>
            <div className="text-xs text-slate-400">Cô lập máy thật nhờ Sandbox Any.run & urlscan</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-mono font-bold text-amber-400 tabular-nums">6 Kỹ thuật</div>
            <div className="text-xs text-slate-400">Ngụy trang file & URL tinh vi thường gặp ở VN</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-mono font-bold text-emerald-400 tabular-nums">5 Bước</div>
            <div className="text-xs text-slate-400">Công thức cố định bất biến khi nhận link/file lạ</div>
          </div>
        </div>
      </section>

      {/* Target Objectives & Pedagogical Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Objectives Left (7 cols) */}
        <section className="lg:col-span-7 bg-slate-900/70 border border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Mục Tiêu Bài Học Dành Cho Học Viên</h2>
              <p className="text-xs text-slate-400">Kiến thức và năng lực đạt được sau buổi học</p>
            </div>
          </div>

          <div className="space-y-3.5">
            {LESSON_OBJECTIVES.map((obj, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{obj}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
            <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-200">Nguyên tắc cốt lõi:</strong> Không bao giờ mở trực tiếp một link hoặc tệp tin lạ trên máy thật nếu chưa được kiểm tra qua công cụ chuyên dụng. Cảm quan mắt thường không thể nhìn thấu mã độc ẩn sâu.
            </p>
          </div>
        </section>

        {/* Schedule Right (5 cols) */}
        <section className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-800 text-blue-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Kế Hoạch Buổi Học</h2>
              <p className="text-xs text-slate-400">Phân bổ 135 phút lý thuyết và thực hành</p>
            </div>
          </div>

          <div className="space-y-3">
            {TIMETABLE.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-cyan-400">{item.section}</span>
                  <span className="font-mono text-slate-400">{item.duration}</span>
                </div>
                <div className="text-sm font-medium text-slate-200 mt-1 leading-snug">
                  {item.title}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-slate-500 border-t border-slate-800 flex items-center justify-between">
            <span>Giáo trình chuẩn hoá theo VNCERT & NCSC</span>
            <span className="text-cyan-400 font-medium">Tổng: 135 phút</span>
          </div>
        </section>
      </div>
    </div>
  );
}
