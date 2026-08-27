'use client';

import React, { useState } from 'react';
import { Play, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react';

export const BacktestPanel: React.FC = () => {
  const [candles, setCandles] = useState<number>(100);
  const [capital, setCapital] = useState<number>(10000);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const handleRunBacktest = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8090/api/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candles, capital, feeRate: 0.0005 })
      });
      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      alert('Wasm Engine unreachable or backend server offline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="paper-card p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D7]">
        <div className="flex items-center space-x-2">
          <BarChart2 className="w-5 h-5 text-[#1C1B1A]" />
          <h3 className="font-bold text-base text-[#1C1B1A]">WebAssembly Quantitative Backtest</h3>
        </div>
        <span className="badge-paper font-mono">
          AssemblyScript Wasm Engine
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Controls */}
        <div className="space-y-4 bg-[#FAF8F5] p-4 rounded-lg border border-[#E6E1D7]">
          <div>
            <label className="block text-xs font-semibold text-[#43413E] mb-1">Candles Count (1m/5m/1h)</label>
            <input
              type="number"
              value={candles}
              onChange={(e) => setCandles(Number(e.target.value))}
              className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-[#E6E1D7] rounded focus:outline-none focus:ring-1 focus:ring-[#1C1B1A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#43413E] mb-1">Initial Capital ($)</label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full px-3 py-1.5 text-xs font-mono bg-white border border-[#E6E1D7] rounded focus:outline-none focus:ring-1 focus:ring-[#1C1B1A]"
            />
          </div>

          <button
            onClick={handleRunBacktest}
            disabled={loading}
            className="w-full paper-button flex items-center justify-center space-x-2 text-xs py-2 font-semibold"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{loading ? 'Executing Wasm Bytecode...' : 'Execute Wasm Backtest'}</span>
          </button>
        </div>

        {/* Output Metrics Display */}
        <div className="lg:col-span-2 bg-[#FFFFFF] p-4 rounded-lg border border-[#E6E1D7]">
          {results ? (
            <div>
              <div className="flex items-center space-x-2 mb-3 text-emerald-700 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Wasm Execution Success! Binary: {results.engine}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-[#FAF8F5] p-3 rounded border border-[#E6E1D7]">
                  <div className="text-xs text-[#6B6862]">Total Trades</div>
                  <div className="text-lg font-bold text-[#1C1B1A] font-mono">{results.total_trades}</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded border border-[#E6E1D7]">
                  <div className="text-xs text-[#6B6862]">Win Rate</div>
                  <div className="text-lg font-bold text-emerald-600 font-mono">{results.win_rate_pct}%</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded border border-[#E6E1D7]">
                  <div className="text-xs text-[#6B6862]">Total Return</div>
                  <div className="text-lg font-bold text-emerald-600 font-mono">+{results.total_return_pct}%</div>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded border border-[#E6E1D7]">
                  <div className="text-xs text-[#6B6862]">Win / Loss</div>
                  <div className="text-lg font-bold text-[#1C1B1A] font-mono">{results.winning_trades} / {results.losing_trades}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-36 flex flex-col items-center justify-center text-center text-[#6B6862] text-xs">
              <BarChart2 className="w-8 h-8 mb-2 stroke-1 text-[#C0B9A8]" />
              <p className="font-medium text-[#1C1B1A]">Simulasi Backtest Wasm High-Performance</p>
              <p className="text-[11px] mt-0.5">Klik "Execute Wasm Backtest" untuk kalkulasi matematis berbasis biner AssemblyScript.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
