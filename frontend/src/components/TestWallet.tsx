"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  CheckCircle,
  AlertCircle,
  Copy,
  Bitcoin,
  Info,
  RefreshCw
} from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { BitcoinService } from "@/services/bitcoinService";
import { getAddress } from "sats-connect";
import { AddressPurpose, BitcoinNetworkType } from "sats-connect";

// Componente de instruções de rede
function NetworkInstructions() {
  return (
    <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-start space-x-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            🔗 Xverse Connection (Mainnet)
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
            System configured to connect with Xverse wallet on mainnet.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded p-3 border border-blue-200 dark:border-blue-700">
            <p className="text-xs font-medium text-gray-800 dark:text-gray-200 mb-2">
              How to connect:
            </p>
            <ol className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">1</span>
                <span>Open the Xverse extension in your browser</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">2</span>
                <span>Make sure the wallet is unlocked</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">3</span>
                <span>Click &quot;Connect Xverse&quot; below</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">4</span>
                <span>Wait up to 30 seconds for connection</span>
              </li>
            </ol>
          </div>
          
          <details className="mt-3">
            <summary className="text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:text-blue-700">
              🔧 Troubleshooting - Common issues
            </summary>
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-700 dark:text-gray-300">
              <p className="font-medium mb-2">If Xverse doesn't appear:</p>
              <ul className="space-y-1 ml-4">
                <li>• Reload the page (F5)</li>
                <li>• Check if the extension is active in the browser</li>
                <li>• Try opening Xverse manually first</li>
                <li>• Check extension permissions</li>
              </ul>
              
              <p className="font-medium mb-2 mt-3">If connection is cancelled:</p>
              <ul className="space-y-1 ml-4">
                <li>• Check if you approved the connection in Xverse</li>
                <li>• Make sure the wallet is unlocked</li>
                <li>• Try connecting again</li>
              </ul>
              
              <p className="font-medium mb-2 mt-3">If timeout appears:</p>
              <ul className="space-y-1 ml-4">
                <li>• Timeout is 30 seconds - wait</li>
                <li>• Check if Xverse is active</li>
                <li>• Make sure you&apos;re on Mainnet</li>
                <li>• Try restarting the browser</li>
              </ul>
            </div>
          </details>
          
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-3 font-medium">
            💡 Tip: Make sure Xverse is unlocked and configured for Mainnet
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestWallet() {
  const { 
    paymentAddress, 
    ordinalsAddress, 
    isConnected, 
    connectWallet, 
    disconnectWallet,
    networkType,
    connectionError
  } = useWallet();
  
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    setTestResult(null);
    
    try {
      console.log('🔍 Starting connection process...');
      console.log('🔍 Checking if sats-connect is available...');
      
      // Check if sats-connect is available
      if (typeof window === 'undefined') {
        throw new Error('Sats-connect is not available in this environment');
      }
      
      // Check if getAddress function exists
      if (typeof getAddress !== 'function') {
        throw new Error('getAddress function not found in sats-connect');
      }
      
      console.log('✅ Sats-connect is available');
      console.log('🔍 Checking if Xverse extension is installed...');
      
      // Check if Xverse extension is installed
      if (!window.BitcoinProvider) {
        console.log('⚠️ BitcoinProvider not found - Xverse may not be installed');
      } else {
        console.log('✅ BitcoinProvider found');
      }
      
      await connectWallet();
      console.log('✅ Connection completed successfully');
      
    } catch (error) {
      console.error('❌ Detailed connection error:', error);
      console.error('❌ Stack trace:', error instanceof Error ? error.stack : 'N/A');
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setTestResult(`❌ Connection failed: ${errorMessage}`);
    } finally {
      setConnecting(false);
    }
  };

  const handleTestConnection = async () => {
    if (!paymentAddress) return;
    
    setLoading(true);
    setTestResult(null);
    
    try {
      // Test balance retrieval
      const balanceSats = await BitcoinService.getAddressBalance(paymentAddress);
      const balanceUsd = BitcoinService.satsToUsd(balanceSats);
      setBalance(balanceUsd);
      
      // Test balance validation
      const hasBalance = await BitcoinService.validateBalance(paymentAddress, 100);
      
      setTestResult(
        hasBalance 
          ? `✅ Connection successful! Balance: ${balanceUsd.toFixed(2)} USD`
          : `⚠️ Connection OK, but insufficient balance for test`
      );
    } catch (error) {
      setTestResult(`❌ Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestTransaction = async () => {
    if (!paymentAddress) return;
    
    setLoading(true);
    setTestResult(null);
    
    try {
      // Test a simulated transaction
      const testTx = await BitcoinService.sendBetTransaction({
        marketId: 'test-market',
        outcome: 'A',
        amount: 10, // 10 USD
        odds: 2.0,
        recipient: 'tb1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
      }, paymentAddress);
      
      setTestResult(`✅ Simulated transaction sent! TX: ${testTx.txid}`);
    } catch (error) {
      setTestResult(`❌ Transaction error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wallet className="h-5 w-5" />
            <span>Xverse Integration Test</span>
            <Badge variant="outline" className="text-xs">
              Mainnet
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="text-center py-8">
              <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Connect your Xverse wallet to test the integration
              </h3>
              
              <NetworkInstructions />
              
              {/* Connection error */}
              {connectionError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800 dark:text-red-200 font-medium">
                      Connection Error
                    </span>
                  </div>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1 whitespace-pre-line">
                    {connectionError}
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleConnect} 
                variant="gradient"
                disabled={connecting}
                className="w-full"
              >
                {connecting ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-4 w-4" />
                    Connect Xverse
                  </>
                )}
              </Button>
              
              {/* Simple test button */}
              <Button 
                onClick={() => {
                  console.log('🧪 Simple sats-connect test');
                  console.log('🔍 window.BitcoinProvider:', window.BitcoinProvider);
                  console.log('🔍 typeof getAddress:', typeof getAddress);
                  console.log('🔍 getAddress:', getAddress);
                  setTestResult('🧪 Check console for test details');
                }}
                variant="outline"
                className="w-full"
              >
                🧪 Simple Test (Console)
              </Button>
              
              {/* Network test */}
              <Button 
                onClick={async () => {
                  console.log('🌐 Network test...');
                  try {
                    await new Promise((resolve, reject) => {
                      const timeout = setTimeout(() => {
                        reject(new Error('Test timeout'));
                      }, 10000);
                      
                      getAddress({
                        payload: {
                          purposes: [AddressPurpose.Payment],
                          message: 'Connection test',
                          network: {
                            type: BitcoinNetworkType.Mainnet,
                          },
                        },
                        onFinish: (response) => {
                          clearTimeout(timeout);
                          console.log('✅ Mainnet test successful:', response);
                          resolve(response);
                        },
                        onCancel: () => {
                          clearTimeout(timeout);
                          reject(new Error('Test cancelled'));
                        },
                      });
                    });
                    setTestResult('✅ Mainnet test worked!');
                  } catch (error) {
                    console.error('❌ Mainnet test failed:', error);
                    setTestResult(`❌ Mainnet test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
                  }
                }}
                variant="outline"
                className="w-full"
              >
                🌐 Mainnet Test
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-green-800 dark:text-green-200 font-medium">
                  Wallet Connected
                </span>
                <Badge variant="outline" className="text-xs">
                  {networkType}
                </Badge>
              </div>

              {/* Addresses */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Address:</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(paymentAddress || '')}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>
                <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                  {paymentAddress}
                </div>
                
                {ordinalsAddress && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Ordinals Address:</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(ordinalsAddress || '')}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <div className="p-2 bg-muted rounded text-xs font-mono break-all">
                      {ordinalsAddress}
                    </div>
                  </>
                )}
              </div>

              {/* Balance */}
              {balance !== null && (
                <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Bitcoin className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 dark:text-blue-200 font-medium">
                    Balance: {balance.toFixed(2)} USD
                  </span>
                </div>
              )}

              {/* Tests */}
              <div className="space-y-2">
                <Button
                  onClick={handleTestConnection}
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  {loading ? 'Testing...' : 'Test Connection'}
                </Button>
                
                <Button
                  onClick={handleTestTransaction}
                  disabled={loading}
                  className="w-full"
                  variant="outline"
                >
                  {loading ? 'Testing...' : 'Test Simulated Transaction'}
                </Button>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={`p-3 rounded-lg ${
                  testResult.includes('✅') 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                    : testResult.includes('⚠️')
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200'
                    : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    {testResult.includes('✅') && <CheckCircle className="h-4 w-4" />}
                    {testResult.includes('⚠️') && <AlertCircle className="h-4 w-4" />}
                    {testResult.includes('❌') && <AlertCircle className="h-4 w-4" />}
                    <span className="text-sm">{testResult}</span>
                  </div>
                </div>
              )}

              {/* Transaction Test Section */}
              {isConnected && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-3">
                    🚀 Transaction Tests
                  </h3>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={async () => {
                        console.log('🧪 Testing simulated transaction...');
                        try {
                          const result = await BitcoinService.sendBetTransaction(
                            {
                              amount: 0.0001, // 0.0001 BTC
                              recipient: 'bc1qvqwrxm8r4qhxq77qh338ha2wsmje9ackzgpdrl',
                              marketId: 'test-market-1',
                              outcome: 'A',
                              odds: 2.0
                            },
                            paymentAddress!
                          );
                          console.log('✅ Simulated transaction:', result);
                          setTestResult('✅ Simulated transaction successful! Check console.');
                        } catch (error) {
                          console.error('❌ Simulated transaction error:', error);
                          setTestResult('❌ Simulated transaction error. Check console.');
                        }
                      }}
                      variant="outline"
                      className="w-full text-green-700 border-green-300 hover:bg-green-50"
                    >
                      🧪 Simulate Betting Transaction
                    </Button>
                    
                    <Button 
                      onClick={async () => {
                        console.log('🧪 Testing liquidity transaction...');
                        try {
                          const result = await BitcoinService.sendLiquidityTransaction(
                            {
                              amount: 0.0005, // 0.0005 BTC
                              recipient: 'bc1qvqwrxm8r4qhxq77qh338ha2wsmje9ackzgpdrl',
                              marketId: 'test-market-1',
                              outcome: 'A'
                            },
                            paymentAddress!
                          );
                          console.log('✅ Liquidity transaction simulated:', result);
                          setTestResult('✅ Liquidity transaction simulated! Check console.');
                        } catch (error) {
                          console.error('❌ Liquidity transaction error:', error);
                          setTestResult('❌ Liquidity transaction error. Check console.');
                        }
                      }}
                      variant="outline"
                      className="w-full text-green-700 border-green-300 hover:bg-green-50"
                    >
                      🧪 Simulate Liquidity Transaction
                    </Button>
                  </div>
                </div>
              )}

              {/* Disconnect */}
              <Button
                onClick={disconnectWallet}
                variant="outline"
                className="w-full"
              >
                Disconnect Wallet
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
} 