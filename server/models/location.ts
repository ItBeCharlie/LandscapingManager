import db from './mySQL';

export default class LocationModel {
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
		await db.query(sql);
	}

	static async getLocation(id: number): Promise<Location> {
		const sql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
		const location = await db.query(sql);
		if (!location)
			throw {
				message: 'Location not found',
			};
		return location[0];
	}

	static async getAll(): Promise<Location[]> {
		const sql = `
		SELECT * FROM location
		`;
		const companies = await db.query(sql);
		if (!companies)
			throw {
				message: 'Locations not found',
			};
		return companies;
	}

	static async getLocationByAddress(address: string): Promise<Location> {
		const sql = `
		SELECT * FROM location
		WHERE address = '${address}'
		`;
		const location = await db.query(sql);
		if (!location)
			throw {
				message: 'Location not found',
			};
		return location[0];
	}

	static async remove(id: number): Promise<void> {
		const findSql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
		const location = await db.query(findSql);
		if (!location)
			throw {
				message: 'Location not found',
			};

		const deleteSql = `
		DELETE FROM location
		WHERE location_id = ${id}
		`;
		await db.query(deleteSql);
		return location[0];
	}

	static async update(id: number, location: Location): Promise<Location> {
		const findSql = `
		SELECT * FROM location
		WHERE location_id = ${id}
		`;
		const locationFound = await db.query(findSql);
		if (!locationFound)
			throw {
				message: 'Location not found',
			};

		const updateSql = `
		UPDATE location
		SET address = '${location.address}'
		WHERE location_id = ${id}
		`;
		await db.query(updateSql);
		return await this.getLocation(id);
	}

	static async create(location: Location): Promise<void> {
		const sql = `
		INSERT INTO location (address, customer_id)
		VALUES ('${location.address}', '${location.customer_id}')
		`;
		await db.query(sql);
	}

	static async seed(): Promise<Location[]> {
		list.forEach(async (location) => await this.create(location));
		return await Promise.all(list.map(async (location) => await this.getLocationByAddress(location.address)));
	}
}

LocationModel.createTable();

interface Location {
	location_id?: number;
	customer_id: number;
	address: string;
	created_at?: Date;
	updated_at?: Date;
}

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
