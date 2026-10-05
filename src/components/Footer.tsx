import React from 'react';

interface FooterProps {
  onSelectNavAction?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNavAction }) => {
  return (
    <footer className="w-full bg-[#131722] border-t border-[#2A2E39] mt-12">
      <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        {/* Products */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#50535E]">Products</span>
          {['SuperCharts', 'Pine Script™', 'Stock Screener', 'Crypto Screener'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectNavAction?.(item)}
              className="text-left text-[#c3c5d8] hover:text-white text-xs transition-colors py-0.5"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Markets */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#50535E]">Markets</span>
          {['Global Indices', 'Stock Heatmaps', 'Crypto Coins', 'Forex Rates'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectNavAction?.(item)}
              className="text-left text-[#c3c5d8] hover:text-white text-xs transition-colors py-0.5"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Community */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#50535E]">Community</span>
          {['Trade Ideas', 'Scripts Library', 'Live Streams', 'House Rules'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectNavAction?.(item)}
              className="text-left text-[#c3c5d8] hover:text-white text-xs transition-colors py-0.5"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Calendars */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#50535E]">Calendars</span>
          {['Economic Calendar', 'Earnings Calendar', 'Dividends', 'IPO Pipeline'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectNavAction?.(item)}
              className="text-left text-[#c3c5d8] hover:text-white text-xs transition-colors py-0.5"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Company */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#50535E]">Company</span>
          {['About TV', 'Pricing Plans', 'Broker Awards', 'Security & Trust'].map((item) => (
            <button
              key={item}
              onClick={() => onSelectNavAction?.(item)}
              className="text-left text-[#c3c5d8] hover:text-white text-xs transition-colors py-0.5"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Legal / Copyright Strip */}
      <div className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-4 border-t border-[#2A2E39] flex flex-col md:flex-row items-center justify-between gap-3 text-[#787B86] text-xs">
        <div>
          Market data is provided for informational purposes only and is not intended for trading purposes or advice.
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <a href="#" className="text-[#c3c5d8] hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-[#c3c5d8] hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-[#c3c5d8] hover:text-white transition-colors">
            Disclaimer
          </a>
          <span className="font-mono text-[11px]">© 2025 TradingView, Inc.</span>
        </div>
      </div>
    </footer>
  );
};
