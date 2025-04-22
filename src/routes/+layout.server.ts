// src/routes/+layout.server.ts
export async function load({ locals }) {
	return {
		isLoggedIn: locals.isLoggedIn
	};
}
