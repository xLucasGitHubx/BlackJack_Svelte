<script lang="ts">
	import { onMount } from 'svelte';
	import { gameStore } from '../lib/stores/gameStore.js';
	import {
		playerCards,
		playerScore,
		dealerCards,
		dealerScore,
		dealerHidden,
		isGameOver,
		statusMessage
	} from '../lib/stores/gameStore.js';
	import PlayerArea from '$lib/components/PlayerArea.svelte';
	import DealerArea from '$lib/components/DealerArea.svelte';

	const { startNewGame, hit, stand } = gameStore;

	onMount(() => {
		startNewGame();
	});
</script>

<!-- 
  Container principal : fond dégradé vert, min-h-screen, etc.
  On centre le contenu avec flex-col, p-4 pour la marge globale.
-->
<div
	class="flex min-h-screen flex-col items-center bg-gradient-to-br from-green-700 via-green-800 to-green-900 p-4 text-white"
>
	<h1 class="mt-4 text-5xl font-bold tracking-wide drop-shadow-lg">Blackjack</h1>
	<p class="mb-6 text-gray-200 italic">Le plus beau Blackjack en Tailwind&nbsp;!</p>

	<!-- Bouton Nouvelle Partie -->
	<button
		on:click={startNewGame}
		class="mb-8 rounded-lg bg-blue-600 px-6 py-2 text-lg font-semibold shadow-md transition hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none"
	>
		Nouvelle Partie
	</button>

	<!-- Section de jeu -->
	<div
		class="flex w-full max-w-5xl flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center"
	>
		<!-- Joueur -->
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
		<p class="mt-6 rounded bg-black/40 px-6 py-3 text-xl shadow-lg">
			{$statusMessage}
		</p>
	{/if}
</div>
