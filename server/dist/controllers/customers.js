"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("../models/customer"));
const app = express_1.default.Router();
app.get('/all/:id', (req, res, next) => {
    customer_1.default.getAll()
        .then((customers) => {
        res.send(customers);
    })
        .catch(next);
})
    .get('/:id', (req, res, next) => {
    customer_1.default.getCustomer(parseInt(req.params.id))
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
})
    .get('/one/:name', (req, res, next) => {
    customer_1.default.getCustomerByName(req.params.name)
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
})
    .post('/', (req, res, next) => {
    customer_1.default.create(req.body)
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
})
    .delete('/:id', (req, res, next) => {
    customer_1.default.remove(parseInt(req.params.id))
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
})
    .patch('/:id', (req, res, next) => {
    customer_1.default.update(parseInt(req.params.id), req.body)
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
})
    .post('/seed', (req, res, next) => {
    customer_1.default.seed()
        .then((customer) => {
        res.send(customer);
    })
        .catch(next);
});
exports.default = app;
//# sourceMappingURL=customers.js.map