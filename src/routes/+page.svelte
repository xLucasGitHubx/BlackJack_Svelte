<script lang="ts">
	import { goto } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';

	// Gère la navigation vers ton jeu
	const startPlaying = () => {
		goto('/game'); // la route de ton jeu
	};

	// État local pour afficher / cacher la pop-up de règles
	let showRules = false;

	function openRules() {
		showRules = true;
	}

	function closeRules() {
		showRules = false;
	}
</script>

<div class="relative min-h-screen">
	<!-- Navbar fixée en haut -->
	<Navbar />

	<section
		class="relative flex min-h-screen w-full items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-16 pt-20"
		style="background-image: url('https://www.blackjacksimulator.net/goto/img/slide1.jpg');"
	>
		<!-- Overlay sombre -->
		<div class="absolute inset-0 bg-black/60"></div>

		<!-- Contenu principal -->
		<div class="relative z-10 w-full max-w-4xl space-y-12 text-center text-white">
			<h1 class="text-5xl font-extrabold tracking-tight drop-shadow-lg sm:text-6xl">
				Bienvenue sur <span class="text-yellow-400">MonBlackJack</span>
			</h1>

			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-100 sm:text-xl">
				Plongez dans une expérience de Blackjack en ligne, face à un croupier virtuel. Maîtrisez
				votre stratégie et tentez d’atteindre 21 sans dépasser. Prêt à jouer ?
			</p>

			<!-- Bloc CTA (2 boutons) -->
			<div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<!-- Bouton "Jouer Maintenant" -->
				<button
					on:click={startPlaying}
					class="inline-block transform rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300"
				>
					Jouer Maintenant
				</button>

				<!-- Bouton "Règle du jeu" -->
				<button
					on:click={openRules}
					class="inline-block transform rounded-full border border-white px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:bg-yellow-300 hover:text-black"
				>
					Règle du jeu
				</button>
			</div>
		</div>
	</section>

	<!-- Pop-up (Modal) affichée si showRules = true -->
	{#if showRules}
		<!-- Overlay modal -->
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
			<!-- Contenu de la pop-up -->
			<div
				class="relative w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-8 text-gray-900 shadow-2xl backdrop-blur-xl"
			>
				<!-- Bouton de fermeture (croix) -->
				<button
					on:click={closeRules}
					class="absolute top-4 right-4 text-2xl font-bold text-gray-300 hover:text-white"
				>
					✕
				</button>

				<h2 class="mb-4 text-center text-3xl font-bold text-yellow-400 drop-shadow-sm">
					Règles du Blackjack
				</h2>

				<p class="mb-4 text-center text-sm leading-relaxed text-gray-100 sm:text-base">
					Découvrez les points essentiels pour jouer et gagner !
				</p>

				<hr class="mb-6 border-white/20" />

				<ul class="list-disc space-y-2 pl-5 text-sm leading-relaxed text-gray-100 sm:text-base">
					<li>Chaque joueur reçoit 2 cartes, le croupier aussi (une est face cachée).</li>
					<li>Figures = 10, As = 1 ou 11 selon la main.</li>
					<li>
						Actions possibles : <strong>Hit</strong> (tirer une carte) ou <strong>Stand</strong> (rester).
					</li>
					<li>Le croupier tire jusqu’à atteindre au moins 17.</li>
					<li>Si vous dépassez 21, vous “sautez” et perdez immédiatement.</li>
					<li>Le plus proche de 21 gagne !</li>
				</ul>

				<div class="mt-8 flex justify-center">
					<button
						on:click={closeRules}
						class="transform rounded-full bg-yellow-400 px-6 py-2 font-semibold text-black shadow-md transition-transform hover:scale-105 hover:bg-yellow-300"
					>
						Fermer
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
