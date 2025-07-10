import express, { Request, Response } from 'express';
import {
  getMarkets,
  getActiveMarkets,
  getPendingMarkets,
  getMarketById,
  getMarketWithPool,
  createMarket,
  updateMarketStatus
} from '../controllers/marketController';

const router = express.Router();

// Rotas para listagem de mercados
router.get('/', getMarkets);
router.get('/active', getActiveMarkets);
router.get('/pending', getPendingMarkets);

// Rotas para mercados específicos
router.get('/:id', getMarketById);
router.get('/:id/with-pool', getMarketWithPool);

// Rotas para criação e atualização
router.post('/', createMarket);
router.patch('/:id/status', updateMarketStatus);

export default router; 