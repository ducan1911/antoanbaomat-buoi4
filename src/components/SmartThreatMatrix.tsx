import { useState, useMemo } from 'react';
import { THREAT_ITEMS, VIETNAM_VECTOR_STATS, COMPARISON_TOOLS } from '../data/lessonData';
import { ThreatItem, ThreatLevel } from '../types/security';
import { Search, Filter, ShieldAlert, AlertTriangle, FileCode, Globe, CheckCircle2, XCircle, ExternalLink, Info } from 'lucide-react';

export function SmartThreatMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'URL' | 'FILE'>('ALL');
  const [selectedVector, setSelectedVector] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [inspectedItem, setInspectedItem] = useState<ThreatItem | null>(null);
  const [activeVectorTab, setActiveVectorTab] = useState<number>(0);

  // Filter threats
  const filteredThreats = useMemo(() => {
    return THREAT_ITEMS.filter((item) => {
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedVector !== 'ALL' && item.vector !== selectedVector) return false;
      if (selectedLevel !== 'ALL' && item.level !== selectedLevel) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchSample = item.sampleName.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCase = item.vietnamRealCase.toLowerCase().includes(q);
        if (!matchName && !matchSample && !matchDesc && !matchCase) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedVector, selectedLevel, searchQuery]);

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>PHÂN TÍCH DỮ LIỆU ĐE DỌA TẠI VIỆT NAM</span>
          <span aria-hidden="true">·</span>
          <span>BỘ LỌC THÔNG MINH</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          Biểu Đồ Trực Quan & Ma Trận Đe Dọa Phổ Biến
        </h2>
        <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
          Số liệu tổng hợp các kênh phát tán mã độc và thủ đoạn giả mạo URL nhắm vào người dùng và doanh nghiệp tại Việt Nam.
        </p>
      </div>

      {/* Visual Chart 1: Vietnam Attack Vectors Bar Distribution */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-cyan-400" />
              Tỷ Lệ Các Kênh Phát Tán Mã Độc Hàng Đầu Tại Việt Nam
            </h3>
            <p className="text-xs text-slate-400">Dữ liệu thực tế phân tích từ các vụ tấn công ransomware và lừa đảo trực tuyến</p>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Tổng hợp cảnh báo từ VNCERT & các hãng bảo mật
          </div>
        </div>

        {/* Interactive Vector Bars */}
        <div className="space-y-4">
          {VIETNAM_VECTOR_STATS.map((stat, idx) => {
            const isSelected = activeVectorTab === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveVectorTab(idx)}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 font-medium text-sm text-slate-200">
                    <span className="font-mono text-xs text-cyan-400 font-bold">#{idx + 1}</span>
                    <span>{stat.vector}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 hidden sm:inline">Đối tượng: {stat.victim}</span>
                    <span className="text-sm font-mono font-bold text-cyan-400 tabular-nums">
                      {stat.percentage}%
                    </span>
                  </div>
                </div>

                {/* Bar visualization */}
                <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${stat.percentage * 2.5}%` }}
                  />
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="leading-relaxed">{stat.desc}</p>
                    <span className="text-cyan-400 font-medium whitespace-nowrap">
                      Nạn nhân chủ yếu: {stat.victim}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Chart 2: VirusTotal Engine Detection Spectrum */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-400">TRƯỜNG HỢP 1: CŨ & ĐÃ NHẬN DẠNG</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">68/90 Hãng</span>
          </div>
          <h4 className="text-sm font-bold text-white">Mã độc đã có Chữ ký (Signature)</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mã độc quen thuộc, đã phát tán trước đó. Đa số các hãng như Bkav, Kaspersky, Microsoft đều đã nhận diện và đưa vào danh sách đen.
          </p>
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Phát hiện dễ dàng</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400">TRƯỜNG HỢP 2: NGUY CẤP ZERO-DAY</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">2 - 3/90 Hãng</span>
          </div>
          <h4 className="text-sm font-bold text-white">Mã độc Mới Nổi / Đa Hình</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Chỉ 2-3 hãng bắt được qua AI/heuristic trong 24 giờ đầu. <strong className="text-amber-300">Không cần chờ đa số!</strong> Có bất kỳ cảnh báo uy tín nào cũng phải dừng lại ngay.
          </p>
          <div className="text-xs font-mono text-amber-400 flex items-center gap-1.5 pt-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Báo động đỏ sớm</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-400">TRƯỜNG HỢP 3: BẪY MỚI LẬP</span>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">0/90 Hãng</span>
          </div>
          <h4 className="text-sm font-bold text-white">0/90 Vẫn Có Thể Là Độc Hại!</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Domain mới mua 2 tiếng trước, chưa có ai báo cáo. 0/90 chỉ nghĩa là "chưa bị bắt", không đồng nghĩa là an toàn tuyệt đối. Phải soi cấu trúc tên miền!
          </p>
          <div className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5" />
            <span>Cần soi thêm urlscan.io</span>
          </div>
        </div>
      </div>

      {/* Smart Filter & Threat Matrix Cards */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Filter className="w-5 h-5 text-cyan-400" />
              Bộ Lọc Dữ Liệu Thông Minh: Tra Cứu Các Thủ Thuật Độc Hại
            </h3>
            <p className="text-xs text-slate-400">Lọc theo danh mục, kênh phát tán hoặc cấp độ nguy hiểm</p>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm thủ thuật, tên file..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Filter Controls (Functional Button Tabs) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {(['ALL', 'URL', 'FILE'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'Tất cả loại' : cat === 'URL' ? 'Đường link (URL)' : 'Tệp tin (File)'}
              </button>
            ))}
          </div>

          {/* Vector Selector */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 px-1 hidden sm:inline">Kênh:</span>
            <select
              value={selectedVector}
              onChange={(e) => setSelectedVector(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">Tất cả kênh phát tán</option>
              <option value="EMAIL_INVOICE">Email hóa đơn / Hợp đồng</option>
              <option value="JOB_CV">CV xin việc / Ứng tuyển</option>
              <option value="PIRATED_SOFTWARE">Phần mềm crack / Lậu</option>
              <option value="CLOUD_DRIVE_PHISHING">Link Drive / OneDrive giả</option>
              <option value="ZALO_TELEGRAM_QR">Zalo / Telegram / Mã QR</option>
            </select>
          </div>

          {/* Level Selector */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 px-1 hidden sm:inline">Cấp độ:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="ALL">Tất cả cấp độ</option>
              <option value="CRITICAL">Cực kỳ nguy cấp</option>
              <option value="HIGH">Nguy hiểm cao</option>
              <option value="MEDIUM">Trung bình</option>
            </select>
          </div>

          {(selectedCategory !== 'ALL' || selectedVector !== 'ALL' || selectedLevel !== 'ALL' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSelectedVector('ALL');
                setSelectedLevel('ALL');
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 hover:underline px-2 py-1"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs text-slate-400 font-mono">
          Hiển thị {filteredThreats.length} thủ thuật ngụy trang đã được nhận diện
        </div>

        {/* Threat Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredThreats.map((threat) => (
            <div
              key={threat.id}
              onClick={() => setInspectedItem(threat)}
              className="group bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Meta line without pills */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 font-medium text-slate-300">
                    {threat.category === 'URL' ? (
                      <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    ) : (
                      <FileCode className="w-3.5 h-3.5 text-purple-400" />
                    )}
                    <span>{threat.category === 'URL' ? 'Địa chỉ Web (URL)' : 'Tệp tin độc hại'}</span>
                  </div>
                  <span className="font-mono text-amber-400 tabular-nums">
                    {threat.vietnamPrevalence}% gặp ở VN
                  </span>
                </div>

                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {threat.name}
                </h4>

                <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 truncate">
                  {threat.sampleName}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {threat.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Thực tế tại Việt Nam</span>
                <span className="text-cyan-400 font-medium group-hover:underline flex items-center gap-1">
                  Mổ xẻ chi tiết &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison of Free & Legal Security Tools in Curriculum */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">
            Bảng Tra Cứu Công Cụ Rà Quét Miễn Phí & Hợp Pháp
          </h3>
          <p className="text-xs text-slate-400">
            5 công cụ chủ chốt được VNCERT và các chuyên gia bảo mật khuyến nghị sử dụng hàng ngày
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPARISON_TOOLS.map((tool, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">{tool.name}</h4>
                  <span className="text-xs font-mono text-slate-400">{tool.site}</span>
                </div>
                <div className="text-xs text-cyan-400 font-medium">{tool.type}</div>
                <p className="text-xs text-slate-300 leading-relaxed">{tool.bestFor}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-emerald-400 font-medium flex items-center gap-1">
                  <span>Ưu điểm:</span>
                  <span className="text-slate-300 font-normal">{tool.pros}</span>
                </div>
                <div className="text-amber-400 font-medium flex items-center gap-1">
                  <span>Lưu ý:</span>
                  <span className="text-slate-400 font-normal">{tool.caution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspection Modal for Selected Threat */}
      {inspectedItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span>KỸ THUẬT: {inspectedItem.technique}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-cyan-400">{inspectedItem.vietnamPrevalence}% tần suất tại VN</span>
                </div>
                <h3 className="text-xl font-bold text-white">{inspectedItem.name}</h3>
              </div>
              <button
                onClick={() => setInspectedItem(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400 text-xs font-semibold">TÊN MẪU TIÊU BIỂU</div>
                <div className="font-mono text-cyan-300 break-all">{inspectedItem.sampleName}</div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-200">Cách ngụy trang đánh lừa mắt thường:</div>
                <p className="text-slate-300 leading-relaxed bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                  {inspectedItem.realDisguise}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-rose-300">Hành vi thật sự khi kích hoạt (Actual Payload):</div>
                <p className="text-slate-300 leading-relaxed bg-rose-950/20 p-3 rounded-lg border border-rose-900/30">
                  {inspectedItem.actualPayload}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-amber-300">Vụ việc thực tế tại Việt Nam:</div>
                <p className="text-slate-300 leading-relaxed bg-amber-950/20 p-3 rounded-lg border border-amber-900/30">
                  {inspectedItem.vietnamRealCase}
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-emerald-300">Biện pháp phòng thủ & Khuyến nghị SOP:</div>
                <p className="text-slate-300 leading-relaxed bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/30">
                  {inspectedItem.defenseRecommendation}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-800">
              <button
                onClick={() => setInspectedItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
              >
                Đóng phân tích
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
