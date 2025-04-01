// src/routes/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: ServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// Optionnel : tu peux passer user au client si besoin
	return {
		user: locals.user
	};
};
