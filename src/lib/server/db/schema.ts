// src/server/db/schema.ts
import { mysqlTable, serial, varchar, timestamp } from 'drizzle-orm/mysql-core';

// Table "users"
export const users = mysqlTable('users', {
	id: serial('id').primaryKey(),
	email: varchar('email', { length: 255 }).notNull(),
	password: varchar('password', { length: 255 }).notNull(),
	firstName: varchar('first_name', { length: 255 }).notNull().default(''),
	lastName: varchar('last_name', { length: 255 }).notNull().default(''),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow()
});
