'use client';

import React from 'react';
import { WalletState } from '@/lib/web3';
import { TrendingUp, Layers, Target, Trophy, ShieldAlert } from 'lucide-react';

interface MetricsOverviewProps {
  wallet: WalletState;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({ wallet }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Metric 1: Wallet Testnet Balance */}
      <div className="paper-card p-4">
        <div className="flex items-center justify-between text-[#6B6862] text-xs font-medium mb-1">
          <span>Testnet Portfolio Balance</span>
          <TrendingUp className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="text-xl font-bold text-[#1C1B1A] font-mono">
          {wallet.isConnected ? `${wallet.balance} ETH` : '$12,450.80'}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="badge-paper badge-emerald">+14.2% Total PnL</span>
          <span className="text-[#6B6862] font-mono">{wallet.chainName || 'Sepolia Testnet'}</span>
        </div>
      </div>

      {/* Metric 2: Active Market Regime */}
      <div className="paper-card p-4">
        <div className="flex items-center justify-between text-[#6B6862] text-xs font-medium mb-1">
          <span>Active Market Regime</span>
          <Layers className="w-4 h-4 text-blue-600" />
        </div>
        <div className="text-xl font-bold text-[#1C1B1A]">
          Sideways BB
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-[#6B6862]">StdDev Volatility:</span>
          <span className="font-mono font-semibold text-[#1C1B1A]">0.042%</span>
        </div>
      </div>

      {/* Metric 3: Smart DCA Status */}
      <div className="paper-card p-4">
        <div className="flex items-center justify-between text-[#6B6862] text-xs font-medium mb-1">
          <span>Smart DCA Accumulation</span>
          <Target className="w-4 h-4 text-amber-600" />
        </div>
        <div className="text-xl font-bold text-[#1C1B1A]">
          Layer 1 Active
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-[#6B6862]">VSR: 1.05</span>
          <span className="font-mono font-semibold text-[#1C1B1A]">RSI-14: 42.5</span>
        </div>
      </div>

      {/* Metric 4: 24h Win Rate */}
      <div className="paper-card p-4">
        <div className="flex items-center justify-between text-[#6B6862] text-xs font-medium mb-1">
          <span>24h Engine Win Rate</span>
          <Trophy className="w-4 h-4 text-[#1C1B1A]" />
        </div>
        <div className="text-xl font-bold text-[#1C1B1A] font-mono">
          78.5%
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="badge-paper">11 Win / 3 Loss</span>
          <span className="text-xs text-emerald-600 font-medium">Decoupled Wasm</span>
        </div>
      </div>

    </div>
  );
};
