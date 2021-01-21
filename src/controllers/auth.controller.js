import { CREATED } from 'http-status';
import User from '../models/user';
import InstanceService from '../services/instance.service';
import ResponseService from '../services/response.service';

class AuthController {
	static async signup(req, res) {
		const { fullName, email, password } = req.body;

		const user = await InstanceService.createData(User, {
			fullName,
			email,
			password,
		});

		const userData = { ...user._doc };
		delete userData.password;

		ResponseService.setSuccess(CREATED, 'User has been created', userData);
		return ResponseService.send(res);
	}
}

export default AuthController;
