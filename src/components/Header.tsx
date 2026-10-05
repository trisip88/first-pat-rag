import React, { useState } from 'react';
import { TickerTapeItem } from '../types';

interface HeaderProps {
  tickerItems: TickerTapeItem[];
  onOpenSearch: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  isStreaming: boolean;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSymbol: (symbol: string) => void;
  onOpenGetStarted: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tickerItems,
  onOpenSearch,
  activeNav,
  setActiveNav,
  isStreaming,
  setIsStreaming,
  onSelectSymbol,
  onOpenGetStarted,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, title: 'NVDA Breakout Alert', desc: 'Crossed above $140 with 1.8x volume surge', time: '4m ago', unread: true },
    { id: 2, title: 'US Core CPI Release', desc: 'Scheduled in 18h 30m - Consensus at 3.2%', time: '22m ago', unread: true },
    { id: 3, title: 'Yield Curve Alert', desc: '2Y-10Y inversion deepens to -45 bps', time: '1h ago', unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#131722]/95 backdrop-blur-xl border-b border-[#2A2E39]">
      {/* Primary Top Bar */}
      <div className="h-12 w-full px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Left: TV logo, Search, Main Nav */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* TV Logo */}
          <button 
            onClick={() => setActiveNav('Markets')}
            className="flex items-center gap-1.5 focus:outline-none group"
            title="TradingView Terminal"
          >
            <div className="w-8 h-8 rounded-lg bg-[#2962ff] flex items-center justify-center transition-transform group-hover:scale-105 shadow-[0_2px_10px_rgba(41,98,255,0.35)]">
              <span className="font-bold text-white text-base tracking-tight">TV</span>
            </div>
          </button>

          {/* Quick Search Bar with Ctrl+K */}
          <button
            onClick={onOpenSearch}
            className="flex items-center bg-[#1E222D] border border-[#2A2E39] rounded-lg px-2.5 py-1 gap-2 cursor-pointer hover:border-[#2962FF] transition-colors text-left"
            title="Search symbols, news (Ctrl+K)"
          >
            <span className="material-symbols-outlined text-[16px] text-[#787B86]">search</span>
            <span className="text-xs text-[#787B86] pr-2 hidden sm:inline">Search symbols, news</span>
            <span className="text-xs text-[#787B86] pr-1 sm:hidden">Search</span>
            <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-[#2A2E39] text-[#787B86] border border-[#2A2E39]">
              Ctrl+K
            </kbd>
          </button>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center h-12 gap-1">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((nav) => {
              const isActive = activeNav === nav;
              return (
                <button
                  key={nav}
                  onClick={() => setActiveNav(nav)}
                  className={`px-3 h-full flex items-center transition-colors text-[13px] font-medium border-b-2 ${
                    isActive
                      ? 'bg-[#2A2E39]/70 text-white border-[#2962ff] font-semibold'
                      : 'text-[#c3c5d8] hover:text-white border-transparent'
                  }`}
                >
                  {nav}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Live Stream Toggle, Language, Notifications, Get Started, Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Data Stream Status Toggle */}
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`hidden md:flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-mono border transition-all ${
              isStreaming
                ? 'bg-[#089981]/15 text-[#00B074] border-[#089981]/40 shadow-[0_0_12px_rgba(8,153,129,0.2)]'
                : 'bg-[#1E222D] text-[#787B86] border-[#2A2E39]'
            }`}
            title="Toggle live price simulation tick feed"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isStreaming ? 'bg-[#00B074] animate-beacon' : 'bg-[#787B86]'
              }`}
            />
            <span>{isStreaming ? 'LIVE TICKS' : 'PAUSED'}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
                setNotifOpen(false);
                setUserMenuOpen(false);
              }}
              className="flex items-center gap-0.5 px-2 py-1 rounded bg-transparent hover:bg-[#1E222D] text-[#c3c5d8] hover:text-white transition-colors font-mono text-[11px]"
            >
              <span>{selectedLang}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 w-24 bg-[#1E222D] border border-[#2A2E39] rounded-lg shadow-xl py-1 z-50">
                {['EN', 'ES', 'DE', 'JA', 'ZH'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLang(lang);
                      setLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                      selectedLang === lang ? 'text-[#2962ff] font-semibold bg-[#2A2E39]' : 'text-[#dfe2f2] hover:bg-[#2A2E39]'
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && <span className="material-symbols-outlined text-[12px]">check</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                setLangOpen(false);
                setUserMenuOpen(false);
              }}
              className="w-8 h-8 rounded flex items-center justify-center text-[#c3c5d8] hover:text-white hover:bg-[#1E222D] transition-colors relative"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-[18px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#2962ff] ring-2 ring-[#131722]" />
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1E222D] border border-[#2A2E39] rounded-xl shadow-2xl py-2 z-50">
                <div className="flex items-center justify-between px-3 pb-2 border-b border-[#2A2E39]">
                  <span className="text-xs font-semibold text-white">Market Dispatches</span>
                  <span className="text-[10px] font-mono text-[#00B074] bg-[#089981]/15 px-1.5 py-0.5 rounded">3 Realtime</span>
                </div>
                <div className="divide-y divide-[#2A2E39]/60 max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-[#2A2E39]/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{n.title}</span>
                        <span className="text-[10px] text-[#787B86] font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-[#c3c5d8] mt-0.5 leading-snug">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Get Started CTA */}
          <button
            onClick={onOpenGetStarted}
            className="px-3 md:px-3.5 py-1.5 rounded-lg bg-[#2962ff] hover:bg-[#004ee8] text-white text-[13px] font-semibold transition-all shadow-[0_2px_12px_rgba(41,98,255,0.25)] whitespace-nowrap"
          >
            Get started
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setUserMenuOpen(!userMenuOpen);
                setLangOpen(false);
                setNotifOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-[#b6c4ff] flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#2962ff] transition-all"
              title="Account Menu"
            >
              <span className="material-symbols-outlined text-[#002780] text-[18px]">person</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1E222D] border border-[#2A2E39] rounded-xl shadow-2xl py-2 z-50">
                <div className="px-3 py-2 border-b border-[#2A2E39]">
                  <p className="text-xs font-semibold text-white">Institutional Desk</p>
                  <p className="text-[11px] text-[#787B86] font-mono">desk@alphatrading.io</p>
                </div>
                <div className="py-1 text-xs">
                  <button onClick={() => setUserMenuOpen(false)} className="w-full text-left px-3 py-1.5 text-[#dfe2f2] hover:bg-[#2A2E39] transition-colors">
                    Watchlist Presets
                  </button>
                  <button onClick={() => setUserMenuOpen(false)} className="w-full text-left px-3 py-1.5 text-[#dfe2f2] hover:bg-[#2A2E39] transition-colors">
                    Pine Script™ Studio
                  </button>
                  <button onClick={() => setUserMenuOpen(false)} className="w-full text-left px-3 py-1.5 text-[#dfe2f2] hover:bg-[#2A2E39] transition-colors">
                    API & Webhook Feeds
                  </button>
                  <div className="border-t border-[#2A2E39] my-1" />
                  <button onClick={() => setUserMenuOpen(false)} className="w-full text-left px-3 py-1.5 text-[#ffb4ab] hover:bg-[#2A2E39] transition-colors">
                    Disconnect Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub Bar: Real-time Live Ticker Tape */}
      <div className="h-8 w-full bg-[#0D1117] border-t border-[#2A2E39] overflow-x-auto whitespace-nowrap flex items-center px-4 md:px-6 gap-6 no-scrollbar">
        {tickerItems.map((item) => (
          <button
            key={item.symbol}
            onClick={() => onSelectSymbol(item.symbol)}
            className="flex items-center gap-1.5 font-mono text-[11px] hover:opacity-80 transition-opacity focus:outline-none shrink-0"
          >
            <span className="font-semibold text-white">{item.symbol}</span>
            <span className="text-[#787B86]">{item.price}</span>
            <span
              className={`px-1 py-0.5 rounded flex items-center font-semibold text-[10px] ${
                item.isPositive
                  ? 'text-[#089981] bg-[rgba(8,153,129,0.15)]'
                  : 'text-[#F23645] bg-[rgba(242,54,69,0.15)]'
              }`}
            >
              {item.changePercent}
            </span>
          </button>
        ))}
      </div>
    </header>
  );
};
