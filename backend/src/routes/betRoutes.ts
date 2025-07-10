import express from 'express';
import {
  getBets,
  getBetsByMarket,
  getBetsByUser,
  createBet,
  updateBetStatus,
  confirmBet
} from '../controllers/betController';

const router = express.Router();

// Buscar todas as apostas
router.get('/', getBets);

// Buscar apostas por mercado
router.get('/market/:marketId', getBetsByMarket);

// Buscar apostas por usuário
router.get('/user/:address', getBetsByUser);

// Criar nova aposta
router.post('/', createBet);

// Atualizar status da aposta
router.patch('/:id/status', updateBetStatus);

// Confirmar aposta com transaction hash
router.patch('/:id/confirm', confirmBet);

export default router; 