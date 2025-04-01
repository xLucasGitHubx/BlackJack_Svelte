// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
			user: {
				email: string;
				firstName?: string;
				lastName?: string;
			} | null;
		}
	}
}

export {};
