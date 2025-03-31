<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let isGameOver: boolean = false;

	// Pour la logique Hit/Stand passées en props
	export let onHit: () => void;
	export let onStand: () => void;
</script>

<!-- Conteneur du joueur -->
<div class="flex flex-col items-center">
	<h2 class="mb-3 text-2xl font-semibold tracking-wide drop-shadow-sm">Vos cartes</h2>

	<!-- Zone d’affichage des cartes -->
	<div class="flex flex-wrap items-center justify-center gap-2">
		{#each cards as card}
			<Card imageUrl={card.image} altText="player-card" />
		{/each}
	</div>

	<p class="mt-2 text-lg">Score : {score}</p>

	<!-- Boutons "Hit" et "Stand" (uniquement si la partie n’est pas terminée) -->
	{#if !isGameOver}
		<div class="mt-4 flex gap-4">
			<button
				class="rounded bg-yellow-600 px-4 py-2 font-medium transition hover:bg-yellow-700"
				on:click={onHit}
			>
				Hit
			</button>
			<button
				class="rounded bg-red-600 px-4 py-2 font-medium transition hover:bg-red-700"
				on:click={onStand}
			>
				Stand
			</button>
		</div>
	{/if}
</div>
