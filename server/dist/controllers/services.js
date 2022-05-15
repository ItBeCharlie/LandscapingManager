"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const service_1 = __importDefault(require("../models/service"));
const app = express_1.default.Router();
app.get('/all/:id', (req, res, next) => {
    service_1.default.getAll()
        .then((services) => {
        res.send(services);
    })
        .catch(next);
})
    .get('/:id', (req, res, next) => {
    service_1.default.getService(parseInt(req.params.id))
        .then((service) => {
        res.send(service);
    })
        .catch(next);
})
    .get('/one/:name', (req, res, next) => {
    service_1.default.getServiceByName(req.params.name)
        .then((service) => {
        res.send(service);
    })
        .catch(next);
})
    .post('/', (req, res, next) => {
    service_1.default.create(req.body).then((service) => {
        res.send(service);
    });
})
    .delete('/:id', (req, res, next) => {
    service_1.default.remove(parseInt(req.params.id)).then((service) => {
        res.send(service);
    });
})
    .patch('/:id', (req, res, next) => {
    service_1.default.update(parseInt(req.params.id), req.body).then((service) => {
        res.send(service);
    });
})
    .post('/seed', (req, res, next) => {
    service_1.default.seed().then((service) => {
        res.send(service);
    });
});
exports.default = app;
//# sourceMappingURL=services.js.map