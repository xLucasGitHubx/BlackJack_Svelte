// src/routes/login/+page.server.ts
import type { Actions, ServerLoad } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';

// Si l’utilisateur est déjà loggué, on le renvoie ailleurs
export const load: ServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/'); // Page d'accueil ou autre
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		// Vérifications basiques
		if (!email || !password) {
			return fail(400, {
				error: 'Veuillez renseigner un email et un mot de passe.'
			});
		}

		// TODO: Vérifier l’utilisateur en BD. Ici, on mocke :
		const user = { email: 'test@example.com', password: 'secret' };
		if (email !== user.email || password !== user.password) {
			return fail(401, { error: 'Identifiants invalides.' });
		}

		// Connexion OK => on génère un token
		const token = jwt.sign(
			{
				email: user.email
			},
			env.JWT_SECRET,
			{ expiresIn: '1h' }
		);

		// On enregistre le token dans un cookie
		cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // mettre true en https prod
			maxAge: 3600
		});

		// On redirige vers la page d'accueil (ou une autre page)
		throw redirect(302, '/game');
	}
};
