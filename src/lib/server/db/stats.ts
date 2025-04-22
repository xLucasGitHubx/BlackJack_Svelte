// src/server/db/stats.ts
import { db } from './index.js';
import { users } from './schema.js';
import { eq } from 'drizzle-orm';
import { desc } from 'drizzle-orm';

export async function incrementUserWins(userId: number) {
	const [foundUser] = await db
		.select({ wins: users.wins })
		.from(users)
		.where(eq(users.id, userId));

	if (!foundUser) {
		throw new Error('Utilisateur introuvable');
	}

	await db
		.update(users)
		.set({ wins: foundUser.wins + 1 })
		.where(eq(users.id, userId));
}

export async function getTopPlayers(limit = 10) {
	return await db
		.select({
			id: users.id,
			firstName: users.firstName,
			lastName: users.lastName,
			wins: users.wins
		})
		.from(users)
		.orderBy(desc(users.wins))
		.limit(limit);
}
