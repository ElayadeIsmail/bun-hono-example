import { envVars } from '@/config';
import { userMutation } from '@/database/mutations';
import { usersQuery } from '@/database/queries';
import { NotAuthorizedError } from '@/errors';
import { AUTH_COOKIE_NAME } from '@/lib/constant';
import { getSessionExpiration } from '@/lib/utils';
import { loginSchema } from '@/lib/validator/auth.validator';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { getConnInfo } from 'hono/bun';
import { setSignedCookie } from 'hono/cookie';

const app = new Hono();

app.post('/login', zValidator('json', loginSchema), async (c) => {
	const data = c.req.valid('json');
	const user = await usersQuery.findByUsernameOrEmail(data.usernameOrEmail);
	if (!user) {
		throw new NotAuthorizedError('Invalid Credentials');
	}

	const isMatch = await Bun.password.verify(data.password, user.password);

	if (!isMatch) {
		throw new NotAuthorizedError('Invalid Credentials');
	}

	const { remote } = getConnInfo(c);
	const userAgent = c.req.header('User-Agent');

	const session = await userMutation.insertSession({
		agent: userAgent,
		expiresAt: getSessionExpiration(),
		ip: remote.address,
		userId: user.id,
	});
	await setSignedCookie(
		c,
		AUTH_COOKIE_NAME,
		session.id,
		envVars.cookieSession,
		{
			path: '/',
			secure: envVars.env === 'production',
			httpOnly: true,
			maxAge: envVars.expirationDateInSec,
			sameSite: 'Lax',
		}
	);

	return c.json({ message: 'Login Route' });
});

app.post('/register', (c) => {
	return c.json({ message: 'register Route' });
});

app.post('/logout', (c) => {
	return c.json({ message: 'logout Route' });
});

app.get('/currentuser', (c) => {
	return c.json({ message: 'logout Route' });
});

export default app;
