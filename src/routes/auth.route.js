import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import {
	authorization,
	checkUserCredentials,
	checkUserExists,
	limiter,
} from '../middlewares/user.middleware';
import {
	validateLoginBody,
	validateResetPasswordBody,
	validateSignupBody,
} from '../validations/user.validation';

const router = Router();

router.post(
	'/signup',
	validateSignupBody,
	checkUserExists,
	AuthController.signup
);
router.post(
	'/login',
	validateLoginBody,
	limiter,
	checkUserCredentials,
	AuthController.login
);
router.put(
	'/reset-password',
	authorization,
	validateResetPasswordBody,
	AuthController.resetPassword
);

export default router;
