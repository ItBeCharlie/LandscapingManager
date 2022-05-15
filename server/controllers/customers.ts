import express from 'express';
import CustomerModel from '../models/customer';

const app = express.Router();

app.get('/all/:id', (req, res, next) => {
	CustomerModel.getAll()
		.then((customers) => {
			res.send(customers);
		})
		.catch(next);
})
	.get('/:id', (req, res, next) => {
		CustomerModel.getCustomer(parseInt(req.params.id))
			.then((customer) => {
				res.send(customer);
			})
			.catch(next);
	})
	.get('/one/:name', (req, res, next) => {
		CustomerModel.getCustomerByName(req.params.name)
			.then((customer) => {
				res.send(customer);
			})
			.catch(next);
	})
	.post('/', (req, res, next) => {
		CustomerModel.create(req.body).then((customer) => {
			res.send(customer);
		});
	})
	.delete('/:id', (req, res, next) => {
		CustomerModel.remove(parseInt(req.params.id)).then((customer) => {
			res.send(customer);
		});
	})
	.patch('/:id', (req, res, next) => {
		CustomerModel.update(parseInt(req.params.id), req.body).then((customer) => {
			res.send(customer);
		});
	})
	.post('/seed', (req, res, next) => {
		CustomerModel.seed().then((customer) => {
			res.send(customer);
		});
	});

export default app;
