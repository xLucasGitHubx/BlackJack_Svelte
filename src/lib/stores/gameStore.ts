import { writable, derived, get } from 'svelte/store';
import { createAndShuffleDeck, drawCards } from '../services/deckApi.js';
import { players } from './playersStore.js'; // Importation du store des joueurs

// Interface pour typer les cartes
export interface CardData {
	code: string;
	image: string;
	suit: string;
	value: string;
}

// ===== Stores classiques =====
export const deckId = writable('');
export const playerCards = writable<CardData[]>([]);
export const dealerCards = writable<CardData[]>([]);

export const playerScore = writable(0);
export const dealerScore = writable(0);

export const dealerHidden = writable(true);
export const isGameOver = writable(false);
export const statusMessage = writable('');

// ===== Stores globaux pour score de manche =====
export const playerWins = writable(0);
export const dealerWins = writable(0);

export const roundsPlayed = derived(
	[playerWins, dealerWins],
	([$playerWins, $dealerWins]) => $playerWins + $dealerWins
);

export const gameEnded = derived(roundsPlayed, ($roundsPlayed) => $roundsPlayed >= 10);

// 🔁 Logique du jeu
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

		// 🔁 1. Distribuer aux joueurs multijoueurs
		const updatedPlayers = get(players).map((p) => ({ ...p, cards: [], score: 0 }));
		for (let i = 0; i < updatedPlayers.length; i++) {
			const cards = await drawCards(newDeckId, 2);
			updatedPlayers[i].cards = cards;
			updatedPlayers[i].score = calculateScore(cards);
		}
		players.set(updatedPlayers); // mise à jour du store

		// 🔁 2. Distribuer au joueur principal
		const playerHand = await drawCards(newDeckId, 2);
		playerCards.set(playerHand);
		playerScore.set(calculateScore(playerHand));

		// 🔁 3. Distribuer au croupier
		const dealerHand = await drawCards(newDeckId, 2);
		dealerCards.set(dealerHand);
		dealerScore.set(calculateScore(dealerHand, true));

		// Vérification du blackjack
		checkForBlackjack(playerHand, dealerHand);
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
			dealerWins.update((n) => n + 1);
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
			playerWins.update((n) => n + 1);
		} else if (dScore === 21) {
			dealerHidden.set(false);
			dealerScore.set(dScore);
			isGameOver.set(true);
			statusMessage.set('Le croupier a un Blackjack... Perdu !');
			dealerWins.update((n) => n + 1);
		}
	}

	function checkWinner() {
		const pScore = get(playerScore);
		const dScore = get(dealerScore);

		if (dScore > 21) {
			statusMessage.set('Le croupier dépasse 21, vous gagnez !');
			playerWins.update((n) => n + 1);
		} else if (pScore > dScore) {
			statusMessage.set('Vous gagnez !');
			playerWins.update((n) => n + 1);
		} else if (dScore > pScore) {
			statusMessage.set('Le croupier gagne !');
			dealerWins.update((n) => n + 1);
		} else {
			statusMessage.set('Égalité !');
		}
	}

	function resetMatch() {
		playerWins.set(0);
		dealerWins.set(0);
		statusMessage.set('');
		isGameOver.set(false);
		startNewGame();
	}

	return {
		startNewGame,
		hit,
		stand,
		resetMatch
	};
}

export const gameStore = createGameStore();
