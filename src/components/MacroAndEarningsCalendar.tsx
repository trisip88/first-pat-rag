import React from 'react';
import { EarningsItem, MacroIndicator } from '../types';

interface MacroAndEarningsCalendarProps {
  earnings: EarningsItem[];
  macros: MacroIndicator[];
  onSelectSymbol: (symbol: string) => void;
  onOpenCalendarModal: (type: 'earnings' | 'macro') => void;
}

export const MacroAndEarningsCalendar: React.FC<MacroAndEarningsCalendarProps> = ({
  earnings,
  macros,
  onSelectSymbol,
  onOpenCalendarModal,
}) => {
  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Earnings Calendar Module (6 Cols) */}
        <div className="lg:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 sm:p-5 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E222D] border border-[#2A2E39] flex items-center justify-center text-[#2962ff]">
                <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Upcoming Earnings Calendar</h3>
                <p className="text-xs text-[#787B86]">Key corporate disclosures &amp; consensus expectations</p>
              </div>
            </div>
            <button
              onClick={() => onOpenCalendarModal('earnings')}
              className="text-xs text-[#2962ff] hover:text-[#b6c4ff] hover:underline transition-colors font-medium"
            >
              Full Calendar
            </button>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            {earnings.slice(0, 4).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectSymbol(item.symbol)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-[#1E222D] border border-[#2A2E39]/60 hover:bg-[#2A2E39]/70 hover:border-[#2962FF]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 rounded bg-[#131722] border border-[#2A2E39] font-mono text-xs font-bold text-white group-hover:text-[#2962ff] transition-colors">
                    {item.symbol}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-white block group-hover:text-[#b6c4ff] transition-colors">
                      {item.company}
                    </span>
                    <span className="text-[11px] text-[#787B86]">{item.timing}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-[#50535E] block">
                    {item.isCompleted ? 'EPS Estimate' : 'EPS Consensus'}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      item.isCompleted ? 'text-[#F23645]' : 'text-white'
                    }`}
                  >
                    {item.consensusEps}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Economic Indicators Macro Calendar (6 Cols) */}
        <div className="lg:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 sm:p-5 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1E222D] border border-[#2A2E39] flex items-center justify-center text-[#66dabf]">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Global Macro Calendar</h3>
                <p className="text-xs text-[#787B86]">Central bank decisions, CPI &amp; labour metrics</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1E222D] border border-[#2A2E39]/60 px-2 py-0.5 rounded text-[10px] font-mono text-[#787B86]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F23645]" />
              <span>High Volatility Flag</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-3">
            {macros.slice(0, 3).map((m) => (
              <div
                key={m.id}
                className="p-2.5 rounded-lg bg-[#1E222D] border border-[#2A2E39]/60 hover:bg-[#2A2E39]/70 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded bg-[#131722] border border-[#2A2E39] font-mono text-[10px] text-white font-bold">
                      {m.currency}
                    </span>
                    <span className="text-xs font-semibold text-white">{m.title}</span>
                    <div
                      className={`flex gap-0.5 ${
                        m.impact === 'Extreme' ? 'text-[#F23645]' : 'text-[#66dabf]'
                      }`}
                    >
                      {Array.from({ length: m.volatilityPips }).map((_, i) => (
                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
                      ))}
                    </div>
                  </div>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      m.impact === 'Extreme' ? 'text-[#2962ff]' : 'text-[#787B86]'
                    }`}
                  >
                    {m.countdown}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[#787B86] font-mono text-[11px]">
                  <span>Forecast: {m.forecast}</span>
                  <span>Previous: {m.previous}</span>
                  <span
                    className={`font-semibold ${
                      m.impact === 'Extreme' ? 'text-[#F23645]' : 'text-white'
                    }`}
                  >
                    Impact: {m.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-3 border-t border-[#2A2E39]/40 flex items-center justify-between text-[#787B86] text-xs">
            <span>Global Inflation Index: Moderating (-0.3% QoQ)</span>
            <button
              onClick={() => onOpenCalendarModal('macro')}
              className="text-[#2962ff] hover:text-[#b6c4ff] transition-colors font-medium flex items-center gap-0.5"
            >
              <span>Economic Indicators Heatmap</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
