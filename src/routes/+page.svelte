<script lang="ts">
	import { onMount } from 'svelte';
	import { createAndShuffleDeck, drawCards } from '../lib/services/deckApi.js'; // Import des fonctions API

	let deckId: string = '';
	let playerCards: any[] = [];
	let dealerCards: any[] = [];

	let playerScore = 0;
	let dealerScore = 0;

	// Le croupier garde une carte cachée tant que le joueur n'a pas "Stand"
	let dealerHidden = true;

	// Indique si la partie est terminée
	let isGameOver = false;
	let statusMessage = '';

	onMount(async () => {
		await startNewGame();
	});

	/**
	 * Lance une nouvelle partie : création d'un deck, distribution initiale.
	 */
	async function startNewGame() {
		deckId = await createAndShuffleDeck();
		isGameOver = false;
		dealerHidden = true;
		statusMessage = '';

		// On pioche 4 cartes : 2 pour le joueur, 2 pour le croupier
		const drawn = await drawCards(deckId, 4);

		playerCards = [drawn[0], drawn[1]];
		dealerCards = [drawn[2], drawn[3]];

		playerScore = calculateScore(playerCards);
		dealerScore = calculateScore(dealerCards, dealerHidden);

		checkForBlackjack();
	}

	/**
	 * Fonction de calcul du score (logique As = 1 ou 11).
	 * Si dealerHidden = true, on ne compte que la première carte du croupier.
	 */
	function calculateScore(cards: any[], hideSecondCard = false) {
		// Si hideSecondCard = true, ne calcule que la première carte
		let relevantCards = hideSecondCard ? [cards[0]] : cards;

		// Récupération des valeurs
		let values = relevantCards.map((card) => {
			let val = card.value;
			if (['KING', 'QUEEN', 'JACK'].includes(val)) {
				return 10;
			}
			if (val === 'ACE') {
				return 11; // On choisit 11 et on ajustera ensuite si on dépasse 21
			}
			return parseInt(val) || 0; // value = '2','3',... => parseInt
		});

		let total = values.reduce((acc, val) => acc + val, 0);

		// Gérer les As "trop élevés" (si total > 21, on transforme un As=11 en As=1)
		for (let card of relevantCards) {
			if (card.value === 'ACE' && total > 21) {
				total -= 10; // on retire 10 pour transformer le As=11 en As=1
			}
		}

		return total;
	}

	/**
	 * Le joueur clique sur "Hit" (tirer une carte).
	 */
	async function hit() {
		if (isGameOver) return;

		const [newCard] = await drawCards(deckId, 1);
		playerCards = [...playerCards, newCard];
		playerScore = calculateScore(playerCards);

		if (playerScore > 21) {
			dealerHidden = false;
			dealerScore = calculateScore(dealerCards);
			isGameOver = true;
			statusMessage = 'Vous avez dépassé 21... Perdu !';
		}
	}

	/**
	 * Le joueur clique sur "Stand" (arrêter).
	 * Le croupier révèle sa carte cachée, puis tire jusqu’à ≥ 17.
	 */
	async function stand() {
		if (isGameOver) return;

		// On révèle la carte cachée
		dealerHidden = false;
		dealerScore = calculateScore(dealerCards);

		// Le croupier tire tant qu'il a moins de 17
		while (dealerScore < 17) {
			const [newCard] = await drawCards(deckId, 1);
			dealerCards = [...dealerCards, newCard];
			dealerScore = calculateScore(dealerCards);
		}

		// On compare
		isGameOver = true;
		checkWinner();
	}

	function checkWinner() {
		if (dealerScore > 21) {
			statusMessage = 'Le croupier dépasse 21, vous gagnez !';
		} else if (playerScore > dealerScore) {
			statusMessage = 'Vous gagnez !';
		} else if (dealerScore > playerScore) {
			statusMessage = 'Le croupier gagne !';
		} else {
			statusMessage = 'Égalité !';
		}
	}

	/**
	 * Vérifie si le joueur (ou le croupier) a un Blackjack initial (21 dès 2 cartes).
	 */
	function checkForBlackjack() {
		if (playerScore === 21) {
			dealerHidden = false;
			dealerScore = calculateScore(dealerCards);
			isGameOver = true;
			statusMessage = 'Blackjack ! Vous gagnez !';
		} else if (calculateScore(dealerCards) === 21) {
			dealerHidden = false;
			dealerScore = calculateScore(dealerCards);
			isGameOver = true;
			statusMessage = 'Le croupier a un Blackjack... Perdu !';
		}
	}
