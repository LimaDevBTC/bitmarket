# BitMarket.bet

Este é o monorepo para o projeto BitMarket.bet, um mercado de previsão (Prediction Market) totalmente on-chain construído na camada base do Bitcoin.

## Visão Geral

O projeto é dividido em três componentes principais:

-   `frontend/`: A interface de usuário web construída com Next.js.
-   `backend/`: A API de serviços construída com Node.js e Express.
-   `indexer/`: O indexador de blockchain construído em Rust.

## Começando

### Pré-requisitos

-   [Node.js](https://nodejs.org/) (versão 18 ou superior)
-   [Rust](https://www.rust-lang.org/tools/install)

### Executando os Projetos

**1. Frontend (Next.js)**

```bash
cd frontend
npm install
npm run dev
```
A aplicação frontend estará disponível em `http://localhost:3000`.

**2. Backend (Node.js)**

```bash
cd backend
npm install
node index.js
```
A API do backend estará disponível em `http://localhost:3001`.

**3. Indexer (Rust)**

```bash
cd indexer
cargo run
```
O indexador será compilado e executado, exibindo uma mensagem de inicialização. 