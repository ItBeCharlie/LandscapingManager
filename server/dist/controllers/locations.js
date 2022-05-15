"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_1 = __importDefault(require("../models/location"));
const app = express_1.default.Router();
app.get('/all/', (req, res, next) => {
    location_1.default.getAll()
        .then((locations) => {
        res.send(locations);
    })
        .catch(next);
})
    .get('/:id', (req, res, next) => {
    location_1.default.getLocation(parseInt(req.params.id))
        .then((location) => {
        res.send(location);
    })
        .catch(next);
})
    .get('/one/:address', (req, res, next) => {
    location_1.default.getLocationByAddress(req.params.address)
        .then((location) => {
        res.send(location);
    })
        .catch(next);
})
    .post('/', (req, res, next) => {
    location_1.default.create(req.body).then((location) => {
        res.send(location);
    });
})
    .delete('/:id', (req, res, next) => {
    location_1.default.remove(parseInt(req.params.id)).then((location) => {
        res.send(location);
    });
})
    .patch('/:id', (req, res, next) => {
    location_1.default.update(parseInt(req.params.id), req.body).then((location) => {
        res.send(location);
    });
})
    .post('/seed', (req, res, next) => {
    location_1.default.seed().then((location) => {
        res.send(location);
    });
});
exports.default = app;
//# sourceMappingURL=locations.js.map