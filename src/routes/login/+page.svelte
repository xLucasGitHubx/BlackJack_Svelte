<script lang="ts">
    import LoginForm from '$lib/components/LoginForm.svelte';

    const handleLogin = (event: CustomEvent) => {
        console.log('Tentative de connexion :', event.detail);
    };
</script>

<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black px-4 py-12">
    <LoginForm on:login={handleLogin} />
</div>
