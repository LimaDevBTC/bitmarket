import pool from '../config/database';

export interface Liquidity {
  id: string;
  market_id: string;
  user_address: string;
  outcome: 'A' | 'B';
  amount: number;
  status: 'pending' | 'confirmed' | 'withdrawn';
  transaction_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateLiquidityData {
  market_id: string;
  user_address: string;
  outcome: 'A' | 'B';
  amount: number;
  transaction_hash?: string;
}

export class LiquidityModel {
  static async create(data: CreateLiquidityData): Promise<Liquidity> {
    const query = `
      INSERT INTO liquidity (market_id, user_address, outcome, amount, transaction_hash, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `;
    
    const values = [data.market_id, data.user_address, data.outcome, data.amount, data.transaction_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<Liquidity[]> {
    const query = 'SELECT * FROM liquidity ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByMarketId(marketId: string): Promise<Liquidity[]> {
    const query = 'SELECT * FROM liquidity WHERE market_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [marketId]);
    return result.rows;
  }

  static async findByUserAddress(userAddress: string): Promise<Liquidity[]> {
    const query = 'SELECT * FROM liquidity WHERE user_address = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userAddress]);
    return result.rows;
  }

  static async findById(id: string): Promise<Liquidity | null> {
    const query = 'SELECT * FROM liquidity WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async updateStatus(id: string, status: Liquidity['status']): Promise<Liquidity | null> {
    const query = 'UPDATE liquidity SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0] || null;
  }

  static async updateTransactionHash(id: string, transactionHash: string): Promise<Liquidity | null> {
    const query = 'UPDATE liquidity SET transaction_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [transactionHash, id]);
    return result.rows[0] || null;
  }

  static async getTotalLiquidityByMarket(marketId: string): Promise<number> {
    const query = 'SELECT COALESCE(SUM(amount), 0) as total FROM liquidity WHERE market_id = $1 AND status = "confirmed"';
    const result = await pool.query(query, [marketId]);
    return parseFloat(result.rows[0].total);
  }

  static async getLiquidityByOutcome(marketId: string, outcome: 'A' | 'B'): Promise<number> {
    const query = 'SELECT COALESCE(SUM(amount), 0) as total FROM liquidity WHERE market_id = $1 AND outcome = $2 AND status = "confirmed"';
    const result = await pool.query(query, [marketId, outcome]);
    return parseFloat(result.rows[0].total);
  }
} 