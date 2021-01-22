import {
	CONFLICT,
	FORBIDDEN,
	INTERNAL_SERVER_ERROR,
	UNAUTHORIZED,
} from 'http-status';
import rateLimit from 'express-rate-limit';
import moment from 'moment';
import User from '../models/user';
import InstanceService from '../services/instance.service';
import ResponseService from '../services/response.service';
import BcryptService from '../services/bcrypt.service';
import MailService from '../services/mail.service';
import mailGenerator from '../helpers/mail-generator';
import TokenService from '../services/token.service';

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

export const limiter = rateLimit({
	windowMs: 3 * 60 * 1000,
	max: 3,
	onLimitReached: async (req, res) => {
		const user = await InstanceService.findOneByModel(User, {
			email: req.body.email,
		});

		if (user) {
			console.log(
				req.rateLimit.resetTime,
				moment(req.rateLimit.resetTime).fromNow(true)
			);
			const email = {
				body: {
					name: user.fullName,
					intro: 'We have found many fail attempts toward your account',
					action: {
						instructions:
							'If it was not you, click the button below to reset your password',
						button: {
							color: '#22BC66',
							text: 'Reset password',
							link: `${
								process.env.FRONTEND_URL
							}/token=${TokenService.generateToken({ email: user.email })}`,
						},
					},
					outro: `If it was you try again in ${moment(
						req.rateLimit.resetTime
					).fromNow(true)}`,
				},
			};
			try {
				const emailBody = mailGenerator.generate(email);
				MailService.sendEmail(req.body.email, 'Alert', emailBody);
			} catch (error) {
				ResponseService.setError(
					INTERNAL_SERVER_ERROR,
					'Lost internet, email has not been sent'
				);
				return ResponseService.send(res);
			}
		}
	},
});

export const checkUserCredentials = async (req, res, next) => {
	const { email, password } = req.body;
	const { remaining } = req.rateLimit;
	const user = await InstanceService.findOneByModel(User, { email });

	if (!user || !BcryptService.comparePassword(password, user.password)) {
		ResponseService.setError(UNAUTHORIZED, {
			errorMessage: 'Invalid email or password',
			attempt: `You are remaining with ${remaining} attempts`,
		});
		return ResponseService.send(res);
	}
	const userData = { ...user._doc };
	delete userData.password;
	req.userInfo = userData;
	next();
};

export const authorization = (req, res, next) => {
	const token = req.headers.authorization;

	if (token === undefined) {
		ResponseService.setError(FORBIDDEN, 'Please set the authorization');
		return ResponseService.send(res);
	} else {
		const { name } = TokenService.verifyToken(token);

		if (name === 'JsonWebTokenError') {
			ResponseService.setError(UNAUTHORIZED, 'Invalid Token');
			return ResponseService.send(res);
		}
		req.userData = TokenService.verifyToken(token);
		next();
	}
};
