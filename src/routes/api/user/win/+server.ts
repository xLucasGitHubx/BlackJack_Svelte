import type { RequestHandler } from '@sveltejs/kit';
import { incrementUserWins } from '$lib/server/db/stats.js';

export const POST: RequestHandler = async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		return new Response(JSON.stringify({ error: 'Non autorisé' }), {
			status: 401
		});
	}

	try {
		await incrementUserWins(user.id);
		return new Response(JSON.stringify({ success: true }));
	} catch (err) {
		console.error('Erreur incrementUserWins:', err);
		return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
			status: 500
		});
	}
};
