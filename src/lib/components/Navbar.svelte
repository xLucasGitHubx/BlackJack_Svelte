<script lang="ts">
    export let logoSrc: string = '/logo.png';
</script>

<nav class="bg-gray-900 text-white px-4 py-2 shadow-md flex items-center justify-between">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
        <img src={logoSrc} alt="Logo" class="h-10 w-10 object-contain" />
        <span class="text-xl font-semibold">Blackjack</span>
    </div>

    <!-- Navigation -->
    <div class="space-x-4 hidden sm:flex">
        <a href="/" class="hover:text-yellow-400 transition">Accueil</a>
        <a href="/login" class="hover:text-yellow-400 transition">Connexion</a>
        <button class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-3 py-1 rounded">
            Nouvelle Partie
        </button>
    </div>
</nav>
