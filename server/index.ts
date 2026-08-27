import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { loadWasmEngine, WasmEngine } from './wasm_loader';

const app = express();
const PORT = process.env.PORT || 8090;

// Enable CORS for Next.js frontend & Vercel deployments
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Serve legacy static web-ui if available
app.use(express.static(path.join(__dirname, '../web-ui')));
app.use(express.static(path.join(__dirname, '../frontend/out')));

let wasmEngine: WasmEngine;

app.get('/api/health', (req: Request, res: Response) => {
    res.json({
        status: 'ok',
        engine: 'BitTrade V3 AssemblyScript Wasm Engine',
        version: '3.0.0',
        runtime: 'WebAssembly (V8 / Node.js JIT)',
        timestamp: new Date().toISOString()
    });
});

app.get('/api/status', (req: Request, res: Response) => {
    res.json({
        engine_type: "AssemblyScript (WebAssembly Runtime)",
        architecture: "Decoupled Wasm Engine Backend",
        bots: [
            { name: "Bot A - Market Regime (BTC)", regime: "Sideways BB", volatility: "0.042%", status: "Active", pnl: "+$320.50" },
            { name: "Bot B - Smart DCA (ETH)", regime: "Layer 1 Accumulation", rsi: 42.5, status: "Active", pnl: "+$410.20" },
            { name: "Bot E - StatARB Engine", regime: "Suspended (Fee Research)", status: "Idle", pnl: "$0.00" }
        ],
        testnet_networks: ["Sepolia", "Arbitrum Sepolia", "Monad Testnet", "Base Sepolia"]
    });
});

app.post('/api/backtest', async (req: Request, res: Response) => {
    try {
        const candlesCount = req.body?.candles || 100;
        const closes = new Float64Array(candlesCount);
        const volumes = new Float64Array(candlesCount);

        let price = 60000;
        for (let i = 0; i < candlesCount; i++) {
            price += (i % 2 === 0 ? 120 : -100);
            closes[i] = price;
            volumes[i] = 10 + (i % 5);
        }

        const initialCapital = req.body?.capital || 10000;
        const feeRate = req.body?.feeRate || 0.0005;

        const results = wasmEngine.runBacktest(closes, volumes, initialCapital, feeRate);

        res.json({
            success: true,
            total_trades: results[0],
            winning_trades: results[1],
            losing_trades: results[2],
            win_rate_pct: Number(results[3].toFixed(2)),
            total_return_pct: Number(results[4].toFixed(2)),
            engine: 'AssemblyScript WebAssembly Binary'
        });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/trade/signal', (req: Request, res: Response) => {
    const { wallet, network, strategy, action, amount } = req.body;
    res.json({
        success: true,
        transactionHash: "0x" + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        executedAt: new Date().toISOString(),
        details: { wallet, network, strategy, action, amount }
    });
});

async function startServer() {
    wasmEngine = await loadWasmEngine();
    app.listen(PORT, () => {
        console.log(`==================================================`);
        console.log(` ⚡ BitTrade V3 Standalone Wasm Engine Backend Active`);
        console.log(` 🌐 Host API: http://localhost:${PORT}`);
        console.log(`==================================================`);
    });
}

startServer();
