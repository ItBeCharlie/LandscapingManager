import con from '../utils/Database';

export default class User {
	id?: string;
	username: string;
	password?: string;
	charts?: Chart[];

	constructor(username: string, password?: string) {
		// this.id = Math.floor(Math.random() * 65536).toString(); // only for testing
		this.username = username;
		this.password = password;
		this.charts = [new Chart(`${username}'s chart`)];
	}

	static async signIn(username: string, password: string): Promise<User> {
		const user = await this.getUser(new User(username, password));
		if (!user) throw Error('User not found');
		if (password !== user.password) throw Error('Password is incorrect');
		return user;
	}

	static async register(user: User): Promise<User> {
		const u = await this.getUser(user);
		if (u) throw Error('User already exists');
		try {
			con.query(`INSERT INTO users (username, password) VALUES ("${user.username}", "${user.password}")`);
		} catch (err) {
			console.error('Could not register user', err);
		}
		return await this.getUser(user);
	}

	static async deleteUser(user: User) {
		if (await this.userExists(user.username)) {
			await con.query(`DELETE FROM users WHERE user_id = ${user.id}`);
		}
	}

	static async getUser(user: User): Promise<User> {
		if (user.id) {
			const q = await con.query(`SELECT * FROM users WHERE user_id = ${user.id}`);
			return q.rows[0];
		} else {
			const q = await con.query(`SELECT * FROM users WHERE username = "${user.username}"`);
			return q.rows[0];
		}
	}

	static async userExists(username: string): Promise<boolean> {
		const q = await con.query(`SELECT * FROM users WHERE username = ${username}`);
		return !!q.rows[0];
	}

	static async createTable() {
		try {
			con.query(tableQuery);
		} catch (err) {
			console.error('Could not create User table', err);
		}
	}

	static async seed() {
		for (const user of seeds) {
			try {
				con.query(`INSERT INTO users (username, password) VALUES ("${user.username}", "${user.password}")`);
			} catch (err) {
				console.error('Could not register user', err);
			}
		}
	}
}

const tableQuery: string = `CREATE TABLE IF NOT EXISTS users (
        user_id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(32) NOT NULL UNIQUE,
        password VARCHAR(32),
        CONSTRAINT user_pk PRIMARY KEY(user_id)
    )`;

const seeds: User[] = [new User('andrw', 'secretPassword'), new User('charl', 'myPassword'), new User('kaitl', 'verySecretPassword')];
