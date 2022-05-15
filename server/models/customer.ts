import db from './mySQL';

export default class CustomerModel {
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
		await db.query(sql);
	}

	static async getCustomer(id: number): Promise<Customer> {
		const sql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
		const customer = await db.query(sql);
		if (!customer)
			throw {
				message: 'Customer not found',
			};
		return customer[0];
	}

	static async getAll(): Promise<Customer[]> {
		const sql = `
		SELECT * FROM customer
		`;
		const companies = await db.query(sql);
		if (!companies)
			throw {
				message: 'Customers not found',
			};
		return companies;
	}

	static async getCustomerByName(name: string): Promise<Customer> {
		const sql = `
		SELECT * FROM customer
		WHERE name = '${name}'
		`;
		const customer = await db.query(sql);
		if (!customer)
			throw {
				message: 'Customer not found',
			};
		return customer[0];
	}

	static async remove(id: number): Promise<void> {
		const findSql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
		const customer = await db.query(findSql);
		if (!customer)
			throw {
				message: 'Customer not found',
			};

		const deleteSql = `
		DELETE FROM customer
		WHERE customer_id = ${id}
		`;
		await db.query(deleteSql);
		return customer[0];
	}

	static async update(id: number, customer: Customer): Promise<Customer> {
		const findSql = `
		SELECT * FROM customer
		WHERE customer_id = ${id}
		`;
		const customerFound = await db.query(findSql);
		if (!customerFound)
			throw {
				message: 'Customer not found',
			};

		const updateSql = `
		UPDATE customer
		SET name = '${customer.name}', address = '${customer.address}', balance = '${customer.balance}'
		WHERE customer_id = ${id}
		`;
		await db.query(updateSql);
		return await this.getCustomer(id);
	}

	static async create(customer: Customer): Promise<void> {
		const sql = `
		INSERT INTO customer (name, address, balance, user_id)
		VALUES ('${customer.name}', '${customer.address}', '${customer.balance}', '${customer.user_id}')
		`;
		await db.query(sql);
	}

	static async seed(): Promise<Customer[]> {
		list.forEach(async (customer) => await this.create(customer));
		return await Promise.all(list.map(async (customer) => await this.getCustomerByName(customer.name)));
	}
}

CustomerModel.createTable();

interface Customer {
	customer_id?: number;
	user_id: number;
	name: string;
	balance: number;
	address: string;
	created_at?: Date;
	updated_at?: Date;
}

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
