<script lang="ts">
	// On importe les données de la page via le store $page
	import { page } from '$app/stores';
	import '../app.css';

	$: isLoggedIn = $page.data.isLoggedIn;
</script>

<main class="min-h-screen bg-gray-50">
	<slot />
</main>
