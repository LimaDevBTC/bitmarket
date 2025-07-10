const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Configuração do banco de dados
const pool = new Pool({
  user: 'bitmarket',
  host: 'localhost',
  database: 'bitmarket',
  password: 'bitmarket123',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the BitMarket.bet Backend API!');
});

// Rota para buscar todos os mercados
app.get('/api/markets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM markets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar mercados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar um mercado específico
app.get('/api/markets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM markets WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar apostas de um mercado específico
app.get('/api/markets/:id/bets', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM bets WHERE market_id = $1 ORDER BY created_at DESC', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar apostas do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar um novo mercado
app.post('/api/markets', async (req, res) => {
  try {
    const { title, description, end_date, outcome_a, outcome_b } = req.body;
    
    if (!title || !description || !end_date || !outcome_a || !outcome_b) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    const query = `
      INSERT INTO markets (title, description, end_date, outcome_a, outcome_b, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *
    `;
    
    const values = [title, description, new Date(end_date), outcome_a, outcome_b];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar todas as apostas
app.get('/api/bets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar apostas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para criar uma nova aposta
app.post('/api/bets', async (req, res) => {
  try {
    const { market_id, user_address, outcome, amount, odds, transaction_hash } = req.body;
    
    if (!market_id || !user_address || !outcome || !amount || !odds) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    if (!['A', 'B'].includes(outcome)) {
      return res.status(400).json({ error: 'Outcome deve ser A ou B' });
    }
    
    const query = `
      INSERT INTO bets (market_id, user_address, outcome, amount, odds, transaction_hash, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'pending')
      RETURNING *
    `;
    
    const values = [market_id, user_address, outcome, parseFloat(amount), parseFloat(odds), transaction_hash];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar aposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar liquidez
app.get('/api/liquidity', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM liquidity ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para adicionar liquidez
app.post('/api/liquidity', async (req, res) => {
  try {
    const { market_id, user_address, outcome, amount, transaction_hash } = req.body;
    
    if (!market_id || !user_address || !outcome || !amount) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    if (!['A', 'B'].includes(outcome)) {
      return res.status(400).json({ error: 'Outcome deve ser A ou B' });
    }
    
    const query = `
      INSERT INTO liquidity (market_id, user_address, outcome, amount, transaction_hash, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `;
    
    const values = [market_id, user_address, outcome, parseFloat(amount), transaction_hash];
    const result = await pool.query(query, values);
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao adicionar liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar apostas de um endereço de carteira
app.get('/api/bets/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const result = await pool.query('SELECT * FROM bets WHERE user_address = $1 ORDER BY created_at DESC', [address]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar apostas do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar liquidez de um endereço de carteira
app.get('/api/liquidity/address/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const result = await pool.query('SELECT * FROM liquidity WHERE user_address = $1 ORDER BY created_at DESC', [address]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar liquidez do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar liquidez de um mercado específico
app.get('/api/markets/:id/liquidity', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM liquidity WHERE market_id = $1 ORDER BY created_at DESC', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar liquidez do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar status de uma aposta (usado pelo indexador)
app.put('/api/bets/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmed_at } = req.body;
    
    if (!status || !['pending', 'confirmed', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const query = `
      UPDATE bets 
      SET status = $1, confirmed_at = $2, updated_at = NOW() 
      WHERE id = $3 
      RETURNING *
    `;
    
    const values = [status, confirmed_at || null, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Aposta não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar status da aposta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para atualizar status de liquidez (usado pelo indexador)
app.put('/api/liquidity/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, confirmed_at } = req.body;
    
    if (!status || !['pending', 'confirmed', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }
    
    const query = `
      UPDATE liquidity 
      SET status = $1, confirmed_at = $2, updated_at = NOW() 
      WHERE id = $3 
      RETURNING *
    `;
    
    const values = [status, confirmed_at || null, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Liquidez não encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar status da liquidez:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para liquidar um mercado (usado pelo indexador)
app.put('/api/markets/:id/settle', async (req, res) => {
  try {
    const { id } = req.params;
    const { winning_outcome, settlement_txid } = req.body;
    
    if (!winning_outcome || !['A', 'B'].includes(winning_outcome)) {
      return res.status(400).json({ error: 'Outcome vencedor inválido' });
    }
    
    const query = `
      UPDATE markets 
      SET status = 'settled', winning_outcome = $1, settlement_txid = $2, settled_at = NOW(), updated_at = NOW() 
      WHERE id = $3 
      RETURNING *
    `;
    
    const values = [winning_outcome, settlement_txid || null, id];
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mercado não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao liquidar mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar estatísticas de um mercado
app.get('/api/markets/:id/stats', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Busca estatísticas de apostas
    const betsResult = await pool.query(`
      SELECT 
        COUNT(*) as total_bets,
        SUM(amount) as total_volume,
        COUNT(CASE WHEN outcome = 'A' THEN 1 END) as bets_a,
        COUNT(CASE WHEN outcome = 'B' THEN 1 END) as bets_b,
        SUM(CASE WHEN outcome = 'A' THEN amount ELSE 0 END) as volume_a,
        SUM(CASE WHEN outcome = 'B' THEN amount ELSE 0 END) as volume_b
      FROM bets 
      WHERE market_id = $1 AND status = 'confirmed'
    `, [id]);
    
    // Busca estatísticas de liquidez
    const liquidityResult = await pool.query(`
      SELECT 
        SUM(amount) as total_liquidity,
        SUM(CASE WHEN outcome = 'A' THEN amount ELSE 0 END) as liquidity_a,
        SUM(CASE WHEN outcome = 'B' THEN amount ELSE 0 END) as liquidity_b
      FROM liquidity 
      WHERE market_id = $1 AND status = 'confirmed'
    `, [id]);
    
    const stats = {
      bets: betsResult.rows[0] || {
        total_bets: 0,
        total_volume: 0,
        bets_a: 0,
        bets_b: 0,
        volume_a: 0,
        volume_b: 0
      },
      liquidity: liquidityResult.rows[0] || {
        total_liquidity: 0,
        liquidity_a: 0,
        liquidity_b: 0
      }
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar estatísticas do mercado:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`);
});
