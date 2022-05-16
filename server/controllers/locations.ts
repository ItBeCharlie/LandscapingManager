import express from 'express';
import LocationModel from '../models/location';

const app = express.Router();

app.get('/all/', (req, res, next) => {
	LocationModel.getAll()
		.then((locations) => {
			res.send(locations);
		})
		.catch(next);
})
	.get('/:id', (req, res, next) => {
		LocationModel.getLocation(parseInt(req.params.id))
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	})
	.get('/one/:address', (req, res, next) => {
		LocationModel.getLocationByAddress(req.params.address)
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	})
	.post('/', (req, res, next) => {
		LocationModel.create(req.body)
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	})
	.delete('/:id', (req, res, next) => {
		LocationModel.remove(parseInt(req.params.id))
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	})
	.patch('/:id', (req, res, next) => {
		LocationModel.update(parseInt(req.params.id), req.body)
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	})
	.post('/seed', (req, res, next) => {
		LocationModel.seed()
			.then((location) => {
				res.send(location);
			})
			.catch(next);
	});

export default app;
