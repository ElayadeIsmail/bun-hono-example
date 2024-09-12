import { envVars, logger } from '@/config';
import { CustomError } from '@/errors';
import { Context } from 'hono';
import { HTTPResponseError } from 'hono/types';
import { StatusCode } from 'hono/utils/http-status';

export const errorHandler = (err: Error | HTTPResponseError, c: Context) => {
	if (err instanceof CustomError) {
		return c.json(
			{ errors: err.serializeErrors() },
			err.statusCode as StatusCode
		);
	}

	logger.error(
		envVars.env === 'production'
			? err.message
			: `${err.message} stack:${err.stack}`
	);
	return c.json({ errors: [{ message: 'Something Went Wrong' }] }, 500);
};
