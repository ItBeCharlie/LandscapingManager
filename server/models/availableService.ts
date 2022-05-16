import db from './mySQL';

export default class AvailableServiceModel {
	static async createTable() {
		const sql = `
		CREATE TABLE IF NOT EXISTS availableService (
			availableService_id INT AUTO_INCREMENT,
			name VARCHAR(255) NOT NULL UNIQUE,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT pk_availableService PRIMARY KEY (availableService_id),
			)`;
		await db.query(sql);
	}

	static async getAvailableService(id: number): Promise<AvailableService> {
		const sql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
		const availableService = await db.query(sql);
		if (!availableService)
			throw {
				message: 'AvailableService not found',
			};
		return availableService[0];
	}

	static async getAll(): Promise<AvailableService[]> {
		const sql = `
		SELECT * FROM availableService
		`;
		const companies = await db.query(sql);
		if (!companies)
			throw {
				message: 'AvailableServices not found',
			};
		return companies;
	}

	static async getAvailableServiceByName(name: string): Promise<AvailableService> {
		const sql = `
		SELECT * FROM availableService
		WHERE name = '${name}'
		`;
		const availableService = await db.query(sql);
		if (!availableService)
			throw {
				message: 'AvailableService not found',
			};
		return availableService[0];
	}

	static async remove(id: number): Promise<void> {
		const findSql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
		const availableService = await db.query(findSql);
		if (!availableService)
			throw {
				message: 'AvailableService not found',
			};

		const deleteSql = `
		DELETE FROM availableService
		WHERE availableService_id = ${id}
		`;
		await db.query(deleteSql);
		return availableService[0];
	}

	static async update(id: number, availableService: AvailableService): Promise<AvailableService> {
		const findSql = `
		SELECT * FROM availableService
		WHERE availableService_id = ${id}
		`;
		const availableServiceFound = await db.query(findSql);
		if (!availableServiceFound)
			throw {
				message: 'AvailableService not found',
			};

		const updateSql = `
		UPDATE availableService
		SET name = '${availableService.name}'
		WHERE availableService_id = ${id}
		`;
		await db.query(updateSql);
		return await this.getAvailableService(id);
	}

	static async create(availableService: AvailableService): Promise<void> {
		const sql = `
		INSERT INTO availableService (name)
		VALUES ('${availableService.name}')
		`;
		await db.query(sql);
	}

	static async seed(): Promise<AvailableService[]> {
		list.forEach(async (availableService) => await this.create(availableService));
		return await Promise.all(list.map(async (availableService) => await this.getAvailableServiceByName(availableService.name)));
	}
}

AvailableServiceModel.createTable();

interface AvailableService {
	availableService_id?: number;
	name: string;
	created_at?: Date;
	updated_at?: Date;
}

const list = [
	{
		name: 'Lawn Care',
	},
];
