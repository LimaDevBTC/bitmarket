"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketStats = exports.confirmLiquidity = exports.updateLiquidityStatus = exports.addLiquidity = exports.getLiquidityByUser = exports.getLiquidityByMarket = exports.getLiquidity = void 0;
const Liquidity_1 = require("../models/Liquidity");
const Market_1 = require("../models/Market");
const getLiquidity = async (req, res) => {
    try {
        const liquidity = await Liquidity_1.LiquidityModel.findAll();
        res.json(liquidity);
    }
    catch (error) {
        console.error('Erro ao buscar liquidez:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLiquidity = getLiquidity;
const getLiquidityByMarket = async (req, res) => {
    try {
        const { marketId } = req.params;
        const liquidity = await Liquidity_1.LiquidityModel.findByMarketId(marketId);
        res.json(liquidity);
    }
    catch (error) {
        console.error('Erro ao buscar liquidez do mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLiquidityByMarket = getLiquidityByMarket;
const getLiquidityByUser = async (req, res) => {
    try {
        const { address } = req.params;
        const liquidity = await Liquidity_1.LiquidityModel.findByUserAddress(address);
        res.json(liquidity);
    }
    catch (error) {
        console.error('Erro ao buscar liquidez do usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getLiquidityByUser = getLiquidityByUser;
const addLiquidity = async (req, res) => {
    try {
        const { market_id, user_address, outcome, amount, transaction_hash } = req.body;
        if (!market_id || !user_address || !outcome || !amount) {
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
        const liquidityData = {
            market_id,
            user_address,
            outcome,
            amount: parseFloat(amount),
            transaction_hash
        };
        const liquidity = await Liquidity_1.LiquidityModel.create(liquidityData);
        res.status(201).json(liquidity);
    }
    catch (error) {
        console.error('Erro ao adicionar liquidez:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.addLiquidity = addLiquidity;
const updateLiquidityStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['pending', 'confirmed', 'withdrawn'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }
        const liquidity = await Liquidity_1.LiquidityModel.updateStatus(id, status);
        if (!liquidity) {
            return res.status(404).json({ error: 'Liquidez não encontrada' });
        }
        res.json(liquidity);
    }
    catch (error) {
        console.error('Erro ao atualizar status da liquidez:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateLiquidityStatus = updateLiquidityStatus;
const confirmLiquidity = async (req, res) => {
    try {
        const { id } = req.params;
        const { transaction_hash } = req.body;
        if (!transaction_hash) {
            return res.status(400).json({ error: 'Transaction hash é obrigatório' });
        }
        const liquidity = await Liquidity_1.LiquidityModel.updateTransactionHash(id, transaction_hash);
        if (!liquidity) {
            return res.status(404).json({ error: 'Liquidez não encontrada' });
        }
        const updatedLiquidity = await Liquidity_1.LiquidityModel.updateStatus(id, 'confirmed');
        res.json(updatedLiquidity);
    }
    catch (error) {
        console.error('Erro ao confirmar liquidez:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.confirmLiquidity = confirmLiquidity;
const getMarketStats = async (req, res) => {
    try {
        const { marketId } = req.params;
        const totalLiquidity = await Liquidity_1.LiquidityModel.getTotalLiquidityByMarket(marketId);
        const liquidityA = await Liquidity_1.LiquidityModel.getLiquidityByOutcome(marketId, 'A');
        const liquidityB = await Liquidity_1.LiquidityModel.getLiquidityByOutcome(marketId, 'B');
        res.json({
            total_liquidity: totalLiquidity,
            liquidity_a: liquidityA,
            liquidity_b: liquidityB,
            odds_a: liquidityB > 0 ? (totalLiquidity / liquidityA) : 1,
            odds_b: liquidityA > 0 ? (totalLiquidity / liquidityB) : 1
        });
    }
    catch (error) {
        console.error('Erro ao buscar estatísticas do mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getMarketStats = getMarketStats;
//# sourceMappingURL=liquidityController.js.map