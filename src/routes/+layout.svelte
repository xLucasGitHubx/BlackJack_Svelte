<script lang="ts">
	// export let data;
	let { children } = $props();
	import '../app.css';
</script>

<main class="min-h-screen bg-gray-50">
	{@render children()}
</main>
