mod config;
mod bitcoin_rpc;
mod protocol;
mod db;

use anyhow::Result;
use config::IndexerConfig;
use bitcoin_rpc::BitcoinRpcClient;
use protocol::{ProtocolProcessor, ProtocolMessage};
use db::*;
use std::time::Duration;
use tokio::time::sleep;
use tracing::{info, warn, error};
use chrono;

#[tokio::main]
async fn main() -> Result<()> {
    // Inicializa o logging
    tracing_subscriber::fmt::init();
    info!("Iniciando BitMarket.bet Indexer...");

    // Carrega a configuração
    let config = IndexerConfig::default();
    info!("Configuração carregada: {:?}", config);

    // Inicializa o cliente RPC
    let rpc_client = BitcoinRpcClient::new(config.bitcoin.clone());
    
    // Inicializa conexão com o banco de dados
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL não definida");
    let db_pool = connect(&database_url).await?;
    info!("Conectado ao banco de dados");
    
    // Testa a conexão com o Bitcoin Core
    match rpc_client.get_block_count().await {
        Ok(count) => info!("Conectado ao Bitcoin Core. Altura atual: {}", count),
        Err(e) => {
            error!("Falha ao conectar ao Bitcoin Core: {}", e);
            return Err(e);
        }
    }

    // Inicia o loop principal do indexador
    let mut last_processed_height = config.start_block_height.unwrap_or(0);
    
    loop {
        match process_new_blocks(&rpc_client, &db_pool, &mut last_processed_height).await {
            Ok(_) => {
                info!("Processamento concluído. Próximo bloco: {}", last_processed_height + 1);
            }
            Err(e) => {
                error!("Erro durante o processamento: {}", e);
            }
        }

        // Aguarda antes da próxima verificação
        sleep(Duration::from_secs(config.poll_interval_seconds)).await;
    }
}

async fn process_new_blocks(rpc_client: &BitcoinRpcClient, db_pool: &db::PgPool, last_processed_height: &mut u64) -> Result<()> {
    // Obtém a altura atual da blockchain
    let current_height = rpc_client.get_block_count().await?;
    
    if current_height <= *last_processed_height {
        return Ok(());
    }

    info!("Processando blocos de {} até {}", *last_processed_height + 1, current_height);

    // Processa cada bloco novo
    for height in (*last_processed_height + 1)..=current_height {
        if let Err(e) = process_block(rpc_client, db_pool, height).await {
            error!("Erro ao processar bloco {}: {}", height, e);
            continue;
        }
        *last_processed_height = height;
    }

    Ok(())
}

async fn process_block(rpc_client: &BitcoinRpcClient, db_pool: &db::PgPool, height: u64) -> Result<()> {
    // Obtém o hash do bloco
    let block_hash = rpc_client.get_block_hash(height).await?;
    
    // Obtém os detalhes do bloco
    let block = rpc_client.get_block(&block_hash).await?;
    
    info!("Processando bloco {} ({}): {} transações", height, block_hash, block.tx.len());

    // Processa cada transação no bloco
    for txid in &block.tx {
        if let Err(e) = process_transaction(rpc_client, db_pool, txid).await {
            warn!("Erro ao processar transação {}: {}", txid, e);
            continue;
        }
    }

    Ok(())
}

async fn process_transaction(rpc_client: &BitcoinRpcClient, db_pool: &db::PgPool, txid: &str) -> Result<()> {
    // Obtém os detalhes da transação
    let tx = rpc_client.get_raw_transaction(txid).await?;
    
    // Processa as mensagens do protocolo
    let messages = ProtocolProcessor::process_transaction(&tx)?;
    
    if !messages.is_empty() {
        info!("Transação {} contém {} mensagens do protocolo", txid, messages.len());
        
        for message in messages {
            handle_protocol_message(&message, txid, db_pool).await?;
        }
    }

    Ok(())
}

async fn handle_protocol_message(message: &ProtocolMessage, txid: &str, db_pool: &db::PgPool) -> Result<()> {
    match message {
        ProtocolMessage::MarketCreate(data) => {
            info!("Mercado criado: ID={}, Token YES={}, Token NO={}, TX={}", 
                  data.market_id, data.token_yes, data.token_no, txid);
            // Inserir usuário fictício (placeholder)
            let user_id = db::insert_user(db_pool, "placeholder_wallet").await?;
            // Inserir mercado (usando data de fechamento padrão para exemplo)
            let close_date = chrono::Utc::now().naive_utc() + chrono::Duration::days(7);
            let market_id = db::insert_market(
                db_pool,
                &format!("Mercado: {}", data.market_id),
                close_date,
                &data.token_yes,
                1, // share_size padrão
                user_id
            ).await?;
            // Inserir pool inicial
            db::insert_pool(db_pool, market_id, 0, 0, 0, 0.5, 0.5).await?;
        }
        ProtocolMessage::PoolJoin(data) => {
            info!("Liquidez adicionada: Market={}, Quantidade={} sats, TX={}", 
                  data.market_id, data.qty_sats, txid);
            // Buscar market_id real (exemplo: 1)
            let market_id = 1; // TODO: buscar pelo data.market_id
            db::insert_pool(db_pool, market_id, data.qty_sats as i64, 0, data.qty_sats as i64, 0.5, 0.5).await?;
        }
        ProtocolMessage::Bet(data) => {
            info!("Aposta registrada: Market={}, Outcome={}, Quantidade={}, TX={}", 
                  data.market_id, data.outcome, data.qty, txid);
            // Buscar user_id e market_id reais (exemplo: 1)
            let user_id = db::insert_user(db_pool, "placeholder_wallet").await?;
            let market_id = 1; // TODO: buscar pelo data.market_id
            db::insert_bet(db_pool, user_id, market_id, &data.outcome, data.qty as i32, 0.5, txid).await?;
        }
        ProtocolMessage::Settle(data) => {
            info!("Mercado resolvido: Market={}, Resultado={}, TX={}", 
                  data.market_id, data.winning_outcome, txid);
            // Buscar market_id real (exemplo: 1)
            let market_id = 1; // TODO: buscar pelo data.market_id
            db::insert_settlement(db_pool, market_id, &data.winning_outcome).await?;
        }
    }

    Ok(())
}
