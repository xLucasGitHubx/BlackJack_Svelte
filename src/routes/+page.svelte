<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { gameStore } from '../lib/stores/gameStore.js';
	import PlayerArea from '$lib/components/PlayerArea.svelte';
	import DealerArea from '$lib/components/DealerArea.svelte';

	// Méthodes du store
	const { startNewGame, hit, stand } = gameStore;

	// Stores individuels
	import {
		playerCards,
		playerScore,
		dealerCards,
		dealerScore,
		dealerHidden,
		isGameOver,
		statusMessage
	} from '../lib/stores/gameStore.js';

	// Lancer une partie dès le chargement
	onMount(() => {
		startNewGame();
	});
</script>

<div class="flex min-h-screen flex-col items-center bg-green-900 p-4 text-white">
	<h1 class="my-4 text-4xl font-bold">Blackjack</h1>

	<!-- Bouton Nouvelle Partie -->
	<button on:click={startNewGame} class="mb-4 rounded bg-blue-600 px-4 py-2 hover:bg-blue-800">
		Nouvelle Partie
	</button>

	<!-- Plateau de jeu -->
	<div class="mb-6 flex flex-col gap-8 lg:flex-row">
		<!-- Joueur -->
		<!-- Composant PlayerArea avec écoute des événements -->
		<PlayerArea
			cards={$playerCards}
			score={$playerScore}
			isGameOver={$isGameOver}
			onHit={hit}
			onStand={stand}
		/>

		<!-- Croupier -->
		<DealerArea
			cards={$dealerCards}
			score={$dealerScore}
			hidden={$dealerHidden}
			isGameOver={$isGameOver}
		/>
	</div>

	<!-- Message de fin -->
	{#if $isGameOver}
		<p class="rounded bg-black/40 px-4 py-2 text-lg">
			{$statusMessage}
		</p>
	{/if}
</div>
