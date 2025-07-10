use sqlx::{PgPool, postgres::PgPoolOptions};
use anyhow::Result;

pub async fn connect(database_url: &str) -> Result<PgPool> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;
    Ok(pool)
}

// Função para inserir usuário
pub async fn insert_user(pool: &PgPool, wallet_address: &str) -> Result<i64> {
    let rec = sqlx::query!(
        r#"INSERT INTO users (wallet_address) VALUES ($1)
        ON CONFLICT (wallet_address) DO UPDATE SET wallet_address=EXCLUDED.wallet_address
        RETURNING id"#,
        wallet_address
    )
    .fetch_one(pool)
    .await?;
    Ok(rec.id)
}

// Função para inserir mercado
pub async fn insert_market(
    pool: &PgPool,
    question: &str,
    close_date: chrono::NaiveDateTime,
    token_type: &str,
    share_size: i32,
    creator_id: i64,
) -> Result<i64> {
    let rec = sqlx::query!(
        r#"INSERT INTO markets (question, close_date, token_type, share_size, creator_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id"#,
        question, close_date, token_type, share_size, creator_id
    )
    .fetch_one(pool)
    .await?;
    Ok(rec.id)
}

// Função para inserir pool
pub async fn insert_pool(
    pool: &PgPool,
    market_id: i64,
    yes_pool: i64,
    no_pool: i64,
    liquidity: i64,
    last_odds_yes: f64,
    last_odds_no: f64,
) -> Result<i64> {
    let rec = sqlx::query!(
        r#"INSERT INTO pools (market_id, yes_pool, no_pool, liquidity, last_odds_yes, last_odds_no)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id"#,
        market_id, yes_pool, no_pool, liquidity, last_odds_yes, last_odds_no
    )
    .fetch_one(pool)
    .await?;
    Ok(rec.id)
}

// Função para inserir aposta
pub async fn insert_bet(
    pool: &PgPool,
    user_id: i64,
    market_id: i64,
    outcome: &str,
    quantity: i32,
    price_per_share: f64,
    txid: &str,
) -> Result<i64> {
    let rec = sqlx::query!(
        r#"INSERT INTO bets (user_id, market_id, outcome, quantity, price_per_share, txid)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id"#,
        user_id, market_id, outcome, quantity, price_per_share, txid
    )
    .fetch_one(pool)
    .await?;
    Ok(rec.id)
}

// Função para inserir settlement
pub async fn insert_settlement(
    pool: &PgPool,
    market_id: i64,
    outcome: &str,
) -> Result<i64> {
    let rec = sqlx::query!(
        r#"INSERT INTO settlements (market_id, outcome)
        VALUES ($1, $2)
        RETURNING id"#,
        market_id, outcome
    )
    .fetch_one(pool)
    .await?;
    Ok(rec.id)
} 