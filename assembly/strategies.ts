// BitTrade V3 AssemblyScript Strategy Engine
// Returns float array encoding signal: [action (0=Hold,1=Buy,2=Sell), target_price, stop_loss, take_profit, regime_code]

import { Indicators } from "./indicators";

export class MarketRegimeStrategy {
    static volatilityThreshold: f64 = 0.075;

    /**
     * Evaluasi Strategi Market Regime V3 (Sideways BB vs Trending EMA Crossover)
     */
    static evaluate(closes: Float64Array, volumes: Float64Array): Float64Array {
        const result = new Float64Array(5);
        result[0] = 0.0; // Hold
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = 0.0;
        result[4] = 0.0; // 0=Sideways, 1=TrendingUp

        const len = closes.length;
        if (len < 50) {
            return result;
        }

        const lastPrice = closes[len - 1];
        result[1] = lastPrice;

        // 1. Calculate Volatility StdDev
        const volStdDev = Indicators.calculateVolatilityStdDev(closes, 20);

        if (volStdDev < MarketRegimeStrategy.volatilityThreshold) {
            // Regime: Sideways (Mean Reversion Bollinger Bands 50)
            result[4] = 0.0;
            const bb = Indicators.calculateBollingerBands(closes, 50, 2.0);
            if (bb.length === 3) {
                const upper = bb[0];
                const lower = bb[2];
                const spreadPct = (upper - lower) / lower * 100.0;

                if (spreadPct >= 1.0 && lastPrice <= lower) {
                    result[0] = 1.0; // BUY Signal
                    result[2] = lastPrice * 0.988; // SL 1.2%
                    result[3] = lastPrice * 1.015; // TP 1.5%
                    return result;
                }
            }
        } else {
            // Regime: Trending (EMA 13/34 Crossover + Volume Surge VSR)
            result[4] = 1.0;
            const ema13 = Indicators.calculateEMA(closes, 13);
            const ema34 = Indicators.calculateEMA(closes, 34);
            const vsr = Indicators.calculateVSR(volumes, 20);

            if (ema13.length > 0 && ema34.length > 0) {
                const lastEma13 = ema13[ema13.length - 1];
                const lastEma34 = ema34[ema34.length - 1];

                if (lastEma13 > lastEma34 && vsr > 1.2) {
                    result[0] = 1.0; // BUY Signal
                    result[2] = lastPrice * 0.988; // SL 1.2%
                    result[3] = lastPrice * 1.025; // TP 2.5%
                    return result;
                }
            }
        }

        return result;
    }
}
