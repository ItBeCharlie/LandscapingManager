import express from 'express';
import ServiceModel from '../models/service';

const app = express.Router();

app.get('/all/:id', (req, res, next) => {
	ServiceModel.getAll()
		.then((services) => {
			res.send(services);
		})
		.catch(next);
})
	.get('/:id', (req, res, next) => {
		ServiceModel.getService(parseInt(req.params.id))
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	})
	.get('/one/:name', (req, res, next) => {
		ServiceModel.getServiceByName(req.params.name)
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	})
	.post('/', (req, res, next) => {
		ServiceModel.create(req.body)
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	})
	.delete('/:id', (req, res, next) => {
		ServiceModel.remove(parseInt(req.params.id))
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	})
	.patch('/:id', (req, res, next) => {
		ServiceModel.update(parseInt(req.params.id), req.body)
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	})
	.post('/seed', (req, res, next) => {
		ServiceModel.seed()
			.then((service) => {
				res.send(service);
			})
			.catch(next);
	});

export default app;
