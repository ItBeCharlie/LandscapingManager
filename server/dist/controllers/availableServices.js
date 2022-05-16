"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const availableService_1 = __importDefault(require("../models/availableService"));
const app = express_1.default.Router();
app.get('/all', (req, res, next) => {
    availableService_1.default.getAll()
        .then((availableServices) => {
        res.send(availableServices);
    })
        .catch(next);
})
    .get('/:id', (req, res, next) => {
    availableService_1.default.getAvailableService(parseInt(req.params.id))
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
})
    .get('/one/:name', (req, res, next) => {
    availableService_1.default.getAvailableServiceByName(req.params.name)
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
})
    .post('/', (req, res, next) => {
    availableService_1.default.create(req.body)
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
})
    .delete('/:id', (req, res, next) => {
    availableService_1.default.remove(parseInt(req.params.id))
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
})
    .patch('/:id', (req, res, next) => {
    availableService_1.default.update(parseInt(req.params.id), req.body)
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
})
    .post('/seed', (req, res, next) => {
    availableService_1.default.seed()
        .then((availableService) => {
        res.send(availableService);
    })
        .catch(next);
});
exports.default = app;
//# sourceMappingURL=availableServices.js.map