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

	// ✅ Déclencher l’incrément si le joueur gagne une manche
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

<Navbar />

<div class="relative flex min-h-screen flex-col items-center bg-green-900 p-4 text-white">
	<!-- Score top-right -->
	<div class="absolute top-4 right-4 rounded bg-black/40 p-4 text-sm shadow">
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
					winIncremented = false; // reset pour prochaine manche
				}}
				class="mt-2 rounded bg-white px-3 py-1 text-black hover:bg-gray-200"
			>
				Rejouer
			</button>
		{/if}
	</div>

	<h1 class="mb-6 text-4xl font-bold">🃏 Blackjack Multijoueur</h1>

	<MultiPlayerArea />

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
</div>
