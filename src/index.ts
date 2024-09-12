import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { trimTrailingSlash } from 'hono/trailing-slash';

const app = new Hono();

app.use(logger());
app.use(trimTrailingSlash());

app.get('/', (c) => {
	throw Error('Fun Error');
	// return c.text('Hello Hono!');
});

app.notFound((c) => {
	return c.text('Custom 404 Message', 404);
});

app.onError((err, c) => {
	console.error(`${err}`);
	return c.text('Custom Error Message', 500);
});

export default { fetch: app.fetch, port: 8080 };
