<script lang="ts">
	export let imageUrl: string; // URL de l'image de la carte (fourni par l'API)
	export let altText: string = 'Carte de Blackjack';
</script>

<div class="h-36 w-24">
	<img src={imageUrl} alt={altText} class="h-full w-full object-contain" />
</div>
