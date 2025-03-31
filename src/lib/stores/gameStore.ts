// src/lib/stores/gameStore.ts
import { writable, get } from 'svelte/store';
import { createAndShuffleDeck, drawCards } from '../services/deckApi.js'; // Assurez-vous que le chemin est correct

// Interface pour typer les cartes
export interface CardData {
	code: string;
	image: string;
	suit: string;
	value: string;
}

// 🔓 Stores exportés individuellement
export const deckId = writable('');
export const playerCards = writable<CardData[]>([]);
export const dealerCards = writable<CardData[]>([]);

export const playerScore = writable(0);
export const dealerScore = writable(0);

export const dealerHidden = writable(true);
export const isGameOver = writable(false);
export const statusMessage = writable('');

// 🔁 Logique principale
function createGameStore() {
	function calculateScore(cards: CardData[], hideSecondCard = false) {
		const relevantCards = hideSecondCard ? [cards[0]] : cards;
		let total = 0;
		let aceCount = 0;

		for (let card of relevantCards) {
			if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
				total += 10;
			} else if (card.value === 'ACE') {
				total += 11;
				aceCount++;
			} else {
				total += parseInt(card.value) || 0;
			}
		}

		while (aceCount > 0 && total > 21) {
			total -= 10;
			aceCount--;
		}

		return total;
	}

	async function startNewGame() {
		dealerHidden.set(true);
		isGameOver.set(false);
		statusMessage.set('');

		const newDeckId = await createAndShuffleDeck();
		deckId.set(newDeckId);

		const drawn = await drawCards(newDeckId, 4);
		const pCards = [drawn[0], drawn[1]];
		const dCards = [drawn[2], drawn[3]];

		playerCards.set(pCards);
		dealerCards.set(dCards);

		playerScore.set(calculateScore(pCards));
		dealerScore.set(calculateScore(dCards, true));

		checkForBlackjack(pCards, dCards);
	}

	async function hit() {
		if (get(isGameOver)) return;

		const newCard = (await drawCards(get(deckId), 1))[0];
		const updatedPlayerCards = [...get(playerCards), newCard];
		playerCards.set(updatedPlayerCards);

		const newScore = calculateScore(updatedPlayerCards);
		playerScore.set(newScore);

		if (newScore > 21) {
			dealerHidden.set(false);
			const finalDealerScore = calculateScore(get(dealerCards));
			dealerScore.set(finalDealerScore);

			isGameOver.set(true);
			statusMessage.set('Vous avez dépassé 21... Perdu !');
		}
	}

	async function stand() {
		if (get(isGameOver)) return;

		dealerHidden.set(false);

		let currentDealerCards = get(dealerCards);
		let currentScore = calculateScore(currentDealerCards);
		dealerScore.set(currentScore);

		while (currentScore < 17) {
			const newCard = (await drawCards(get(deckId), 1))[0];
			currentDealerCards = [...currentDealerCards, newCard];
			dealerCards.set(currentDealerCards);

			currentScore = calculateScore(currentDealerCards);
			dealerScore.set(currentScore);
		}

		isGameOver.set(true);
		checkWinner();
	}

	function checkForBlackjack(pCards: CardData[], dCards: CardData[]) {
		const pScore = calculateScore(pCards);
		const dScore = calculateScore(dCards);

		if (pScore === 21) {
			dealerHidden.set(false);
			dealerScore.set(dScore);
			isGameOver.set(true);
			statusMessage.set('Blackjack ! Vous gagnez !');
		} else if (dScore === 21) {
			dealerHidden.set(false);
			dealerScore.set(dScore);
			isGameOver.set(true);
			statusMessage.set('Le croupier a un Blackjack... Perdu !');
		}
	}

	function checkWinner() {
		const pScore = get(playerScore);
		const dScore = get(dealerScore);

		if (dScore > 21) {
			statusMessage.set('Le croupier dépasse 21, vous gagnez !');
		} else if (pScore > dScore) {
			statusMessage.set('Vous gagnez !');
		} else if (dScore > pScore) {
			statusMessage.set('Le croupier gagne !');
		} else {
			statusMessage.set('Égalité !');
		}
	}

	return {
		startNewGame,
		hit,
		stand
	};
}

export const gameStore = createGameStore();
