'use client';

import React from 'react';
import { Cpu, Play, Pause, RefreshCw } from 'lucide-react';

export interface BotInfo {
  name: string;
  regime: string;
  volatility?: string;
  rsi?: number;
  status: string;
  pnl?: string;
}

interface BotStatusPanelProps {
  bots: BotInfo[];
  onTriggerSignal: (botName: string, action: 'BUY' | 'SELL') => void;
}

export const BotStatusPanel: React.FC<BotStatusPanelProps> = ({ bots, onTriggerSignal }) => {
  return (
    <div className="paper-card p-5 mb-6">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D7]">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-[#1C1B1A]" />
          <h3 className="font-bold text-base text-[#1C1B1A]">Active Wasm Engine Bots</h3>
        </div>
        <span className="badge-paper badge-emerald font-mono">
          3 Strategies Loaded
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bots.map((bot, index) => (
          <div key={index} className="bg-[#FAF8F5] border border-[#E6E1D7] rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm text-[#1C1B1A]">{bot.name}</h4>
                <span className={`badge-paper ${bot.status === 'Active' ? 'badge-emerald' : 'badge-amber'}`}>
                  {bot.status}
                </span>
              </div>
              <div className="text-xs text-[#6B6862] space-y-1 mb-4">
                <p>Mode: <strong className="text-[#1C1B1A]">{bot.regime}</strong></p>
                {bot.volatility && <p>Volatility: <span className="font-mono text-[#1C1B1A]">{bot.volatility}</span></p>}
                {bot.rsi && <p>RSI Indicator: <span className="font-mono text-[#1C1B1A]">{bot.rsi}</span></p>}
                {bot.pnl && <p>Recorded PnL: <span className="font-mono font-semibold text-emerald-700">{bot.pnl}</span></p>}
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2 border-t border-[#E6E1D7]">
              <button
                onClick={() => onTriggerSignal(bot.name, 'BUY')}
                className="flex-1 py-1 px-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded transition shadow-sm"
              >
                + Testnet BUY
              </button>
              <button
                onClick={() => onTriggerSignal(bot.name, 'SELL')}
                className="flex-1 py-1 px-2 text-xs font-semibold bg-[#1C1B1A] hover:bg-[#333230] text-white rounded transition shadow-sm"
              >
                - Testnet SELL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
