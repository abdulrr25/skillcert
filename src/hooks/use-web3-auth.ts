
import { useContext } from 'react';
import { Web3Context } from '@/contexts/Web3Context';

export function useWeb3Auth() {
  const context = useContext(Web3Context);
  
  if (context === undefined) {
    throw new Error('useWeb3Auth must be used within a Web3Provider');
  }
  
  return context;
}
