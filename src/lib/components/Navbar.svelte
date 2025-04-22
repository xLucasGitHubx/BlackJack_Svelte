<script lang="ts">
	import { page } from '$app/stores';
	import { gameStore } from '../stores/gameStore.js';

	export let logoSrc: string = '/logo_blackjack.png';

	const { startNewGame } = gameStore;
	$: currentPath = $page.url.pathname;
	$: isLogged = $page.data.isLoggedIn;

	startNewGame();
</script>

<nav class="flex items-center justify-between bg-gray-900 px-4 py-2 text-white shadow-md">
	<!-- Logo -->
	<div class="flex items-center space-x-2">
		<a href="/" class="flex">
			<img src={logoSrc} alt="Logo" class="h-10 w-10 object-contain" />
			<span class="text-xl font-semibold">MonBlackjack</span>
		</a>
	</div>

	<!-- Navigation -->
	<div class="hidden items-center space-x-4 sm:flex">
		<a href="/" class="transition hover:text-yellow-400">Accueil</a>
		<a href="/rank" class="transition hover:text-yellow-400">Classement</a>

		{#if isLogged}
			<a href="/game" class="transition hover:text-yellow-400">Table</a>
		{:else if currentPath !== '/game'}
			<a href="/login" class="transition hover:text-yellow-400">Connexion</a>
		{/if}

		<form method="post" action="/logout">
			<button type="submit" class="font-semibold text-red-500 transition hover:text-red-400">
				Se déconnecter
			</button>
		</form>
	</div>
</nav>
