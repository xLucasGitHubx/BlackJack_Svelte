// src/server/db/index.ts
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema.js';
import { env } from '$env/dynamic/private';

// On doit avoir dans ton .env :
// DATABASE_URL="mysql://user:pass@host:3306/dbname"

if (!env.DATABASE_URL) {
	throw new Error('DATABASE_URL est manquant dans le .env');
}

// Connexion MySQL via mysql2/promise
const connection = await mysql.createConnection(env.DATABASE_URL);

// Drizzle ORM initialisé
export const db = drizzle(connection, {
	schema,
	mode: 'default'
});
