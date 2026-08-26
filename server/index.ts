import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { loadWasmEngine, WasmEngine } from './wasm_loader';

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../web-ui')));

let wasmEngine: WasmEngine;

app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        engine: 'BitTrade V3 AssemblyScript Wasm Engine',
        version: '3.0.0',
        runtime: 'WebAssembly (V8 / Node.js JIT)'
    });
});

app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        engine_type: "AssemblyScript (WebAssembly Runtime)",
        bots: [
            { name: "Bot A - Market Regime (BTC)", regime: "Sideways BB", volatility: "0.042%", status: "Active" },
            { name: "Bot B - Smart DCA (ETH)", regime: "Layer 1 Accumulation", rsi: 42.5, status: "Active" },
            { name: "Bot E - StatARB Engine", regime: "Suspended (Fee Research)", status: "Idle" }
        ]
    });
});

app.post('/api/backtest', async (req: Request, res: Response) => {
    const candlesCount = 100;
    const closes = new Float64Array(candlesCount);
    const volumes = new Float64Array(candlesCount);

    let price = 60000;
    for (let i = 0; i < candlesCount; i++) {
        price += (i % 2 === 0 ? 120 : -100);
        closes[i] = price;
        volumes[i] = 10 + (i % 5);
    }

    const results = wasmEngine.runBacktest(closes, volumes, 10000, 0.0005);

    res.json({
        total_trades: results[0],
        winning_trades: results[1],
        losing_trades: results[2],
        win_rate_pct: results[3],
        total_return_pct: results[4],
        engine: 'AssemblyScript WebAssembly Binary'
    });
});

async function startServer() {
    wasmEngine = await loadWasmEngine();
    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(` ⚡ BitTrade V3 Wasm Host Server Active`);
        console.log(` 🌐 Dashboard: http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
}

startServer();
