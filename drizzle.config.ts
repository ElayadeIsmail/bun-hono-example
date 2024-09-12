import { defineConfig } from 'drizzle-kit';

const dbFile = process.env.DB_FILE;

if (!dbFile) {
	throw Error(`You must define DB_FILE`);
}

export default defineConfig({
	schema: './src/database/schema/*.ts',
	dialect: 'sqlite',
	out: './drizzle',
	dbCredentials: {
		url: dbFile,
	},
});
