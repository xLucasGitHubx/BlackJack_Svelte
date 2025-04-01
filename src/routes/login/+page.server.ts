import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { loginUser } from '../../lib/server/auth.js';

export const load: ServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/game');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = (formData.get('email') ?? '').toString().trim();
		const password = (formData.get('password') ?? '').toString();

		if (!email || !password) {
			return fail(400, { error: 'Email et mot de passe requis.' });
		}

		// 1. Vérifie en BD
		const user = await loginUser(email, password);
		if (!user) {
			return fail(401, { error: 'Identifiants invalides.' });
		}

		// 2. Génère le token
		if (!env.JWT_SECRET) {
			throw new Error('JWT_SECRET manquant');
		}
		const token = jwt.sign(
			{
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			},
			env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// 3. Stocke le token
		cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 3600
		});

		// 4. Redirection finale
		throw redirect(302, '/game');
	}
};
