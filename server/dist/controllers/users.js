"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const app = express_1.default.Router();
app.get('/', (req, res, next) => {
    user_1.default.getUsers()
        .then((users) => {
        res.send(users);
    })
        .catch(next);
})
    .get('/username/:username', (req, res, next) => {
    user_1.default.getUserByUsername(req.params.username)
        .then((user) => {
        res.send(user);
    })
        .catch(next);
})
    .get(':id', (req, res, next) => {
    user_1.default.getUser(parseInt(req.params.id))
        .then((user) => {
        res.send(user);
    })
        .catch(next);
})
    .delete('/:id', (req, res, next) => {
    user_1.default.remove(parseInt(req.params.id))
        .then((user) => {
        res.send(user);
    })
        .catch(next);
})
    .patch('/:id', (req, res, next) => {
    user_1.default.update(parseInt(req.params.id), req.body)
        .then((user) => {
        res.send(user);
    })
        .catch(next);
})
    .post('/login', (req, res, next) => {
    user_1.default.login(req.body.username, req.body.password)
        .then((user) => {
        res.send(user);
    })
        .catch(next);
})
    .post('/seed', (req, res, next) => {
    user_1.default.seed()
        .then((users) => {
        res.send(users);
    })
        .catch(next);
});
exports.default = app;
//# sourceMappingURL=users.js.map