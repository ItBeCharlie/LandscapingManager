import db from './mySQL';

export default class ServiceModel {
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
		await db.query(sql);
	}

	static async getService(id: number): Promise<Service> {
		const sql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
		const service = await db.query(sql);
		if (!service)
			throw {
				message: 'Service not found',
			};
		return service[0];
	}

	static async getAll(): Promise<Service[]> {
		const sql = `
		SELECT * FROM service
		`;
		const companies = await db.query(sql);
		if (!companies)
			throw {
				message: 'Services not found',
			};
		return companies;
	}

	static async getServiceByName(name: string): Promise<Service> {
		const sql = `
		SELECT * FROM service
		WHERE name = '${name}'
		`;
		const service = await db.query(sql);
		if (!service)
			throw {
				message: 'Service not found',
			};
		return service[0];
	}

	static async remove(id: number): Promise<void> {
		const findSql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
		const service = await db.query(findSql);
		if (!service)
			throw {
				message: 'Service not found',
			};

		const deleteSql = `
		DELETE FROM service
		WHERE service_id = ${id}
		`;
		await db.query(deleteSql);
		return service[0];
	}

	static async update(id: number, service: Service): Promise<Service> {
		const findSql = `
		SELECT * FROM service
		WHERE service_id = ${id}
		`;
		const serviceFound = await db.query(findSql);
		if (!serviceFound)
			throw {
				message: 'Service not found',
			};

		const updateSql = `
		UPDATE service
		SET name = '${service.name}', rate = '${service.rate}'
		WHERE service_id = ${id}
		`;
		await db.query(updateSql);
		return await this.getService(id);
	}

	static async create(service: Service): Promise<void> {
		const sql = `
		INSERT INTO service (name, rate, location_id)
		VALUES ('${service.name}', '${service.rate}', '${service.location_id}')
		`;
		await db.query(sql);
	}

	static async seed(): Promise<Service[]> {
		list.forEach(async (service) => await this.create(service));
		return await Promise.all(list.map(async (service) => await this.getServiceByName(service.name)));
	}
}

ServiceModel.createTable();

interface Service {
	service_id?: number;
	location_id: number;
	name: string;
	rate: number;
	created_at?: Date;
	updated_at?: Date;
}

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
