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
			// ✅ Crée l'utilisateur et récupère son ID
			const user = await registerUser({ email, password, firstName, lastName });

			if (!env.JWT_SECRET) {
				throw new Error('JWT_SECRET manquant');
			}

			// ✅ Génère un JWT AVEC l'id
			const token = jwt.sign(
				{
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName
				},
				env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			// ✅ Stocke le token
			cookies.set('jwt', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: false,
				maxAge: 3600
			});

			throw redirect(302, '/game');
		} catch (err: any) {
			console.error('Register error:', err);
			return fail(400, { error: err.message ?? 'Erreur serveur.' });
		}
	}
};
