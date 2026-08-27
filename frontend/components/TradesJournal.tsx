'use client';

import React from 'react';
import { FileText, ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';

export interface TradeRecord {
  time: string;
  bot: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  price: string;
  pnl: string;
  hash?: string;
}

interface TradesJournalProps {
  trades: TradeRecord[];
}

export const TradesJournal: React.FC<TradesJournalProps> = ({ trades }) => {
  return (
    <div className="paper-card p-5">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E6E1D7]">
        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-[#1C1B1A]" />
          <h3 className="font-bold text-base text-[#1C1B1A]">Jurnal Transaksi Real-Time Web3</h3>
        </div>
        <span className="text-xs text-[#6B6862]">
          Total {trades.length} Records
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E6E1D7] text-[#6B6862] font-semibold bg-[#FAF8F5]">
              <th className="py-2.5 px-3">Waktu</th>
              <th className="py-2.5 px-3">Bot / Strategi</th>
              <th className="py-2.5 px-3">Simbol</th>
              <th className="py-2.5 px-3">Tipe</th>
              <th className="py-2.5 px-3">Harga</th>
              <th className="py-2.5 px-3">PnL / Execution</th>
              <th className="py-2.5 px-3 text-right">Tx Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E6E1D7]">
            {trades.map((trade, idx) => (
              <tr key={idx} className="hover:bg-[#FAF8F5] transition">
                <td className="py-2.5 px-3 font-mono text-[#6B6862]">{trade.time}</td>
                <td className="py-2.5 px-3 font-medium text-[#1C1B1A]">{trade.bot}</td>
                <td className="py-2.5 px-3 font-mono font-bold text-[#1C1B1A]">{trade.symbol}</td>
                <td className="py-2.5 px-3">
                  <span className={`inline-flex items-center space-x-1 font-semibold px-2 py-0.5 rounded text-[10px] ${
                    trade.side === 'BUY' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}>
                    {trade.side === 'BUY' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    <span>{trade.side}</span>
                  </span>
                </td>
                <td className="py-2.5 px-3 font-mono font-semibold text-[#1C1B1A]">{trade.price}</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-semibold">{trade.pnl}</td>
                <td className="py-2.5 px-3 text-right font-mono text-[#6B6862]">
                  {trade.hash ? (
                    <span className="inline-flex items-center space-x-1 text-blue-600 font-medium">
                      <span>{trade.hash.slice(0, 6)}...</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="text-gray-400">Simulated Wasm</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
