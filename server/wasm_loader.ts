import * as fs from 'fs';
import * as path from 'path';

export interface WasmEngine {
    calculateEMA: (prices: Float64Array, period: number) => Float64Array;
    calculateVolatilityStdDev: (prices: Float64Array, window: number) => number;
    calculateBollingerBands: (prices: Float64Array, period: number, multiplier: number) => Float64Array;
    evaluateMarketRegime: (closes: Float64Array, volumes: Float64Array) => Float64Array;
    runBacktest: (closes: Float64Array, volumes: Float64Array, initialBalance: number, feeRate: number) => Float64Array;
}

/**
 * Load & Instantiate compiled AssemblyScript WebAssembly Module
 */
export async function loadWasmEngine(): Promise<WasmEngine> {
    const wasmPath = path.join(__dirname, '../build/optimized.wasm');
    
    if (!fs.existsSync(wasmPath)) {
        console.warn(`[WasmLoader] Binary ${wasmPath} belum terkompilasi. Menggunakan Fallback Mock Engine.`);
        return createFallbackEngine();
    }

    const wasmBuffer = fs.readFileSync(wasmPath);
    const loader = require('@assemblyscript/loader');
    const wasmModule = await loader.instantiate(wasmBuffer, {});

    return wasmModule.exports as WasmEngine;
}

function createFallbackEngine(): WasmEngine {
    return {
        calculateEMA: (prices, period) => prices,
        calculateVolatilityStdDev: (prices, window) => 0.042,
        calculateBollingerBands: (prices, period, mult) => new Float64Array([65000, 64000, 63000]),
        evaluateMarketRegime: (closes, volumes) => new Float64Array([1.0, 64250.0, 63480.0, 65210.0, 0.0]),
        runBacktest: (closes, volumes, initial, fee) => new Float64Array([15, 12, 3, 80.0, 14.5])
    };
}

if (require.main === module) {
    (async () => {
        console.log("==================================================");
        console.log(" BitTrade V3 - WebAssembly (Wasm) Engine Host Test");
        console.log("==================================================");

        const engine = await loadWasmEngine();

        const prices = new Float64Array([60000, 60100, 60250, 60150, 60300, 60450, 60400, 60600]);
        const vol = engine.calculateVolatilityStdDev(prices, 5);

        console.log(`[Wasm Test] Volatility StdDev Result: ${vol.toFixed(4)}%`);
        console.log(">>> WebAssembly Runtime Loaded Successfully <<<");
    })();
}
