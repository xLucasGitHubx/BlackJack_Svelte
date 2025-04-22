<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import {
		gameStore,
		playerWins,
		dealerWins,
		roundsPlayed,
		gameEnded,
		statusMessage,
		isGameOver,
		playerCards,
		playerScore,
		dealerCards,
		dealerScore,
		dealerHidden
	} from '$lib/stores/gameStore.js';

	import PlayerArea from '$lib/components/PlayerArea.svelte';
	import DealerArea from '$lib/components/DealerArea.svelte';
	import MultiPlayerArea from '$lib/components/MultiPlayerArea.svelte';

	const { startNewGame, hit, stand, resetMatch } = gameStore;

	let winIncremented = false;

	onMount(() => {
		startNewGame();
	});

	$: if (
		$isGameOver &&
		$playerScore > $dealerScore &&
		!winIncremented
	) {
		fetch('/api/user/win', {
			method: 'POST'
		})
			.then((res) => {
				if (res.ok) {
					console.log('🏆 Manche gagnée enregistrée !');
					winIncremented = true;
				} else {
					console.warn('❌ Échec enregistrement victoire');
				}
			})
			.catch((err) => {
				console.error('Erreur réseau :', err);
			});
	}
</script>

<!-- Structure principale -->
<div class="flex h-screen flex-col bg-green-900 text-white overflow-hidden">
	<!-- Navbar prend sa place naturellement -->
	<Navbar />

	<!-- Contenu principal, occupe tout le reste -->
	<div class="flex-1 flex flex-col items-center justify-center overflow-hidden px-4 py-6">
		<!-- Score -->
		<div class="mb-4 self-end rounded bg-black/40 p-4 text-sm shadow">
			<p>👤 Joueur : {$playerWins}</p>
			<p>🧑‍⚖️ Croupier : {$dealerWins}</p>
			<p>🧮 Manches : {$roundsPlayed} / 10</p>

			{#if $gameEnded}
				<p class="mt-2 rounded bg-yellow-400 p-2 font-bold text-black">
					{#if $playerWins > $dealerWins}
						🎉 Vous gagnez la partie !
					{:else if $playerWins < $dealerWins}
						😢 Le croupier remporte la partie.
					{:else}
						🤝 Match nul !
					{/if}
				</p>

				<button
					on:click={() => {
						resetMatch();
						winIncremented = false;
					}}
					class="mt-2 rounded bg-white px-3 py-1 text-black hover:bg-gray-200"
				>
					Rejouer
				</button>
			{/if}
		</div>

		<h1 class="mb-4 text-4xl font-bold">🃏 Blackjack en Solo</h1>

		<DealerArea
			cards={$dealerCards}
			score={$dealerScore}
			hidden={$dealerHidden}
			isGameOver={$isGameOver}
		/>

		<PlayerArea
			cards={$playerCards}
			score={$playerScore}
			isGameOver={$isGameOver}
			onHit={hit}
			onStand={stand}
		/>

		{#if $isGameOver}
			<p class="mt-4 rounded bg-black/40 p-2 text-lg">{$statusMessage}</p>
		{/if}

		<button
			on:click={startNewGame}
			class="mt-4 rounded bg-yellow-500 px-3 py-1 font-semibold text-black hover:bg-yellow-600"
		>
			Nouvelle Partie
		</button>
	</div>
</div>
