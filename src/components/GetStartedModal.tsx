import React, { useState } from 'react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStreaming: boolean;
  setIsStreaming: (s: boolean) => void;
  onApplyPreset: (presetName: string) => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({
  isOpen,
  onClose,
  isStreaming,
  setIsStreaming,
  onApplyPreset,
}) => {
  const [selectedPreset, setSelectedPreset] = useState('Tech Megacaps');
  const [paperBalance, setPaperBalance] = useState('$100,000 USD');
  const [connectedBroker, setConnectedBroker] = useState('TradingView Paper Trading');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const presets = [
    { id: 'Tech Megacaps', desc: 'NVDA, AAPL, MSFT, GOOGL, AMZN, TSLA' },
    { id: 'Crypto Bluechips', desc: 'BTCUSD, ETHUSD, SOLUSD, BNBUSD, AVAX' },
    { id: 'Macro & Commodities', desc: 'Gold Spot, Crude WTI, 10Y Yield, EUR/USD' },
    { id: 'High Volatility Screener', desc: 'Top 50 momentum movers with Beta > 2.5' },
  ];

  const handleSave = () => {
    onApplyPreset(selectedPreset);
    setSuccessMsg('Terminal workspace and trading configuration initialized successfully!');
    setTimeout(() => {
      setSuccessMsg('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-[#131722] border border-[#2A2E39] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#171b26] border-b border-[#2A2E39] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#2962ff] flex items-center justify-center text-white font-bold text-sm">
              TV
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Get Started with TradingView Terminal</h3>
              <p className="text-xs text-[#787B86]">Configure your institutional workspace &amp; execution feeds</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-[#2A2E39] text-[#787B86] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
          {/* Preset Watchlist Selection */}
          <div>
            <label className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
              Default Watchlist Preset
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {presets.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPreset(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedPreset === p.id
                      ? 'bg-[#2962ff]/15 border-[#2962ff] ring-1 ring-[#2962ff]'
                      : 'bg-[#1E222D] border-[#2A2E39] hover:border-[#2962FF]/50'
                  }`}
                >
                  <span className="text-xs font-bold text-white block">{p.id}</span>
                  <span className="text-[11px] text-[#787B86] mt-0.5 block">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Realtime Streaming Setting */}
          <div className="bg-[#1E222D] border border-[#2A2E39] rounded-xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Real-time Ticker &amp; Order Book Feed</span>
              <span className="text-[11px] text-[#787B86]">Simulate sub-second price fluctuations and volume flashes</span>
            </div>
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isStreaming ? 'bg-[#089981]' : 'bg-[#2A2E39]'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isStreaming ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Simulated Trading Desk */}
          <div>
            <label className="text-xs font-semibold text-white uppercase tracking-wider block mb-2">
              Active Trading Account
            </label>
            <div className="bg-[#1E222D] border border-[#2A2E39] rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00B074]" />
                  <span className="text-xs font-bold text-white">{connectedBroker}</span>
                </div>
                <span className="text-[11px] text-[#787B86] mt-0.5 block">
                  Simulated Buying Power: <strong className="text-white font-mono">{paperBalance}</strong>
                </span>
              </div>
              <span className="px-2 py-1 rounded bg-[#2A2E39] text-[10px] font-mono text-[#00B074] border border-[#089981]/30">
                Connected
              </span>
            </div>
          </div>

          {successMsg && (
            <div className="p-3 rounded-lg bg-[#089981]/20 border border-[#089981] text-[#00B074] text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#171b26] border-t border-[#2A2E39] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#787B86] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-[#2962ff] hover:bg-[#004ee8] text-white text-xs font-bold transition-all shadow-[0_2px_12px_rgba(41,98,255,0.3)]"
          >
            Launch Customized Terminal
          </button>
        </div>
      </div>
    </div>
  );
};
