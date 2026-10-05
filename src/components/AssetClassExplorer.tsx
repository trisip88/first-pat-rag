import React from 'react';
import {
  BiggestCompany,
  CommodityFuture,
  DefiProtocol,
  DominantCrypto,
  ForexPair,
  SovereignYield,
  YieldTenor,
} from '../types';

interface AssetClassExplorerProps {
  companies: BiggestCompany[];
  cryptos: DominantCrypto[];
  protocols: DefiProtocol[];
  commodities: CommodityFuture[];
  forex: ForexPair[];
  yields: YieldTenor[];
  sovereigns: SovereignYield[];
  onSelectSymbol: (symbol: string) => void;
  onOpenScreener: (category: string) => void;
}

export const AssetClassExplorer: React.FC<AssetClassExplorerProps> = ({
  companies,
  cryptos,
  protocols,
  commodities,
  forex,
  yields,
  sovereigns,
  onSelectSymbol,
  onOpenScreener,
}) => {
  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Asset Class Explorer
          </h2>
          <p className="text-xs sm:text-sm text-[#787B86] mt-0.5">
            Real-time depth across global equities, digital assets, commodities, and fixed income
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[#787B86] text-[10px] font-semibold uppercase tracking-wider self-start sm:self-auto bg-[#131722] border border-[#2A2E39] px-2.5 py-1 rounded-lg">
          <span className="w-2 h-2 rounded-full bg-[#66dabf] animate-pulse" />
          <span>Streaming Realtime Data</span>
        </div>
      </div>

      {/* 4-Quadrant Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        {/* Panel 1: World Equities & Capitalization Leaders (6 Cols) */}
        <div className="xl:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2962ff] text-[20px]">leaderboard</span>
              <h3 className="text-sm font-bold text-white">World Biggest Companies</h3>
            </div>
            <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">
              Ranked by Cap
            </span>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#50535E] text-[10px] font-semibold uppercase tracking-wider border-b border-[#2A2E39]/30">
                  <th className="py-2.5 pl-2">Asset</th>
                  <th className="py-2.5 text-right">Last Price</th>
                  <th className="py-2.5 text-right">Chg</th>
                  <th className="py-2.5 pr-2 text-right">Market Cap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E39]/20 font-mono text-xs">
                {companies.slice(0, 5).map((comp) => (
                  <tr
                    key={comp.rank}
                    onClick={() => {
                      const ticker = comp.symbol.match(/\(([^)]+)\)/)?.[1] || 'AAPL';
                      onSelectSymbol(ticker);
                    }}
                    className="hover:bg-[#1E222D]/60 transition-colors cursor-pointer group"
                  >
                    <td className="py-2.5 pl-2 text-white font-medium">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-[#2A2E39] flex items-center justify-center font-mono text-[10px] text-[#787B86] group-hover:text-[#2962ff]">
                          {comp.rank}
                        </span>
                        <span className="group-hover:text-[#b6c4ff] transition-colors">{comp.symbol}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-right text-white font-semibold">{comp.lastPrice}</td>
                    <td
                      className={`py-2.5 text-right font-bold ${
                        comp.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {comp.changePercent}
                    </td>
                    <td className="py-2.5 pr-2 text-right text-[#787B86]">{comp.marketCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-auto pt-3 border-t border-[#2A2E39]/40 flex items-center justify-between text-[#787B86] text-xs">
            <span>Global equity breadth: 68% above 200 EMA</span>
            <button
              onClick={() => onOpenScreener('equities')}
              className="text-[#2962ff] hover:text-[#b6c4ff] transition-colors font-medium flex items-center gap-0.5"
            >
              <span>Explore Stock Screener</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Panel 2: Digital Assets & Web3 TVL (6 Cols) */}
        <div className="xl:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#66dabf] text-[20px]">currency_bitcoin</span>
              <h3 className="text-sm font-bold text-white">Digital Assets &amp; DeFi TVL</h3>
            </div>
            <span className="px-2 py-0.5 bg-[#1E222D] border border-[#2A2E39]/60 rounded font-mono text-[10px] text-[#787B86]">
              Total DeFi TVL: $98.4B
            </span>
          </div>

          {/* 2-Sub-column row for Crypto Assets & TVL Leaders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            {/* Market Cap Leaders */}
            <div className="bg-[#0a0e19]/50 border border-[#2A2E39]/40 rounded-lg p-2.5">
              <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider block mb-2">
                Dominant Assets
              </span>
              <div className="flex flex-col gap-2">
                {cryptos.slice(0, 3).map((crypto) => (
                  <div
                    key={crypto.symbol}
                    onClick={() => {
                      const sym = crypto.symbol.split('/')[0].trim() + 'USD';
                      onSelectSymbol(sym);
                    }}
                    className="flex items-center justify-between font-mono text-xs hover:bg-[#1E222D]/60 p-1 rounded transition-colors cursor-pointer"
                  >
                    <div>
                      <span className="font-bold text-white">{crypto.symbol}</span>
                      <span className="block text-[10px] text-[#50535E]">{crypto.price}</span>
                    </div>
                    <div className="text-right">
                      <span
                        className={`font-bold ${
                          crypto.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {crypto.changePercent}
                      </span>
                      <span className="block text-[10px] text-[#787B86]">{crypto.marketCap}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TVL / Protocol Leaders */}
            <div className="bg-[#0a0e19]/50 border border-[#2A2E39]/40 rounded-lg p-2.5">
              <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider block mb-2">
                Protocol TVL Rank
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs">
                {protocols.slice(0, 4).map((p) => (
                  <div key={p.rank} className="flex items-center justify-between p-1">
                    <span className="text-white font-medium">{p.name}</span>
                    <span className="text-[#66dabf] font-semibold">{p.tvl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Crypto Trending Gainer Banner */}
          <div className="p-2 bg-[rgba(8,153,129,0.15)] border border-[#089981]/30 rounded-lg flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#089981] text-[18px]">rocket_launch</span>
              <span className="text-xs font-semibold text-white">Top 24h AI Sector Gainer: FET / Alliance</span>
            </div>
            <span className="font-mono text-xs text-[#089981] font-bold">+16.38%</span>
          </div>

          <div className="mt-auto pt-2 border-t border-[#2A2E39]/40 flex items-center justify-between text-[#787B86] text-xs">
            <span>Fear &amp; Greed Index: 64 (Greed)</span>
            <button
              onClick={() => onOpenScreener('crypto')}
              className="text-[#2962ff] hover:text-[#b6c4ff] transition-colors font-medium flex items-center gap-0.5"
            >
              <span>Crypto Screener</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Panel 3: Commodities & Futures (6 Cols) */}
        <div className="xl:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb3b0] text-[20px]">oil_barrel</span>
              <h3 className="text-sm font-bold text-white">Commodities &amp; Futures</h3>
            </div>
            <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">
              NYMEX / COMEX
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
            {commodities.slice(0, 4).map((c) => (
              <div
                key={c.symbol}
                onClick={() => onSelectSymbol(c.symbol)}
                className="bg-[#1E222D] border border-[#2A2E39]/60 p-2.5 rounded-lg hover:border-[#2962FF]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#787B86] font-semibold group-hover:text-white">
                    {c.symbol}
                  </span>
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      c.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {c.changePercent}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-white mt-1">{c.price}</div>
                <span className="text-[11px] text-[#787B86] truncate block">{c.name}</span>
              </div>
            ))}
          </div>

          {/* Forex Majors Bar */}
          <div className="mt-auto">
            <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider block mb-1.5">
              Major Forex Cross-Rates
            </span>
            <div className="grid grid-cols-3 gap-2">
              {forex.slice(0, 3).map((f) => (
                <div
                  key={f.pair}
                  onClick={() => onSelectSymbol(f.pair.replace('/', ''))}
                  className="bg-[#0a0e19]/50 border border-[#2A2E39]/40 p-2 rounded-lg flex items-center justify-between hover:bg-[#1E222D]/60 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-white">{f.pair}</span>
                    <span className="block font-mono text-[10px] text-[#787B86]">{f.rate}</span>
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      f.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {f.changePercent}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 4: US Treasury Yield Curve (6 Cols) */}
        <div className="xl:col-span-6 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#2A2E39]/40">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#2962ff] text-[20px]">show_chart</span>
              <h3 className="text-sm font-bold text-white">US Treasury Yield Curve</h3>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[rgba(242,54,69,0.15)] text-[#F23645] text-[10px] font-bold border border-[#F23645]/20">
              <span className="material-symbols-outlined text-[13px]">warning</span>
              <span>2Y-10Y Spread: -0.45%</span>
            </div>
          </div>

          {/* Yield Curve Tenors */}
          <div className="grid grid-cols-5 gap-1.5 my-3 text-center">
            {yields.map((y) => (
              <div
                key={y.tenor}
                className="bg-[#1E222D] border border-[#2A2E39]/60 p-2 rounded-lg flex flex-col hover:border-[#2962ff]/50 transition-colors"
              >
                <span className="text-[10px] font-mono text-[#787B86] uppercase">{y.tenor}</span>
                <span className="font-mono text-sm font-bold text-white my-0.5">{y.yieldRate}</span>
                <span className="font-mono text-[10px] text-[#089981] font-semibold">{y.changeBps}</span>
              </div>
            ))}
          </div>

          {/* Sovereign 10Y Benchmark Row */}
          <div className="mt-auto">
            <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider block mb-1.5">
              Sovereign 10Y Comparison
            </span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              {sovereigns.slice(0, 3).map((s) => (
                <div
                  key={s.country}
                  className="bg-[#0a0e19]/50 border border-[#2A2E39]/40 p-2 rounded-lg"
                >
                  <span className="text-[#787B86] block text-[10px]">{s.country}</span>
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="font-bold text-white">{s.yieldRate}</span>
                    <span className="text-[#089981] text-[10px] font-semibold">{s.changePercent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
