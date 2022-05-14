import express from 'express';
import type { Express, Request, Response } from 'express';

import userRoute from './routes/User';

const app: Express = express();
const port = process.env.EX_PORT || 3000;

app.use(express.json());
app.use(express.text());

//CORS middleware
app.use((req: Request, res: Response, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	next();
});

app.use('/user', userRoute);
app.use('/lastfm', lastfmRoute);

app.listen(port, () => {
	console.log(`⚡️[server]: Express  is running at http://localhost:${port}`);
});
