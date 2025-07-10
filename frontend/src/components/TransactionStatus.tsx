"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Loader2
} from "lucide-react";
import { BitcoinService } from "@/services/bitcoinService";
import { formatAddress } from "@/lib/utils";

interface TransactionStatusProps {
  txid: string;
  type: 'bet' | 'liquidity';
  amount: number;
  status?: 'pending' | 'confirmed' | 'failed';
  onStatusChange?: (status: 'pending' | 'confirmed' | 'failed') => void;
}

export function TransactionStatus({ 
  txid, 
  type, 
  amount, 
  status = 'pending',
  onStatusChange 
}: TransactionStatusProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const checkConfirmation = async () => {
    if (currentStatus === 'confirmed') return;
    
    setIsChecking(true);
    try {
      const isConfirmed = await BitcoinService.checkTransactionConfirmation();
      const newStatus = isConfirmed ? 'confirmed' : 'pending';
      setCurrentStatus(newStatus);
      onStatusChange?.(newStatus);
    } catch (error) {
      console.error('Erro ao verificar confirmação:', error);
      setCurrentStatus('failed');
      onStatusChange?.('failed');
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusIcon = () => {
    switch (currentStatus) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (currentStatus) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getStatusText = () => {
    switch (currentStatus) {
      case 'confirmed':
        return 'Confirmada';
      case 'failed':
        return 'Falhou';
      default:
        return 'Pendente';
    }
  };

  const getTypeText = () => {
    return type === 'bet' ? 'Aposta' : 'Liquidez';
  };

  const openBlockExplorer = () => {
    // Em testnet, usar testnet.blockexplorer.com
    const explorerUrl = `https://testnet.blockexplorer.com/tx/${txid}`;
    window.open(explorerUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{getTypeText()}</span>
                  <Badge className={getStatusColor()}>
                    {getStatusText()}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  <span className="font-mono">{formatAddress(txid)}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Valor: ${amount.toFixed(2)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {currentStatus === 'pending' && (
                <button
                  onClick={checkConfirmation}
                  disabled={isChecking}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                  title="Verificar confirmação"
                >
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                </button>
              )}
              
              <button
                onClick={openBlockExplorer}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                title="Ver no Block Explorer"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 