import { Pool, PoolClient, Query, QueryResult } from 'pg';
import User from '../models/User';

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	host: 'localhost',
	database: process.env.PG_DATABASE,
	port: +(process.env.PG_PORT || 5432),
});

class Database {
	public con: PoolClient;

	constructor() {
		try {
			this.connect();
		} catch (err) {
			console.error('Could not connect', err);
		}
		// try {
		//     this.createDatabase();
		// } catch (err) {
		//     console.error('Could not create database', err);
		// }

		try {
			this.createTables();
		} catch (err) {
			console.error('Could not create tables', err);
		}

		// if (process.env.DEV) {
		//     try {
		//         this.seed();
		//     } catch (err) {
		//         console.error('Could not seed', err);
		//     }
		// }
	}

	private async connect() {
		try {
			this.con = await pool.connect();
		} catch (err) {
			console.error('Could not connect to Postgres server', err);
		}
		console.log(`⚡️[server]: Postgres is running at http://localhost:${process.env.PG_PORT}`);
	}

	async query(sql: string): Promise<QueryResult<User>> {
		try {
			return await this.con.query(sql);
		} catch (err: any) {
			return err;
		}
	}

	private async createDatabase() {
		try {
			this.con.query(`CREATE DATABASE IF NOT EXISTS chartMaker`, (err) => {
				if (err) throw err;
				console.log('Database created');
			});
		} catch (err) {
			console.error('Could not create database', err);
		}
	}

	private async createTables() {
		User.createTable();
	}

	private async seed() {
		await User.seed();
	}
}

export default new Database();
