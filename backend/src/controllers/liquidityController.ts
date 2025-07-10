import { Request, Response } from 'express';
import { LiquidityModel, CreateLiquidityData } from '../models/Liquidity';
import { MarketModel } from '../models/Market';

export const getLiquidity = async (req: Request, res: Response) => {
  try {
    const liquidity = await LiquidityModel.findAll();
    res.json(liquidity);
  } catch (error) {
    console.error('Erro ao buscar liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getLiquidityByMarket = async (req: Request, res: Response) => {
  try {
    const { marketId } = req.params;
    const liquidity = await LiquidityModel.findByMarketId(marketId);
    res.json(liquidity);
  } catch (error) {
    console.error('Erro ao buscar liquidez do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getLiquidityByUser = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;
    const liquidity = await LiquidityModel.findByUserAddress(address);
    res.json(liquidity);
  } catch (error) {
    console.error('Erro ao buscar liquidez do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const addLiquidity = async (req: Request, res: Response) => {
  try {
    const { market_id, user_address, outcome, amount, transaction_hash } = req.body;
    
    if (!market_id || !user_address || !outcome || !amount) {
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
    
    const liquidityData: CreateLiquidityData = {
      market_id,
      user_address,
      outcome,
      amount: parseFloat(amount),
      transaction_hash
    };
    
    const liquidity = await LiquidityModel.create(liquidityData);
    res.status(201).json(liquidity);
  } catch (error) {
    console.error('Erro ao adicionar liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateLiquidityStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'withdrawn'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const liquidity = await LiquidityModel.updateStatus(id, status);
    
    if (!liquidity) {
      return res.status(404).json({ error: 'Liquidez não encontrada' });
    }
    
    res.json(liquidity);
  } catch (error) {
    console.error('Erro ao atualizar status da liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const confirmLiquidity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { transaction_hash } = req.body;
    
    if (!transaction_hash) {
      return res.status(400).json({ error: 'Transaction hash é obrigatório' });
    }
    
    const liquidity = await LiquidityModel.updateTransactionHash(id, transaction_hash);
    if (!liquidity) {
      return res.status(404).json({ error: 'Liquidez não encontrada' });
    }
    
    const updatedLiquidity = await LiquidityModel.updateStatus(id, 'confirmed');
    res.json(updatedLiquidity);
  } catch (error) {
    console.error('Erro ao confirmar liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getMarketStats = async (req: Request, res: Response) => {
  try {
    const { marketId } = req.params;
    
    const totalLiquidity = await LiquidityModel.getTotalLiquidityByMarket(marketId);
    const liquidityA = await LiquidityModel.getLiquidityByOutcome(marketId, 'A');
    const liquidityB = await LiquidityModel.getLiquidityByOutcome(marketId, 'B');
    
    res.json({
      total_liquidity: totalLiquidity,
      liquidity_a: liquidityA,
      liquidity_b: liquidityB,
      odds_a: liquidityB > 0 ? (totalLiquidity / liquidityA) : 1,
      odds_b: liquidityA > 0 ? (totalLiquidity / liquidityB) : 1
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 