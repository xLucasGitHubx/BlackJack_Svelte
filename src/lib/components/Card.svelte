<script lang="ts">
	export let imageUrl: string;
	export let altText: string = '';
	export let big: boolean = false;
</script>

<img
	src={imageUrl}
	alt={altText}
	class="rounded shadow transition-transform hover:scale-105"
	style={big ? 'width:7rem;height:10rem;' : 'width:5rem;height:7.5rem;'}
/>
