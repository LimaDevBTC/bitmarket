"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmBet = exports.updateBetStatus = exports.createBet = exports.getBetsByUser = exports.getBetsByMarket = exports.getBets = void 0;
const Bet_1 = require("../models/Bet");
const Market_1 = require("../models/Market");
const getBets = async (req, res) => {
    try {
        const bets = await Bet_1.BetModel.findAll();
        res.json(bets);
    }
    catch (error) {
        console.error('Erro ao buscar apostas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getBets = getBets;
const getBetsByMarket = async (req, res) => {
    try {
        const { marketId } = req.params;
        const bets = await Bet_1.BetModel.findByMarketId(marketId);
        res.json(bets);
    }
    catch (error) {
        console.error('Erro ao buscar apostas do mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getBetsByMarket = getBetsByMarket;
const getBetsByUser = async (req, res) => {
    try {
        const { address } = req.params;
        const bets = await Bet_1.BetModel.findByUserAddress(address);
        res.json(bets);
    }
    catch (error) {
        console.error('Erro ao buscar apostas do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getBetsByUser = getBetsByUser;
const createBet = async (req, res) => {
    try {
        const { market_id, user_address, outcome, amount, odds, transaction_hash } = req.body;
        if (!market_id || !user_address || !outcome || !amount || !odds) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        if (!['A', 'B'].includes(outcome)) {
            return res.status(400).json({ error: 'Outcome deve ser A ou B' });
        }
        // Verificar se o mercado existe
        const market = await Market_1.MarketModel.findById(market_id);
        if (!market) {
            return res.status(404).json({ error: 'Mercado não encontrado' });
        }
        if (market.status !== 'active') {
            return res.status(400).json({ error: 'Mercado não está ativo' });
        }
        const betData = {
            market_id,
            user_address,
            outcome,
            amount: parseFloat(amount),
            odds: parseFloat(odds),
            transaction_hash
        };
        const bet = await Bet_1.BetModel.create(betData);
        res.status(201).json(bet);
    }
    catch (error) {
        console.error('Erro ao criar aposta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createBet = createBet;
const updateBetStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['pending', 'confirmed', 'settled', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }
        const bet = await Bet_1.BetModel.updateStatus(id, status);
        if (!bet) {
            return res.status(404).json({ error: 'Aposta não encontrada' });
        }
        res.json(bet);
    }
    catch (error) {
        console.error('Erro ao atualizar status da aposta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateBetStatus = updateBetStatus;
const confirmBet = async (req, res) => {
    try {
        const { id } = req.params;
        const { transaction_hash } = req.body;
        if (!transaction_hash) {
            return res.status(400).json({ error: 'Transaction hash é obrigatório' });
        }
        const bet = await Bet_1.BetModel.updateTransactionHash(id, transaction_hash);
        if (!bet) {
            return res.status(404).json({ error: 'Aposta não encontrada' });
        }
        const updatedBet = await Bet_1.BetModel.updateStatus(id, 'confirmed');
        res.json(updatedBet);
    }
    catch (error) {
        console.error('Erro ao confirmar aposta:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.confirmBet = confirmBet;
//# sourceMappingURL=betController.js.map