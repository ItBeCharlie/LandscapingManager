"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = __importDefault(require("./mySQL"));
class AvailableServiceModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS availableService (
			availableService_id INT AUTO_INCREMENT,
			name VARCHAR(255) NOT NULL UNIQUE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_availableService PRIMARY KEY (availableService_id),
			)`;
        await mySQL_1.default.query(sql);
    }
    static async getAvailableService(id) {
        const sql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
        const availableService = await mySQL_1.default.query(sql);
        if (!availableService)
            throw {
                message: 'AvailableService not found',
            };
        return availableService[0];
    }
    static async getAll() {
        const sql = `
		SELECT * FROM availableService
		`;
        const companies = await mySQL_1.default.query(sql);
        if (!companies)
            throw {
                message: 'AvailableServices not found',
            };
        return companies;
    }
    static async getAvailableServiceByName(name) {
        const sql = `
		SELECT * FROM availableService
		WHERE name = '${name}'
		`;
        const availableService = await mySQL_1.default.query(sql);
        if (!availableService)
            throw {
                message: 'AvailableService not found',
            };
        return availableService[0];
    }
    static async remove(id) {
        const findSql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
        const availableService = await mySQL_1.default.query(findSql);
        if (!availableService)
            throw {
                message: 'AvailableService not found',
            };
        const deleteSql = `
		DELETE FROM availableService
		WHERE availableService_id = ${id}
		`;
        await mySQL_1.default.query(deleteSql);
        return availableService[0];
    }
    static async update(id, availableService) {
        const findSql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
        const availableServiceFound = await mySQL_1.default.query(findSql);
        if (!availableServiceFound)
            throw {
                message: 'AvailableService not found',
            };
        const updateSql = `
		UPDATE availableService
		SET name = '${availableService.name}'
		WHERE availableService_id = ${id}
		`;
        await mySQL_1.default.query(updateSql);
        return await this.getAvailableService(id);
    }
    static async create(availableService) {
        const sql = `
		INSERT INTO availableService (name)
		VALUES ('${availableService.name}')
		`;
        await mySQL_1.default.query(sql);
    }
    static async seed() {
        list.forEach(async (availableService) => await this.create(availableService));
        return await Promise.all(list.map(async (availableService) => await this.getAvailableServiceByName(availableService.name)));
    }
}
exports.default = AvailableServiceModel;
AvailableServiceModel.createTable();
const list = [
    {
        name: 'Lawn Care',
    },
];
//# sourceMappingURL=availableService.js.map