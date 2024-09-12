import { envVars, logger } from '@/config';
import { NotFoundError } from '@/errors';
import { errorHandler } from '@/middlewares';
import { authRouter } from '@/routes';
import { Hono } from 'hono';
import { logger as loggerMiddleware } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';

const app = new Hono();

app.use(loggerMiddleware());
app.use(trimTrailingSlash());

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

app.route('/auth', authRouter);

app.notFound(() => {
	throw new NotFoundError();
});

app.onError(errorHandler);

export default { fetch: app.fetch, port: envVars.port };
logger.info(`Server Started On Port ${envVars.port}`);
