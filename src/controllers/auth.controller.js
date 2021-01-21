import { CREATED, OK } from 'http-status';
import User from '../models/user';
import BcryptService from '../services/bcrypt.service';
import InstanceService from '../services/instance.service';
import ResponseService from '../services/response.service';

class AuthController {
	static async signup(req, res) {
		const { fullName, email, password } = req.body;

		const user = await InstanceService.createData(User, {
			fullName,
			email,
			password: BcryptService.hashPassword(password),
		});

		const userData = { ...user._doc };
		delete userData.password;

		ResponseService.setSuccess(CREATED, 'User has been created', userData);
		return ResponseService.send(res);
	}

	static async login(req, res) {
		ResponseService.setSuccess(OK, 'Successfully logged in', req.userInfo);
		return ResponseService.send(res);
	}

	static async resetPassword(req, res) {
		await InstanceService.updateOneByModel(
			User,
			{ email: req.userData.email },
			{ password: BcryptService.hashPassword(req.body.password) }
		);
		ResponseService.setSuccess(OK, 'Password has been reset');
		return ResponseService.send(res);
	}
}

export default AuthController;
