import express from 'express';
import ResponseService from '../services/response.service';
import AuthRoute from './auth.route';

const routes = express();

routes.use('/api/auth', AuthRoute);
routes.get('/', (req, res) => {
	ResponseService.setError(200, 'Rate Limit API');
	return ResponseService.send(res);
});
routes.use('/', (req, res) => {
	ResponseService.setError(404, 'You have provided a wrong route');
	return ResponseService.send(res);
});

export default routes;
