import { CONFLICT } from 'http-status';
import User from '../models/user';
import InstanceService from '../services/instance.service';
import ResponseService from '../services/response.service';

export const checkUserExists = async (req, res, next) => {
	const { email } = req.body;
	const user = await InstanceService.findOneByModel(User, { email });

	if (user) {
		ResponseService.setError(
			CONFLICT,
			`User with ${email} email already exists`
		);
		return ResponseService.send(res);
	}
	next();
};
