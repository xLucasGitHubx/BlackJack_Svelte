<script lang="ts">
    import { goto } from '$app/navigation';

    let user = {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@example.com',
        address: '123, Rue Principale, 75000 Paris',
        photo: 'https://via.placeholder.com/150',
    };

    function editProfile() {
        goto('/user/profile/edit');
    }

    function changePassword() {
        goto('/user/change-password');
    }

    function viewStats() {
        goto('/user/stats');
    }
</script>

<!-- Fond global : dégradé sombre -->
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 px-6 py-10 text-white">
    <!-- Carte profil (effet glass) avec plus d'espace -->
    <div
            class="max-w-4xl w-full backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8"
    >
        <!-- Colonne gauche : photo -->
        <div class="flex flex-col items-center md:w-1/3">
            <div class="relative mb-6">
                <!-- Anneau décoratif (pulse) -->
                <div class="absolute inset-0 rounded-full ring-2 ring-offset-4 ring-offset-transparent ring-white/30 animate-pulse"></div>

                <img
                        src={user.photo}
                        alt="Photo de profil"
                        class="w-80 h-80 object-cover rounded-full ring-2 ring-white/50 relative"
                />
            </div>
            <!-- Bouton pour changer la photo -->
            <button
                    class="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 text-sm font-medium transition-colors"
            >
                Changer la photo
            </button>
        </div>

        <!-- Colonne droite : infos utilisateur -->
        <div class="md:w-2/3 space-y-8">
            <!-- Titre / Nom -->
            <div>
                <h2 class="text-3xl font-bold text-yellow-400 drop-shadow mb-1">
                    {user.firstName} {user.lastName}
                </h2>
                <p class="text-sm text-gray-300">Utilisateur Blackjack Premium</p>
            </div>

            <!-- Liste d’infos -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-200">
                <div>
                    <label class="block text-sm font-semibold mb-1 text-gray-300">Adresse e-mail</label>
                    <p class="bg-black/30 rounded-md px-3 py-2">{user.email}</p>
                </div>
                <div>
                    <label class="block text-sm font-semibold mb-1 text-gray-300">Adresse</label>
                    <p class="bg-black/30 rounded-md px-3 py-2">{user.address}</p>
                </div>
                <!-- Autres infos, ex: téléphone, date de naissance... -->
            </div>

            <!-- Boutons d'action (centrés) -->
            <div class="flex flex-wrap gap-4 justify-center mt-4">
                <button
                        on:click={editProfile}
                        class="rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-2 font-semibold text-white transition"
                >
                    Modifier mes infos
                </button>

                <button
                        on:click={changePassword}
                        class="rounded-full bg-green-600 hover:bg-green-500 px-6 py-2 font-semibold text-white transition"
                >
                    Modifier mon mot de passe
                </button>

                <button
                        on:click={viewStats}
                        class="rounded-full bg-yellow-400 hover:bg-yellow-300 px-6 py-2 font-semibold text-black transition"
                >
                    Voir mes stats
                </button>
            </div>
        </div>
    </div>
</div>
