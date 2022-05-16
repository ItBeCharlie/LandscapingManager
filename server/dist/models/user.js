"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL_1 = __importDefault(require("./mySQL"));
class UserModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS user (
			user_id INT AUTO_INCREMENT,
			username VARCHAR(255) NOT NULL UNIQUE,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			dob INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT user_pk PRIMARY KEY (user_id)
		)
	`;
        await mySQL_1.default.query(sql);
    }
    static async getUsers() {
        const sql = `
		SELECT * FROM user
		`;
        const users = await mySQL_1.default.query(sql);
        return users.map((user) => ({ ...user, password: undefined }));
    }
    static async getUser(user_id) {
        const sql = `
		SELECT * FROM user
		WHERE user_id = ${user_id}
		`;
        const user = await mySQL_1.default.query(sql);
        if (!user)
            throw {
                message: 'User not found',
            };
        return { ...user[0], password: undefined };
    }
    static async getUserByUsername(username) {
        const sql = `
		SELECT * FROM user
		WHERE username = '${username}'
		`;
        const user = await mySQL_1.default.query(sql);
        if (!user)
            throw {
                message: 'User not found',
            };
        return { ...user[0], password: undefined };
    }
    static async login(username, password) {
        const sql = `
		SELECT * FROM user
		WHERE username = '${username}' AND password = '${password}'
		`;
        const user = await mySQL_1.default.query(sql);
        if (!user)
            throw {
                message: 'User not found',
            };
        if (password != user[0].password)
            throw {
                message: 'Incorrect password',
            };
        return { ...user, password: undefined };
    }
    static async remove(user_id) {
        const findSql = `
		SELECT * from user
		WHERE user_id = ${user_id}
		`;
        const user = await mySQL_1.default.query(findSql);
        if (!user)
            throw {
                message: 'User not found',
            };
        const deleteSql = `
		DELETE FROM user
		WHERE user_id = ${user_id}
		`;
        await mySQL_1.default.query(deleteSql);
        return { ...user, password: undefined };
    }
    static async update(user_id, user) {
        const findSql = `
		SELECT * from user
		WHERE user_id = ${user_id}
		`;
        const userFound = await mySQL_1.default.query(findSql);
        if (!userFound)
            throw {
                message: 'User not found',
            };
        const updateSql = `
		UPDATE user SET
		username = '${user.username}',
		email = '${user.email}',
		password = '${user.password}',
		dob = ${user.dob}
		WHERE user_id = ${user_id}
		`;
        await mySQL_1.default.query(updateSql);
        return await this.getUser(user_id);
    }
    static async create(user) {
        if (!user.password)
            throw {
                message: 'Password is required',
            };
        let nextUser = await this.getUserByUsername(user.username);
        if (nextUser.username) {
            throw {
                message: 'Username already exists, select a different username',
            };
        }
        const sql = `INSERT INTO user (username, email, password, dob)
		VALUES ('${user.username}', '${user.email}', '${user.password}', ${user.dob})
		`;
        const newUser = await mySQL_1.default.query(sql);
        user = await this.getUser(newUser.insertId);
        console.log('Inserted!!!');
        return { ...user, password: undefined };
    }
    static async seed() {
        list.forEach(async (user) => await this.create(user));
        return await list.map(async (user) => await this.getUserByUsername(user.username));
    }
}
exports.default = UserModel;
UserModel.createTable();
const list = [
    {
        email: 'simple@email.com',
        username: 'cool',
        password: 'qwerty',
        dob: new Date(),
    },
];
//# sourceMappingURL=user.js.map