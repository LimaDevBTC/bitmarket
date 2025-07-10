'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  GetAddressResponse,
} from 'sats-connect';

interface IWalletContext {
  paymentAddress: string | null;
  ordinalsAddress: string | null;
  paymentPublicKey: string | null;
  ordinalsPublicKey: string | null;
  isConnected: boolean;
  balance: number;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  networkType: string;
  connectionError: string | null;
}

const WalletContext = createContext<IWalletContext | null>(null);

export const useWallet = (): IWalletContext => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Chaves para localStorage
const STORAGE_KEYS = {
  PAYMENT_ADDRESS: 'bitmarket_wallet_payment_address',
  ORDINALS_ADDRESS: 'bitmarket_wallet_ordinals_address',
  PAYMENT_PUBLIC_KEY: 'bitmarket_wallet_payment_public_key',
  ORDINALS_PUBLIC_KEY: 'bitmarket_wallet_ordinals_public_key',
  IS_CONNECTED: 'bitmarket_wallet_is_connected',
  NETWORK_TYPE: 'bitmarket_wallet_network_type',
};

// Funções auxiliares para localStorage
const getStoredValue = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const setStoredValue = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const removeStoredValue = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [paymentAddress, setPaymentAddress] = useState<string | null>(null);
  const [ordinalsAddress, setOrdinalsAddress] = useState<string | null>(null);
  const [paymentPublicKey, setPaymentPublicKey] = useState<string | null>(null);
  const [ordinalsPublicKey, setOrdinalsPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkType, setNetworkType] = useState<string>('Mainnet');
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  // Load saved state from localStorage on initialization
  useEffect(() => {
    const loadStoredWallet = () => {
      const storedPaymentAddress = getStoredValue(STORAGE_KEYS.PAYMENT_ADDRESS);
      const storedOrdinalsAddress = getStoredValue(STORAGE_KEYS.ORDINALS_ADDRESS);
      const storedPaymentPublicKey = getStoredValue(STORAGE_KEYS.PAYMENT_PUBLIC_KEY);
      const storedOrdinalsPublicKey = getStoredValue(STORAGE_KEYS.ORDINALS_PUBLIC_KEY);
      const storedIsConnected = getStoredValue(STORAGE_KEYS.IS_CONNECTED);
      const storedNetworkType = getStoredValue(STORAGE_KEYS.NETWORK_TYPE);

      if (storedPaymentAddress) setPaymentAddress(storedPaymentAddress);
      if (storedOrdinalsAddress) setOrdinalsAddress(storedOrdinalsAddress);
      if (storedPaymentPublicKey) setPaymentPublicKey(storedPaymentPublicKey);
      if (storedOrdinalsPublicKey) setOrdinalsPublicKey(storedOrdinalsPublicKey);
      if (storedIsConnected === 'true') {
        setIsConnected(true);
        setBalance(1.00); // Simulated balance when reconnected
      }
      if (storedNetworkType) setNetworkType(storedNetworkType);

      console.log('🔄 Wallet state loaded from localStorage:', {
        paymentAddress: storedPaymentAddress,
        ordinalsAddress: storedOrdinalsAddress,
        isConnected: storedIsConnected,
        networkType: storedNetworkType
      });
    };

    loadStoredWallet();
  }, []);

  const connectWallet = async (): Promise<void> => {
    setConnectionError(null);
    
    try {
      console.log('🔄 Starting Xverse connection...');
      console.log('🔍 Checking environment...');

      // Check if sats-connect is available
      if (typeof window === 'undefined') {
        throw new Error('Sats-connect is not available in this environment');
      }

      console.log('✅ Environment verified');
      console.log('🔍 Checking if getAddress is available...');
      
      // Check if getAddress is available
      if (typeof getAddress !== 'function') {
        throw new Error('getAddress function is not available');
      }
      
      console.log('✅ getAddress is available');
      console.log('🔍 Checking Xverse extension...');
      
      // Check if Xverse extension is installed
      if (!window.BitcoinProvider) {
        console.log('⚠️ BitcoinProvider not found - Xverse may not be installed');
      } else {
        console.log('✅ BitcoinProvider found');
      }

      console.log('🔄 Starting getAddress call...');
      console.log('📋 Call parameters:');
      console.log('  - purposes: [Ordinals, Payment]');
      console.log('  - network: Mainnet');
      console.log('  - message: Connect your wallet to use BitMarket.bet');

      // Simplified connection with 30 second timeout
      const response = await new Promise<GetAddressResponse>((resolve, reject) => {
        const timeout = setTimeout(() => {
          console.log('⏰ Timeout reached - 30 seconds');
          reject(new Error('Timeout: Xverse did not respond in 30 seconds. Check if the extension is active.'));
        }, 30000); // 30 seconds

        console.log('📞 Calling getAddress...');
        
        // Try Testnet first, if it fails try Mainnet
        const networkConfig = {
          type: BitcoinNetworkType.Mainnet,
        };
        
        console.log('🌐 Using network:', networkConfig.type);
        
        getAddress({
          payload: {
            purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
            message: 'Connect your wallet to use BitMarket.bet',
            network: networkConfig,
          },
          onFinish: (response: GetAddressResponse) => {
            clearTimeout(timeout);
            console.log('✅ onFinish called successfully!');
            console.log('📦 Response received:', response);
            resolve(response);
          },
          onCancel: () => {
            clearTimeout(timeout);
            console.log('❌ onCancel called - user cancelled');
            reject(new Error('Connection cancelled. Check if Xverse is active and try again.'));
          },
        });
        
        console.log('📞 getAddress called - waiting for response...');
      });

      console.log('✅ getAddress returned successfully!');
      console.log('📦 Processing addresses...');

      // Process received addresses
      const paymentAddr = response.addresses.find(addr => addr.purpose === AddressPurpose.Payment);
      const ordinalsAddr = response.addresses.find(addr => addr.purpose === AddressPurpose.Ordinals);

      if (paymentAddr) {
        setPaymentAddress(paymentAddr.address);
        setPaymentPublicKey(paymentAddr.publicKey);
        setStoredValue(STORAGE_KEYS.PAYMENT_ADDRESS, paymentAddr.address);
        setStoredValue(STORAGE_KEYS.PAYMENT_PUBLIC_KEY, paymentAddr.publicKey);
        console.log('📱 Payment address:', paymentAddr.address);
      } else {
        console.log('⚠️ Payment address not found');
      }
      
      if (ordinalsAddr) {
        setOrdinalsAddress(ordinalsAddr.address);
        setOrdinalsPublicKey(ordinalsAddr.publicKey);
        setStoredValue(STORAGE_KEYS.ORDINALS_ADDRESS, ordinalsAddr.address);
        setStoredValue(STORAGE_KEYS.ORDINALS_PUBLIC_KEY, ordinalsAddr.publicKey);
        console.log('🎨 Ordinals address:', ordinalsAddr.address);
      } else {
        console.log('⚠️ Ordinals address not found');
      }
      
      setIsConnected(true);
      setNetworkType('Mainnet');
      setConnectionError(null);
      
      // Set simulated balance for MVP
      setBalance(1.00); // $1.00 simulated
      
      // Save state to localStorage
      setStoredValue(STORAGE_KEYS.IS_CONNECTED, 'true');
      setStoredValue(STORAGE_KEYS.NETWORK_TYPE, 'Mainnet');
      
      console.log('🎉 Wallet connected successfully!');
      
    } catch (error) {
      console.error('❌ Connection error:', error);
      console.error('❌ Error type:', typeof error);
      console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setConnectionError(errorMessage);
      setIsConnected(false);
      
      // Simplified error messages
      if (errorMessage.includes('cancelada') || errorMessage.includes('cancel')) {
        setConnectionError('Connection cancelled. Check if Xverse is active and try again.');
      } else if (errorMessage.includes('Timeout')) {
        setConnectionError('Timeout: Xverse did not respond. Check if the extension is active and try again.');
      } else {
        setConnectionError(`Connection error: ${errorMessage}`);
      }
    }
  };

  const disconnectWallet = () => {
    setPaymentAddress(null);
    setOrdinalsAddress(null);
    setPaymentPublicKey(null);
    setOrdinalsPublicKey(null);
    setIsConnected(false);
    setConnectionError(null);
    setNetworkType('Mainnet');
    setBalance(0); // Reset balance
    
    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach(key => removeStoredValue(key));
    
    console.log('🔌 Wallet disconnected and data removed from localStorage');
  };

  const value = {
    paymentAddress,
    ordinalsAddress,
    paymentPublicKey,
    ordinalsPublicKey,
    isConnected,
    balance,
    connectWallet,
    disconnectWallet,
    networkType,
    connectionError,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}; 