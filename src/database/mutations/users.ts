import { db } from '../client';
import { sessions, type NewSession } from '../schema/users';

const insertSession = async (data: NewSession) => {
	const [session] = await db
		.insert(sessions)
		.values({ ...data })
		.returning({ id: sessions.id });
	return session;
};

export default { insertSession };
