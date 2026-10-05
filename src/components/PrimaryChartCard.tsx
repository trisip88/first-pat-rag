import React, { useState, useMemo } from 'react';
import { ChartType, PrimaryAssetData, Timeframe } from '../types';

interface PrimaryChartCardProps {
  asset: PrimaryAssetData;
  onLaunchSuperChart: () => void;
  selectedTimeframe: Timeframe;
  setSelectedTimeframe: (tf: Timeframe) => void;
}

export const PrimaryChartCard: React.FC<PrimaryChartCardProps> = ({
  asset,
  onLaunchSuperChart,
  selectedTimeframe,
  setSelectedTimeframe,
}) => {
  const [chartType, setChartType] = useState<ChartType>('area');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const timeframes: Timeframe[] = ['1D', '5D', '1M', '1Y', 'ALL'];

  // Current series based on selected timeframe
  const currentData = useMemo(() => {
    return asset.chartData[selectedTimeframe] || asset.chartData['1M'];
  }, [asset, selectedTimeframe]);

  // Price calculations for scaling
  const { minPrice, maxPrice, pointsSvg, areaSvg, yLabels } = useMemo(() => {
    if (!currentData || currentData.length === 0) {
      return { minPrice: 0, maxPrice: 100, pointsSvg: '', areaSvg: '', yLabels: [] };
    }

    const prices = currentData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = (max - min) * 1.15 || 1;
    const paddedMin = min - (max - min) * 0.08;

    const width = 800;
    const height = 240;

    const coords = currentData.map((d, i) => {
      const x = (i / (currentData.length - 1)) * width;
      const y = height - ((d.price - paddedMin) / range) * (height - 30) - 20;
      return { x, y, price: d.price, time: d.time };
    });

    const pathPoints = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(' ');
    const areaPoints = `0,${height} ${coords.map((c) => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ')} ${width},${height}`;

    // Generate 4 equidistant price labels on Y-axis
    const step = (max - min) / 3;
    const labels = [
      (max + step * 0.1).toFixed(2),
      (min + step * 2).toFixed(2),
      (min + step).toFixed(2),
      (min - step * 0.05).toFixed(2),
    ];

    return { minPrice: min, maxPrice: max, pointsSvg: pathPoints, areaSvg: areaPoints, yLabels: labels };
  }, [currentData]);

  const activePoint = hoverIndex !== null && currentData[hoverIndex] ? currentData[hoverIndex] : null;

  return (
    <div className="lg:col-span-8 bg-[#131722] border border-[#2A2E39]/80 rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
      {/* Ambient subtle glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#2962ff]/10 blur-3xl pointer-events-none" />

      {/* Card Header with Symbol & Timeframe Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#1E222D] border border-[#2A2E39] flex items-center justify-center font-bold text-[#00B074] font-mono text-base shadow-sm">
            {asset.symbol}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {asset.name}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1E222D] border border-[#2A2E39] text-[10px] font-semibold text-[#787B86] uppercase">
                {asset.exchange}
              </span>
            </div>
            <p className="text-xs text-[#787B86] mt-0.5">
              {asset.sector} • {asset.weight}
            </p>
          </div>
        </div>

        {/* Timeframe & Chart Style Selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <div className="flex items-center bg-[#1E222D] border border-[#2A2E39] p-0.5 rounded-lg">
            <button
              onClick={() => setChartType('area')}
              className={`p-1 rounded text-xs transition-colors ${
                chartType === 'area' ? 'bg-[#2A2E39] text-white' : 'text-[#787B86] hover:text-white'
              }`}
              title="Area Line Chart"
            >
              <span className="material-symbols-outlined text-[15px] block">show_chart</span>
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-1 rounded text-xs transition-colors ${
                chartType === 'candlestick' ? 'bg-[#2A2E39] text-white' : 'text-[#787B86] hover:text-white'
              }`}
              title="Candlestick Chart"
            >
              <span className="material-symbols-outlined text-[15px] block">candlestick_chart</span>
            </button>
          </div>

          <div className="flex items-center bg-[#1E222D] border border-[#2A2E39] p-0.5 rounded-lg">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
                  selectedTimeframe === tf
                    ? 'bg-[#2A2E39] text-white font-semibold shadow-sm'
                    : 'text-[#787B86] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 py-2.5 bg-[#0a0e19]/60 border border-[#2A2E39]/40 rounded-lg px-4 z-10">
        <div>
          <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">Last Price</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-mono text-base font-bold text-white">
              {activePoint ? `$${activePoint.price.toFixed(2)}` : asset.lastPrice}
            </span>
            <span className="font-mono text-xs text-[#089981] font-bold">
              {asset.changePercent}
            </span>
          </div>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">Market Cap</span>
          <div className="font-mono text-xs text-white mt-1 font-semibold">{asset.marketCap}</div>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">Volume 24H</span>
          <div className="font-mono text-xs text-white mt-1 font-semibold">{asset.volume24h}</div>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-[#50535E] uppercase tracking-wider">52W Range</span>
          <div className="font-mono text-xs text-[#787B86] mt-1">{asset.range52w}</div>
        </div>
      </div>

      {/* Interactive Chart Visualization */}
      <div 
        className="relative w-full h-64 mt-1 cursor-crosshair select-none"
        onMouseLeave={() => setHoverIndex(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, x / rect.width));
          const idx = Math.round(ratio * (currentData.length - 1));
          setHoverIndex(idx);
        }}
      >
        {/* Subtle Horizontal Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full h-px bg-[#353945]" />
          <div className="w-full h-px bg-[#353945]" />
          <div className="w-full h-px bg-[#353945]" />
          <div className="w-full h-px bg-[#353945]" />
        </div>

        {/* Price Level Labels on Y-axis */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-right font-mono text-[11px] text-[#50535E] pr-1 pointer-events-none z-10">
          {yLabels.map((lbl, idx) => (
            <span key={idx}>${lbl}</span>
          ))}
        </div>

        {/* Candlestick or Area View */}
        {chartType === 'area' ? (
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 240">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#20a28a" stopOpacity="0.38" />
                <stop offset="70%" stopColor="#20a28a" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#20a28a" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <polygon fill="url(#chartGradient)" points={areaSvg} />

            {/* Line Stroke */}
            <path
              d={pointsSvg}
              fill="none"
              stroke="#00B074"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />

            {/* Terminal Ping Dot */}
            <circle cx="800" cy="18" r="4.5" fill="#00B074" className="animate-pulse" />
          </svg>
        ) : (
          /* Candlestick Visualization */
          <div className="w-full h-full flex items-end justify-between px-4 pb-4">
            {currentData.map((d, i) => {
              const isUp = (d.close || d.price) >= (d.open || d.price * 0.99);
              const high = d.high || d.price * 1.01;
              const low = d.low || d.price * 0.99;
              const open = d.open || d.price * 0.995;
              const close = d.close || d.price;

              const range = (maxPrice - minPrice) || 1;
              const heightPct = Math.max(8, ((Math.abs(close - open)) / range) * 180);
              const bottomPct = Math.max(5, ((Math.min(open, close) - minPrice) / range) * 180);
              const wickHeightPct = Math.max(12, ((high - low) / range) * 180);

              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                  {/* Wick */}
                  <div
                    className={`w-0.5 absolute ${isUp ? 'bg-[#00B074]' : 'bg-[#F23645]'}`}
                    style={{
                      height: `${wickHeightPct}px`,
                      bottom: `${bottomPct}px`,
                    }}
                  />
                  {/* Real body */}
                  <div
                    className={`w-3 sm:w-4 rounded-xs z-10 ${
                      isUp ? 'bg-[#00B074]' : 'bg-[#F23645]'
                    }`}
                    style={{
                      height: `${heightPct}px`,
                      marginBottom: `${bottomPct}px`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* Hover Crosshair & Tooltip */}
        {hoverIndex !== null && activePoint && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-20"
            style={{
              left: `${(hoverIndex / (currentData.length - 1)) * 100}%`,
            }}
          >
            {/* Vertical crosshair line */}
            <div className="w-px h-full bg-[#2962ff]/70" />

            {/* Floating Price Pill */}
            <div className="absolute top-2 -translate-x-1/2 bg-[#1E222D] border border-[#2962ff] px-2 py-1 rounded shadow-lg flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-white">${activePoint.price.toFixed(2)}</span>
              <span className="font-mono text-[9px] text-[#787B86]">{activePoint.time}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Tools Row */}
      <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#2A2E39]/40 text-[#787B86] text-xs z-10 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-[#50535E]">candlestick_chart</span>
          <span>{asset.strategyName}</span>
        </div>
        <button
          onClick={onLaunchSuperChart}
          className="inline-flex items-center gap-1 text-[#2962ff] hover:text-[#b6c4ff] font-semibold text-xs transition-colors"
        >
          <span>Launch SuperChart</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </button>
      </div>
    </div>
  );
};
