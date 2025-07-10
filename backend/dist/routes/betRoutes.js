"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const betController_1 = require("../controllers/betController");
const router = express_1.default.Router();
// Buscar todas as apostas
router.get('/', betController_1.getBets);
// Buscar apostas por mercado
router.get('/market/:marketId', betController_1.getBetsByMarket);
// Buscar apostas por usuário
router.get('/user/:address', betController_1.getBetsByUser);
// Criar nova aposta
router.post('/', betController_1.createBet);
// Atualizar status da aposta
router.patch('/:id/status', betController_1.updateBetStatus);
// Confirmar aposta com transaction hash
router.patch('/:id/confirm', betController_1.confirmBet);
exports.default = router;
//# sourceMappingURL=betRoutes.js.map