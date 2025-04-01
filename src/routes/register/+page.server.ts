import type { ServerLoad, Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
export const load: ServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const firstName = data.get('firstName')?.toString().trim() ?? '';
		const lastName = data.get('lastName')?.toString().trim() ?? '';
		const email = data.get('email')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';
		const confirmPassword = data.get('confirmPassword')?.toString() ?? '';

		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			return fail(400, { error: 'Veuillez remplir tous les champs.' });
		}

		if (password !== confirmPassword) {
			return fail(400, { error: 'Les mots de passe ne correspondent pas.' });
		}

		// ✅ Vérification du env.JWT_SECRET avant d'utiliser jwt.sign
		if (!env.JWT_SECRET || env.JWT_SECRET.trim() === '') {
			console.error('❌ env.JWT_SECRET est vide ou non défini. Vérifie ton fichier .env');
			return fail(500, { error: 'Erreur interne de configuration serveur.' });
		}

		// ✅ Génération sécurisée du token JWT
		const token = jwt.sign({ email, firstName, lastName }, env.JWT_SECRET, { expiresIn: '1h' });

		// ✅ Enregistrement du token dans un cookie sécurisé
		cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // ✅ true en production HTTPS
			maxAge: 3600
		});

		throw redirect(302, '/game');
	}
};
