<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let email = '';
    let password = '';
    let rememberMe = false;

    const handleSubmit = () => {
        dispatch('login', { email, password, rememberMe });
    };
</script>

<!-- Fond blanc cassé, centré -->
<div class="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-16">
    <div class="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl space-y-10">
        <h2 class="text-center text-3xl font-bold text-gray-900 tracking-tight">Connexion</h2>

        <form class="space-y-10" on:submit|preventDefault={handleSubmit}>
            <div class="space-y-3">
                <label for="email" class="block text-base font-medium text-gray-700">Adresse e-mail</label>
                <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="votre@email.com"
                />
            </div>

            <div class="space-y-3">
                <label for="password" class="block text-base font-medium text-gray-700">Mot de passe</label>
                <input
                        id="password"
                        type="password"
                        bind:value={password}
                        required
                        class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                />
            </div>

            <!-- Aligner parfaitement -->
            <div class="flex flex-wrap items-center justify-between gap-y-2 text-sm">
                <label class="flex items-center gap-2 text-gray-600">
                    <input type="checkbox" bind:checked={rememberMe} class="accent-blue-500" />
                    Se souvenir de moi
                </label>

                <a href="/forgot-password" class="text-blue-600 hover:underline whitespace-nowrap">
                    Mot de passe oublié ?
                </a>
            </div>

            <button
                    type="submit"
                    class="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Se connecter
            </button>
        </form>

        <p class="text-center text-sm text-gray-600 pt-4">
            Pas encore de compte ?
            <a href="/register" class="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-500">
                Se créer un compte
            </a>
        </p>
    </div>
</div>
