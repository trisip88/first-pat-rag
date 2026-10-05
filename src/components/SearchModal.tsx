import React, { useState, useEffect } from 'react';
import { searchAllSymbols } from '../data/mockMarketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectSymbol }) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('All');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filteredSymbols = searchAllSymbols.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesQuery && matchesType;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[#2A2E39] gap-3">
          <span className="material-symbols-outlined text-[20px] text-[#787B86]">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company name, crypto, forex..."
            autoFocus
            className="flex-1 bg-transparent text-white placeholder-[#50535E] text-sm focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787B86] hover:text-white text-xs p-1"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#1E222D] text-[#787B86] border border-[#2A2E39]">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-[#787B86] hover:text-white p-1 rounded transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[#2A2E39]/60 bg-[#0a0e19]/40 overflow-x-auto no-scrollbar">
          {['All', 'Stock', 'Crypto', 'Forex', 'Index', 'Futures', 'Commodity'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterType === type
                  ? 'bg-[#2962ff] text-white font-semibold'
                  : 'bg-[#1E222D] text-[#787B86] hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto divide-y divide-[#2A2E39]/40 p-2 flex-1">
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((item) => (
              <div
                key={item.symbol}
                onClick={() => {
                  onSelectSymbol(item.symbol);
                  onClose();
                }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E222D] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1E222D] border border-[#2A2E39] flex items-center justify-center font-mono text-xs font-bold text-white group-hover:text-[#2962ff] transition-colors">
                    {item.symbol.slice(0, 4)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm group-hover:text-[#b6c4ff] transition-colors">
                        {item.symbol}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-[#1E222D] text-[10px] text-[#787B86] uppercase font-mono">
                        {item.exchange}
                      </span>
                      <span className="text-[10px] text-[#50535E] font-medium">• {item.type}</span>
                    </div>
                    <p className="text-xs text-[#787B86] mt-0.5">{item.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-sm font-semibold text-white block">{item.price}</span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      item.change.startsWith('+') ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-[#787B86]">
              <span className="material-symbols-outlined text-4xl mb-2 text-[#50535E]">search_off</span>
              <p className="text-sm">No market symbols found matching &quot;{query}&quot;</p>
              <p className="text-xs text-[#50535E] mt-1">Try searching for AAPL, TSLA, BTCUSD, or SPX</p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#0a0e19] border-t border-[#2A2E39] flex items-center justify-between text-[11px] text-[#50535E] font-mono">
          <span>Search index updated live</span>
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select symbol</span>
          </div>
        </div>
      </div>
    </div>
  );
};
