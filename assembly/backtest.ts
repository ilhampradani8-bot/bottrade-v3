// BitTrade V3 AssemblyScript Wasm Backtest Engine
// Fast parallel backtesting loop executing in WebAssembly Linear Memory

import { MarketRegimeStrategy } from "./strategies";

export class BacktestEngine {
    /**
     * Run high-speed Wasm backtest over candle close & volume arrays
     * Returns: [total_trades, winning_trades, losing_trades, win_rate_pct, total_return_pct]
     */
    static runBacktest(closes: Float64Array, volumes: Float64Array, initialBalance: f64, feeRate: f64): Float64Array {
        const stats = new Float64Array(5);
        let balance: f64 = initialBalance;
        let positionPrice: f64 = 0.0;
        let positionAmount: f64 = 0.0;
        let inPosition: bool = false;

        let totalTrades: i32 = 0;
        let winTrades: i32 = 0;
        let lossTrades: i32 = 0;

        const totalCandles = closes.length;

        for (let i = 50; i < totalCandles; i++) {
            // Slice sub-arrays for evaluation
            const sliceCloses = closes.subarray(0, i as i32);
            const sliceVolumes = volumes.subarray(0, i as i32);

            const signal = MarketRegimeStrategy.evaluate(sliceCloses, sliceVolumes);
            const action = signal[0];
            const currentPrice = closes[i];

            if (action == 1.0 && !inPosition) {
                // BUY Execution
                const fee = balance * feeRate;
                const capital = balance - fee;
                positionAmount = capital / currentPrice;
                positionPrice = currentPrice;
                inPosition = true;
                totalTrades++;
            } else if (inPosition && (currentPrice >= signal[3] || currentPrice <= signal[2])) {
                // SELL Execution (TP or SL)
                const gross = positionAmount * currentPrice;
                const fee = gross * feeRate;
                balance = gross - fee;

                if (currentPrice > positionPrice) {
                    winTrades++;
                } else {
                    lossTrades++;
                }
                inPosition = false;
            }
        }

        const winRate = totalTrades > 0 ? ((winTrades as f64) / (totalTrades as f64)) * 100.0 : 0.0;
        const totalReturn = ((balance - initialBalance) / initialBalance) * 100.0;

        stats[0] = totalTrades as f64;
        stats[1] = winTrades as f64;
        stats[2] = lossTrades as f64;
        stats[3] = winRate;
        stats[4] = totalReturn;

        return stats;
    }
}
