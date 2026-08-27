// Web3 Testnet Helper & Wallet Connector for BitTrade V3
import { ethers } from 'ethers';

export interface WalletState {
  address: string | null;
  chainId: string | null;
  chainName: string | null;
  balance: string | null;
  isConnected: boolean;
}

export const TESTNET_NETWORKS: Record<string, { chainId: string; name: string; rpc: string; symbol: string; explorer: string }> = {
  '0xaa36a7': {
    chainId: '0xaa36a7',
    name: 'Sepolia Testnet',
    rpc: 'https://rpc.sepolia.org',
    symbol: 'ETH',
    explorer: 'https://sepolia.etherscan.io'
  },
  '0x66eee': {
    chainId: '0x66eee',
    name: 'Arbitrum Sepolia',
    rpc: 'https://sepolia-rollup.arbitrum.io/rpc',
    symbol: 'ETH',
    explorer: 'https://sepolia.arbiscan.io'
  },
  '0x14a34': {
    chainId: '0x14a34',
    name: 'Base Sepolia',
    rpc: 'https://sepolia.base.org',
    symbol: 'ETH',
    explorer: 'https://sepolia.basescan.org'
  },
  '0x28c58': {
    chainId: '0x28c58',
    name: 'Monad Testnet',
    rpc: 'https://testnet-rpc.monad.xyz',
    symbol: 'MON',
    explorer: 'https://testnet.monadexplorer.com'
  }
};

export async function connectWeb3Wallet(): Promise<WalletState> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('Web3 Wallet extension (MetaMask/OKX/Coinbase) not detected. Please install a Web3 wallet.');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send("eth_requestAccounts", []);
  
  if (!accounts || accounts.length === 0) {
    throw new Error('No accounts selected.');
  }

  const address = accounts[0];
  const network = await provider.getNetwork();
  const balanceBig = await provider.getBalance(address);
  const balance = ethers.formatEther(balanceBig);

  const chainHex = '0x' + network.chainId.toString(16);
  const networkInfo = TESTNET_NETWORKS[chainHex] || { name: `Chain ${network.chainId}` };

  return {
    address,
    chainId: chainHex,
    chainName: networkInfo.name,
    balance: Number(balance).toFixed(4),
    isConnected: true
  };
}

export async function switchTestnetNetwork(chainIdHex: string): Promise<boolean> {
  if (typeof window === 'undefined' || !window.ethereum) return false;
  
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainIdHex }],
    });
    return true;
  } catch (err: any) {
    // Code 4902 means chain has not been added yet
    if (err.code === 4902) {
      const net = TESTNET_NETWORKS[chainIdHex];
      if (net) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: net.chainId,
            chainName: net.name,
            rpcUrls: [net.rpc],
            nativeCurrency: { name: net.symbol, symbol: net.symbol, decimals: 18 },
            blockExplorerUrls: [net.explorer]
          }]
        });
        return true;
      }
    }
    console.error('Failed to switch network:', err);
    return false;
  }
}
