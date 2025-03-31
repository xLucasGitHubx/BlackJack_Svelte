<script lang="ts">
	export let logoSrc: string = '/logo_blackjack.png';
	import { onMount } from 'svelte';

	import { gameStore } from '../stores/gameStore.js';

	const { startNewGame, hit, stand } = gameStore;

	onMount(() => {
		startNewGame();
	});
</script>

<nav class="flex items-center justify-between bg-gray-900 px-4 py-2 text-white shadow-md">
	<!-- Logo -->
	<div class="flex items-center space-x-2">
		<img src={logoSrc} alt="Logo" class="h-10 w-10 object-contain" />
		<span class="text-xl font-semibold">Blackjack</span>
	</div>

	<!-- Navigation -->
	<div class="hidden space-x-4 sm:flex">
		<a href="/" class="transition hover:text-yellow-400">Accueil</a>
		<a href="/login" class="transition hover:text-yellow-400">Connexion</a>
		<button
			on:click={startNewGame}
			class="rounded bg-yellow-500 px-3 py-1 font-semibold text-black hover:bg-yellow-600"
		>
			Nouvelle Partie
		</button>
	</div>
</nav>
