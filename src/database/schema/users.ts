import { createId } from '@paralleldrive/cuid2';
import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
		.$onUpdateFn(() => sql`(unixepoch())`),
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions),
}));

export const User = users.$inferSelect;
export const NewUser = users.$inferInsert;

export const sessions = sqliteTable('sessions', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text('user_id').notNull(),
	agent: text('agent').notNull(),
	ip: text('ip').notNull(),
	expiresAt: integer('expiresAt', { mode: 'timestamp' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.default(sql`(unixepoch())`)
		.$onUpdateFn(() => sql`(unixepoch())`),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export const Session = sessions.$inferSelect;
export const NewSession = sessions.$inferInsert;
