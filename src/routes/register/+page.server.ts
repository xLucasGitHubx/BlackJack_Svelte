import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { registerUser } from '../../lib/server/auth.js';

export const load: ServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const email = (data.get('email') ?? '').toString().trim();
		const password = (data.get('password') ?? '').toString();
		const firstName = (data.get('firstName') ?? '').toString();
		const lastName = (data.get('lastName') ?? '').toString();

		if (!email || !password) {
			return fail(400, { error: 'Email et mot de passe requis' });
		}

		try {
			// 1. Création BD
			await registerUser({ email, password, firstName, lastName });

			// 2. Génère un token JWT
			if (!env.JWT_SECRET) {
				throw new Error('JWT_SECRET manquant');
			}
			const token = jwt.sign({ email, firstName, lastName }, env.JWT_SECRET, {
				expiresIn: '1h'
			});

			// 3. Set cookie
			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 3600
			});

			throw redirect(302, '/game'); // par ex, on redirige vers le jeu
		} catch (err: any) {
			console.error('Register error:', err);
			return fail(400, { error: err.message ?? 'Erreur serveur.' });
		}
	}
};
