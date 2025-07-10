import { Request, Response } from 'express';
import { BetModel, CreateBetData } from '../models/Bet';
import { MarketModel } from '../models/Market';

export const getBets = async (req: Request, res: Response) => {
  try {
    const bets = await BetModel.findAll();
    res.json(bets);
  } catch (error) {
    console.error('Erro ao buscar apostas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getBetsByMarket = async (req: Request, res: Response) => {
  try {
    const { marketId } = req.params;
    const bets = await BetModel.findByMarketId(marketId);
    res.json(bets);
  } catch (error) {
    console.error('Erro ao buscar apostas do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getBetsByUser = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const bets = await BetModel.findByUserAddress(address);
    res.json(bets);
  } catch (error) {
    console.error('Erro ao buscar apostas do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const createBet = async (req: Request, res: Response) => {
  try {
    const { market_id, user_address, outcome, amount, odds, transaction_hash } = req.body;
    
    if (!market_id || !user_address || !outcome || !amount || !odds) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    if (!['A', 'B'].includes(outcome)) {
      return res.status(400).json({ error: 'Outcome deve ser A ou B' });
    }
    
    // Verificar se o mercado existe
    const market = await MarketModel.findById(market_id);
    if (!market) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    if (market.status !== 'active') {
      return res.status(400).json({ error: 'Mercado não está ativo' });
    }
    
    const betData: CreateBetData = {
      market_id,
      user_address,
      outcome,
      amount: parseFloat(amount),
      odds: parseFloat(odds),
      transaction_hash
    };
    
    const bet = await BetModel.create(betData);
    res.status(201).json(bet);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateBetStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'settled', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const bet = await BetModel.updateStatus(id, status);
    
    if (!bet) {
      return res.status(404).json({ error: 'Aposta não encontrada' });
    }
    
    res.json(bet);
  } catch (error) {
    console.error('Erro ao atualizar status da aposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const confirmBet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { transaction_hash } = req.body;
    
    if (!transaction_hash) {
      return res.status(400).json({ error: 'Transaction hash é obrigatório' });
    }
    
    const bet = await BetModel.updateTransactionHash(id, transaction_hash);
    if (!bet) {
      return res.status(404).json({ error: 'Aposta não encontrada' });
    }
    
    const updatedBet = await BetModel.updateStatus(id, 'confirmed');
    res.json(updatedBet);
  } catch (error) {
    console.error('Erro ao confirmar aposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 