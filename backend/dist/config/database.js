"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.DB_USER || 'bitmarket',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'bitmarket',
    password: process.env.DB_PASSWORD || 'bitmarket123',
    port: parseInt(process.env.DB_PORT || '5432'),
});
exports.default = pool;
//# sourceMappingURL=database.js.map