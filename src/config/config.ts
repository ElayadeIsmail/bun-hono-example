import { z } from 'zod';

const envSchema = z.object({
	PORT: z.coerce.number().default(8081),
	ENV: z
		.enum(['development', 'test', 'staging', 'production'])
		.default('development'),
	DB_FILE: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
	throw Error(`Invalid Env vars ${result.error.formErrors.fieldErrors}`);
}

export const envVars = {
	port: result.data.PORT,
	env: result.data.ENV,
	dbFile: result.data.DB_FILE,
};
