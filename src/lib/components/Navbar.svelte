<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { gameStore } from '../stores/gameStore.js';

	export let logoSrc: string = '/logo_blackjack.png';

	const { startNewGame } = gameStore;
	$: currentPath = $page.url.pathname;

	onMount(() => {
		startNewGame();
	});
</script>

<nav class="flex items-center justify-between bg-gray-900 px-4 py-2 text-white shadow-md">
	<!-- Logo -->
	<div class="flex items-center space-x-2">
		<img src={logoSrc} alt="Logo" class="h-10 w-10 object-contain" />
		<span class="text-xl font-semibold">MonBlackjack</span>
	</div>

	<!-- Navigation -->
	<div class="hidden items-center space-x-4 sm:flex">
		<a href="/homePage" class="transition hover:text-yellow-400">Accueil</a>
		<a href="/rank" class="transition hover:text-yellow-400">Classement</a>

		{#if currentPath !== '/game'}
			<a href="/login" class="transition hover:text-yellow-400">Connexion</a>
		{/if}

		<form method="post" action="/logout">
			<!-- Harmonisé avec les liens, mais en rouge -->
			<button type="submit" class="font-semibold text-red-500 transition hover:text-red-400">
				Se déconnecter
			</button>
		</form>

		<!-- <button
			on:click={startNewGame}
			class="rounded bg-yellow-500 px-3 py-1 font-semibold text-black hover:bg-yellow-600"
		>
			Nouvelle Partie
		</button> -->
	</div>
</nav>
