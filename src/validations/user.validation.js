import Joi from 'joi';
import handleErrors from '../helpers/handle-errors';

export const validateSignupBody = (req, res, next) => {
	const schema = Joi.object({
		fullName: Joi.string().min(2).required(),
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}).options({ abortEarly: false });

	return handleErrors(schema, req.body, res, next);
};

export const validateLoginBody = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}).options({ abortEarly: false });

	return handleErrors(schema, req.body, res, next);
};

export const validateResetPasswordBody = (req, res, next) => {
	const schema = Joi.object({
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	}).options({ abortEarly: false });

	return handleErrors(schema, req.body, res, next);
};
