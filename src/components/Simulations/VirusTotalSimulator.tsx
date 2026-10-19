import { useState } from 'react';
import { VIRUSTOTAL_PRESETS } from '../../data/lessonData';
import { VirusTotalSample } from '../../types/security';
import { ShieldAlert, ShieldCheck, AlertTriangle, Scan, Copy, Check, FileWarning, Eye, RefreshCw } from 'lucide-react';

export function VirusTotalSimulator() {
  const [selectedSample, setSelectedSample] = useState<VirusTotalSample>(VIRUSTOTAL_PRESETS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleScan = (sample: VirusTotalSample) => {
    setIsScanning(true);
    setSelectedSample(sample);
    setTimeout(() => {
      setIsScanning(false);
    }, 800);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const isMalicious = selectedSample.detectionRatio.detected > 0;
  const ratioPercent = Math.round((selectedSample.detectionRatio.detected / selectedSample.detectionRatio.total) * 100);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>THỰC HÀNH 1 & 2 · CÔNG CỤ RÀ QUÉT TOÀN CẦU</span>
          <span aria-hidden="true">·</span>
          <span>GIẢ LẬP VIRUSTOTAL VỚI 70+ ĐỘNG CƠ DIỆT VIRUS</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Báo Cáo Phân Tích Đa Động Cơ VirusTotal
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Học cách đọc tỉ số phát hiện "x/90", kiểm tra chữ ký định dạng thật của file và hiểu lý do vì sao tỷ lệ 2/90 hay 0/90 cần xử lý đặc biệt.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 font-medium">Chọn một kịch bản rà quét điển hình trong giáo trình:</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {VIRUSTOTAL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleScan(preset)}
              className={`text-left p-3 rounded-lg border transition-all text-xs space-y-1.5 ${
                selectedSample.id === preset.id
                  ? 'bg-cyan-950/40 border-cyan-500/80 text-white shadow-md'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="font-semibold truncate">{preset.name}</div>
              <div className="flex items-center justify-between text-slate-400">
                <span>{preset.type === 'URL' ? 'Đường link' : 'Tệp tin'}</span>
                <span className={`font-mono font-bold ${
                  preset.detectionRatio.detected > 10
                    ? 'text-rose-400'
                    : preset.detectionRatio.detected > 0
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {preset.detectionRatio.detected}/{preset.detectionRatio.total}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Scan Report Canvas */}
      {isScanning ? (
        <div className="p-16 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <div className="text-sm text-slate-300 font-mono">
            Đang truy vấn 90 động cơ bảo mật (Bkav, Kaspersky, Microsoft Defender, CMC...)...
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className={`p-6 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-6 ${
            selectedSample.detectionRatio.detected >= 10
              ? 'bg-rose-950/20 border-rose-500/40'
              : selectedSample.detectionRatio.detected > 0
              ? 'bg-amber-950/20 border-amber-500/40'
              : 'bg-emerald-950/20 border-emerald-500/40'
          }`}>
            <div className="flex items-center gap-5">
              {/* Radial Dial Simulation */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center rounded-full bg-slate-950 border-4 border-slate-800 shadow-inner">
                <div className="text-center">
                  <div className={`text-lg font-bold font-mono ${
                    selectedSample.detectionRatio.detected >= 10
                      ? 'text-rose-400'
                      : selectedSample.detectionRatio.detected > 0
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}>
                    {selectedSample.detectionRatio.detected}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">/ 90</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">ĐỐI TƯỢNG PHÂN TÍCH</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs font-mono text-cyan-400">{selectedSample.type}</span>
                </div>
                <h4 className="text-lg md:text-xl font-bold text-white break-all">
                  {selectedSample.name}
                </h4>
                <div className="text-xs text-slate-300">
                  Phân loại phát hiện: <strong className="text-white">{selectedSample.threatClass}</strong>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 text-xs">
              <span className={`font-semibold px-3 py-1 rounded-md border ${
                selectedSample.detectionRatio.detected >= 10
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : selectedSample.detectionRatio.detected > 0
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              }`}>
                {selectedSample.detectionRatio.detected >= 10
                  ? 'CỰC KỲ NGUY HIỂM (ĐÃ LẬP CHỮ KÝ)'
                  : selectedSample.detectionRatio.detected > 0
                  ? 'BÁO ĐỘNG SỚM (ZERO-DAY / HEURISTIC)'
                  : 'CHƯA PHÁT HIỆN GẮN CỜ'}
              </span>
              <span className="text-slate-400 font-mono">
                Tỷ lệ cảnh báo: {ratioPercent}% engine
              </span>
            </div>
          </div>

          {/* File Signature Mismatch Warning (If applicable) */}
          {selectedSample.fileSignatureMismatch && (
            <div className="p-4 rounded-lg bg-rose-950/30 border border-rose-500/50 flex items-start gap-3 text-xs md:text-sm">
              <FileWarning className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-rose-200">
                  PHÁT HIỆN LỆCH CHỮ KÝ TỆP TIN (FILE SIGNATURE MISMATCH):
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Tên hiển thị bên ngoài là: <span className="text-amber-300 font-mono font-medium">{selectedSample.fileSignatureMismatch.displayed}</span>
                  , nhưng phần mềm VirusTotal đọc mã nhị phân bên trong và xác định đây là: <span className="text-rose-300 font-mono font-bold">{selectedSample.fileSignatureMismatch.actual}</span>!
                  Đây chính là kỹ thuật <strong>Đuôi file kép (Double extension)</strong> lừa mắt thường.
                </p>
              </div>
            </div>
          )}

          {/* Sample Hash Row */}
          {selectedSample.sampleHash && (
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-500 font-medium">MÃ BĂM ĐẠI DIỆN (SHA-256):</span>
                <div className="font-mono text-cyan-300 break-all text-xs">
                  {selectedSample.sampleHash}
                </div>
              </div>
              <button
                onClick={() => handleCopyHash(selectedSample.sampleHash!)}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5 whitespace-nowrap self-start sm:self-center"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Đã sao chép' : 'Sao chép Hash'}</span>
              </button>
            </div>
          )}

          {/* Behavior Tags & Did you know */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-400">NHÃN HÀNH VI (BEHAVIOR TAGS):</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedSample.behaviorTags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 space-y-1">
              <div className="text-xs font-bold text-cyan-400">BÀI HỌC CỐT LÕI CHO HỌC VIÊN:</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedSample.didYouKnow}
              </p>
            </div>
          </div>

          {/* Engine Breakdown Table */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>KẾT QUẢ TỪ CÁC HÃNG BẢO MẬT HÀNG ĐẦU & VIỆT NAM (BKAV, CMC, KASPERSKY...):</span>
              <span className="text-slate-500 font-mono text-xs">Engine Version: 2026.04</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {selectedSample.topEngines.map((engine, idx) => {
                const isEngMalicious = engine.result === 'Malicious' || engine.result === 'Phishing';
                return (
                  <div
                    key={idx}
                    className="p-2.5 rounded bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300 font-medium">{engine.name}</span>
                    <span className={`font-mono font-semibold flex items-center gap-1 ${
                      isEngMalicious ? 'text-rose-400' : 'text-emerald-400'
                    }`}>
                      {isEngMalicious ? <AlertTriangle className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                      <span>{engine.result}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
