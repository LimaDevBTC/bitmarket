import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER || 'bitmarket',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'bitmarket',
  password: process.env.DB_PASSWORD || 'bitmarket123',
  port: parseInt(process.env.DB_PORT || '5432'),
});

export default pool; 