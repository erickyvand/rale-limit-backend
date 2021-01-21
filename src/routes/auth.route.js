import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { checkUserExists } from '../middlewares/user.middleware';
import { validateSignupBody } from '../validations/user.validation';

const router = Router();

router.post(
	'/signup',
	validateSignupBody,
	checkUserExists,
	AuthController.signup
);

export default router;
