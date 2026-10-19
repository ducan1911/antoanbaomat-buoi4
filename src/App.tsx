/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroOverview } from './components/HeroOverview';
import { SmartThreatMatrix } from './components/SmartThreatMatrix';
import { UrlDissector } from './components/Simulations/UrlDissector';
import { VirusTotalSimulator } from './components/Simulations/VirusTotalSimulator';
import { SandboxProcessVisualizer } from './components/Simulations/SandboxProcessVisualizer';
import { HashLab } from './components/HashLab';
import { OperationalFormula } from './components/OperationalFormula';
import { InteractiveGames } from './components/InteractiveGames';
import { TeacherCorner } from './components/TeacherCorner';
import { Globe, Shield, Cpu, X, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSimTab, setActiveSimTab] = useState<'URL' | 'VIRUSTOTAL' | 'SANDBOX'>('URL');
  const [showSopModal, setShowSopModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [copiedGitCmd, setCopiedGitCmd] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Top Bar Contract Compliant Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSopModal={() => setShowSopModal(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <HeroOverview
              onStartSimulation={() => {
                setActiveTab('simulators');
                setActiveSimTab('URL');
              }}
              onStartLab={() => setActiveTab('hashlab')}
              onStartGame={() => setActiveTab('games')}
            />

            {/* Quick Teaser for Smart Threat Matrix */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="text-xs font-semibold text-cyan-400">DỮ LIỆU ĐE DỌA THỰC TẾ</div>
                <h3 className="text-lg font-bold text-white">
                  Khám Phá Biểu Đồ & Ma Trận Đe Dọa An Ninh Mạng Tại Việt Nam
                </h3>
                <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
                  Lọc thông minh 8 kỹ thuật ngụy trang phổ biến: từ đuôi kép (.pdf.exe), macro độc (.docm) đến giả mạo tên miền (Typosquatting/Homograph).
                </p>
              </div>

              <button
                onClick={() => setActiveTab('radar')}
                className="px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-400 font-semibold text-xs whitespace-nowrap self-start md:self-auto transition-colors"
              >
                Mở Bộ Lọc & Biểu Đồ &rarr;
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: SMART RADAR & FILTER */}
        {activeTab === 'radar' && (
          <div className="space-y-8">
            <SmartThreatMatrix />
          </div>
        )}

        {/* TAB 3: SIMULATORS SUITE */}
        {activeTab === 'simulators' && (
          <div className="space-y-8">
            {/* Simulator Mode Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Môi Trường Mô Phỏng Rà Quét Cô Lập</h2>
                <p className="text-xs text-slate-400">Chọn một công cụ mô phỏng để thực hành thao tác an toàn</p>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
                <button
                  onClick={() => setActiveSimTab('URL')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                    activeSimTab === 'URL'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Kính Lúp URL</span>
                </button>

                <button
                  onClick={() => setActiveSimTab('VIRUSTOTAL')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                    activeSimTab === 'VIRUSTOTAL'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>VirusTotal 70+ AV</span>
                </button>

                <button
                  onClick={() => setActiveSimTab('SANDBOX')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                    activeSimTab === 'SANDBOX'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Any.run Sandbox</span>
                </button>
              </div>
            </div>

            {/* Active Simulation */}
            {activeSimTab === 'URL' && <UrlDissector />}
            {activeSimTab === 'VIRUSTOTAL' && <VirusTotalSimulator />}
            {activeSimTab === 'SANDBOX' && <SandboxProcessVisualizer />}
          </div>
        )}

        {/* TAB 4: HASH LAB */}
        {activeTab === 'hashlab' && (
          <div className="space-y-8">
            <HashLab />
          </div>
        )}

        {/* TAB 5: SOP & OPERATIONAL FORMULA */}
        {activeTab === 'sop' && (
          <div className="space-y-8">
            <OperationalFormula />
          </div>
        )}

        {/* TAB 6: GAMIFIED CHALLENGES */}
        {activeTab === 'games' && (
          <div className="space-y-8">
            <InteractiveGames />
          </div>
        )}

        {/* TAB 7: TEACHER CORNER */}
        {activeTab === 'teacher' && (
          <div className="space-y-8">
            <TeacherCorner />
          </div>
        )}
      </main>

      {/* Floating Action Strip for Teacher Corner & Resources */}
      <div className="bg-slate-950/80 border-t border-slate-900 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('teacher')}
              className={`hover:text-cyan-400 transition-colors flex items-center gap-1.5 ${
                activeTab === 'teacher' ? 'text-cyan-400 font-semibold' : ''
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Góc Giảng Viên & Hỏi Đáp Chuyên Sâu</span>
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => setShowGithubModal(true)}
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Đưa Lên GitHub / Xuất Bản Cho Học Sinh</span>
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Nguồn: VNCERT · NCSC · VirusTotal · Any.run</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Bài 4: Rà quét URL & Phân tích Tệp tin Độc hại</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="text-cyan-400 font-mono">135 Phút</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block" />
            <span className="font-semibold text-slate-400">Nền Tảng Giảng Dạy & Tác Chiến An Toàn Thông Tin</span>
          </div>
          <div>
            Biên soạn theo khung đào tạo An toàn không gian mạng Việt Nam (NCSC & VNCERT)
          </div>
        </div>
      </footer>

      {/* Sổ Tay Tác Chiến SOP Quick Modal */}
      {showSopModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-cyan-400">SỔ TAY TÁC CHIẾN BỎ TÚI (QUICK SOP)</div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Công Thức Cố Định 5 Bước Bất Biến Khi Tiếp Nhận Link / Tệp Lạ
                </h3>
              </div>
              <button
                onClick={() => setShowSopModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">1. SOI TÊN MIỀN GỐC (ROOT DOMAIN)</div>
                <p className="text-slate-300 leading-relaxed">
                  Đọc ngược từ dấu gạch chéo đầu tiên (/) sang trái để xác định đúng tên miền chính và đuôi TLD. Tuyệt đối không nhìn vào subdomain đánh lừa.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">2. LỘT MẶT NẠ ĐUÔI TỆP TIN (FILE EXTENSIONS)</div>
                <p className="text-slate-300 leading-relaxed">
                  Bật File Explorer &rarr; View &rarr; "File name extensions". Phát hiện ngay đuôi kép như <code className="text-rose-300">.pdf.exe</code> hoặc <code className="text-rose-300">.jpg.js</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">3. TRA HASH TRƯỚC KHI MỞ (SHA-256 LOOKUP)</div>
                <p className="text-slate-300 leading-relaxed">
                  Dùng PowerShell <code className="text-cyan-300">Get-FileHash</code> để lấy mã SHA-256 tra trên VirusTotal mà không làm lộ tệp mật lên mạng. Có 2-3 hãng cảnh báo là dừng ngay!
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-cyan-400">4. CÁCH LY CLOUD PREVIEW HOẶC SANDBOX</div>
                <p className="text-slate-300 leading-relaxed">
                  Mở xem trước trên Google Drive / OneDrive đám mây hoặc chạy thử trong máy ảo Any.run. Không bao giờ mở trực tiếp trên máy thật.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-amber-500/30 space-y-1">
                <div className="font-bold text-amber-400">5. KỶ LUẬT 3 KHÔNG & 2 BÁO ĐỘNG</div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>3 Không:</strong> Không bật Macro · Không tắt Antivirus · Không cắm USB lạ.
                  <br />
                  <strong>2 Báo:</strong> Rút cáp mạng / Tắt Wi-Fi ngay lập tức nếu nghi nhiễm · Báo ngay cho IT công ty / NCSC xử lý.
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setShowSopModal(false);
                  setActiveTab('sop');
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                Xem chi tiết cây ra quyết định &rarr;
              </button>

              <button
                onClick={() => setShowSopModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Đã hiểu & Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Export & Deployment Guidance Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-cyan-400">HƯỚNG DẪN XUẤT BẢN & CHIA SẺ</div>
                <h3 className="text-xl font-bold text-white mt-1">
                  Cách Đưa Ứng Dụng Lên GitHub & Mở Web Cho Học Sinh
                </h3>
              </div>
              <button
                onClick={() => setShowGithubModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm">
              {/* Option 1: Vercel 1-click */}
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300">CÁCH 1: TRIỂN KHAI ONLINE MIỄN PHÍ QUA VERCEL (KHUYÊN DÙNG)</span>
                  <span className="text-[10px] font-mono text-emerald-400">1 Click · Tự động HTTPS</span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  Sau khi đẩy code lên GitHub, bạn chỉ cần vào <strong className="text-white">vercel.com</strong> &rarr; Đăng nhập GitHub &rarr; Chọn Repository vừa tạo &rarr; Bấm <strong>Deploy</strong>. Bạn sẽ nhận được đường link như <code className="text-cyan-400">https://bai4-cybersec.vercel.app</code> gửi cho học sinh truy cập ngay trên điện thoại hoặc máy tính mà không cần cài đặt gì.
                </p>
              </div>

              {/* Option 2: Git commands */}
              <div className="space-y-2">
                <div className="font-semibold text-white flex items-center justify-between">
                  <span>CÁC CÂU LỆNH ĐẨY CODE LÊN GITHUB:</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`git init\ngit add .\ngit commit -m "Khoi tao bai 4 an toan thong tin"\ngit branch -M main\ngit remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git\ngit push -u origin main`);
                      setCopiedGitCmd(true);
                      setTimeout(() => setCopiedGitCmd(false), 2000);
                    }}
                    className="text-xs text-cyan-400 hover:underline"
                  >
                    {copiedGitCmd ? '✓ Đã sao chép' : 'Sao chép lệnh'}
                  </button>
                </div>

                <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`# 1. Khởi tạo kho Git
git init

# 2. Thêm toàn bộ mã nguồn
git add .

# 3. Tạo commit
git commit -m "Khoi tao bai 4 an toan thong tin"

# 4. Đặt nhánh chính là main
git branch -M main

# 5. Liên kết tới kho GitHub của bạn (thay username & repo)
git remote add origin https://github.com/<USERNAME>/<REPO_NAME>.git

# 6. Đẩy toàn bộ lên GitHub
git push -u origin main`}
                </pre>
              </div>

              {/* Option 3: GitHub Pages */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white">CÁCH 2: XUẤT BẢN QUA GITHUB PAGES TRỰC TIẾP</div>
                <p className="text-slate-400 leading-relaxed">
                  Dự án đã cấu hình sẵn <code className="text-cyan-300 font-mono">base: './'</code> trong <code className="text-slate-300">vite.config.ts</code>. Bạn chỉ cần chạy lệnh <code className="text-amber-300 font-mono">npm run build</code> rồi đẩy thư mục <code className="text-cyan-300">dist/</code> lên nhánh <code className="text-cyan-300">gh-pages</code>, học sinh sẽ xem được qua địa chỉ: <code className="text-emerald-400">https://&lt;username&gt;.github.io/&lt;repo&gt;/</code>.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setShowGithubModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Đóng Hướng Dẫn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
