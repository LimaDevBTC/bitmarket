import pool from '../config/database';

const initDatabase = async () => {
  try {
    console.log('Inicializando banco de dados...');

    // Criar tabela de mercados
    await pool.query(`
      CREATE TABLE IF NOT EXISTS markets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        end_date TIMESTAMP NOT NULL,
        total_liquidity DECIMAL(20,8) DEFAULT 0,
        total_volume DECIMAL(20,8) DEFAULT 0,
        status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'settled', 'cancelled')),
        outcome_a VARCHAR(255) NOT NULL,
        outcome_b VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de apostas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        market_id UUID NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
        user_address VARCHAR(255) NOT NULL,
        outcome CHAR(1) NOT NULL CHECK (outcome IN ('A', 'B')),
        amount DECIMAL(20,8) NOT NULL,
        odds DECIMAL(10,4) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'settled', 'cancelled')),
        transaction_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar tabela de liquidez
    await pool.query(`
      CREATE TABLE IF NOT EXISTS liquidity (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        market_id UUID NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
        user_address VARCHAR(255) NOT NULL,
        outcome CHAR(1) NOT NULL CHECK (outcome IN ('A', 'B')),
        amount DECIMAL(20,8) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'withdrawn')),
        transaction_hash VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Criar índices para melhor performance
    await pool.query('CREATE INDEX IF NOT EXISTS idx_bets_market_id ON bets(market_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_bets_user_address ON bets(user_address)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_bets_status ON bets(status)');
    
    await pool.query('CREATE INDEX IF NOT EXISTS idx_liquidity_market_id ON liquidity(market_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_liquidity_user_address ON liquidity(user_address)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_liquidity_status ON liquidity(status)');

    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

// Executar se chamado diretamente
if (require.main === module) {
  initDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Falha ao inicializar banco de dados:', error);
      process.exit(1);
    });
}

export default initDatabase; 