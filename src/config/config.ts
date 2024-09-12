import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(8081),
	ENV: z
		.enum(['development', 'test', 'staging', 'production'])
		.default('development'),
	DB_FILE: z.string(),
	COOKIE_SECRET: z.string(),
	EXPIRATION_DATE_IN_SEC: z.coerce
		.number()
		.int()
		.positive()
		.default(30 * 24 * 60 * 60),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	throw Error(
		`Invalid Env vars ${JSON.stringify(result.error.flatten().fieldErrors)}`
	);
}

export const envVars = {
	port: result.data.PORT,
	env: result.data.ENV,
	dbFile: result.data.DB_FILE,
	cookieSession: result.data.COOKIE_SECRET,
	expirationDateInSec: result.data.EXPIRATION_DATE_IN_SEC,
};
