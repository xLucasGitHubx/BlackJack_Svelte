<script lang="ts">
	import LoginForm from '$lib/components/LoginForm.svelte';

	const handleLogin = (event: CustomEvent) => {
		console.log('Tentative de connexion :', event.detail);
	};
</script>


	<LoginForm form={null} on:login={handleLogin} />
