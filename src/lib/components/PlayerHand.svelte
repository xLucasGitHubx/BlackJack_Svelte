<script lang="ts">
	import Card from './Card.svelte';

	// Ex. : liste des cartes
	export let cards: { image: string }[] = [];
</script>

<div class="flex gap-2">
	{#each cards as card}
		<Card imageUrl={card.image} />
	{/each}
</div>
