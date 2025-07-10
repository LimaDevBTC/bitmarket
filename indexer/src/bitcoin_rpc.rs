use crate::config::BitcoinConfig;
use anyhow::Result;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Serialize)]
struct RpcRequest {
    jsonrpc: String,
    id: String,
    method: String,
    params: Vec<Value>,
}

#[derive(Debug, Deserialize)]
struct RpcResponse<T> {
    jsonrpc: String,
    id: String,
    result: Option<T>,
    error: Option<RpcError>,
}

#[derive(Debug, Deserialize)]
struct RpcError {
    code: i32,
    message: String,
}

#[derive(Debug, Deserialize)]
pub struct BlockInfo {
    pub hash: String,
    pub height: u64,
    pub tx: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct TransactionInfo {
    pub txid: String,
    pub vout: Vec<Vout>,
}

#[derive(Debug, Deserialize)]
pub struct Vout {
    pub scriptPubKey: ScriptPubKey,
}

#[derive(Debug, Deserialize)]
pub struct ScriptPubKey {
    pub asm: String,
    pub hex: String,
    #[serde(rename = "type")]
    pub script_type: String,
}

pub struct BitcoinRpcClient {
    config: BitcoinConfig,
    client: reqwest::Client,
}

impl BitcoinRpcClient {
    pub fn new(config: BitcoinConfig) -> Self {
        let client = reqwest::Client::new();
        Self { config, client }
    }

    pub async fn get_block_count(&self) -> Result<u64> {
        let request = RpcRequest {
            jsonrpc: "2.0".to_string(),
            id: "1".to_string(),
            method: "getblockcount".to_string(),
            params: vec![],
        };

        let response: RpcResponse<u64> = self.make_request(request).await?;
        response.result.ok_or_else(|| anyhow::anyhow!("No result in response"))
    }

    pub async fn get_block_hash(&self, height: u64) -> Result<String> {
        let request = RpcRequest {
            jsonrpc: "2.0".to_string(),
            id: "1".to_string(),
            method: "getblockhash".to_string(),
            params: vec![json!(height)],
        };

        let response: RpcResponse<String> = self.make_request(request).await?;
        response.result.ok_or_else(|| anyhow::anyhow!("No result in response"))
    }

    pub async fn get_block(&self, hash: &str) -> Result<BlockInfo> {
        let request = RpcRequest {
            jsonrpc: "2.0".to_string(),
            id: "1".to_string(),
            method: "getblock".to_string(),
            params: vec![json!(hash), json!(2)], // verbosity = 2 para incluir transações
        };

        let response: RpcResponse<BlockInfo> = self.make_request(request).await?;
        response.result.ok_or_else(|| anyhow::anyhow!("No result in response"))
    }

    pub async fn get_raw_transaction(&self, txid: &str) -> Result<TransactionInfo> {
        let request = RpcRequest {
            jsonrpc: "2.0".to_string(),
            id: "1".to_string(),
            method: "getrawtransaction".to_string(),
            params: vec![json!(txid), json!(true)], // verbose = true
        };

        let response: RpcResponse<TransactionInfo> = self.make_request(request).await?;
        response.result.ok_or_else(|| anyhow::anyhow!("No result in response"))
    }

    async fn make_request<T>(&self, request: RpcRequest) -> Result<RpcResponse<T>>
    where
        T: for<'de> Deserialize<'de>,
    {
        let url = format!("{}:{}", self.config.rpc_url, self.config.rpc_port);
        
        let response = self
            .client
            .post(&url)
            .basic_auth(&self.config.rpc_username, Some(&self.config.rpc_password))
            .json(&request)
            .send()
            .await?;

        let rpc_response: RpcResponse<T> = response.json().await?;
        
        if let Some(error) = rpc_response.error {
            return Err(anyhow::anyhow!("RPC Error: {} (code: {})", error.message, error.code));
        }

        Ok(rpc_response)
    }
} 