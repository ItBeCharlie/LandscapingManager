import express from 'express';
import AvailableServiceModel from '../models/availableService';

const app = express.Router();

app.get('/all/:id', (req, res, next) => {
	AvailableServiceModel.getAll()
		.then((availableServices) => {
			res.send(availableServices);
		})
		.catch(next);
})
	.get('/:id', (req, res, next) => {
		AvailableServiceModel.getAvailableService(parseInt(req.params.id))
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	})
	.get('/one/:name', (req, res, next) => {
		AvailableServiceModel.getAvailableServiceByName(req.params.name)
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	})
	.post('/', (req, res, next) => {
		AvailableServiceModel.create(req.body)
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	})
	.delete('/:id', (req, res, next) => {
		AvailableServiceModel.remove(parseInt(req.params.id))
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	})
	.patch('/:id', (req, res, next) => {
		AvailableServiceModel.update(parseInt(req.params.id), req.body)
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	})
	.post('/seed', (req, res, next) => {
		AvailableServiceModel.seed()
			.then((availableService) => {
				res.send(availableService);
			})
			.catch(next);
	});

export default app;
