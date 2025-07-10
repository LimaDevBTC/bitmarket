# BitMarket.bet Indexer

O indexador é responsável por monitorar a blockchain do Bitcoin e processar transações que contêm dados do protocolo BitMarket.bet.

## Funcionalidades

- Monitora novos blocos da blockchain do Bitcoin
- Processa transações OP_RETURN com dados do protocolo
- Identifica e processa diferentes tipos de mensagens:
  - `MARKET:create:` - Criação de mercados
  - `POOL:join:` - Adição de liquidez
  - `BET:` - Apostas
  - `SETTLE:` - Resolução de mercados

## Pré-requisitos

- Bitcoin Core rodando com RPC habilitado
- Rust (versão 1.70 ou superior)

## Configuração

1. Configure o Bitcoin Core para aceitar conexões RPC:
   ```bash
   # bitcoin.conf
   server=1
   rpcuser=seu_usuario
   rpcpassword=sua_senha
   rpcport=8332
   ```

2. Ajuste as configurações no arquivo `src/config.rs` ou use variáveis de ambiente.

## Execução

```bash
# Desenvolvimento
cargo run

# Release
cargo build --release
./target/release/indexer
```

## Logs

O indexador usa `tracing` para logging. Os logs incluem:
- Conexão com Bitcoin Core
- Processamento de blocos
- Transações do protocolo identificadas
- Erros e avisos

## Próximos Passos

- [ ] Integração com banco de dados PostgreSQL
- [ ] Persistência do estado processado
- [ ] API REST para consulta de dados
- [ ] Monitoramento de métricas 