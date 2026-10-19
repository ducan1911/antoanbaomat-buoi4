import { useState } from 'react';
import { GAME_QUESTIONS } from '../data/lessonData';
import { GameQuestion } from '../types/security';
import { Trophy, Award, Zap, RotateCcw, CheckCircle2, XCircle, ShieldAlert, Sparkles, AlertTriangle } from 'lucide-react';

export function InteractiveGames() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const currentQ: GameQuestion = GAME_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentQ.correctOptionIndex;
    if (isCorrect) {
      const bonus = streak * 25;
      setScore(prev => prev + 100 + bonus);
      setStreak(prev => prev + 1);
      setUserAnswers(prev => [...prev, true]);
    } else {
      setStreak(0);
      setUserAnswers(prev => [...prev, false]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < GAME_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setIsGameOver(false);
    setUserAnswers([]);
  };

  const getRank = () => {
    const correctCount = userAnswers.filter(Boolean).length;
    if (correctCount === GAME_QUESTIONS.length) {
      return {
        title: 'Chuyên Viên Phân Tích SOC Cấp Cao',
        badge: 'Huy Hiệu Vàng An Ninh Mạng',
        color: 'text-amber-400',
        desc: 'Tuyệt vời! Bạn có thị giác an ninh mạng sắc bén, nhận diện hoàn hảo mọi thủ thuật lừa đảo tinh vi tại Việt Nam.'
      };
    } else if (correctCount >= 4) {
      return {
        title: 'Chiến Binh Phòng Thủ Mạng Thực Thụ',
        badge: 'Huy Hiệu Bạc Tác Chiến',
        color: 'text-cyan-400',
        desc: 'Rất tốt! Bạn nắm vững các nguyên tắc cơ bản và phản xạ tốt với các bẫy đuôi kép và macro độc.'
      };
    } else {
      return {
        title: 'Tân Binh Đang Huấn Luyện SOC',
        badge: 'Huy Hiệu Đồng Khởi Nghiệp',
        color: 'text-slate-300',
        desc: 'Cần ôn luyện thêm! Hãy đọc kỹ Sổ tay Tác chiến 5 Bước để tránh mắc bẫy Typosquatting và Subdomain.'
      };
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <span>ĐẤU TRƯỜNG THỰC TẬP SINH SOC</span>
            <span aria-hidden="true">·</span>
            <span>THỬ THÁCH NHẬN DIỆN MỐI NGUY HIỂM</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
            Trò Chơi Tương Tác: Thám Tử Soi Bẫy Lừa Đảo & Tệp Độc
          </h3>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Đặt mình vào vai một chuyên viên an ninh mạng (SOC Analyst) bảo vệ công ty trước các đợt tấn công giả mạo tinh vi.
          </p>
        </div>

        {/* Score & Streak Counter */}
        <div className="flex items-center gap-4 p-3 rounded-lg bg-slate-950 border border-slate-800 self-start md:self-auto">
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-mono block">ĐIỂM SỐ</span>
            <span className="font-mono text-base font-bold text-cyan-400 tabular-nums">{score}</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-mono block">CHUỖI ĐÚNG</span>
            <span className="font-mono text-base font-bold text-amber-400 flex items-center gap-0.5 tabular-nums">
              <Zap className="w-3.5 h-3.5 fill-current" />
              {streak}x
            </span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Câu hỏi {currentQuestionIndex + 1} / {GAME_QUESTIONS.length}</span>
              <span className="font-mono text-cyan-400">{currentQ.type === 'URL' ? 'Địa chỉ Web' : 'Tệp Tin'}</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / GAME_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scenario Card */}
          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-base font-bold text-white">{currentQ.title}</h4>
              <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/60">
                Thủ thuật: {currentQ.technique}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {currentQ.scenario}
            </p>

            <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-xs text-amber-300 break-all">
              {currentQ.subject}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-400">
              HÃY ĐƯA RA ĐÁNH GIÁ & QUYẾT ĐỊNH XỬ LÝ CỦA BẠN:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctOptionIndex;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold shadow-md';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950 border-slate-900 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="font-mono text-xs w-5 h-5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Debriefing when answered */}
          {isAnswered && (
            <div className={`p-5 rounded-xl border space-y-3 ${
              selectedOption === currentQ.correctOptionIndex
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/20 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedOption === currentQ.correctOptionIndex ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>CHÍNH XÁC! (+100 ĐIỂM {streak > 1 ? `+ ${streak * 25} STREAK` : ''})</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span>CHƯA ĐÚNG! HÃY XEM GIẢI THÍCH KỸ THUẬT:</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-2 border-t border-slate-800/80 text-xs text-amber-300 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span className="leading-relaxed"><strong>Mẹo Tác Chiến:</strong> {currentQ.tacticalTip}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-semibold text-xs transition-colors"
                >
                  {currentQuestionIndex < GAME_QUESTIONS.length - 1 ? 'Thử Thách Tiếp Theo &rarr;' : 'Xem Kết Quả & Chứng Nhận'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Game Over Screen */
        <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center mx-auto text-cyan-400 shadow-lg">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h4 className="text-2xl font-extrabold text-white">
              Hoàn Thành Khóa Huấn Luyện Bài 4!
            </h4>
            <div className={`text-lg font-bold ${getRank().color}`}>
              {getRank().title}
            </div>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {getRank().desc}
            </p>
          </div>

          {/* Score Summary */}
          <div className="max-w-xs mx-auto p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-2 gap-4 text-center">
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">TỔNG ĐIỂM</span>
              <span className="text-2xl font-mono font-bold text-cyan-400 tabular-nums">{score}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono block">TỶ LỆ ĐÚNG</span>
              <span className="text-2xl font-mono font-bold text-emerald-400 tabular-nums">
                {userAnswers.filter(Boolean).length} / {GAME_QUESTIONS.length}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-lg bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 text-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi Lại & Luyện Tập Thêm</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
