-- Migração para adicionar campos necessários para o sistema on-chain

-- Adicionar campos para apostas
ALTER TABLE bets 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS failed_at TIMESTAMP;

-- Adicionar campos para liquidez
ALTER TABLE liquidity 
ADD COLUMN IF NOT EXISTS confirmed_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS failed_at TIMESTAMP;

-- Adicionar campos para mercados (liquidação)
ALTER TABLE markets 
ADD COLUMN IF NOT EXISTS winning_outcome CHAR(1) CHECK (winning_outcome IN ('A', 'B')),
ADD COLUMN IF NOT EXISTS settlement_txid VARCHAR(255),
ADD COLUMN IF NOT EXISTS settled_at TIMESTAMP;

-- Atualizar constraints de status para incluir 'failed'
ALTER TABLE bets DROP CONSTRAINT IF EXISTS bets_status_check;
ALTER TABLE bets ADD CONSTRAINT bets_status_check CHECK (status IN ('pending', 'confirmed', 'failed', 'settled', 'cancelled'));

ALTER TABLE liquidity DROP CONSTRAINT IF EXISTS liquidity_status_check;
ALTER TABLE liquidity ADD CONSTRAINT liquidity_status_check CHECK (status IN ('pending', 'confirmed', 'failed', 'withdrawn'));

-- Criar índices para os novos campos
CREATE INDEX IF NOT EXISTS idx_bets_confirmed_at ON bets(confirmed_at);
CREATE INDEX IF NOT EXISTS idx_bets_transaction_hash ON bets(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_liquidity_confirmed_at ON liquidity(confirmed_at);
CREATE INDEX IF NOT EXISTS idx_liquidity_transaction_hash ON liquidity(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_markets_settled_at ON markets(settled_at);
CREATE INDEX IF NOT EXISTS idx_markets_winning_outcome ON markets(winning_outcome);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    wallet_address VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de mercados
CREATE TABLE IF NOT EXISTS markets (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    close_date TIMESTAMP NOT NULL,
    token_type VARCHAR(50) NOT NULL,
    share_size INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    creator_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de pools de liquidez
CREATE TABLE IF NOT EXISTS pools (
    id SERIAL PRIMARY KEY,
    market_id INTEGER REFERENCES markets(id) ON DELETE CASCADE,
    yes_pool BIGINT DEFAULT 0,
    no_pool BIGINT DEFAULT 0,
    liquidity BIGINT DEFAULT 0,
    last_odds_yes NUMERIC(5,4) DEFAULT 0.5000,
    last_odds_no NUMERIC(5,4) DEFAULT 0.5000
);

-- Tabela de apostas
CREATE TABLE IF NOT EXISTS bets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    market_id INTEGER REFERENCES markets(id),
    outcome VARCHAR(3) CHECK (outcome IN ('YES', 'NO')),
    quantity INTEGER NOT NULL,
    price_per_share NUMERIC(10,4) NOT NULL,
    txid VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de liquidações
CREATE TABLE IF NOT EXISTS settlements (
    id SERIAL PRIMARY KEY,
    market_id INTEGER REFERENCES markets(id),
    outcome VARCHAR(3) CHECK (outcome IN ('YES', 'NO')),
    settled_at TIMESTAMP DEFAULT NOW()
); 