use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BitcoinConfig {
    pub rpc_url: String,
    pub rpc_username: String,
    pub rpc_password: String,
    pub rpc_port: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IndexerConfig {
    pub bitcoin: BitcoinConfig,
    pub poll_interval_seconds: u64,
    pub start_block_height: Option<u64>,
}

impl Default for IndexerConfig {
    fn default() -> Self {
        Self {
            bitcoin: BitcoinConfig {
                rpc_url: "http://localhost".to_string(),
                rpc_username: "bitcoin".to_string(),
                rpc_password: "password".to_string(),
                rpc_port: 8332,
            },
            poll_interval_seconds: 10,
            start_block_height: None,
        }
    }
}

// Constantes do protocolo BitMarket.bet
pub const MARKET_CREATE_PREFIX: &str = "MARKET:create:";
pub const POOL_JOIN_PREFIX: &str = "POOL:join:";
pub const BET_PREFIX: &str = "BET:";
pub const SETTLE_PREFIX: &str = "SETTLE:";

// Estruturas para representar os dados do protocolo
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MarketCreateData {
    pub market_id: String,
    pub token_yes: String,
    pub token_no: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PoolJoinData {
    pub market_id: String,
    pub qty_sats: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BetData {
    pub market_id: String,
    pub outcome: String,
    pub qty: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SettleData {
    pub market_id: String,
    pub winning_outcome: String,
} 