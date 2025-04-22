<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	export let data;
	const { ranking } = data;
</script>

<Navbar />

<div class="min-h-screen bg-green-900 px-4 py-10 text-white flex flex-col items-center">
	<h1 class="text-4xl font-bold mb-8 text-yellow-300 drop-shadow-lg tracking-wider">
		🏆 Classement Blackjack
	</h1>

	<div class="w-full max-w-4xl overflow-hidden rounded-xl border-4 border-yellow-500 shadow-lg bg-black/40 backdrop-blur-md">
		<table class="min-w-full divide-y divide-yellow-500 text-white">
			<thead class="bg-yellow-800/80">
				<tr>
					<th class="px-6 py-4 text-left text-sm font-bold tracking-widest uppercase text-yellow-300">
						#
					</th>
					<th class="px-6 py-4 text-left text-sm font-bold tracking-widest uppercase text-yellow-300">
						Joueur
					</th>
					<th class="px-6 py-4 text-left text-sm font-bold tracking-widest uppercase text-yellow-300">
						Victoires
					</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-yellow-700">
				{#each ranking as player, i}
					<tr class="hover:bg-yellow-100/10 transition duration-150">
						<td class="px-6 py-4 whitespace-nowrap text-lg font-semibold">
							{#if i === 0} 🥇
							{:else if i === 1} 🥈
							{:else if i === 2} 🥉
							{:else} {i + 1}
							{/if}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-lg">
							{player.firstName} {player.lastName}
						</td>
						<td class="px-6 py-4 whitespace-nowrap text-lg font-bold text-yellow-400">
							{player.wins}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
