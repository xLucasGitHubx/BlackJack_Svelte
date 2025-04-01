<script lang="ts">
	import Card from './Card.svelte';
	import { players } from '../stores/playersStore.js';
</script>

<div class="relative mx-auto mt-12 flex w-full max-w-[1800px] justify-center gap-32">
	{#each $players as player (player.id)}
		<div class="flex flex-col items-center">
			<h3 class="mb-1 font-bold text-white">{player.name}</h3>
			<div class="flex gap-2">
				{#each player.cards as c}
					<Card imageUrl={c.image} altText={c.code} />
				{/each}
			</div>
			<p class="mt-1 text-sm text-white">Score : {player.score}</p>
		</div>
	{/each}
</div>
