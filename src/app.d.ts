// for information about these interfaces
declare global {
	declare namespace App {
		interface Locals {
			user: {
				id: number;
				email: string;
				firstName?: string;
				lastName?: string;
			} | null;
			isLoggedIn: boolean;
		}
	}
}

export {};
