'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';
import { MetricsOverview } from '@/components/MetricsOverview';
import { BotStatusPanel, BotInfo } from '@/components/BotStatusPanel';
import { BacktestPanel } from '@/components/BacktestPanel';
import { TradesJournal, TradeRecord } from '@/components/TradesJournal';
import { QuantTradingView } from '@/components/QuantTradingView';
import { WalletState } from '@/lib/web3';
import { RefreshCw, Server } from 'lucide-react';

export default function AppMainPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quant-trading'>('dashboard');
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    chainName: null,
    balance: null,
    isConnected: false
  });

  const [engineConnected, setEngineConnected] = useState<boolean>(false);
  const [bots, setBots] = useState<BotInfo[]>([
    { name: "Bot A - Market Regime (BTC)", regime: "Sideways BB", volatility: "0.042%", status: "Active", pnl: "+$320.50" },
    { name: "Bot B - Smart DCA (ETH/SOL)", regime: "Layer 1 Accumulation", rsi: 42.5, status: "Active", pnl: "+$410.20" },
    { name: "Bot E - StatARB Engine (ETH/BTC)", regime: "Suspended (Fee Research)", status: "Idle", pnl: "$0.00" }
  ]);

  const [trades, setTrades] = useState<TradeRecord[]>([
    { time: "13:01:22", bot: "Bot A (Regime)", symbol: "BTCUSDT", side: "BUY", price: "$64,250.00", pnl: "+1.5% TP" },
    { time: "12:45:10", bot: "Bot B (SmartDCA)", symbol: "ETHUSDT", side: "BUY", price: "$2,750.00", pnl: "Open Layer 1" },
    { time: "11:30:00", bot: "Bot A (Regime)", symbol: "SOLUSDT", side: "SELL", price: "$145.20", pnl: "+$45.10 (+2.1%)" },
    { time: "10:15:44", bot: "Bot B (SmartDCA)", symbol: "BTCUSDT", side: "SELL", price: "$64,900.00", pnl: "+$180.00 (+1.8%)" }
  ]);

  useEffect(() => {
    fetch('http://localhost:8090/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setEngineConnected(true);
        }
      })
      .catch(() => setEngineConnected(false));
  }, []);

  const handleTriggerSignal = async (botName: string, action: 'BUY' | 'SELL') => {
    const symbol = botName.includes('BTC') ? 'BTCUSDT' : botName.includes('ETH') ? 'ETHUSDT' : 'SOLUSDT';
    const now = new Date().toLocaleTimeString();

    try {
      if (engineConnected) {
        const res = await fetch('http://localhost:8090/api/trade/signal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wallet: wallet.address || '0xSimulatedWallet000000000000000',
            network: wallet.chainName || 'Sepolia Testnet',
            strategy: botName,
            action,
            amount: 1.0
          })
        });
        const data = await res.json();
        
        const newRecord: TradeRecord = {
          time: now,
          bot: botName,
          symbol,
          side: action,
          price: action === 'BUY' ? '$64,300.00' : '$64,500.00',
          pnl: 'Executed Testnet',
          hash: data.transactionHash
        };
        setTrades(prev => [newRecord, ...prev]);
        alert(`Testnet ${action} Signal Triggered for ${botName}!\nTx Hash: ${data.transactionHash}`);
      } else {
        const newRecord: TradeRecord = {
          time: now,
          bot: botName,
          symbol,
          side: action,
          price: action === 'BUY' ? '$64,300.00' : '$64,500.00',
          pnl: 'Simulated Trade'
        };
        setTrades(prev => [newRecord, ...prev]);
        alert(`Simulated ${action} Signal Triggered for ${botName}!`);
      }
    } catch (err: any) {
      alert('Signal trigger error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAF8F5]">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar wallet={wallet} onWalletChange={setWallet} engineConnected={engineConnected} />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {activeTab === 'dashboard' ? (
            <div>
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#E6E1D7]">
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-2xl font-extrabold text-[#1C1B1A] tracking-tight">
                      Paper White Executive Dashboard
                    </h1>
                    <span className="badge-paper font-mono">v3.0 Decoupled</span>
                  </div>
                  <p className="text-xs text-[#6B6862] mt-1">
                    Pemantauan Bot Trading Kuantitatif Wasm & Engine Testnet Web3 Real-Time
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <div className="bg-white border border-[#E6E1D7] px-3 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-2 shadow-sm">
                    <Server className="w-3.5 h-3.5 text-[#1C1B1A]" />
                    <span className="text-[#6B6862]">Backend Host:</span>
                    <strong className="text-[#1C1B1A]">Port 8090</strong>
                  </div>

                  <button
                    onClick={() => location.reload()}
                    className="paper-button-secondary text-xs flex items-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-[#1C1B1A]" />
                    <span>Refresh</span>
                  </button>
                </div>
              </div>

              {/* Paper White Metrics Grid */}
              <MetricsOverview wallet={wallet} />

              {/* Bot Status Panel (Decoupled Engine) */}
              <BotStatusPanel bots={bots} onTriggerSignal={handleTriggerSignal} />

              {/* WebAssembly Backtest Simulator */}
              <BacktestPanel />

              {/* Real-time Web3 Testnet Trades Journal */}
              <TradesJournal trades={trades} />
            </div>
          ) : (
            /* Quant Trading View */
            <QuantTradingView wallet={wallet} />
          )}

        </main>

        <footer className="bg-white border-t border-[#E6E1D7] py-4 mt-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-[#6B6862] font-mono">
            BitTrade V3 — Paper White Web3 Next.js Frontend + AssemblyScript WebAssembly Engine Core
          </div>
        </footer>
      </div>
    </div>
  );
}
