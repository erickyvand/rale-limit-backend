import { BAD_REQUEST } from 'http-status';
import ResponseService from '../services/response.service';

export default (schema, body, res, next) => {
	const { error } = schema.validate(body);

	if (error) {
		const errors = error.details.map(err => err.message);
		ResponseService.setError(BAD_REQUEST, errors);
		return ResponseService.send(res);
	}
	next();
};
