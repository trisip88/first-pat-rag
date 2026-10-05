export type Timeframe = '1D' | '5D' | '1M' | '1Y' | 'ALL';

export type ChartType = 'area' | 'candlestick';

export type Region = 'Global Markets' | 'Americas (NYSE/CME)' | 'Europe (LSE/DAX)' | 'Asia-Pacific (TSE/HKEX)';

export type Category = 
  | 'Overview' 
  | 'Indices' 
  | 'Stocks' 
  | 'Crypto' 
  | 'Futures' 
  | 'Forex' 
  | 'Bonds & Yields' 
  | 'ETFs' 
  | 'Macro Economy';

export type MoversTab = 'active' | 'gainers' | 'volatile';

export interface ChartDataPoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface BenchmarkCardData {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  price: string;
  rawPrice: number;
  changePercent: string;
  changeValue: string;
  isPositive: boolean;
  points: number[];
  unit?: string;
}

export interface PrimaryAssetData {
  symbol: string;
  name: string;
  exchange: string;
  sector: string;
  weight: string;
  lastPrice: string;
  rawPrice: number;
  changePercent: string;
  changeValue: string;
  isPositive: boolean;
  marketCap: string;
  volume24h: string;
  range52w: string;
  dayHigh: string;
  dayLow: string;
  peRatio?: string;
  strategyName: string;
  chartData: Record<Timeframe, ChartDataPoint[]>;
}

export interface MoverItem {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  volume: string;
  price: string;
  rawPrice: number;
  changePercent: string;
  isPositive: boolean;
}

export interface BiggestCompany {
  rank: number;
  symbol: string;
  name: string;
  lastPrice: string;
  rawPrice: number;
  changePercent: string;
  isPositive: boolean;
  marketCap: string;
  sector?: string;
}

export interface DominantCrypto {
  symbol: string;
  name: string;
  price: string;
  rawPrice: number;
  changePercent: string;
  isPositive: boolean;
  marketCap: string;
}

export interface DefiProtocol {
  rank: number;
  symbol: string;
  name: string;
  tvl: string;
}

export interface CommodityFuture {
  symbol: string;
  name: string;
  unit: string;
  price: string;
  rawPrice: number;
  changePercent: string;
  isPositive: boolean;
}

export interface ForexPair {
  pair: string;
  rate: string;
  changePercent: string;
  isPositive: boolean;
}

export interface YieldTenor {
  tenor: string;
  yieldRate: string;
  changeBps: string;
  isPositive: boolean;
}

export interface SovereignYield {
  country: string;
  yieldRate: string;
  changePercent: string;
  isPositive: boolean;
}

export interface EarningsItem {
  id: string;
  symbol: string;
  company: string;
  timing: string;
  timeframe: string;
  consensusEps: string;
  isCompleted?: boolean;
  estimateEps?: string;
}

export interface MacroIndicator {
  id: string;
  currency: string;
  title: string;
  volatilityPips: number;
  countdown: string;
  forecast: string;
  previous: string;
  impact: 'Extreme' | 'High' | 'Moderate' | 'Low';
}

export interface TickerTapeItem {
  symbol: string;
  price: string;
  rawPrice: number;
  changePercent: string;
  isPositive: boolean;
}
