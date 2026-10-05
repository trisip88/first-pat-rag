import React, { useState, useEffect } from 'react';
import { BenchmarkCardData, Category, Region } from '../types';

interface HeroSectionProps {
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectedRegion: Region;
  setSelectedRegion: (reg: Region) => void;
  benchmarks: BenchmarkCardData[];
  onSelectBenchmark: (benchmark: BenchmarkCardData) => void;
  activeBenchmarkId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  benchmarks,
  onSelectBenchmark,
  activeBenchmarkId,
}) => {
  const [regionMenuOpen, setRegionMenuOpen] = useState(false);
  const [utcTime, setUtcTime] = useState('');

  // Live UTC Clock updater
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const mins = String(now.getUTCMinutes()).padStart(2, '0');
      const secs = String(now.getUTCSeconds()).padStart(2, '0');
      setUtcTime(`UTC ${hours}:${mins}:${secs}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const categories: Category[] = [
    'Overview',
    'Indices',
    'Stocks',
    'Crypto',
    'Futures',
    'Forex',
    'Bonds & Yields',
    'ETFs',
    'Macro Economy',
  ];

  const regions: Region[] = [
    'Global Markets',
    'Americas (NYSE/CME)',
    'Europe (LSE/DAX)',
    'Asia-Pacific (TSE/HKEX)',
  ];

  // Helper to generate SVG path for sparkline from points
  const getSparklinePath = (points: number[]) => {
    if (!points || points.length === 0) return '';
    const width = 100;
    const height = 24;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    return points
      .map((pt, i) => {
        const x = (i / (points.length - 1)) * width;
        // Invert Y because SVG coordinates origin is top-left
        const y = height - ((pt - min) / range) * (height - 4) - 2;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-5 flex flex-col gap-5">
      {/* Header Level: Title, Region, Live Status */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[#787B86] text-[11px] font-semibold uppercase tracking-wider">
            <span className="inline-block w-2 h-2 rounded-full bg-[#089981] animate-beacon" />
            <span>Global Session Active</span>
            <span className="text-[#50535E]">•</span>
            <span className="font-mono text-[#c3c5d8] text-[11px]">{utcTime || 'UTC 14:48:22'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-extrabold tracking-tight">
            Markets, everywhere
          </h1>
        </div>

        {/* Region & Live Market Status */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Region Selector Dropdown */}
          <div className="relative inline-flex items-center bg-[#1E222D] rounded-xl p-1 shadow-sm border border-[#2A2E39]/60">
            <button
              onClick={() => setRegionMenuOpen(!regionMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2A2E39] text-white text-xs font-medium transition-all hover:bg-[#2A2E39]/80"
            >
              <span className="material-symbols-outlined text-[16px] text-[#b6c4ff]">public</span>
              <span>{selectedRegion}</span>
              <span className="material-symbols-outlined text-[16px] text-[#787B86]">arrow_drop_down</span>
            </button>

            {regionMenuOpen && (
              <div className="absolute top-full right-0 mt-1 z-30 w-52 bg-[#1E222D] border border-[#2A2E39] rounded-xl shadow-2xl py-1 flex flex-col">
                {regions.map((reg) => (
                  <button
                    key={reg}
                    onClick={() => {
                      setSelectedRegion(reg);
                      setRegionMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      selectedRegion === reg
                        ? 'text-white bg-[#2A2E39] font-semibold'
                        : 'text-[#787B86] hover:text-white hover:bg-[#2A2E39]/50'
                    }`}
                  >
                    <span>{reg}</span>
                    {selectedRegion === reg && (
                      <span className="material-symbols-outlined text-[14px] text-[#b6c4ff]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Live Market Status Indicators */}
          <div className="flex items-center gap-2 bg-[#131722] border border-[#2A2E39] px-3 py-1.5 rounded-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#089981]" />
            <span className="font-mono text-xs font-semibold text-white">NYSE OPEN</span>
            <span className="font-mono text-xs text-[#50535E]">4h 12m left</span>
          </div>

          <div className="hidden xl:flex items-center gap-2 bg-[#131722] border border-[#2A2E39] px-3 py-1.5 rounded-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#F23645]" />
            <span className="font-mono text-xs font-semibold text-[#787B86]">TOKYO CLOSED</span>
          </div>
        </div>
      </div>

      {/* Category Pill Horizontal Navigation */}
      <div className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 min-w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2962ff] text-white font-semibold shadow-[0_2px_10px_rgba(41,98,255,0.3)]'
                    : 'bg-[#131722] hover:bg-[#2A2E39] text-[#787B86] hover:text-white border border-[#2A2E39]/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Benchmark Overview: 6 Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
        {benchmarks.map((card) => {
          const isSelected = activeBenchmarkId === card.id;
          return (
            <div
              key={card.id}
              onClick={() => onSelectBenchmark(card)}
              className={`bg-[#131722] hover:bg-[#1E222D] border transition-all rounded-xl p-3 flex flex-col justify-between shadow-sm cursor-pointer group ${
                isSelected ? 'border-[#2962FF] ring-1 ring-[#2962FF]' : 'border-[#2A2E39]/70 hover:border-[#2962FF]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-[#b6c4ff] transition-colors leading-tight">
                    {card.name}
                  </span>
                  <span className="text-[10px] font-semibold text-[#787B86] uppercase tracking-wider mt-0.5">
                    {card.exchange}
                  </span>
                </div>
                <span
                  className={`font-mono text-[11px] font-bold px-1.5 py-0.5 rounded ${
                    card.isPositive
                      ? 'text-[#089981] bg-[rgba(8,153,129,0.15)]'
                      : 'text-[#F23645] bg-[rgba(242,54,69,0.15)]'
                  }`}
                >
                  {card.changePercent}
                </span>
              </div>

              <div className="my-2 flex items-baseline justify-between">
                <span className="font-mono text-base font-bold text-white tracking-tight">
                  {card.price}
                </span>
                <span
                  className={`font-mono text-[11px] ${
                    card.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {card.changeValue}
                </span>
              </div>

              {/* Sparkline Trendline SVG */}
              <div className="w-full h-7 pt-1">
                <svg
                  className={`w-full h-full overflow-visible ${
                    card.isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                  fill="none"
                  viewBox="0 0 100 24"
                >
                  <path
                    d={getSparklinePath(card.points)}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
