use crate::config::*;
use crate::bitcoin_rpc::{TransactionInfo, Vout};
use anyhow::Result;
use hex;

#[derive(Debug, Clone)]
pub enum ProtocolMessage {
    MarketCreate(MarketCreateData),
    PoolJoin(PoolJoinData),
    Bet(BetData),
    Settle(SettleData),
}

pub struct ProtocolProcessor;

impl ProtocolProcessor {
    pub fn process_transaction(tx: &TransactionInfo) -> Result<Vec<ProtocolMessage>> {
        let mut messages = Vec::new();

        for vout in &tx.vout {
            if let Some(message) = Self::extract_op_return(&vout)? {
                messages.push(message);
            }
        }

        Ok(messages)
    }

    fn extract_op_return(vout: &Vout) -> Result<Option<ProtocolMessage>> {
        // Verifica se é uma transação OP_RETURN
        if !vout.scriptPubKey.asm.starts_with("OP_RETURN") {
            return Ok(None);
        }

        // Extrai os dados do OP_RETURN
        let hex_data = vout.scriptPubKey.hex.trim_start_matches("6a"); // Remove o OP_RETURN
        let data = hex::decode(hex_data)?;
        let op_return_data = String::from_utf8_lossy(&data);

        // Processa os diferentes tipos de mensagens
        if op_return_data.starts_with(MARKET_CREATE_PREFIX) {
            if let Some(message) = Self::parse_market_create(&op_return_data)? {
                return Ok(Some(ProtocolMessage::MarketCreate(message)));
            }
        } else if op_return_data.starts_with(POOL_JOIN_PREFIX) {
            if let Some(message) = Self::parse_pool_join(&op_return_data)? {
                return Ok(Some(ProtocolMessage::PoolJoin(message)));
            }
        } else if op_return_data.starts_with(BET_PREFIX) {
            if let Some(message) = Self::parse_bet(&op_return_data)? {
                return Ok(Some(ProtocolMessage::Bet(message)));
            }
        } else if op_return_data.starts_with(SETTLE_PREFIX) {
            if let Some(message) = Self::parse_settle(&op_return_data)? {
                return Ok(Some(ProtocolMessage::Settle(message)));
            }
        }

        Ok(None)
    }

    fn parse_market_create(data: &str) -> Result<Option<MarketCreateData>> {
        let parts: Vec<&str> = data.split(':').collect();
        if parts.len() != 4 {
            return Ok(None);
        }

        Ok(Some(MarketCreateData {
            market_id: parts[2].to_string(),
            token_yes: parts[3].to_string(),
            token_no: parts[4].to_string(),
        }))
    }

    fn parse_pool_join(data: &str) -> Result<Option<PoolJoinData>> {
        let parts: Vec<&str> = data.split(':').collect();
        if parts.len() != 4 {
            return Ok(None);
        }

        let qty_sats = parts[3].parse::<u64>()?;
        Ok(Some(PoolJoinData {
            market_id: parts[2].to_string(),
            qty_sats,
        }))
    }

    fn parse_bet(data: &str) -> Result<Option<BetData>> {
        let parts: Vec<&str> = data.split(':').collect();
        if parts.len() != 4 {
            return Ok(None);
        }

        let qty = parts[3].parse::<u64>()?;
        Ok(Some(BetData {
            market_id: parts[1].to_string(),
            outcome: parts[2].to_string(),
            qty,
        }))
    }

    fn parse_settle(data: &str) -> Result<Option<SettleData>> {
        let parts: Vec<&str> = data.split(':').collect();
        if parts.len() != 3 {
            return Ok(None);
        }

        Ok(Some(SettleData {
            market_id: parts[1].to_string(),
            winning_outcome: parts[2].to_string(),
        }))
    }
} 