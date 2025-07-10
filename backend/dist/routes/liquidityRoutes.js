"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const liquidityController_1 = require("../controllers/liquidityController");
const router = express_1.default.Router();
// Buscar toda a liquidez
router.get('/', liquidityController_1.getLiquidity);
// Buscar liquidez por mercado
router.get('/market/:marketId', liquidityController_1.getLiquidityByMarket);
// Buscar liquidez por usuário
router.get('/user/:address', liquidityController_1.getLiquidityByUser);
// Adicionar liquidez
router.post('/', liquidityController_1.addLiquidity);
// Atualizar status da liquidez
router.patch('/:id/status', liquidityController_1.updateLiquidityStatus);
// Confirmar liquidez com transaction hash
router.patch('/:id/confirm', liquidityController_1.confirmLiquidity);
// Buscar estatísticas do mercado
router.get('/market/:marketId/stats', liquidityController_1.getMarketStats);
exports.default = router;
//# sourceMappingURL=liquidityRoutes.js.map