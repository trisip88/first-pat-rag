import React, { useState, useMemo } from 'react';
import { PrimaryAssetData } from '../types';

interface SuperChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  asset: PrimaryAssetData;
}

export const SuperChartModal: React.FC<SuperChartModalProps> = ({ isOpen, onClose, asset }) => {
  const [timeframe, setTimeframe] = useState('15m');
  const [chartMode, setChartMode] = useState<'candles' | 'line'>('candles');
  const [showMa20, setShowMa20] = useState(true);
  const [showMa50, setShowMa50] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [showRsi, setShowRsi] = useState(true);
  const [orderNotification, setOrderNotification] = useState<string | null>(null);

  // Hover crosshair position
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Generate 30 high-resolution candle points for the interactive SuperChart
  const candleSeries = useMemo(() => {
    const base = asset.rawPrice;
    const count = 28;
    const result = [];
    let cur = base * 0.94;

    for (let i = 0; i < count; i++) {
      const delta = (Math.random() - 0.47) * (base * 0.02);
      const open = cur;
      const close = cur + delta;
      const high = Math.max(open, close) + Math.random() * (base * 0.008);
      const low = Math.min(open, close) - Math.random() * (base * 0.008);
      const volume = Math.floor(200000 + Math.random() * 800000);
      cur = close;

      result.push({
        index: i,
        time: `${10 + Math.floor(i / 6)}:${String((i % 6) * 10).padStart(2, '0')}`,
        open,
        close,
        high,
        low,
        volume,
        isUp: close >= open,
      });
    }

    // Ensure the last close matches current asset price
    if (result.length > 0) {
      result[result.length - 1].close = asset.rawPrice;
      result[result.length - 1].high = Math.max(result[result.length - 1].high, asset.rawPrice);
    }

    return result;
  }, [asset.rawPrice]);

  if (!isOpen) return null;

  const minP = Math.min(...candleSeries.map((c) => c.low));
  const maxP = Math.max(...candleSeries.map((c) => c.high));
  const rangeP = maxP - minP || 1;

  const handleOrder = (type: 'BUY' | 'SELL') => {
    setOrderNotification(`Demo ${type} order filled: 100 shares @ $${asset.rawPrice.toFixed(2)}`);
    setTimeout(() => setOrderNotification(null), 3500);
  };

  const activeCandle = hoverIndex !== null && candleSeries[hoverIndex] ? candleSeries[hoverIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-7xl h-[92vh] bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="h-14 px-4 bg-[#171b26] border-b border-[#2A2E39] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2962ff] flex items-center justify-center font-bold text-white text-xs">
              {asset.symbol.slice(0, 4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white">{asset.name}</span>
                <span className="px-1.5 py-0.5 rounded bg-[#1E222D] text-[10px] font-mono text-[#787B86] uppercase">
                  {asset.exchange}
                </span>
                <span className="font-mono text-sm font-bold text-white ml-2">{asset.lastPrice}</span>
                <span
                  className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                    asset.isPositive ? 'text-[#089981] bg-[rgba(8,153,129,0.15)]' : 'text-[#F23645] bg-[rgba(242,54,69,0.15)]'
                  }`}
                >
                  {asset.changePercent}
                </span>
              </div>
            </div>
          </div>

          {/* Timeframe & Chart Style Selectors */}
          <div className="hidden md:flex items-center gap-1 bg-[#131722] border border-[#2A2E39] p-1 rounded-lg">
            {['1m', '5m', '15m', '1h', '4h', '1D', '1W'].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
                  timeframe === tf ? 'bg-[#2962ff] text-white font-semibold' : 'text-[#787B86] hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleOrder('BUY')}
              className="px-3 py-1 bg-[#089981] hover:bg-[#00B074] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              Buy
            </button>
            <button
              onClick={() => handleOrder('SELL')}
              className="px-3 py-1 bg-[#F23645] hover:bg-[#F6465D] text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              Sell
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-[#2A2E39] text-[#787B86] hover:text-white flex items-center justify-center transition-colors ml-2"
              title="Close SuperChart"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Technical Indicators Toolbar */}
        <div className="h-10 px-4 bg-[#131722] border-b border-[#2A2E39]/60 flex items-center justify-between text-xs overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#50535E] uppercase text-[10px] font-semibold tracking-wider">Studies:</span>
            <button
              onClick={() => setShowMa20(!showMa20)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                showMa20 ? 'bg-[#2962ff]/20 text-[#b6c4ff] border-[#2962ff]' : 'bg-[#1E222D] text-[#787B86] border-[#2A2E39]'
              }`}
            >
              EMA 20
            </button>
            <button
              onClick={() => setShowMa50(!showMa50)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                showMa50 ? 'bg-[#ffb3b0]/20 text-[#ffb3b0] border-[#ffb3b0]/40' : 'bg-[#1E222D] text-[#787B86] border-[#2A2E39]'
              }`}
            >
              SMA 50
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                showVolume ? 'bg-[#66dabf]/20 text-[#66dabf] border-[#66dabf]/40' : 'bg-[#1E222D] text-[#787B86] border-[#2A2E39]'
              }`}
            >
              Vol Histogram
            </button>
            <button
              onClick={() => setShowRsi(!showRsi)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono border transition-colors ${
                showRsi ? 'bg-[#b6c4ff]/20 text-white border-[#b6c4ff]/40' : 'bg-[#1E222D] text-[#787B86] border-[#2A2E39]'
              }`}
            >
              RSI (14)
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-[#787B86]">
            {activeCandle ? (
              <>
                <span>O: <strong className="text-white">${activeCandle.open.toFixed(2)}</strong></span>
                <span>H: <strong className="text-white">${activeCandle.high.toFixed(2)}</strong></span>
                <span>L: <strong className="text-white">${activeCandle.low.toFixed(2)}</strong></span>
                <span>C: <strong className="text-white">${activeCandle.close.toFixed(2)}</strong></span>
                <span>V: <strong className="text-white">{(activeCandle.volume / 1000).toFixed(0)}K</strong></span>
              </>
            ) : (
              <span>Hover chart for O/H/L/C candlestick breakdown</span>
            )}
          </div>
        </div>

        {/* Order Notification Banner */}
        {orderNotification && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-40 bg-[#089981] text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-top duration-200">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{orderNotification}</span>
          </div>
        )}

        {/* Main Chart Canvas Area */}
        <div className="flex-1 flex flex-col relative bg-[#0D1117] overflow-hidden select-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-15">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-full h-px bg-[#353945]" />
            ))}
          </div>

          {/* Primary Candlestick Area */}
          <div 
            className="flex-1 flex items-end justify-between px-6 pt-6 pb-2 relative cursor-crosshair"
            onMouseLeave={() => setHoverIndex(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, x / rect.width));
              const idx = Math.round(ratio * (candleSeries.length - 1));
              setHoverIndex(idx);
            }}
          >
            {/* Price Scale Y-Axis on Right */}
            <div className="absolute right-2 top-4 bottom-4 flex flex-col justify-between text-right font-mono text-[10px] text-[#50535E] pointer-events-none z-10">
              <span>${maxP.toFixed(2)}</span>
              <span>${(minP + rangeP * 0.75).toFixed(2)}</span>
              <span>${(minP + rangeP * 0.50).toFixed(2)}</span>
              <span>${(minP + rangeP * 0.25).toFixed(2)}</span>
              <span>${minP.toFixed(2)}</span>
            </div>

            {/* Candlestick Bars */}
            {candleSeries.map((c) => {
              const heightPct = Math.max(6, ((Math.abs(c.close - c.open)) / rangeP) * 260);
              const bottomPct = Math.max(10, ((Math.min(c.open, c.close) - minP) / rangeP) * 260);
              const wickHeightPct = Math.max(12, ((c.high - c.low) / rangeP) * 260);
              const wickBottomPct = Math.max(8, ((c.low - minP) / rangeP) * 260);

              return (
                <div key={c.index} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                  {/* High/Low Wick */}
                  <div
                    className={`w-[1px] absolute ${c.isUp ? 'bg-[#00B074]' : 'bg-[#F23645]'}`}
                    style={{
                      height: `${wickHeightPct}px`,
                      bottom: `${wickBottomPct}px`,
                    }}
                  />
                  {/* Real body */}
                  <div
                    className={`w-3 sm:w-5 rounded-xs z-10 transition-transform ${
                      c.isUp ? 'bg-[#00B074]' : 'bg-[#F23645]'
                    }`}
                    style={{
                      height: `${heightPct}px`,
                      marginBottom: `${bottomPct}px`,
                    }}
                  />
                </div>
              );
            })}

            {/* Crosshair Overlay */}
            {hoverIndex !== null && activeCandle && (
              <div
                className="absolute top-0 bottom-0 pointer-events-none z-30"
                style={{
                  left: `${(hoverIndex / (candleSeries.length - 1)) * 100}%`,
                }}
              >
                <div className="w-px h-full bg-[#2962ff]/80" />
                <div className="absolute top-2 -translate-x-1/2 bg-[#1E222D] border border-[#2962ff] px-2 py-1 rounded text-center shadow-lg">
                  <span className="font-mono text-xs font-bold text-white">${activeCandle.close.toFixed(2)}</span>
                  <span className="block font-mono text-[9px] text-[#787B86]">{activeCandle.time}</span>
                </div>
              </div>
            )}
          </div>

          {/* Volume Histogram Sub-Panel */}
          {showVolume && (
            <div className="h-16 border-t border-[#2A2E39]/40 bg-[#0a0e19]/40 px-6 flex items-end justify-between py-1 relative">
              <span className="absolute left-2 top-1 text-[9px] font-mono text-[#50535E]">VOL 24H</span>
              {candleSeries.map((c) => {
                const volPct = Math.min(100, Math.max(10, (c.volume / 1000000) * 100));
                return (
                  <div
                    key={c.index}
                    className={`flex-1 mx-0.5 rounded-t-xs ${
                      c.isUp ? 'bg-[#00B074]/40' : 'bg-[#F23645]/40'
                    }`}
                    style={{ height: `${volPct}%` }}
                  />
                );
              })}
            </div>
          )}

          {/* RSI (14) Oscillator Sub-Panel */}
          {showRsi && (
            <div className="h-16 border-t border-[#2A2E39]/40 bg-[#0a0e19]/60 px-6 py-1 relative flex flex-col justify-center">
              <div className="flex items-center justify-between text-[9px] font-mono text-[#50535E] mb-1">
                <span>RSI (14): <strong className="text-[#b6c4ff]">64.28</strong></span>
                <span>Overbought (70) / Oversold (30)</span>
              </div>
              <div className="w-full h-6 relative bg-[#131722] rounded overflow-hidden">
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] bg-[#2A2E39]" />
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 24">
                  <path
                    d="M 0 16 Q 15 20 30 14 T 60 8 T 85 10 T 100 6"
                    fill="none"
                    stroke="#b6c4ff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Footer Execution Bar */}
        <div className="h-12 px-4 bg-[#171b26] border-t border-[#2A2E39] flex items-center justify-between text-xs text-[#787B86]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00B074] animate-pulse" />
            <span className="font-mono text-[11px] text-white">Pine Script™ Realtime Engine Active</span>
            <span className="text-[#50535E]">•</span>
            <span>Latency: 12ms</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">1 Click Trading</span>
            <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#131722] text-[#787B86] border border-[#2A2E39]">
              Shift+B = Buy | Shift+S = Sell
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
