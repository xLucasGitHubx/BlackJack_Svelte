<!-- src/lib/components/RegisterForm.svelte -->
<script lang="ts">
	// On récupère un éventuel objet "form" pour afficher les erreurs
	export let form;
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-16">
	<div class="w-full max-w-md space-y-12 rounded-2xl bg-white p-12 shadow-2xl">
		<h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">Créer un compte</h2>

		<!-- method="post" => déclenche l'action "default" côté serveur -->
		<form method="post" class="space-y-8">
			<!-- Prénom + Nom -->
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="space-y-2">
					<label for="firstName" class="block font-medium">Prénom</label>
					<input
						id="firstName"
						name="firstName"
						type="text"
						required
						class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900"
					/>
				</div>
				<div class="space-y-2">
					<label for="lastName" class="block font-medium">Nom</label>
					<input
						id="lastName"
						name="lastName"
						type="text"
						required
						class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900"
					/>
				</div>
			</div>

			<!-- Email -->
			<div>
				<label for="email" class="block font-medium">Adresse e-mail</label>
				<input
					id="email"
					name="email"
					type="email"
					required
					class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900"
				/>
			</div>

			<!-- Mot de passe -->
			<div>
				<label for="password" class="block font-medium">Mot de passe</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900"
				/>
			</div>

			<!-- Confirmation du mot de passe -->
			<div>
				<label for="confirmPassword" class="block font-medium"> Confirmer le mot de passe </label>
				<input
					id="confirmPassword"
					name="confirmPassword"
					type="password"
					required
					class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900"
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
			>
				S'inscrire
			</button>
		</form>

		<!-- Si l'action renvoie une erreur, on l'affiche -->
		{#if form?.error}
			<p class="text-red-500">{form.error}</p>
		{/if}

		<p class="pt-4 text-center text-sm text-gray-600">
			Déjà un compte ?
			<a href="/login" class="font-semibold text-blue-700 underline"> Se connecter </a>
		</p>
	</div>
</div>
