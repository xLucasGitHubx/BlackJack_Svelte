<script lang="ts">
	export let imageUrl: string;
	export let altText: string = 'Carte';
	// Optionnellement, d’autres props (valeur, suit, etc.)
</script>

<img src={imageUrl} alt={altText} class="h-36 w-24 rounded-md shadow-md" />
