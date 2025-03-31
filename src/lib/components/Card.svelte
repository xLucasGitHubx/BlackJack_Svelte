<script lang="ts">
	export let imageUrl: string;
	export let altText: string = 'carte';
</script>

<!-- Carte unique, avec un léger zoom au survol -->
<img
	src={imageUrl}
	alt={altText}
	class="h-36 w-24 rounded-md shadow-md transition-transform hover:scale-105"
/>
