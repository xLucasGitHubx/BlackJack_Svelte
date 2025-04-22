<!-- src/lib/components/LoginForm.svelte -->
<script lang="ts">
	export let form;
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-green-800 px-6 py-16">

<div class="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 border-4 border-black shadow-2xl">
        <h2 class="text-center text-3xl font-bold tracking-wide text-black">♠ Connexion ♣</h2>

		<form method="post" class="space-y-6">
			<div class="space-y-2">
				<label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
				<input
					id="email"
					name="email"
					type="email"
					required
class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
					placeholder="votre@email.com"
				/>
			</div>

			<div class="space-y-2">
				<label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
				<input
					id="password"
					name="password"
					type="password"
					required
					class="w-full rounded-md bg-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					placeholder="********"
				/>
			</div>

			{#if form?.error}
				<p class="text-sm text-red-500">{form.error}</p>
			{/if}

			<button
				type="submit"
class="w-full rounded-md bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 focus:ring-2 focus:ring-red-400 focus:outline-none"
			>
				Se connecter
			</button>
		</form>

		<p class="text-center text-sm text-gray-600">
			Pas encore de compte ?
			<a
				href="/register"
class="font-semibold text-red-600 underline underline-offset-2 hover:text-red-500"
			>
				S'inscrire
			</a>
		</p>
	</div>
</div>
