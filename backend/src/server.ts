import express from 'express';
import cors from 'cors';
import marketRoutes from './routes/marketRoutes';
import betRoutes from './routes/betRoutes';
import liquidityRoutes from './routes/liquidityRoutes';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Welcome to the BitMarket.bet Backend API!');
});

// Rotas da API
app.use('/api/markets', marketRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/liquidity', liquidityRoutes);

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app; 