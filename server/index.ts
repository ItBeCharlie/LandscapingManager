import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import usersController from './controllers/users';
import customersController from './controllers/customers';
import locationsController from './controllers/locations';
import servicesController from './controllers/services';

const app = express();
const port = process.env.PORT || 3030;
app.use('/', express.static(`${__dirname}/public`))
	.use((req: Request, res: Response, next: NextFunction) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		next();
	})
	.use(express.json())
	.use('/api/users', usersController)
	.use('/api/customers', customersController)
	.use('/api/locations', locationsController)
	.use('/api/services', servicesController)
	.use((err: any, req: Request, res: Response, next: NextFunction) => {
		console.log(err);
		switch (err.code) {
			default:
				res.status(err.statusCode || 500).send({ error: err.message ?? 'Internal server error' });
		}
	});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
