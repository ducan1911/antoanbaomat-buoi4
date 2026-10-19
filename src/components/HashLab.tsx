import { useState, useEffect } from 'react';
import { Hash, FileText, Upload, Copy, Check, Terminal, ShieldAlert, Sparkles, Download } from 'lucide-react';

export function HashLab() {
  const [textA, setTextA] = useState('HoaDon_ThanhToan_VND_5000000.pdf');
  const [textB, setTextB] = useState('HoaDon_ThanhToan_VND_5000001.pdf');
  const [hashA, setHashA] = useState('');
  const [hashB, setHashB] = useState('');

  // Local file upload hash state
  const [userFileName, setUserFileName] = useState<string | null>(null);
  const [userFileSize, setUserFileSize] = useState<number | null>(null);
  const [userFileHash, setUserFileHash] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedEicar, setCopiedEicar] = useState(false);

  // EICAR standard string
  const EICAR_STRING = `X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*`;

  // Compute SHA-256 for string
  async function computeSha256(str: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Update hashes for Avalanche effect
  useEffect(() => {
    computeSha256(textA).then(setHashA);
  }, [textA]);

  useEffect(() => {
    computeSha256(textB).then(setHashB);
  }, [textB]);

  // Handle local file drop/select
  const handleFileUpload = async (file: File) => {
    setUserFileName(file.name);
    setUserFileSize(file.size);
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setUserFileHash(hex);
  };

  const handleDownloadEicar = () => {
    const blob = new Blob([EICAR_STRING], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eicar_test_sample.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <span>THỰC HÀNH 2 · CƠ SỞ KỸ THUẬT MÃ BĂM</span>
          <span aria-hidden="true">·</span>
          <span>PHÒNG THÍ NGHIỆM HASH (MD5/SHA256)</span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
          Tính Toán Mã Băm Thực Tế & Hiệu Ứng Thác Lũ (Avalanche Effect)
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Mã băm (Hash) là "dấu vân tay kỹ thuật số" duy nhất đại diện cho nội dung tệp tin. Chỉ cần thay đổi 1 dấu chấm, mã băm sẽ biến đổi hoàn toàn! Tra mã băm trên VirusTotal cho phép kiểm tra file độc mà không làm lộ dữ liệu kinh doanh mật của công ty.
        </p>
      </div>

      {/* Part 1: Interactive Real-Time Client-Side File Hashing */}
      <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              Tính Mã SHA-256 Cho Tệp Tin Của Bạn Ngay Trên Trình Duyệt
            </h4>
            <p className="text-xs text-slate-400">
              Chạy 100% bằng Web Crypto API nội bộ trên máy bạn — không có bất kỳ byte nào tải lên internet.
            </p>
          </div>
        </div>

        <div className="border-2 border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-colors">
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0]);
              }
            }}
          />
          <label htmlFor="file-input" className="cursor-pointer space-y-2 block">
            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Nhấp để chọn tệp hoặc kéo thả tệp vào đây
            </div>
            <div className="text-[11px] text-slate-500">
              Hỗ trợ mọi định dạng: .pdf, .docx, .exe, .zip...
            </div>
          </label>
        </div>

        {userFileHash && (
          <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-white">
                Tệp: <span className="text-cyan-300">{userFileName}</span> ({userFileSize} bytes)
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(userFileHash);
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Đã sao chép' : 'Sao chép Hash'}</span>
              </button>
            </div>
            <div className="font-mono text-cyan-400 break-all p-2 rounded bg-slate-950 border border-slate-800">
              SHA-256: {userFileHash}
            </div>
            <div className="text-[11px] text-slate-400">
              &rarr; Thao tác tiếp theo: Mở <span className="text-white font-medium">virustotal.com</span> &rarr; Thẻ <strong>Search</strong> &rarr; Dán mã hash trên để tra cứu lịch sử phát hiện mà không cần upload file!
            </div>
          </div>
        )}
      </div>

      {/* Part 2: Interactive Avalanche Effect (Hiệu ứng Thác Lũ) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Thử Nghiệm Hiệu Ứng Thác Lũ (Avalanche Effect)
            </h4>
            <p className="text-xs text-slate-400">
              Sửa 1 ký tự bất kỳ ở chuỗi A hoặc B để thấy toàn bộ 64 ký tự mã băm biến đổi hoàn toàn!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Box A */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-cyan-400">CHUỖI GỐC A (Tệp 1):</span>
            <input
              type="text"
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
            />
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-mono">MÃ SHA-256:</span>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 break-all border border-slate-800/80">
                {hashA}
              </div>
            </div>
          </div>

          {/* Box B */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400">CHUỖI BIẾN THỂ B (Tệp 2 - Khác chỉ 1 số):</span>
              <span className="text-[10px] text-amber-300">Khác chữ số cuối</span>
            </div>
            <input
              type="text"
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 font-mono focus:outline-none focus:border-amber-400"
            />
            <div className="space-y-1">
              <span className="text-[11px] text-slate-500 font-mono">MÃ SHA-256:</span>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-amber-300 break-all border border-slate-800/80">
                {hashB}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Ý nghĩa an ninh mạng:</strong> Kẻ tấn công cố tình thay đổi 1 byte trong mã độc để tạo ra <em>Polymorphic Malware</em> làm đổi mã hash nhằm né bộ lọc chữ ký tĩnh. Tuy nhiên, hành vi chạy ngầm trong Sandbox vẫn không đổi!
          </p>
        </div>
      </div>

      {/* Part 3: Windows PowerShell Command & EICAR Standard Test File */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* PowerShell Helper */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Lệnh PowerShell Lấy Hash Trên Windows Thật
            </h4>
            <button
              onClick={() => {
                navigator.clipboard.writeText('Get-FileHash "C:\\Users\\Downloads\\HoaDon.pdf" -Algorithm SHA256');
                setCopiedCmd(true);
                setTimeout(() => setCopiedCmd(false), 2000);
              }}
              className="text-xs text-cyan-400 hover:underline flex items-center gap-1"
            >
              {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCmd ? 'Đã chép' : 'Sao chép lệnh'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Giáo viên và học viên mở <strong>Windows PowerShell</strong> và gõ câu lệnh sau để lấy ngay mã băm mà không cần cài thêm phần mềm:
          </p>

          <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
            Get-FileHash -Algorithm SHA256 "ten_file.pdf"
          </pre>

          <div className="text-[11px] text-slate-500">
            Hoặc trên Windows: Chuột phải file &rarr; Properties (Thuộc tính) &rarr; Thẻ Hashes (nếu có 7-Zip).
          </div>
        </div>

        {/* EICAR Standard Antivirus Test Sample */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Tệp Thử Nghiệm An Toàn Chuẩn Châu Âu (EICAR)
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">100% VÔ HẠI</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Chuỗi ký tự do Viện Nghiên cứu An ninh Châu Âu ban hành. Mọi phần mềm diệt virus đều nhận diện chuỗi này là "Virus", nhưng thực chất hoàn toàn vô hại để phục vụ giảng dạy an toàn:
          </p>

          <pre className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto">
            {EICAR_STRING}
          </pre>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                navigator.clipboard.writeText(EICAR_STRING);
                setCopiedEicar(true);
                setTimeout(() => setCopiedEicar(false), 2000);
              }}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5"
            >
              {copiedEicar ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEicar ? 'Đã sao chép' : 'Sao chép chuỗi EICAR'}</span>
            </button>

            <button
              onClick={handleDownloadEicar}
              className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 hover:text-white flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải file eicar.txt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
