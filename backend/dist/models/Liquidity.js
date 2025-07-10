"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidityModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class LiquidityModel {
    static async create(data) {
        const query = `
      INSERT INTO liquidity (market_id, user_address, outcome, amount, transaction_hash, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `;
        const values = [data.market_id, data.user_address, data.outcome, data.amount, data.transaction_hash];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    static async findAll() {
        const query = 'SELECT * FROM liquidity ORDER BY created_at DESC';
        const result = await database_1.default.query(query);
        return result.rows;
    }
    static async findByMarketId(marketId) {
        const query = 'SELECT * FROM liquidity WHERE market_id = $1 ORDER BY created_at DESC';
        const result = await database_1.default.query(query, [marketId]);
        return result.rows;
    }
    static async findByUserAddress(userAddress) {
        const query = 'SELECT * FROM liquidity WHERE user_address = $1 ORDER BY created_at DESC';
        const result = await database_1.default.query(query, [userAddress]);
        return result.rows;
    }
    static async findById(id) {
        const query = 'SELECT * FROM liquidity WHERE id = $1';
        const result = await database_1.default.query(query, [id]);
        return result.rows[0] || null;
    }
    static async updateStatus(id, status) {
        const query = 'UPDATE liquidity SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const result = await database_1.default.query(query, [status, id]);
        return result.rows[0] || null;
    }
    static async updateTransactionHash(id, transactionHash) {
        const query = 'UPDATE liquidity SET transaction_hash = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const result = await database_1.default.query(query, [transactionHash, id]);
        return result.rows[0] || null;
    }
    static async getTotalLiquidityByMarket(marketId) {
        const query = 'SELECT COALESCE(SUM(amount), 0) as total FROM liquidity WHERE market_id = $1 AND status = "confirmed"';
        const result = await database_1.default.query(query, [marketId]);
        return parseFloat(result.rows[0].total);
    }
    static async getLiquidityByOutcome(marketId, outcome) {
        const query = 'SELECT COALESCE(SUM(amount), 0) as total FROM liquidity WHERE market_id = $1 AND outcome = $2 AND status = "confirmed"';
        const result = await database_1.default.query(query, [marketId, outcome]);
        return parseFloat(result.rows[0].total);
    }
}
exports.LiquidityModel = LiquidityModel;
//# sourceMappingURL=Liquidity.js.map