import { Request, Response } from 'express';
import { MarketModel, CreateMarketData } from '../models/Market';

export const getMarkets = async (req: Request, res: Response) => {
  try {
    const markets = await MarketModel.findAll();
    res.json(markets);
  } catch (error) {
    console.error('Erro ao buscar mercados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getActiveMarkets = async (req: Request, res: Response) => {
  try {
    const markets = await MarketModel.findActive();
    res.json(markets);
  } catch (error) {
    console.error('Erro ao buscar mercados ativos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getPendingMarkets = async (req: Request, res: Response) => {
  try {
    const markets = await MarketModel.findPending();
    res.json(markets);
  } catch (error) {
    console.error('Erro ao buscar mercados pendentes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getMarketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const market = await MarketModel.findById(parseInt(id));
    
    if (!market) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    res.json(market);
  } catch (error) {
    console.error('Erro ao buscar mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getMarketWithPool = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const market = await MarketModel.findWithPool(parseInt(id));
    
    if (!market) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    res.json(market);
  } catch (error) {
    console.error('Erro ao buscar mercado com pool:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const createMarket = async (req: Request, res: Response) => {
  try {
    const { question, close_date, token_type, share_size, creator_id } = req.body;
    
    if (!question || !close_date || !token_type || !share_size || !creator_id) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const marketData: CreateMarketData = {
      question,
      close_date: new Date(close_date),
      token_type,
      share_size: parseInt(share_size),
      creator_id: parseInt(creator_id)
    };
    
    const market = await MarketModel.create(marketData);
    res.status(201).json(market);
  } catch (error) {
    console.error('Erro ao criar mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateMarketStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'active', 'settled', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const market = await MarketModel.updateStatus(parseInt(id), status);
    
    if (!market) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    res.json(market);
  } catch (error) {
    console.error('Erro ao atualizar status do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}; 