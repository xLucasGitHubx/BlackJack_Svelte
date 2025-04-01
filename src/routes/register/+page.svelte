<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let confirmPassword = '';

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }
        dispatch('register', { firstName, lastName, email, password });
    };
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 px-6 py-16">
    <div class="w-full max-w-md rounded-2xl bg-white p-12 shadow-2xl space-y-12">
        <h2 class="text-center text-3xl font-bold text-gray-900 tracking-tight">Créer un compte</h2>

        <form class="space-y-8" on:submit|preventDefault={handleSubmit}>
            <!-- Nom & prénom -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label for="firstName" class="block text-base font-medium text-gray-700">Prénom</label>
                    <input
                            id="firstName"
                            type="text"
                            bind:value={firstName}
                            required
                            class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Jean"
                    />
                </div>

                <div class="space-y-2">
                    <label for="lastName" class="block text-base font-medium text-gray-700">Nom</label>
                    <input
                            id="lastName"
                            type="text"
                            bind:value={lastName}
                            required
                            class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Dupont"
                    />
                </div>
            </div>

            <!-- Email -->
            <div class="space-y-2">
                <label for="email" class="block text-base font-medium text-gray-700">Adresse e-mail</label>
                <input
                        id="email"
                        type="email"
                        bind:value={email}
                        required
                        class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="jean.dupont@email.com"
                />
            </div>

            <!-- Password -->
            <div class="space-y-2">
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

            <!-- Confirm Password -->
            <div class="space-y-2">
                <label for="confirmPassword" class="block text-base font-medium text-gray-700">Confirmer le mot de passe</label>
                <input
                        id="confirmPassword"
                        type="password"
                        bind:value={confirmPassword}
                        required
                        class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="********"
                />
            </div>

            <!-- Submit -->
            <div class="pt-4">
                <button
                        type="submit"
                        class="w-full rounded-md bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    S'inscrire
                </button>
            </div>
        </form>

        <p class="text-center text-sm text-gray-600 pt-4">
            Déjà un compte ?
            <a href="/login" class="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-500">
                Se connecter
            </a>
        </p>
    </div>
</div>
