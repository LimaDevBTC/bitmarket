"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketModel = void 0;
const database_1 = __importDefault(require("../config/database"));
class MarketModel {
    static async create(data) {
        const query = `
      INSERT INTO markets (title, description, end_date, outcome_a, outcome_b, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *
    `;
        const values = [data.title, data.description, data.end_date, data.outcome_a, data.outcome_b];
        const result = await database_1.default.query(query, values);
        return result.rows[0];
    }
    static async findAll() {
        const query = 'SELECT * FROM markets ORDER BY created_at DESC';
        const result = await database_1.default.query(query);
        return result.rows;
    }
    static async findById(id) {
        const query = 'SELECT * FROM markets WHERE id = $1';
        const result = await database_1.default.query(query, [id]);
        return result.rows[0] || null;
    }
    static async updateStatus(id, status) {
        const query = 'UPDATE markets SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const result = await database_1.default.query(query, [status, id]);
        return result.rows[0] || null;
    }
    static async updateLiquidity(id, liquidity) {
        const query = 'UPDATE markets SET total_liquidity = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const result = await database_1.default.query(query, [liquidity, id]);
        return result.rows[0] || null;
    }
    static async updateVolume(id, volume) {
        const query = 'UPDATE markets SET total_volume = $1, updated_at = NOW() WHERE id = $2 RETURNING *';
        const result = await database_1.default.query(query, [volume, id]);
        return result.rows[0] || null;
    }
}
exports.MarketModel = MarketModel;
//# sourceMappingURL=Market.js.map