<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let hidden: boolean = true;
	export let isGameOver: boolean = false;
</script>

<div class="text-center">
	<h2 class="mb-2 text-2xl">Croupier</h2>
	<div class="flex justify-center gap-2">
		<!-- Première carte -->
		{#if cards.length > 0}
			<Card imageUrl={cards[0].image} altText="dealer-first-card" />
		{/if}

		<!-- Deuxième carte (cachée ou non) -->
		{#if cards.length > 1}
			{#if hidden && !isGameOver}
				<!-- carte face cachée -->
				<div class="flex h-36 w-24 items-center justify-center rounded-md bg-blue-900 shadow-md">
					<span class="font-semibold text-white">???</span>
				</div>
			{:else}
				<Card imageUrl={cards[1].image} altText="dealer-second-card" />
			{/if}
		{/if}

		<!-- Cartes supplémentaires si le croupier en a plus de 2 -->
		{#if !hidden || isGameOver}
			{#each cards.slice(2) as extraCard}
				<Card imageUrl={extraCard.image} altText="dealer-extra-card" />
			{/each}
		{/if}
	</div>

	<!-- Score : affiché seulement si la carte est révélée ou partie finie -->
	{#if !hidden || isGameOver}
		<p class="mt-2">Score : {score}</p>
	{:else}
		<p class="mt-2">Score : ???</p>
	{/if}
</div>
