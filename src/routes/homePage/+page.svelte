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
    <Navbar class="fixed top-0 left-0 w-full z-50" />

    <section
            class="pt-20 w-full bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 py-16 relative min-h-screen"
            style="background-image: url('https://www.blackjacksimulator.net/goto/img/slide1.jpg');"
    >
        <!-- Overlay sombre -->
        <div class="absolute inset-0 bg-black/60"></div>

        <!-- Contenu principal -->
        <div class="relative z-10 max-w-4xl w-full text-center text-white space-y-12">
            <h1 class="text-5xl sm:text-6xl font-extrabold drop-shadow-lg tracking-tight">
                Bienvenue sur <span class="text-yellow-400">MonBlackJack</span>
            </h1>

            <p class="text-lg sm:text-xl text-gray-100 leading-relaxed max-w-3xl mx-auto">
                Plongez dans une expérience de Blackjack en ligne,
                face à un croupier virtuel. Maîtrisez votre stratégie
                et tentez d’atteindre 21 sans dépasser. Prêt à jouer ?
            </p>

            <!-- Bloc CTA (2 boutons) -->
            <div class="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <!-- Bouton "Jouer Maintenant" -->
                <button
                        on:click={startPlaying}
                        class="inline-block rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-8 py-4 text-lg shadow-lg transition transform hover:scale-105"
                >
                    Jouer Maintenant
                </button>

                <!-- Bouton "Règle du jeu" -->
                <button
                        on:click={openRules}
                        class="inline-block rounded-full border border-white text-white font-bold px-8 py-4 text-lg shadow-lg transition transform hover:scale-105 hover:bg-yellow-300 hover:text-black"
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
                    class="relative w-full max-w-lg rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl p-8 text-gray-900"
            >
                <!-- Bouton de fermeture (croix) -->
                <button
                        on:click={closeRules}
                        class="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold"
                >
                    ✕
                </button>

                <h2 class="text-3xl font-bold text-yellow-400 mb-4 text-center drop-shadow-sm">
                    Règles du Blackjack
                </h2>

                <p class="text-gray-100 text-sm sm:text-base leading-relaxed mb-4 text-center">
                    Découvrez les points essentiels pour jouer et gagner !
                </p>

                <hr class="border-white/20 mb-6" />

                <ul class="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-100 leading-relaxed">
                    <li>Chaque joueur reçoit 2 cartes, le croupier aussi (une est face cachée).</li>
                    <li>Figures = 10, As = 1 ou 11 selon la main.</li>
                    <li>Actions possibles : <strong>Hit</strong> (tirer une carte) ou <strong>Stand</strong> (rester).</li>
                    <li>Le croupier tire jusqu’à atteindre au moins 17.</li>
                    <li>Si vous dépassez 21, vous “sautez” et perdez immédiatement.</li>
                    <li>Le plus proche de 21 gagne !</li>
                </ul>

                <div class="mt-8 flex justify-center">
                    <button
                            on:click={closeRules}
                            class="rounded-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 shadow-md transition-transform transform hover:scale-105"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