</script>

<!--
    Partie HTML : on utilise un peu de Tailwind pour styliser
    (bg, padding, marges, etc.).
  -->
<div class="flex min-h-screen flex-col items-center bg-green-900 p-4 text-white">
	<h1 class="my-4 text-4xl font-bold">Blackjack</h1>

	<!-- Bouton Nouvelle Partie -->
	<button on:click={startNewGame} class="mb-4 rounded bg-blue-600 px-4 py-2 hover:bg-blue-800">
		Nouvelle Partie
	</button>

	<div class="mb-6 flex flex-row gap-8">
		<!-- Zone du joueur -->
		<div class="text-center">
			<h2 class="mb-2 text-2xl">Vos cartes</h2>
			<div class="flex justify-center gap-2">
				{#each playerCards as card}
					<img src={card.image} alt="player-card" class="h-36 w-24 rounded-md shadow-md" />
				{/each}
			</div>
			<p class="mt-2">Score : {playerScore}</p>

			<!-- Boutons "Hit" / "Stand" -->
			{#if !isGameOver}
				<div class="mt-4 flex justify-center gap-4">
					<button class="rounded bg-yellow-600 px-3 py-2 hover:bg-yellow-700" on:click={hit}>
						Hit
					</button>
					<button class="rounded bg-red-600 px-3 py-2 hover:bg-red-700" on:click={stand}>
						Stand
					</button>
				</div>
			{/if}
		</div>

		<!-- Zone du croupier -->
		<div class="text-center">
			<h2 class="mb-2 text-2xl">Croupier</h2>
			<div class="flex justify-center gap-2">
				<!-- Première carte -->
				{#if dealerCards.length > 0}
					<img
						src={dealerCards[0].image}
						alt="dealer-card"
						class="h-36 w-24 rounded-md shadow-md"
					/>
				{/if}

				<!-- Deuxième carte (cachée ou non) -->
				{#if dealerCards.length > 1}
					{#if dealerHidden && !isGameOver}
						<!-- carte face cachée -->
						<div
							class="flex h-36 w-24 items-center justify-center rounded-md bg-blue-900 shadow-md"
						>
							<span class="font-semibold text-white">???</span>
						</div>
					{:else}
						<img
							src={dealerCards[1].image}
							alt="dealer-card-2"
							class="h-36 w-24 rounded-md shadow-md"
						/>
					{/if}
				{/if}

				<!-- Cartes supplémentaires éventuelles du croupier -->
				{#if !dealerHidden || isGameOver}
					{#each dealerCards.slice(2) as extraCard}
						<img
							src={extraCard.image}
							alt="dealer-card-extra"
							class="h-36 w-24 rounded-md shadow-md"
						/>
					{/each}
				{/if}
			</div>
			<!-- Score complet affiché seulement si la carte est révélée ou si c'est la fin -->
			{#if !dealerHidden || isGameOver}
				<p class="mt-2">Score : {dealerScore}</p>
			{:else}
				<p class="mt-2">Score : ???</p>
			{/if}
		</div>
	</div>

	<!-- Message de fin de partie -->
	{#if isGameOver}
		<p class="rounded bg-black/40 px-4 py-2 text-lg">
			{statusMessage}
		</p>
	{/if}
</div>
