"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = __importDefault(require("./mySQL"));
class CustomerModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS customer (
			customer_id INT AUTO_INCREMENT,
            user_id INT NOT NULL,
			name VARCHAR(255) NOT NULL UNIQUE,
			address VARCHAR(255) NOT NULL UNIQUE,
            balance INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_customer PRIMARY KEY (customer_id),
            CONSTRAINT fk_customer_user_id FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
			)`;
        await mySQL_1.default.query(sql);
    }
    static async getCustomer(id) {
        const sql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
        const customer = await mySQL_1.default.query(sql);
        if (!customer)
            throw {
                message: 'Customer not found',
            };
        return customer[0];
    }
    static async getAll() {
        const sql = `
		SELECT * FROM customer
		`;
        const companies = await mySQL_1.default.query(sql);
        if (!companies)
            throw {
                message: 'Customers not found',
            };
        return companies;
    }
    static async getCustomerByName(name) {
        const sql = `
		SELECT * FROM customer
		WHERE name = '${name}'
		`;
        const customer = await mySQL_1.default.query(sql);
        if (!customer)
            throw {
                message: 'Customer not found',
            };
        return customer[0];
    }
    static async remove(id) {
        const findSql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
        const customer = await mySQL_1.default.query(findSql);
        if (!customer)
            throw {
                message: 'Customer not found',
            };
        const deleteSql = `
		DELETE FROM customer
		WHERE customer_id = ${id}
		`;
        await mySQL_1.default.query(deleteSql);
        return customer[0];
    }
    static async update(id, customer) {
        const findSql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
        const customerFound = await mySQL_1.default.query(findSql);
        if (!customerFound)
            throw {
                message: 'Customer not found',
            };
        const updateSql = `
		UPDATE customer
		SET name = '${customer.name}', address = '${customer.address}', balance = '${customer.balance}'
		WHERE customer_id = ${id}
		`;
        await mySQL_1.default.query(updateSql);
        return await this.getCustomer(id);
    }
    static async create(customer) {
        const sql = `
		INSERT INTO customer (name, address, balance, user_id)
		VALUES ('${customer.name}', '${customer.address}', '${customer.balance}', '${customer.user_id}')
		`;
        await mySQL_1.default.query(sql);
    }
    static async seed() {
        list.forEach(async (customer) => await this.create(customer));
        return await Promise.all(list.map(async (customer) => await this.getCustomerByName(customer.name)));
    }
}
exports.default = CustomerModel;
CustomerModel.createTable();
const list = [
    {
        user_id: 2,
        name: 'Charlie',
        address: '123 Main Street Apt 1',
        balance: 0,
    },
    {
        user_id: 2,
        name: 'Andrew',
        address: '1216 Penny Lane',
        balance: 0,
    },
    {
        user_id: 2,
        name: 'andrw',
        address: '123 Main Street Apt 2',
        balance: 0,
    },
];
//# sourceMappingURL=customer.js.map