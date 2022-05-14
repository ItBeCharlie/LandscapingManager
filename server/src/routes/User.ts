import express from 'express';
import type { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();
router
	.get('/test', (req: Request, res: Response) => {
		console.log('test');
		try {
			res.json(User.getUser(new User('andrw')));
		} catch (err) {
			res.status(401).send({ message: err });
		}
	})
	.post('/signin', async (req: Request, res: Response) => {
		try {
			const reqJSON = JSON.parse(req.body);
			const user: User = await User.signIn(reqJSON.username, reqJSON.password);
			res.send({ ...user, password: undefined });
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	})
	.post('/register', async (req: Request, res: Response) => {
		try {
			const reqJSON = JSON.parse(req.body);
			const user: User = await User.register(reqJSON);
			res.send({ ...user, password: undefined });
		} catch (err) {
			console.log(err);
			res.status(401).send(err);
		}
	});
export default router;
