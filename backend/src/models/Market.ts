import pool from '../config/database';

export interface Market {
  id: number;
  question: string;
  close_date: Date;
  token_type: string;
  share_size: number;
  status: 'pending' | 'active' | 'settled' | 'cancelled';
  creator_id: number;
  created_at: Date;
}

export interface CreateMarketData {
  question: string;
  close_date: Date;
  token_type: string;
  share_size: number;
  creator_id: number;
}

export interface MarketWithPool extends Market {
  yes_pool: number;
  no_pool: number;
  liquidity: number;
  last_odds_yes: number;
  last_odds_no: number;
}

export class MarketModel {
  static async create(data: CreateMarketData): Promise<Market> {
    const query = `
      INSERT INTO markets (question, close_date, token_type, share_size, creator_id, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `;
    
    const values = [data.question, data.close_date, data.token_type, data.share_size, data.creator_id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findAll(): Promise<Market[]> {
    const query = 'SELECT * FROM markets ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id: number): Promise<Market | null> {
    const query = 'SELECT * FROM markets WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async findWithPool(id: number): Promise<MarketWithPool | null> {
    const query = `
      SELECT m.*, p.yes_pool, p.no_pool, p.liquidity, p.last_odds_yes, p.last_odds_no
      FROM markets m
      LEFT JOIN pools p ON m.id = p.market_id
      WHERE m.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  static async updateStatus(id: number, status: Market['status']): Promise<Market | null> {
    const query = 'UPDATE markets SET status = $1 WHERE id = $2 RETURNING *';
    const result = await pool.query(query, [status, id]);
    return result.rows[0] || null;
  }

  static async findActive(): Promise<Market[]> {
    const query = "SELECT * FROM markets WHERE status = 'active' ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  static async findPending(): Promise<Market[]> {
    const query = "SELECT * FROM markets WHERE status = 'pending' ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }
} 