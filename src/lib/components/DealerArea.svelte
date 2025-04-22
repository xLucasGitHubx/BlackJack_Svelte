<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let hidden: boolean = true;
	export let isGameOver: boolean = false;
</script>

<!-- Conteneur du croupier -->
<div class="mt-6 flex flex-col items-center">
	<h2 class="mb-3 text-2xl font-semibold tracking-wide text-yellow-300 drop-shadow-sm">
		🧑‍⚖️ Croupier
	</h2>

	<!-- Cartes du croupier -->
	<div class="flex flex-wrap items-center justify-center gap-2">
		<!-- Première carte -->
		{#if cards.length > 0}
			<Card imageUrl={cards[0].image} altText="dealer-card-1" big />
		{/if}

		<!-- Deuxième carte (cachée ou non) -->
		{#if cards.length > 1}
			{#if hidden && !isGameOver}
				<div class="flex h-40 w-28 items-center justify-center rounded-md bg-blue-800 shadow-md">
					<span class="text-lg font-semibold text-white">???</span>
				</div>
			{:else}
				<Card imageUrl={cards[1].image} altText="dealer-card-2" big />
			{/if}
		{/if}

		<!-- Cartes supplémentaires -->
		{#if (!hidden || isGameOver) && cards.length > 2}
			{#each cards.slice(2) as extraCard}
				<Card imageUrl={extraCard.image} altText="dealer-extra-card" big />
			{/each}
		{/if}
	</div>

	<!-- Score -->
	{#if !hidden || isGameOver}
		<p class="mt-2 text-lg text-white">Score : {score}</p>
	{:else}
		<p class="mt-2 text-lg text-white">Score : ???</p>
	{/if}
</div>
