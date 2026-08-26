// BitTrade V3 AssemblyScript Indicators Module (WebAssembly Engine)
// Strict Type Safety: f64, i32, Float64Array

export class Indicators {
    /**
     * Hitung Exponential Moving Average (EMA)
     */
    static calculateEMA(prices: Float64Array, period: i32): Float64Array {
        const len = prices.length;
        if (len < period || period <= 0) {
            return new Float64Array(0);
        }

        const result = new Float64Array(len);
        const k: f64 = 2.0 / (period as f64 + 1.0);

        // Calculate initial SMA
        let sum: f64 = 0.0;
        for (let i = 0; i < period; i++) {
            sum += prices[i];
        }
        const initialSMA: f64 = sum / (period as f64);
        result[period - 1] = initialSMA;

        let prevEMA: f64 = initialSMA;
        for (let i = period; i < len; i++) {
            const currentPrice = prices[i];
            const ema: f64 = (currentPrice * k) + (prevEMA * (1.0 - k));
            result[i] = ema;
            prevEMA = ema;
        }

        return result;
    }

    /**
     * Hitung Volatilitas Standar Deviasi Persentase (StdDev Volatility)
     */
    static calculateVolatilityStdDev(prices: Float64Array, window: i32): f64 {
        const len = prices.length;
        if (len < window + 1 || window <= 0) {
            return 0.0;
        }

        const returns = new Float64Array(window);
        let returnSum: f64 = 0.0;

        const startIndex = len - window - 1;
        for (let i = 0; i < window; i++) {
            const p0 = prices[startIndex + i];
            const p1 = prices[startIndex + i + 1];
            const ret = (p1 - p0) / p0;
            returns[i] = ret;
            returnSum += ret;
        }

        const mean: f64 = returnSum / (window as f64);
        let varianceSum: f64 = 0.0;
        for (let i = 0; i < window; i++) {
            const diff = returns[i] - mean;
            varianceSum += diff * diff;
        }

        const variance: f64 = varianceSum / (window as f64);
        return Math.sqrt(variance) * 100.0; // Dalam %
    }

    /**
     * Hitung Bollinger Bands (Upper, Middle, Lower) untuk index terakhir
     */
    static calculateBollingerBands(prices: Float64Array, period: i32, multiplier: f64): Float64Array {
        const len = prices.length;
        if (len < period || period <= 0) {
            return new Float64Array(0);
        }

        let sum: f64 = 0.0;
        const startIndex = len - period;
        for (let i = 0; i < period; i++) {
            sum += prices[startIndex + i];
        }
        const middle: f64 = sum / (period as f64);

        let varianceSum: f64 = 0.0;
        for (let i = 0; i < period; i++) {
            const diff = prices[startIndex + i] - middle;
            varianceSum += diff * diff;
        }
        const stdDev: f64 = Math.sqrt(varianceSum / (period as f64));

        const upper: f64 = middle + (multiplier * stdDev);
        const lower: f64 = middle - (multiplier * stdDev);

        const bb = new Float64Array(3);
        bb[0] = upper;
        bb[1] = middle;
        bb[2] = lower;
        return bb;
    }

    /**
     * Hitung Volume Surge Ratio (VSR)
     */
    static calculateVSR(volumes: Float64Array, lookback: i32): f64 {
        const len = volumes.length;
        if (len < lookback + 1 || lookback <= 0) {
            return 1.0;
        }

        const lastVolume = volumes[len - 1];
        let sumPrev: f64 = 0.0;
        const startIndex = len - lookback - 1;

        for (let i = 0; i < lookback; i++) {
            sumPrev += volumes[startIndex + i];
        }

        const avgPrev: f64 = sumPrev / (lookback as f64);
        if (avgPrev == 0.0) return 1.0;
        return lastVolume / avgPrev;
    }
}
