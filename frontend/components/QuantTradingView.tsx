'use client';

import React, { useState } from 'react';
import { WalletState } from '@/lib/web3';
import { LineChart, ArrowRight, ShieldCheck, Zap, DollarSign, Activity, CheckCircle, Clock } from 'lucide-react';

interface QuantTradingViewProps {
  wallet: WalletState;
}

export const QuantTradingView: React.FC<QuantTradingViewProps> = ({ wallet }) => {
  const [executing, setExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([
    "[10:15:00] Initialized Quant Trading Session.",
    "[10:15:05] Synced capital allocation: $10,000.00 baseline -> $11,420.50 equity (+14.2% ROI).",
    "[10:15:10] AssemblyScript Wasm Market Regime Engine: Sideways BB active."
  ]);

  const handleSimulateFlow = () => {
    setExecuting(true);
    setActiveStep(1);
    addLog("[10:16:01] ⚡ Step 1: Wasm Signal Engine generated BUY signal for BTCUSDT.");

    setTimeout(() => {
      setActiveStep(2);
      addLog("[10:16:03] 🛡️ Step 2: Risk & Slippage Gate passed (Slippage: 0.02%, Max Loss: 1.5%).");
    }, 1200);

    setTimeout(() => {
      setActiveStep(3);
      addLog(`[10:16:05] 🔑 Step 3: Web3 Wallet (${wallet.address ? wallet.address.slice(0, 6) + '...' : '0xSimulatedWallet'}) signed testnet payload.`);
    }, 2400);

    setTimeout(() => {
      setActiveStep(4);
      const hash = "0x" + Array.from({length: 32}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      addLog(`[10:16:07]  Step 4: On-Chain Execution complete on ${wallet.chainName || 'Sepolia Testnet'}. Hash: ${hash}`);
      setExecuting(false);
    }, 3600);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev]);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title Header */}
      <div className="pb-4 border-b border-[#E6E1D7] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1B1A] tracking-tight">Quant Trading Console</h1>
          <p className="text-xs text-[#6B6862]">Log Modal Progress & Visual Alur Transaksi Web3 Wasm Engine</p>
        </div>
        <span className="badge-paper badge-emerald font-mono">
          Quant Strategy Engine v3
        </span>
      </div>

      {/* SECTION 1: LOG MODAL PROGRESS & CAPITAL GROWTH */}
      <div className="paper-card p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D7]">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-base text-[#1C1B1A]">Log Modal Progress & Capital Allocation</h3>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700">
            Target Growth: $15,000.00
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E6E1D7]">
            <div className="text-xs text-[#6B6862] font-medium">Modal Awal (Initial Capital)</div>
            <div className="text-xl font-bold text-[#1C1B1A] font-mono mt-1">$10,000.00</div>
            <div className="text-[11px] text-[#6B6862] mt-1">Baseline Allocation</div>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E6E1D7]">
            <div className="text-xs text-[#6B6862] font-medium">Ekuitas Modal Saat Ini</div>
            <div className="text-xl font-bold text-emerald-700 font-mono mt-1">$11,420.50</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">+14.2% Total Growth PnL</div>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-lg border border-[#E6E1D7]">
            <div className="text-xs text-[#6B6862] font-medium">Reserved Margin & Risk</div>
            <div className="text-xl font-bold text-[#1C1B1A] font-mono mt-1">$2,284.10</div>
            <div className="text-[11px] text-[#6B6862] mt-1">20% Max Exposure Limit</div>
          </div>
        </div>

        {/* Modal Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold text-[#43413E] mb-1">
            <span>Progress Menuju Target Modal ($15,000)</span>
            <span>76.1% Reached</span>
          </div>
          <div className="w-full bg-[#E6E1D7] h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: '76.1%' }}></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: VISUAL ALUR TRANSAKSI (TRANSACTION FLOW PIPELINE) */}
      <div className="paper-card p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D7]">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base text-[#1C1B1A]">Alur Transaksi Quant Engine</h3>
          </div>
          <button
            onClick={handleSimulateFlow}
            disabled={executing}
            className="paper-button text-xs py-1.5 px-3 flex items-center space-x-1.5"
          >
            <span>{executing ? 'Eksekusi Alur...' : '▶ Simulasi Alur Transaksi'}</span>
          </button>
        </div>

        {/* Step-by-Step Flow Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-4">
          
          <div className={`p-4 rounded-lg border transition ${activeStep >= 1 ? 'bg-emerald-50 border-emerald-300' : 'bg-[#FAF8F5] border-[#E6E1D7]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E6E1D7]">STEP 1</span>
              {activeStep >= 1 && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="font-bold text-xs text-[#1C1B1A]">Wasm Signal Engine</h4>
            <p className="text-[11px] text-[#6B6862] mt-1">Kalkulasi matematika indikator EMA/BB di WebAssembly.</p>
          </div>

          <div className={`p-4 rounded-lg border transition ${activeStep >= 2 ? 'bg-emerald-50 border-emerald-300' : 'bg-[#FAF8F5] border-[#E6E1D7]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E6E1D7]">STEP 2</span>
              {activeStep >= 2 && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="font-bold text-xs text-[#1C1B1A]">Risk & Slippage Gate</h4>
            <p className="text-[11px] text-[#6B6862] mt-1">Verifikasi batas volatilitas & toleransi slippage &lt; 0.05%.</p>
          </div>

          <div className={`p-4 rounded-lg border transition ${activeStep >= 3 ? 'bg-emerald-50 border-emerald-300' : 'bg-[#FAF8F5] border-[#E6E1D7]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E6E1D7]">STEP 3</span>
              {activeStep >= 3 && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="font-bold text-xs text-[#1C1B1A]">Web3 Wallet Sign</h4>
            <p className="text-[11px] text-[#6B6862] mt-1">Tanda tangan payload transaksi di Testnet Wallet.</p>
          </div>

          <div className={`p-4 rounded-lg border transition ${activeStep >= 4 ? 'bg-emerald-50 border-emerald-300' : 'bg-[#FAF8F5] border-[#E6E1D7]'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E6E1D7]">STEP 4</span>
              {activeStep >= 4 && <CheckCircle className="w-4 h-4 text-emerald-600" />}
            </div>
            <h4 className="font-bold text-xs text-[#1C1B1A]">On-Chain Execution</h4>
            <p className="text-[11px] text-[#6B6862] mt-1">Konfirmasi transaksi akhir di EVM Testnet Blockchain.</p>
          </div>

        </div>
      </div>

      {/* SECTION 3: LIVE LOG MONITOR & CONSOLE */}
      <div className="paper-card p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E6E1D7]">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-[#1C1B1A]" />
            <h3 className="font-bold text-base text-[#1C1B1A]">Console Log Eksekusi Real-Time</h3>
          </div>
          <span className="text-xs font-mono text-[#6B6862]">Live Stream</span>
        </div>

        <div className="bg-[#1C1B1A] text-[#FAF8F5] p-4 rounded-lg font-mono text-xs h-48 overflow-y-auto space-y-1.5 border border-[#333230]">
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-emerald-400">&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
