'use client';

import React, { useState } from 'react';
import { WalletState, connectWeb3Wallet, switchTestnetNetwork, TESTNET_NETWORKS } from '@/lib/web3';
import { Wallet, ShieldCheck, Cpu, ChevronDown, Activity, Globe } from 'lucide-react';

interface NavbarProps {
  wallet: WalletState;
  onWalletChange: (wallet: WalletState) => void;
  engineConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ wallet, onWalletChange, engineConnected }) => {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const updated = await connectWeb3Wallet();
      onWalletChange(updated);
    } catch (err: any) {
      alert(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleNetworkSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chainHex = e.target.value;
    if (chainHex) {
      const success = await switchTestnetNetwork(chainHex);
      if (success && wallet.isConnected) {
        handleConnect();
      }
    }
  };

  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#E6E1D7] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Architecture Tag */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-lg bg-[#1C1B1A] flex items-center justify-center text-white font-bold shadow-sm">
              ⚡
            </div>
            <div>
              <span className="font-bold text-lg text-[#1C1B1A] tracking-tight">BitTrade</span>
              <span className="ml-1 text-xs font-semibold px-1.5 py-0.5 rounded bg-[#F4F1EA] text-[#43413E] border border-[#E0DAD0]">
                V3 Web3
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-[#E6E1D7]">
            <span className={`w-2 h-2 rounded-full ${engineConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
            <span className="text-xs text-[#6B6862] font-mono">
              Wasm Engine: <strong className="text-[#1C1B1A]">{engineConnected ? 'Connected (Port 8090)' : 'Connecting...'}</strong>
            </span>
          </div>
        </div>

        {/* Network Selector & Connect Wallet */}
        <div className="flex items-center space-x-3">
          
          {/* EVM Testnet Selector */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-[#6B6862] absolute left-3 pointer-events-none" />
            <select
              onChange={handleNetworkSelect}
              value={wallet.chainId || '0xaa36a7'}
              className="pl-9 pr-7 py-1.5 text-xs font-medium bg-[#FAF8F5] text-[#1C1B1A] border border-[#E6E1D7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C1B1A] cursor-pointer appearance-none shadow-sm"
            >
              {Object.entries(TESTNET_NETWORKS).map(([hex, net]) => (
                <option key={hex} value={hex}>
                  {net.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6B6862] absolute right-2.5 pointer-events-none" />
          </div>

          {/* Web3 Connect Wallet Button */}
          {wallet.isConnected ? (
            <div className="flex items-center space-x-2 bg-[#F4F1EA] border border-[#E0DAD0] px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div className="text-xs">
                <span className="font-mono font-semibold text-[#1C1B1A]">
                  {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                </span>
                <span className="ml-2 text-[#6B6862] font-mono font-medium">
                  {wallet.balance} {TESTNET_NETWORKS[wallet.chainId || '']?.symbol || 'ETH'}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={handleConnect}
              disabled={loading}
              className="paper-button flex items-center space-x-2 text-xs font-semibold cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              <span>{loading ? 'Connecting...' : 'Connect Testnet Wallet'}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
