import { envVars } from '@/config';
import { Database } from 'bun:sqlite';
import { drizzle } from 'drizzle-orm/bun-sqlite';

const sqlite = new Database(envVars.dbFile);
const db = drizzle(sqlite);

export { db };
