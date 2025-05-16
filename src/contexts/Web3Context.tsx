
import { createContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Connection, clusterApiUrl } from '@solana/web3.js';

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toBase58: () => string } }>;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, handler: (...args: any[]) => void) => void;
      removeListener: (event: string, handler: (...args: any[]) => void) => void;
    };
  }
}

interface Web3ContextType {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  isMetaMaskInstalled: boolean;
  isSolanaInstalled: boolean;
  connectWallet: (walletType: 'metamask' | 'rainbow' | 'privy' | 'solana') => Promise<void>;
  disconnectWallet: () => void;
  currentWallet: string | null;
}

export const Web3Context = createContext<Web3ContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  isMetaMaskInstalled: false,
  isSolanaInstalled: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  currentWallet: null,
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [isSolanaInstalled, setIsSolanaInstalled] = useState<boolean>(false);
  const [currentWallet, setCurrentWallet] = useState<string | null>(null);
  const { toast } = useToast();

  const connection = useMemo(() => new Connection(clusterApiUrl('devnet')), []);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setCurrentWallet(null);
    toast({
      title: 'Disconnected',
      description: 'Wallet has been disconnected'
    });
  }, [toast]);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAddress(accounts[0]);
      setIsConnected(true);
    }
  }, [disconnectWallet]);

  useEffect(() => {
    const checkWallets = async () => {
      // Check for MetaMask
      if (window.ethereum) {
        setIsMetaMaskInstalled(true);
        
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            setCurrentWallet('metamask');
          }
        } catch (error) {
          console.error("MetaMask error:", error);
        }
      }

      // Check for Solana
      if (window.solana) {
        setIsSolanaInstalled(true);
        
        try {
          const response = await window.solana.connect();
          if (response?.publicKey) {
            const address = response.publicKey.toBase58();
            setAddress(address);
            setIsConnected(true);
            setCurrentWallet('solana');
          }
        } catch (error) {
          console.error("Solana error:", error);
        }
      }
    };

    checkWallets();

    // Setup event handlers
    const ethereum = window.ethereum;
    const solana = window.solana;

    const handleEthereumAccountsChanged = (accounts: string[]) => handleAccountsChanged(accounts);
    const handleSolanaAccountChanged = () => window.location.reload();

    ethereum?.on('accountsChanged', handleEthereumAccountsChanged);
    solana?.on('accountChanged', handleSolanaAccountChanged);

    return () => {
      ethereum?.removeListener('accountsChanged', handleEthereumAccountsChanged);
      solana?.removeListener('accountChanged', handleSolanaAccountChanged);
    };
  }, [handleAccountsChanged]);

  const connectWallet = useCallback(async (walletType: 'metamask' | 'rainbow' | 'privy' | 'solana') => {
    try {
      setIsConnecting(true);
      
      switch (walletType) {
        case 'metamask':
          if (!window.ethereum) {
            throw new Error('MetaMask is not installed');
          }
          
          const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          
          if (accounts?.[0]) {
            setAddress(accounts[0]);
            setIsConnected(true);
            setCurrentWallet('metamask');
          }
          break;

        case 'solana':
          if (!window.solana) {
            throw new Error('Solana wallet is not installed');
          }
          
          const response = await window.solana.connect();
          if (response?.publicKey) {
            const address = response.publicKey.toBase58();
            setAddress(address);
            setIsConnected(true);
            setCurrentWallet('solana');
          }
          break;

        case 'rainbow':
        case 'privy':
          throw new Error(`${walletType} integration not yet implemented`);

        default:
          throw new Error('Wallet type not supported');
      }

      toast({
        title: 'Wallet Connected',
        description: `Successfully connected to ${walletType}`
      });
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive'
      });
      throw error;
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

  const contextValue = useMemo<Web3ContextType>(() => ({
    address,
    isConnected,
    isConnecting,
    isMetaMaskInstalled,
    isSolanaInstalled,
    connectWallet,
    disconnectWallet,
    currentWallet
  }), [
    address,
    isConnected,
    isConnecting,
    isMetaMaskInstalled,
    isSolanaInstalled,
    connectWallet,
    disconnectWallet,
    currentWallet
  ]);

  return (
    <Web3Context.Provider value={contextValue}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;
