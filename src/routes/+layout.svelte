
<script lang="ts">
	// import favicon from '$lib/assets/favicon.svg';
	const favicon = '/favicon.svg'; // Ensure favicon.svg is in your static folder (e.g., static/favicon.svg)
	import '@skeletonlabs/skeleton';
	import '../app.postcss';
	import MobileNav from '$lib/MobileNav.svelte';
	import DesktopNav from '$lib/DesktopNav.svelte';
	import Footer from '$lib/Footer.svelte';
	// No need to extract children; use <slot /> below
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="font-sans">
	<MobileNav />
	<DesktopNav />

	<slot />

	<Footer />
</div>
