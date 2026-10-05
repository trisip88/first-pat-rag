import React from 'react';
import { MoverItem, MoversTab } from '../types';

interface MarketMoversCardProps {
  currentTab: MoversTab;
  setCurrentTab: (tab: MoversTab) => void;
  activeItems: MoverItem[];
  gainersItems: MoverItem[];
  volatileItems: MoverItem[];
  onSelectSymbol: (symbol: string) => void;
  onViewAllMovers: () => void;
}

export const MarketMoversCard: React.FC<MarketMoversCardProps> = ({
  currentTab,
  setCurrentTab,
  activeItems,
  gainersItems,
  volatileItems,
  onSelectSymbol,
  onViewAllMovers,
}) => {
  const displayItems =
    currentTab === 'active'
      ? activeItems.slice(0, 5)
      : currentTab === 'gainers'
      ? gainersItems.slice(0, 5)
      : volatileItems.slice(0, 5);

  return (
    <div className="lg:col-span-4 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-3.5 flex flex-col justify-between shadow-sm">
      <div>
        {/* Tab Headers */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-1 bg-[#1E222D] border border-[#2A2E39]/60 p-1 rounded-lg w-full">
            <button
              onClick={() => setCurrentTab('active')}
              className={`flex-1 py-1 text-center text-xs rounded transition-all font-medium ${
                currentTab === 'active'
                  ? 'bg-[#2A2E39] text-white font-semibold shadow-sm'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Most Active
            </button>
            <button
              onClick={() => setCurrentTab('gainers')}
              className={`flex-1 py-1 text-center text-xs rounded transition-all font-medium ${
                currentTab === 'gainers'
                  ? 'bg-[#2A2E39] text-white font-semibold shadow-sm'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setCurrentTab('volatile')}
              className={`flex-1 py-1 text-center text-xs rounded transition-all font-medium ${
                currentTab === 'volatile'
                  ? 'bg-[#2A2E39] text-white font-semibold shadow-sm'
                  : 'text-[#787B86] hover:text-white'
              }`}
            >
              Volatility
            </button>
          </div>
        </div>

        {/* Sub-header Meta */}
        <div className="flex items-center justify-between px-2 py-1 text-[#50535E] text-[10px] font-semibold uppercase tracking-wider">
          <span>Symbol / Sector</span>
          <span>Price / Session</span>
        </div>

        {/* Mover Rows Container */}
        <div className="flex flex-col gap-1 mt-1">
          {displayItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectSymbol(item.symbol)}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1E222D]/70 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#1E222D] border border-[#2A2E39]/60 flex items-center justify-center font-mono text-[11px] font-bold text-white group-hover:text-[#2962ff] transition-colors">
                  {item.symbol}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white leading-tight font-semibold group-hover:text-[#b6c4ff] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[11px] text-[#787B86]">
                    {item.sector} • {item.volume}
                  </span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="font-mono text-xs text-white font-semibold">{item.price}</span>
                <span
                  className={`font-mono text-[11px] px-1.5 py-0.5 rounded font-bold mt-0.5 ${
                    item.isPositive
                      ? 'text-[#089981] bg-[rgba(8,153,129,0.15)]'
                      : 'text-[#F23645] bg-[rgba(242,54,69,0.15)]'
                  }`}
                >
                  {item.changePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onViewAllMovers}
        className="block w-full text-center mt-3 pt-2.5 pb-2 bg-[#1E222D] hover:bg-[#2A2E39] border border-[#2A2E39]/60 text-[#787B86] hover:text-white text-xs rounded-lg transition-colors font-medium"
      >
        View all 50+ active movers →
      </button>
    </div>
  );
};
