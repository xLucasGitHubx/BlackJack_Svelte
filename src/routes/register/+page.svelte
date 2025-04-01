<!-- src/routes/register/+page.svelte -->
<script lang="ts">
	import RegisterForm from '$lib/components/RegisterForm.svelte';
	export let data; // Pour récupérer la prop "form" depuis l'action si besoin
</script>

<RegisterForm form={data} />
