"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = __importDefault(require("./mySQL"));
class ServiceModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS service (
			service_id INT AUTO_INCREMENT,
            location_id INT NOT NULL,
			name VARCHAR(255) NOT NULL UNIQUE,
			rate INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_service PRIMARY KEY (service_id),
            CONSTRAINT fk_service_location_id FOREIGN KEY (location_id) REFERENCES location(location_id) ON DELETE CASCADE
			)`;
        await mySQL_1.default.query(sql);
    }
    static async getService(id) {
        const sql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
        const service = await mySQL_1.default.query(sql);
        if (!service)
            throw {
                message: 'Service not found',
            };
        return service[0];
    }
    static async getAll() {
        const sql = `
		SELECT * FROM service
		`;
        const companies = await mySQL_1.default.query(sql);
        if (!companies)
            throw {
                message: 'Services not found',
            };
        return companies;
    }
    static async getServiceByName(name) {
        const sql = `
		SELECT * FROM service
		WHERE name = '${name}'
		`;
        const service = await mySQL_1.default.query(sql);
        if (!service)
            throw {
                message: 'Service not found',
            };
        return service[0];
    }
    static async remove(id) {
        const findSql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
        const service = await mySQL_1.default.query(findSql);
        if (!service)
            throw {
                message: 'Service not found',
            };
        const deleteSql = `
		DELETE FROM service
		WHERE service_id = ${id}
		`;
        await mySQL_1.default.query(deleteSql);
        return service[0];
    }
    static async update(id, service) {
        const findSql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
        const serviceFound = await mySQL_1.default.query(findSql);
        if (!serviceFound)
            throw {
                message: 'Service not found',
            };
        const updateSql = `
		UPDATE service
		SET name = '${service.name}', rate = '${service.rate}'
		WHERE service_id = ${id}
		`;
        await mySQL_1.default.query(updateSql);
        return await this.getService(id);
    }
    static async create(service) {
        const sql = `
		INSERT INTO service (name, rate, location_id)
		VALUES ('${service.name}', '${service.rate}', '${service.location_id}')
		`;
        await mySQL_1.default.query(sql);
    }
    static async seed() {
        list.forEach(async (service) => await this.create(service));
        return await Promise.all(list.map(async (service) => await this.getServiceByName(service.name)));
    }
}
exports.default = ServiceModel;
ServiceModel.createTable();
const list = [
    {
        location_id: 0,
        name: 'Lawn Care',
        rate: 50,
    },
    {
        location_id: 0,
        name: 'Hedge Trimming',
        rate: 75,
    },
    {
        location_id: 1,
        name: 'Lawn Care',
        rate: 100,
    },
    {
        location_id: 2,
        name: 'Lawn Care',
        rate: 40,
    },
];
//# sourceMappingURL=service.js.map