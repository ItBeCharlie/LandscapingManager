import express from 'express';
import UserModel from '../models/user';

const app = express.Router();

app.get('/', (req, res, next) => {
	UserModel.getUsers()
		.then((users) => {
			res.send(users);
		})
		.catch(next);
})
	.get('/username/:username', (req, res, next) => {
		UserModel.getUserByUsername(req.params.username)
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	})
	.get(':id', (req, res, next) => {
		UserModel.getUser(parseInt(req.params.id))
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	})
	.delete('/:id', (req, res, next) => {
		UserModel.remove(parseInt(req.params.id))
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	})
	.patch('/:id', (req, res, next) => {
		UserModel.update(parseInt(req.params.id), req.body)
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	})
	.post('/login', (req, res, next) => {
		UserModel.login(req.body.username, req.body.password)
			.then((user) => {
				res.send(user);
			})
			.catch(next);
	})
	.post('/seed', (req, res, next) => {
		UserModel.seed()
			.then((users) => {
				res.send(users);
			})
			.catch(next);
	});

export default app;
