// src/lib/services/deckApi.ts
export async function createAndShuffleDeck(): Promise<string> {
	const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
	const data = await res.json();
	return data.deck_id; // identifiant du deck
}

export async function drawCards(deckId: string, count: number = 1) {
	const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`);
	const data = await res.json();
	return data.cards; // tableau d'objets { code, image, value, suit... }
}
