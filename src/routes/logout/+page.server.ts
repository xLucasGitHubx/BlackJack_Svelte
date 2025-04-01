import type { Actions, ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = async () => {
	// Redirige si on accède en GET
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		// ❌ Supprime le cookie JWT
		cookies.set('jwt', '', {
			path: '/',
			maxAge: 0
		});

		// ✅ Redirection post-logout
		throw redirect(302, '/login');
	}
};
