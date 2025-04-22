// src/server/db/auth.ts
import { db } from './db/index.js'; // On réutilise l'instance Drizzle
import { users } from './db/schema.js'; // Accès à la table "users"
import { eq } from 'drizzle-orm'; // Pour construire la clause WHERE
import argon2 from 'argon2';

/**
 * Créer un utilisateur + hacher le mot de passe
 */
export async function registerUser({
	email,
	password,
	firstName,
	lastName
}: {
	email: string;
	password: string;
	firstName?: string;
	lastName?: string;
}) {
	// Vérifier si un user existe déjà
	const [existing] = await db.select().from(users).where(eq(users.email, email));

	if (existing) {
		throw new Error('Un utilisateur avec cet email existe déjà');
	}

	// Hachage du mot de passe
	const hashedPassword = await argon2.hash(password);

	// Insertion
	await db.insert(users).values({
		email,
		password: hashedPassword,
		firstName: firstName ?? '',
		lastName: lastName ?? ''
	});

	// ✅ Requête de retour pour récupérer l'utilisateur avec son id
	const [newUser] = await db
		.select()
		.from(users)
		.where(eq(users.email, email));

	return newUser;
}

/**
 * Récupérer un user par email
 */
export async function findUserByEmail(email: string) {
	const [user] = await db.select().from(users).where(eq(users.email, email));

	return user || null;
}

/**
 * Vérifier (login) => compare mot de passe clair vs haché
 */
export async function loginUser(email: string, password: string) {
	const user = await findUserByEmail(email);
	if (!user) {
		return null; // email inconnu
	}

	// Comparaison du hash
	const match = await argon2.verify(user.password, password);
	if (!match) {
		return null; // mot de passe invalide
	}

	return user; // renvoie l'objet complet
}
