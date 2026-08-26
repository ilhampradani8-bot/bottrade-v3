// BitTrade V3 AssemblyScript Wasm Main Entrypoint
// Exported WebAssembly functions called by Node.js/Wasm Host

import { Indicators } from "./indicators";
import { MarketRegimeStrategy } from "./strategies";
import { BacktestEngine } from "./backtest";

export function calculateEMA(prices: Float64Array, period: i32): Float64Array {
    return Indicators.calculateEMA(prices, period);
}

export function calculateVolatilityStdDev(prices: Float64Array, window: i32): f64 {
    return Indicators.calculateVolatilityStdDev(prices, window);
}

export function calculateBollingerBands(prices: Float64Array, period: i32, multiplier: f64): Float64Array {
    return Indicators.calculateBollingerBands(prices, period, multiplier);
}

export function evaluateMarketRegime(closes: Float64Array, volumes: Float64Array): Float64Array {
    return MarketRegimeStrategy.evaluate(closes, volumes);
}

export function runBacktest(closes: Float64Array, volumes: Float64Array, initialBalance: f64, feeRate: f64): Float64Array {
    return BacktestEngine.runBacktest(closes, volumes, initialBalance, feeRate);
}
