import express from 'express';
import {
  getLiquidity,
  getLiquidityByMarket,
  getLiquidityByUser,
  addLiquidity,
  updateLiquidityStatus,
  confirmLiquidity,
  getMarketStats
} from '../controllers/liquidityController';

const router = express.Router();

// Buscar toda a liquidez
router.get('/', getLiquidity);

// Buscar liquidez por mercado
router.get('/market/:marketId', getLiquidityByMarket);

// Buscar liquidez por usuário
router.get('/user/:address', getLiquidityByUser);

// Adicionar liquidez
router.post('/', addLiquidity);

// Atualizar status da liquidez
router.patch('/:id/status', updateLiquidityStatus);

// Confirmar liquidez com transaction hash
router.patch('/:id/confirm', confirmLiquidity);

// Buscar estatísticas do mercado
router.get('/market/:marketId/stats', getMarketStats);

export default router; 