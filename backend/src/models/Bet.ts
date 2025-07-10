import pool from '../config/database';

export interface Bet {
  id: string;
  market_id: string;
  user_address: string;
  outcome: 'A' | 'B';
  amount: number;
  odds: number;
  status: 'pending' | 'confirmed' | 'settled' | 'cancelled';
  transaction_hash?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateBetData {
  market_id: string;
  user_address: string;
  outcome: 'A' | 'B';
  amount: number;
  odds: number;
  transaction_hash?: string;
}

export class BetModel {
  static async create(data: CreateBetData): Promise<Bet> {
    const query = `
      INSERT INTO bets (market_id, user_address, outcome, amount, odds, transaction_hash, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending')
      RETURNING *
    `;
    
    const values = [data.market_id, data.user_address, data.outcome, data.amount, data.odds, data.transaction_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<Bet[]> {
    const query = 'SELECT * FROM bets ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findByMarketId(marketId: string): Promise<Bet[]> {
    const query = 'SELECT * FROM bets WHERE market_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [marketId]);
    return result.rows;
  }

  static async findByUserAddress(userAddress: string): Promise<Bet[]> {
    const query = 'SELECT * FROM bets WHERE user_address = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userAddress]);
    return result.rows;
  }

  static async findById(id: string): Promise<Bet | null> {
    const query = 'SELECT * FROM bets WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async updateStatus(id: string, status: Bet['status']): Promise<Bet | null> {
    const query = 'UPDATE bets SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0] || null;
  }

  static async updateTransactionHash(id: string, transactionHash: string): Promise<Bet | null> {
    const query = 'UPDATE bets SET transaction_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [transactionHash, id]);
    return result.rows[0] || null;
  }

  static async getTotalVolumeByMarket(marketId: string): Promise<number> {
    const query = 'SELECT COALESCE(SUM(amount), 0) as total FROM bets WHERE market_id = $1 AND status = "confirmed"';
    const result = await pool.query(query, [marketId]);
    return parseFloat(result.rows[0].total);
  }
} 