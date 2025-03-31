<script lang="ts">
	import Card from './Card.svelte';
	import { players } from '../stores/playersStore.js';
</script>

<div class="relative mx-auto h-[600px] w-full max-w-[1200px]">
	{#each $players as player, i (player.id)}
		<!-- Calcul du cercle -->
		<div
			class="absolute flex flex-col items-center"
			style="
				top: calc(50% + 250px * sin({(2 * Math.PI * i) / $players.length}) - 50px);
				left: calc(50% + 400px * cos({(2 * Math.PI * i) / $players.length}) - 50px);
			"
		>
			<h3 class="font-bold text-white">{player.name}</h3>
			<div class="flex gap-1">
				{#each player.cards as c}
					<Card imageUrl={c.image} altText={c.code} />
				{/each}
			</div>
			<p class="text-sm text-white">Score : {player.score}</p>
		</div>
	{/each}
</div>
