/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PrimaryChartCard } from './components/PrimaryChartCard';
import { MarketMoversCard } from './components/MarketMoversCard';
import { AssetClassExplorer } from './components/AssetClassExplorer';
import { MacroAndEarningsCalendar } from './components/MacroAndEarningsCalendar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { SuperChartModal } from './components/SuperChartModal';
import { MoversModal } from './components/MoversModal';
import { GetStartedModal } from './components/GetStartedModal';
import { ScreenerModal } from './components/ScreenerModal';

import {
  benchmarkCards,
  biggestCompanies,
  commodityFutures,
  defiProtocols,
  dominantCryptos,
  earningsItems,
  forexPairs,
  initialTickerItems,
  macroIndicators,
  marketMoversActive,
  marketMoversGainers,
  marketMoversVolatile,
  primaryAssets,
  sovereignYields,
  yieldPoints,
} from './data/mockMarketData';
import {
  BenchmarkCardData,
  Category,
  MoversTab,
  PrimaryAssetData,
  Region,
  TickerTapeItem,
  Timeframe,
} from './types';

export default function App() {
  // Navigation & Category states
  const [activeNav, setActiveNav] = useState('Markets');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Overview');
  const [selectedRegion, setSelectedRegion] = useState<Region>('Global Markets');

  // Real-time live data state
  const [isStreaming, setIsStreaming] = useState(true);
  const [tickerItems, setTickerItems] = useState<TickerTapeItem[]>(initialTickerItems);
  const [benchmarks, setBenchmarks] = useState<BenchmarkCardData[]>(benchmarkCards);

  // Active Symbol & Primary Chart state
  const [selectedSymbol, setSelectedSymbol] = useState<string>('NVDA');
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1M');

  // Movers tab
  const [moversTab, setMoversTab] = useState<MoversTab>('active');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuperChartOpen, setIsSuperChartOpen] = useState(false);
  const [isMoversOpen, setIsMoversOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [screenerCategory, setScreenerCategory] = useState('stocks');

  // Active primary asset data (falls back to NVDA or generates custom data for selected symbol)
  const currentAsset: PrimaryAssetData = useMemo(() => {
    if (primaryAssets[selectedSymbol]) {
      return primaryAssets[selectedSymbol];
    }

    // Dynamic fallback for any selected symbol from search or movers
    const basePrice = selectedSymbol.includes('BTC')
      ? 67420
      : selectedSymbol.includes('ETH')
      ? 3540
      : 150 + (selectedSymbol.charCodeAt(0) * 1.5);

    return {
      symbol: selectedSymbol,
      name: `${selectedSymbol} Corporation`,
      exchange: selectedSymbol.includes('USD') ? 'SPOT' : 'NASDAQ',
      sector: 'Diversified Tech & Global Markets',
      weight: 'Active Benchmark',
      lastPrice: `$${basePrice.toFixed(2)}`,
      rawPrice: basePrice,
      changePercent: '+2.14%',
      changeValue: '+$3.20',
      isPositive: true,
      marketCap: '1.42 TUSD',
      volume24h: '32.40M Shs',
      range52w: `${(basePrice * 0.7).toFixed(1)} - ${(basePrice * 1.2).toFixed(1)}`,
      dayHigh: `$${(basePrice * 1.02).toFixed(2)}`,
      dayLow: `$${(basePrice * 0.98).toFixed(2)}`,
      peRatio: '32.5x',
      strategyName: 'Pine Script™ Strategy: Momentum Breakout v4 active',
      chartData: {
        '1D': [
          { time: '09:30', price: basePrice * 0.98, close: basePrice * 0.98 },
          { time: '12:00', price: basePrice * 1.01, close: basePrice * 1.01 },
          { time: '16:00', price: basePrice, close: basePrice },
        ],
        '5D': [
          { time: 'Mon', price: basePrice * 0.96, close: basePrice * 0.96 },
          { time: 'Wed', price: basePrice * 0.99, close: basePrice * 0.99 },
          { time: 'Fri', price: basePrice, close: basePrice },
        ],
        '1M': primaryAssets['NVDA'].chartData['1M'].map((d) => ({
          ...d,
          price: (d.price / 141.24) * basePrice,
        })),
        '1Y': [
          { time: 'Q1', price: basePrice * 0.75, close: basePrice * 0.75 },
          { time: 'Q2', price: basePrice * 0.88, close: basePrice * 0.88 },
          { time: 'Q3', price: basePrice * 0.94, close: basePrice * 0.94 },
          { time: 'Q4', price: basePrice, close: basePrice },
        ],
        'ALL': [
          { time: '2021', price: basePrice * 0.45, close: basePrice * 0.45 },
          { time: '2022', price: basePrice * 0.55, close: basePrice * 0.55 },
          { time: '2023', price: basePrice * 0.80, close: basePrice * 0.80 },
          { time: '2024', price: basePrice, close: basePrice },
        ],
      },
    };
  }, [selectedSymbol]);

  // Live simulation tick engine (every 2.5s slightly changes random ticker & benchmark prices)
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Pick a random ticker item to tick
      setTickerItems((prev) => {
        const randomIndex = Math.floor(Math.random() * prev.length);
        return prev.map((item, idx) => {
          if (idx !== randomIndex) return item;
          const delta = (Math.random() - 0.48) * (item.rawPrice * 0.002);
          const newPrice = item.rawPrice + delta;
          const isPos = delta >= 0;
          return {
            ...item,
            rawPrice: newPrice,
            price: newPrice > 1000 ? newPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : newPrice.toFixed(2),
            changePercent: `${isPos ? '+' : ''}${(parseFloat(item.changePercent) + (delta / item.rawPrice) * 10).toFixed(2)}%`,
            isPositive: isPos,
          };
        });
      });

      // Also subtly update one benchmark
      setBenchmarks((prev) => {
        const randIdx = Math.floor(Math.random() * prev.length);
        return prev.map((b, idx) => {
          if (idx !== randIdx) return b;
          const delta = (Math.random() - 0.48) * 0.02;
          const newPts = [...b.points.slice(1), Math.max(1, Math.min(24, b.points[b.points.length - 1] + (Math.random() > 0.5 ? 1 : -1)))];
          return {
            ...b,
            points: newPts,
          };
        });
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isStreaming]);

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSymbol = useCallback((symbol: string) => {
    const cleanSym = symbol.replace(/[^A-Za-z0-9]/g, '');
    setSelectedSymbol(cleanSym || symbol);
    // Smooth scroll to primary chart
    const chartElem = document.getElementById('primary-chart-section');
    if (chartElem) {
      chartElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, []);

  const handleSelectBenchmark = (benchmark: BenchmarkCardData) => {
    if (benchmark.id === 'spx') handleSelectSymbol('SPX');
    else if (benchmark.id === 'ndx') handleSelectSymbol('NDX');
    else if (benchmark.id === 'dji') handleSelectSymbol('DJI');
    else if (benchmark.id === 'btcusd') handleSelectSymbol('BTCUSD');
    else if (benchmark.id === 'gold') handleSelectSymbol('GOLD');
    else if (benchmark.id === 'us10y') handleSelectSymbol('US10Y');
  };

  const handleOpenScreener = (category: string) => {
    setScreenerCategory(category);
    setIsScreenerOpen(true);
  };

  return (
    <div className="bg-[#0D1117] text-[#dfe2f2] font-sans min-h-screen flex flex-col selection:bg-[#2962ff]/30 selection:text-white">
      {/* Top Fixed Header with ticker tape */}
      <Header
        tickerItems={tickerItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        onSelectSymbol={handleSelectSymbol}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 flex-1 flex flex-col">
        {/* Top Hero Section: Title, UTC clock, Region, 6 Benchmark Cards */}
        <HeroSection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          benchmarks={benchmarks}
          onSelectBenchmark={handleSelectBenchmark}
        />

        {/* Featured Asset & Market Dynamics Section (8 Cols + 4 Cols) */}
        <div id="primary-chart-section" className="w-full max-w-[1680px] mx-auto px-4 md:px-6 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Primary Interactive Chart */}
            <PrimaryChartCard
              asset={currentAsset}
              onLaunchSuperChart={() => setIsSuperChartOpen(true)}
              selectedTimeframe={selectedTimeframe}
              setSelectedTimeframe={setSelectedTimeframe}
            />

            {/* Market Movers Multi-Tab Panel */}
            <MarketMoversCard
              currentTab={moversTab}
              setCurrentTab={setMoversTab}
              activeItems={marketMoversActive}
              gainersItems={marketMoversGainers}
              volatileItems={marketMoversVolatile}
              onSelectSymbol={handleSelectSymbol}
              onViewAllMovers={() => setIsMoversOpen(true)}
            />
          </div>
        </div>

        {/* Asset Class Explorer (World Equities, Crypto/TVL, Commodities/Forex, Yield Curve) */}
        <AssetClassExplorer
          companies={biggestCompanies}
          cryptos={dominantCryptos}
          protocols={defiProtocols}
          commodities={commodityFutures}
          forex={forexPairs}
          yields={yieldPoints}
          sovereigns={sovereignYields}
          onSelectSymbol={handleSelectSymbol}
          onOpenScreener={handleOpenScreener}
        />

        {/* Events & Macro Indicators (Earnings & Economic Calendar) */}
        <MacroAndEarningsCalendar
          earnings={earningsItems}
          macros={macroIndicators}
          onSelectSymbol={handleSelectSymbol}
          onOpenCalendarModal={(type) => {
            handleOpenScreener(type === 'earnings' ? 'stocks' : 'macro');
          }}
        />
      </main>

      {/* Footer */}
      <Footer onSelectNavAction={(item) => {
        if (item.includes('SuperCharts')) setIsSuperChartOpen(true);
        else if (item.includes('Screener')) handleOpenScreener(item.includes('Crypto') ? 'crypto' : 'stocks');
        else if (item.includes('Calendar')) handleOpenScreener('macro');
        else setIsGetStartedOpen(true);
      }} />

      {/* Modals & Dialogs */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <SuperChartModal
        isOpen={isSuperChartOpen}
        onClose={() => setIsSuperChartOpen(false)}
        asset={currentAsset}
      />

      <MoversModal
        isOpen={isMoversOpen}
        onClose={() => setIsMoversOpen(false)}
        onSelectSymbol={handleSelectSymbol}
      />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        isStreaming={isStreaming}
        setIsStreaming={setIsStreaming}
        onApplyPreset={(preset) => {
          if (preset === 'Tech Megacaps') setSelectedSymbol('NVDA');
          else if (preset === 'Crypto Bluechips') setSelectedSymbol('BTCUSD');
          else if (preset === 'Macro & Commodities') setSelectedSymbol('GOLD');
          else setSelectedSymbol('MU');
        }}
      />

      <ScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        screenerType={screenerCategory}
        onSelectSymbol={handleSelectSymbol}
      />
    </div>
  );
}
