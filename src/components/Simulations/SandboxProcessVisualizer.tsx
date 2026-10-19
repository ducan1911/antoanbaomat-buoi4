import { useState } from 'react';
import { SANDBOX_PROCESS_TIMELINE } from '../../data/lessonData';
import { Play, Pause, RotateCcw, Shield, ShieldAlert, Cpu, Network, Database, FileSpreadsheet, AlertTriangle, CheckCircle2 } from 'lucide-react';

export function SandboxProcessVisualizer() {
  const [currentStepIndex, setCurrentStepIndex] = useState(SANDBOX_PROCESS_TIMELINE.length - 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'TREE' | 'NETWORK' | 'REGISTRY' | 'FILES'>('TREE');

  const visibleSteps = SANDBOX_PROCESS_TIMELINE.slice(0, currentStepIndex + 1);

  const handleNext = () => {
    if (currentStepIndex < SANDBOX_PROCESS_TIMELINE.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>THỰC HÀNH 2 · MÔI TRƯỜNG ẢO CÔ LẬP</span>
          <span aria-hidden="true">·</span>
          <span>SƠ ĐỒ TIẾN TRÌNH ANY.RUN DYNAMIC SANDBOX</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Quan Sát Hành Vi Mã Độc Chạy Ngầm Trong Hộp Cát (Sandbox)
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1 leading-relaxed">
          Kẻ tấn công giấu mã độc trong <code className="text-amber-300 font-mono">HoaDon_TienDien.pdf.exe</code>. Hãy xem điều gì xảy ra ở cấp độ hệ thống khi tệp tin này được mở, giải thích vì sao tuyệt đối không được mở trên máy thật!
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentStepIndex >= SANDBOX_PROCESS_TIMELINE.length - 1) {
                setCurrentStepIndex(0);
              }
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Tạm Dừng' : 'Phát Từng Bước'}</span>
          </button>

          <button
            onClick={handleNext}
            disabled={currentStepIndex >= SANDBOX_PROCESS_TIMELINE.length - 1}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs disabled:opacity-50 transition-colors"
          >
            Bước Tiếp Theo &rarr;
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đặt Lại</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">Tiến độ phân tích:</span>
          <span className="font-mono text-cyan-400 font-bold">
            {currentStepIndex + 1} / {SANDBOX_PROCESS_TIMELINE.length} giai đoạn
          </span>
        </div>
      </div>

      {/* Process Stage Navigation Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('TREE')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'TREE' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Cây Tiến Trình (Process Tree)</span>
        </button>
        <button
          onClick={() => setActiveTab('NETWORK')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'NETWORK' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Kết Nối C2 (Network)</span>
        </button>
        <button
          onClick={() => setActiveTab('REGISTRY')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'REGISTRY' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Sửa Registry (Persistence)</span>
        </button>
        <button
          onClick={() => setActiveTab('FILES')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'FILES' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Mã Hóa Tệp (Ransomware)</span>
        </button>
      </div>

      {/* Dynamic Content Display */}
      {activeTab === 'TREE' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Sơ đồ tiến trình theo thứ tự thời gian nạp bộ nhớ trong máy ảo Any.run:
          </div>

          <div className="space-y-3">
            {visibleSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all space-y-2 relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-cyan-400 font-bold">{step.timeOffset}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="font-bold text-white">{step.action}</span>
                  </div>
                  <span className="font-mono text-rose-400 text-xs px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 self-start sm:self-auto">
                    Hành vi độc hại
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded bg-slate-900 font-mono text-slate-300">
                    <span className="text-slate-500 text-[10px] block">TIẾN TRÌNH CON:</span>
                    <span className="text-rose-300">{step.process}</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-900 font-mono text-slate-300">
                    <span className="text-slate-500 text-[10px] block">TIẾN TRÌNH MẸ:</span>
                    <span className="text-slate-400">{step.parentProcess}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'NETWORK' && (
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              Báo Cáo Kết Nối Mạng Tới Máy Chủ Điều Khiển C2 (Command & Control)
            </h4>
            <span className="text-xs font-mono text-rose-400 font-bold">1 KẾT NỐI NGUY HIỂM</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">GIAO THỨC</th>
                  <th className="p-3">ĐỊA CHỈ IP ĐÍCH</th>
                  <th className="p-3">PORT</th>
                  <th className="p-3">TIẾN TRÌNH GỌI</th>
                  <th className="p-3">QUỐC GIA MÁY CHỦ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr className="bg-rose-950/20 text-rose-200">
                  <td className="p-3 font-bold">TCP / HTTPS</td>
                  <td className="p-3 font-bold">185.220.101.5</td>
                  <td className="p-3">8443</td>
                  <td className="p-3">powershell.exe</td>
                  <td className="p-3">Máy chủ vô danh (Tor Exit Node)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Mục đích kết nối: Tải khóa mã hóa công khai (Public Key) và tải payload tống tiền (Ransomware Encryptor) về máy nạn nhân. Nếu rút cáp mạng ngay ở giây thứ 00:03, mã độc sẽ không thể kết nối tới C2 để tải payload về!
          </p>
        </div>
      )}

      {activeTab === 'REGISTRY' && (
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" />
              Sửa Đổi Windows Registry Để Tự Khởi Động (Persistence)
            </h4>
            <span className="text-xs font-mono text-amber-400 font-bold">REGISTRY RUN KEY</span>
          </div>

          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs space-y-2">
            <div className="text-slate-500">ĐƯỜNG DẪN KHÓA ĐÃ BỊ TẠO LẬP:</div>
            <div className="text-amber-300 break-all">
              HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
            </div>
            <div className="text-slate-400 pt-2">
              Giá trị: <span className="text-white">"WinUpdate"</span> = <span className="text-rose-300">"C:\Users\Admin\AppData\Roaming\svchelp.exe"</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Hậu quả: Kể cả khi bạn tắt máy tính và bật lại vào ngày hôm sau, hệ điều hành Windows vẫn tự động kích hoạt mã độc chạy ngầm cùng hệ thống.
          </p>
        </div>
      )}

      {activeTab === 'FILES' && (
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-rose-400" />
              Hành Vi Mã Hóa Dữ Liệu Tống Tiền (Ransomware)
            </h4>
            <span className="text-xs font-mono text-rose-400 font-bold">472 TỆP TIN BỊ KHÓA</span>
          </div>

          <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs space-y-2">
            <div className="font-bold text-rose-200">CÁC TỆP ĐÃ BỊ THAY ĐỔI ĐUÔI TỆP TIN:</div>
            <ul className="space-y-1 font-mono text-slate-300">
              <li>• BaoCaoTaiChinh_2026.xlsx &rarr; <span className="text-rose-400">BaoCaoTaiChinh_2026.xlsx.locked</span></li>
              <li>• HopDongKinhTe_KyKet.docx &rarr; <span className="text-rose-400">HopDongKinhTe_KyKet.docx.locked</span></li>
              <li>• DuLieuKeToan_MISA.bak &rarr; <span className="text-rose-400">DuLieuKeToan_MISA.bak.locked</span></li>
            </ul>
            <div className="pt-2 text-amber-300 font-medium">
              Tạo tệp đòi tiền chuộc: <code className="bg-slate-900 px-1 py-0.5 rounded">C:\Desktop\README_HOW_TO_DECRYPT_FILES.txt</code>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Reality Callout Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
          <div className="flex items-center gap-2 text-rose-300 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>NẾU THỬ MỞ TRÊN MÁY TÍNH THẬT:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Dữ liệu kế toán và tài liệu cá nhân bị mã hóa vĩnh viễn. Mã độc lan sang toàn bộ mạng nội bộ công ty. Mất tiền chuộc hàng chục nghìn USD mà chưa chắc đã lấy lại được file.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>KHI CHẠY TRONG SANDBOX ANY.RUN CÔ LẬP:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Máy tính thật được bảo vệ an toàn 100%. Toàn bộ tiến trình, mã hóa và kết nối C2 đều bị ghi lại đầy đủ để làm báo cáo kỹ thuật. Đóng trình duyệt là kết thúc phiên máy ảo!
          </p>
        </div>
      </div>
    </div>
  );
}
