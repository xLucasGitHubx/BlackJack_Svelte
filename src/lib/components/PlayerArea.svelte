<script lang="ts">
	import Card from './Card.svelte';
	import type { CardData } from '../stores/gameStore.js';

	export let cards: CardData[] = [];
	export let score: number = 0;
	export let isGameOver: boolean = false;
	export let onHit: () => void;
	export let onStand: () => void;
</script>

<div class="flex flex-col items-center gap-2">
	<h2 class="text-2xl font-bold text-white">👤 Joueur</h2>
	<div class="flex gap-2">
		{#each cards as c}
			<Card imageUrl={c.image} altText={c.code} />
		{/each}
	</div>
	<p class="text-white">Score : {score}</p>

	{#if !isGameOver}
		<div class="mt-2 flex gap-2">
			<button on:click={onHit} class="rounded bg-green-600 px-4 py-1 text-white hover:bg-green-800"
				>Hit</button
			>
			<button
				on:click={onStand}
				class="rounded bg-yellow-500 px-4 py-1 text-white hover:bg-yellow-700">Stand</button
			>
		</div>
	{/if}
</div>
