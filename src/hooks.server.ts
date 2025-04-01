// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('jwt');
	if (token) {
		try {
			const user = jwt.verify(token, env.JWT_SECRET) as {
				email: string;
				firstName?: string;
				lastName?: string;
			};
			event.locals.user = user;
		} catch (err) {
			// Token invalide/expiré => on vide user
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	return await resolve(event);
};
