interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSopModal: () => void;
}

export function Header({ activeTab, setActiveTab, onOpenSopModal }: HeaderProps) {
  const navItems = [
    { id: 'overview', label: 'Tổng Quan' },
    { id: 'radar', label: 'Bộ Lọc & Biểu Đồ' },
    { id: 'simulators', label: 'Mô Phỏng Quét' },
    { id: 'hashlab', label: 'Phòng Lab Hash' },
    { id: 'sop', label: 'Công Thức Cố Định' },
    { id: 'games', label: 'Thử Thách SOC' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('overview')}
          className="text-left font-bold text-lg tracking-tight text-white hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          <span>CYBERSEC LAB · BÀI 4</span>
        </button>

        {/* Zone 2: 4-6 concise text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-cyan-400 border-cyan-400 font-semibold'
                    : 'border-transparent text-slate-300 hover:text-white hover:border-slate-500'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSopModal}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            Sổ Tay Tác Chiến (SOP)
          </button>
        </div>
      </div>

      {/* Mobile nav drawer strip */}
      <div className="md:hidden flex overflow-x-auto gap-2 px-4 py-2 border-t border-slate-900 bg-slate-950 no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`text-xs px-2.5 py-1 rounded whitespace-nowrap shrink-0 ${
              activeTab === item.id ? 'bg-cyan-500/20 text-cyan-300 font-medium' : 'text-slate-400'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
