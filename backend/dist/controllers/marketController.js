"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMarketStatus = exports.createMarket = exports.getMarketById = exports.getMarkets = void 0;
const Market_1 = require("../models/Market");
const getMarkets = async (req, res) => {
    try {
        const markets = await Market_1.MarketModel.findAll();
        res.json(markets);
    }
    catch (error) {
        console.error('Erro ao buscar mercados:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getMarkets = getMarkets;
const getMarketById = async (req, res) => {
    try {
        const { id } = req.params;
        const market = await Market_1.MarketModel.findById(id);
        if (!market) {
            return res.status(404).json({ error: 'Mercado não encontrado' });
        }
        res.json(market);
    }
    catch (error) {
        console.error('Erro ao buscar mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.getMarketById = getMarketById;
const createMarket = async (req, res) => {
    try {
        const { title, description, end_date, outcome_a, outcome_b } = req.body;
        if (!title || !description || !end_date || !outcome_a || !outcome_b) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }
        const marketData = {
            title,
            description,
            end_date: new Date(end_date),
            outcome_a,
            outcome_b
        };
        const market = await Market_1.MarketModel.create(marketData);
        res.status(201).json(market);
    }
    catch (error) {
        console.error('Erro ao criar mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.createMarket = createMarket;
const updateMarketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['active', 'settled', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }
        const market = await Market_1.MarketModel.updateStatus(id, status);
        if (!market) {
            return res.status(404).json({ error: 'Mercado não encontrado' });
        }
        res.json(market);
    }
    catch (error) {
        console.error('Erro ao atualizar status do mercado:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
exports.updateMarketStatus = updateMarketStatus;
//# sourceMappingURL=marketController.js.map