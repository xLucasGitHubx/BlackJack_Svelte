<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let hidden: boolean = true;
	export let isGameOver: boolean = false;
</script>

<!-- Conteneur du croupier -->
<div class="flex flex-col items-center">
	<h2 class="mb-3 text-2xl font-semibold tracking-wide drop-shadow-sm">Croupier</h2>

	<div class="flex flex-wrap items-center justify-center gap-2">
		<!-- Première carte -->
		{#if cards.length > 0}
			<Card imageUrl={cards[0].image} altText="dealer-card-1" />
		{/if}

		<!-- Deuxième carte (cachée ou visible) -->
		{#if cards.length > 1}
			{#if hidden && !isGameOver}
				<!-- carte face cachée -->
				<div class="flex h-36 w-24 items-center justify-center rounded-md bg-blue-800 shadow-md">
					<span class="font-semibold text-white">???</span>
				</div>
			{:else}
				<Card imageUrl={cards[1].image} altText="dealer-card-2" />
			{/if}
		{/if}

		<!-- Cartes supplémentaires (si le croupier en tire d’autres) -->
		{#if !hidden || isGameOver}
			{#each cards.slice(2) as extraCard}
				<Card imageUrl={extraCard.image} altText="dealer-extra-card" />
			{/each}
		{/if}
	</div>

	<!-- Score complet seulement quand la carte est révélée ou fin de partie -->
	{#if !hidden || isGameOver}
		<p class="mt-2 text-lg">Score : {score}</p>
	{:else}
		<p class="mt-2 text-lg">Score : ???</p>
	{/if}
</div>
