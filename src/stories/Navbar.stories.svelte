<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf';
    import Navbar from '$lib/components/Navbar.svelte';
</script>

<Meta
        title="Composants/Navbar"
        component={Navbar}
        args={{ logoSrc: '/logo.png' }}
/>

<Story name="Default">
    <Navbar />
</Story>
