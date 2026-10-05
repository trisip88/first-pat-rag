import React, { useState } from 'react';
import { marketMoversActive, marketMoversGainers, marketMoversVolatile } from '../data/mockMarketData';
import { MoverItem } from '../types';

interface MoversModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const MoversModal: React.FC<MoversModalProps> = ({ isOpen, onClose, onSelectSymbol }) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'gainers' | 'volatile'>('all');
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  // Combine and deduplicate
  const allList: MoverItem[] = [
    ...marketMoversActive,
    ...marketMoversGainers,
    ...marketMoversVolatile,
  ];

  const uniqueList = allList.filter(
    (item, index, self) => index === self.findIndex((t) => t.symbol === item.symbol)
  );

  const displayedList = uniqueList.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sector.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'gainers') return item.isPositive;
    if (filter === 'volatile') return Math.abs(parseFloat(item.changePercent)) > 10;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-4xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2E39] bg-[#171b26]">
          <div>
            <h3 className="text-base font-bold text-white">Market Dynamics &amp; Active Movers</h3>
            <p className="text-xs text-[#787B86]">Institutional volume leaders, session gainers &amp; high beta outliers</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#2A2E39] text-[#787B86] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-[#2A2E39]/60 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a0e19]/40">
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[18px] text-[#787B86]">search</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by symbol or sector..."
              className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-[#50535E] focus:outline-none focus:border-[#2962FF]"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-[#1E222D] p-1 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'all' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              All Movers ({uniqueList.length})
            </button>
            <button
              onClick={() => setFilter('gainers')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'gainers' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Top Gainers
            </button>
            <button
              onClick={() => setFilter('volatile')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                filter === 'volatile' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              High Volatility
            </button>
          </div>
        </div>

        {/* Table of Movers */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[#50535E] text-[10px] font-semibold uppercase tracking-wider bg-[#0a0e19] sticky top-0 border-b border-[#2A2E39]/40">
                <th className="py-2.5 px-4">Symbol</th>
                <th className="py-2.5 px-4">Company Name</th>
                <th className="py-2.5 px-4">Sector / Category</th>
                <th className="py-2.5 px-4 text-right">Volume</th>
                <th className="py-2.5 px-4 text-right">Last Price</th>
                <th className="py-2.5 px-4 text-right">Session Chg</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E39]/30 font-mono text-xs">
              {displayedList.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    onSelectSymbol(item.symbol);
                    onClose();
                  }}
                  className="hover:bg-[#1E222D]/70 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <span className="font-bold text-white group-hover:text-[#2962ff] transition-colors">
                      {item.symbol}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans text-white group-hover:text-[#b6c4ff] transition-colors">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 font-sans text-[#787B86]">{item.sector}</td>
                  <td className="py-3 px-4 text-right text-[#787B86]">{item.volume}</td>
                  <td className="py-3 px-4 text-right text-white font-semibold">{item.price}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`px-1.5 py-0.5 rounded font-bold ${
                        item.isPositive ? 'text-[#089981] bg-[rgba(8,153,129,0.15)]' : 'text-[#F23645] bg-[rgba(242,54,69,0.15)]'
                      }`}
                    >
                      {item.changePercent}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#171b26] border-t border-[#2A2E39] flex items-center justify-between text-xs text-[#787B86]">
          <span>Click any row to load real-time chart and telemetry</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2A2E39] hover:bg-[#353945] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
