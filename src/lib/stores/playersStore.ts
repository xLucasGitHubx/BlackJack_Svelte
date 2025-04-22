import { writable } from 'svelte/store';
import type { CardData } from './gameStore.js';

export interface Player {
	id: number;
	name: string;
	cards: CardData[];
	score: number;
}

export const players = writable<Player[]>([
	{ id: 1, name: 'Alice', cards: [], score: 0 },
	{ id: 2, name: 'Bob', cards: [], score: 0 },
	{ id: 3, name: 'Charlie', cards: [], score: 0 }
]);

// Fonction utilitaire pour mettre à jour un joueur
export function updatePlayer(playerId: number, newCard: CardData, newScore: number) {
	players.update((list) =>
		list.map((p) =>
			p.id === playerId ? { ...p, cards: [...p.cards, newCard], score: newScore } : p
		)
	);
}
