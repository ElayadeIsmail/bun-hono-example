import { eq, or } from 'drizzle-orm';
import { db } from '../client';
import { users } from '../schema/users';

const findByUsernameOrEmail = async (usernameOrEmail: string) => {
	const [user] = await db
		.select({
			id: users.id,
			username: users.username,
			email: users.email,
			password: users.password,
			createdAt: users.createdAt,
			updatedAt: users.updatedAt,
		})
		.from(users)
		.where(
			or(
				eq(users.username, usernameOrEmail),
				eq(users.email, usernameOrEmail)
			)
		)
		.limit(1);
	return user;
};

export default { findByUsernameOrEmail };
