"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = __importDefault(require("./mySQL"));
class LocationModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS location (
			location_id INT AUTO_INCREMENT,
            customer_id INT NOT NULL,
			address VARCHAR(255) NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_location PRIMARY KEY (location_id),
            CONSTRAINT fk_location_customer_id FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE
			)`;
        await mySQL_1.default.query(sql);
    }
    static async getLocation(id) {
        const sql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
        const location = await mySQL_1.default.query(sql);
        if (!location)
            throw {
                message: 'Location not found',
            };
        return location[0];
    }
    static async getAll() {
        const sql = `
		SELECT * FROM location
		`;
        const companies = await mySQL_1.default.query(sql);
        if (!companies)
            throw {
                message: 'Locations not found',
            };
        return companies;
    }
    static async getLocationByAddress(address) {
        const sql = `
		SELECT * FROM location
		WHERE address = '${address}'
		`;
        const location = await mySQL_1.default.query(sql);
        if (!location)
            throw {
                message: 'Location not found',
            };
        return location[0];
    }
    static async remove(id) {
        const findSql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
        const location = await mySQL_1.default.query(findSql);
        if (!location)
            throw {
                message: 'Location not found',
            };
        const deleteSql = `
		DELETE FROM location
		WHERE location_id = ${id}
		`;
        await mySQL_1.default.query(deleteSql);
        return location[0];
    }
    static async update(id, location) {
        const findSql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
        const locationFound = await mySQL_1.default.query(findSql);
        if (!locationFound)
            throw {
                message: 'Location not found',
            };
        const updateSql = `
		UPDATE location
		SET address = '${location.address}'
		WHERE location_id = ${id}
		`;
        await mySQL_1.default.query(updateSql);
        return await this.getLocation(id);
    }
    static async create(location) {
        const sql = `
		INSERT INTO location (address, customer_id)
		VALUES ('${location.address}', '${location.customer_id}')
		`;
        await mySQL_1.default.query(sql);
    }
    static async seed() {
        list.forEach(async (location) => await this.create(location));
        return await Promise.all(list.map(async (location) => await this.getLocationByAddress(location.address)));
    }
}
exports.default = LocationModel;
LocationModel.createTable();
const list = [
    {
        customer_id: 0,
        address: '123 Main Street Apt 1',
    },
    {
        customer_id: 0,
        address: '456 Penny Lane',
    },
    {
        customer_id: 1,
        address: '123 Main Street Apt 2',
    },
    {
        customer_id: 2,
        address: '1216 Penny Lane',
    },
];
//# sourceMappingURL=location.js.map