<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let isGameOver: boolean = false;

	// ✅ Props à ajouter
	export let onHit: () => void;
	export let onStand: () => void;
</script>

<div class="text-center">
	<h2 class="mb-2 text-2xl">Vos cartes</h2>

	<div class="flex justify-center gap-2">
		{#each cards as card}
			<Card imageUrl={card.image} altText="player-card" />
		{/each}
	</div>

	<p class="mt-2">Score : {score}</p>

	{#if !isGameOver}
		<div class="mt-4 flex justify-center gap-4">
			<button class="rounded bg-yellow-600 px-3 py-2 hover:bg-yellow-700" on:click={onHit}>
				Hit
			</button>
			<button class="rounded bg-red-600 px-3 py-2 hover:bg-red-700" on:click={onStand}>
				Stand
			</button>
		</div>
	{/if}
</div>
