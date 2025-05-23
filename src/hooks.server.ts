// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('jwt');

	if (token) {
		try {
			const user = jwt.verify(token, env.JWT_SECRET) as {
				id: number;
				email: string;
				firstName?: string;
				lastName?: string;
			};

			event.locals.user = {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			};
			event.locals.isLoggedIn = true; // <-- INDISPENSABLE
		} catch (err) {
			event.locals.user = null;
			event.locals.isLoggedIn = false;
		}
	} else {
		event.locals.user = null;
		event.locals.isLoggedIn = false;
	}

	return await resolve(event);
};
