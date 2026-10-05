import React, { useState } from 'react';
import { biggestCompanies, dominantCryptos, macroIndicators } from '../data/mockMarketData';

interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  screenerType: string;
  onSelectSymbol: (symbol: string) => void;
}

export const ScreenerModal: React.FC<ScreenerModalProps> = ({
  isOpen,
  onClose,
  screenerType,
  onSelectSymbol,
}) => {
  const [activeTab, setActiveTab] = useState(
    screenerType === 'crypto' ? 'crypto' : screenerType === 'macro' ? 'macro' : 'stocks'
  );
  const [filterSearch, setFilterSearch] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-5xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171b26]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2962ff] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">filter_alt</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Institutional Market Screener &amp; Filters</h3>
              <p className="text-xs text-[#787B86]">Real-time multi-asset scanner with technical indicators &amp; ratios</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#2A2E39] text-[#787B86] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tab Controls & Filter */}
        <div className="px-6 py-3 border-b border-[#2A2E39]/60 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a0e19]/40">
          <div className="flex items-center gap-1.5 bg-[#1E222D] p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('stocks')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'stocks' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Equities Screener
            </button>
            <button
              onClick={() => setActiveTab('crypto')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'crypto' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Digital Assets
            </button>
            <button
              onClick={() => setActiveTab('macro')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                activeTab === 'macro' ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
              }`}
            >
              Macro Heatmap
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-[#787B86]">search</span>
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Search in screener..."
              className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder-[#50535E] focus:outline-none focus:border-[#2962FF]"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'stocks' && (
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#50535E] text-[10px] uppercase font-sans font-semibold border-b border-[#2A2E39]/40">
                  <th className="py-2.5 px-3">Rank / Symbol</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Sector</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">24h Chg</th>
                  <th className="py-2.5 px-3 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E39]/20">
                {biggestCompanies
                  .filter((c) => c.name.toLowerCase().includes(filterSearch.toLowerCase()) || c.symbol.toLowerCase().includes(filterSearch.toLowerCase()))
                  .map((c) => (
                    <tr
                      key={c.rank}
                      onClick={() => {
                        const ticker = c.symbol.match(/\(([^)]+)\)/)?.[1] || 'AAPL';
                        onSelectSymbol(ticker);
                        onClose();
                      }}
                      className="hover:bg-[#1E222D] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 text-white font-bold">{c.rank}. {c.symbol}</td>
                      <td className="py-3 px-3 text-white font-sans">{c.name}</td>
                      <td className="py-3 px-3 text-[#787B86] font-sans">{c.sector || 'Global Equities'}</td>
                      <td className="py-3 px-3 text-right text-white font-semibold">{c.lastPrice}</td>
                      <td className={`py-3 px-3 text-right font-bold ${c.isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {c.changePercent}
                      </td>
                      <td className="py-3 px-3 text-right text-[#787B86]">{c.marketCap}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'crypto' && (
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="text-[#50535E] text-[10px] uppercase font-sans font-semibold border-b border-[#2A2E39]/40">
                  <th className="py-2.5 px-3">Asset</th>
                  <th className="py-2.5 px-3">Name</th>
                  <th className="py-2.5 px-3 text-right">Price</th>
                  <th className="py-2.5 px-3 text-right">24h Chg</th>
                  <th className="py-2.5 px-3 text-right">Circulating Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E39]/20">
                {dominantCryptos
                  .filter((cr) => cr.name.toLowerCase().includes(filterSearch.toLowerCase()) || cr.symbol.toLowerCase().includes(filterSearch.toLowerCase()))
                  .map((cr) => (
                    <tr
                      key={cr.symbol}
                      onClick={() => {
                        const sym = cr.symbol.split('/')[0].trim() + 'USD';
                        onSelectSymbol(sym);
                        onClose();
                      }}
                      className="hover:bg-[#1E222D] cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-3 text-white font-bold">{cr.symbol}</td>
                      <td className="py-3 px-3 text-white font-sans">{cr.name}</td>
                      <td className="py-3 px-3 text-right text-white font-semibold">{cr.price}</td>
                      <td className={`py-3 px-3 text-right font-bold ${cr.isPositive ? 'text-[#089981]' : 'text-[#F23645]'}`}>
                        {cr.changePercent}
                      </td>
                      <td className="py-3 px-3 text-right text-[#787B86]">{cr.marketCap}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'macro' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {macroIndicators.map((m) => (
                <div key={m.id} className="p-4 rounded-xl bg-[#1E222D] border border-[#2A2E39] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#131722] text-[#2962ff] font-bold">
                        {m.currency}
                      </span>
                      <span className="text-xs font-mono text-[#787B86]">{m.countdown}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-2">{m.title}</h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#2A2E39]/50 flex items-center justify-between text-xs font-mono text-[#787B86]">
                    <span>Forecast: <strong className="text-white">{m.forecast}</strong></span>
                    <span>Previous: <strong className="text-white">{m.previous}</strong></span>
                    <span className="px-2 py-0.5 rounded bg-[#F23645]/20 text-[#F23645] font-bold text-[10px]">
                      {m.impact} Impact
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#171b26] border-t border-[#2A2E39] flex items-center justify-between text-xs text-[#787B86]">
          <span>Institutional data feed active (15s latency bypass)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2962ff] text-white font-semibold text-xs transition-colors hover:bg-[#004ee8]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
