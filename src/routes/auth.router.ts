import { Hono } from 'hono';

const app = new Hono();

app.post('/login', (c) => {
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
