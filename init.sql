-- Tabela para armazenar os mercados de previsão
CREATE TABLE markets (
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
);

-- Tabela para armazenar as apostas
CREATE TABLE bets (
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
);

-- Tabela para armazenar a liquidez
CREATE TABLE liquidity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    market_id UUID NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
    user_address VARCHAR(255) NOT NULL,
    outcome CHAR(1) NOT NULL CHECK (outcome IN ('A', 'B')),
    amount DECIMAL(20,8) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'withdrawn')),
    transaction_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar as consultas
CREATE INDEX idx_markets_status ON markets(status);
CREATE INDEX idx_bets_market_id ON bets(market_id);
CREATE INDEX idx_bets_user_address ON bets(user_address);
CREATE INDEX idx_bets_status ON bets(status);
CREATE INDEX idx_liquidity_market_id ON liquidity(market_id);
CREATE INDEX idx_liquidity_user_address ON liquidity(user_address);
CREATE INDEX idx_liquidity_status ON liquidity(status); 