'use client';

import React from 'react';
import { LayoutDashboard, LineChart } from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'quant-trading';
  onTabChange: (tab: 'dashboard' | 'quant-trading') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-white border-r border-[#E6E1D7] flex flex-col justify-between hidden md:flex min-h-screen">
      <div>
        {/* Brand Header with User Logo */}
        <div className="p-5 border-b border-[#E6E1D7] flex items-center space-x-3">
          <img 
            src="/logo.jpeg" 
            alt="MIJ Logo" 
            className="w-9 h-9 rounded-lg object-cover border border-[#E6E1D7] shadow-sm" 
          />
          <div>
            <h2 className="font-bold text-base text-[#1C1B1A] tracking-tight">BitTrade V3</h2>
            <span className="text-[11px] font-mono text-[#6B6862]">Paper White Wasm</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1.5">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`w-[#100%] flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'dashboard'
                ? 'bg-[#1C1B1A] text-white shadow-sm'
                : 'text-[#43413E] hover:bg-[#FAF8F5] hover:text-[#1C1B1A]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onTabChange('quant-trading')}
            className={`w-[#100%] flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'quant-trading'
                ? 'bg-[#1C1B1A] text-white shadow-sm'
                : 'text-[#43413E] hover:bg-[#FAF8F5] hover:text-[#1C1B1A]'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Quant Trading</span>
          </button>
        </nav>
      </div>

      {/* Sidebar Footer Info */}
      <div className="p-4 border-t border-[#E6E1D7] bg-[#FAF8F5]">
        <div className="flex items-center space-x-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-mono text-[#43413E]">Engine Active</span>
        </div>
        <div className="text-[11px] text-[#6B6862] font-mono mt-1">
          Port 8090 | Wasm Core
        </div>
      </div>
    </aside>
  );
};
