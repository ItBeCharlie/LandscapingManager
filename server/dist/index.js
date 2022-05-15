"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./controllers/users"));
const customers_1 = __importDefault(require("./controllers/customers"));
const locations_1 = __importDefault(require("./controllers/locations"));
const services_1 = __importDefault(require("./controllers/services"));
const app = express_1.default();
const port = process.env.PORT || 3030;
app.use('/', express_1.default.static(`${__dirname}/public`))
    .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
})
    .use(express_1.default.json())
    .use('/api/users', users_1.default)
    .use('/api/customers', customers_1.default)
    .use('/api/locations', locations_1.default)
    .use('/api/services', services_1.default)
    .use((err, req, res, next) => {
    console.log(err);
    switch (err.code) {
        default:
            res.status(err.statusCode || 500).send({ error: err.message ?? 'Internal server error' });
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
//# sourceMappingURL=index.js.map