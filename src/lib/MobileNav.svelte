<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isMenuOpen = false;
	let user: any = null;

	onMount(async () => {
		// Mock user data - in production, get from auth context
		user = {
			name: 'John Smith',
			role: 'client'
		};
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<!-- Mobile Navigation -->
<div class="lg:hidden">
	<!-- Hamburger Button -->
	<button
		on:click={toggleMenu}
		class="fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg border border-gray-200"
		aria-label="Toggle menu"
	>
		<div class="w-6 h-6 flex flex-col justify-center items-center">
			<span class="block w-5 h-0.5 bg-gray-600 mb-1 transition-transform {isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}"></span>
			<span class="block w-5 h-0.5 bg-gray-600 mb-1 {isMenuOpen ? 'opacity-0' : ''}"></span>
			<span class="block w-5 h-0.5 bg-gray-600 transition-transform {isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}"></span>
		</div>
	</button>

	<!-- Mobile Menu Overlay -->
	{#if isMenuOpen}
		<div class="fixed inset-0 z-40 bg-black bg-opacity-50" on:click={closeMenu} on:keydown={closeMenu} role="button" tabindex="0"></div>
	{/if}

	<!-- Mobile Menu Panel -->
	<div class="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-xl z-50 transform transition-transform {isMenuOpen ? 'translate-x-0' : 'translate-x-full'}">
		<div class="p-6">
			<!-- Close Button -->
			<button
				on:click={closeMenu}
				class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
				aria-label="Close menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>

			<!-- User Info -->
			{#if user}
				<div class="mb-8">
					<div class="flex items-center space-x-3 mb-4">
						<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
							<span class="text-blue-600 font-semibold text-lg">
								{user.name.charAt(0).toUpperCase()}
							</span>
						</div>
						<div>
							<h3 class="font-semibold text-gray-900">{user.name}</h3>
							<p class="text-sm text-gray-500 capitalize">{user.role}</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Navigation Links -->
			<nav class="space-y-2">
				<a
					href="/"
					class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors {$page.url.pathname === '/' ? 'bg-blue-50 text-blue-600' : ''}"
					on:click={closeMenu}
				>
					<div class="flex items-center space-x-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
						</svg>
						<span>Proyek</span>
					</div>
				</a>

				<a
					href="/forum"
					class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors {$page.url.pathname === '/forum' ? 'bg-blue-50 text-blue-600' : ''}"
					on:click={closeMenu}
				>
					<div class="flex items-center space-x-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						<span>Forum</span>
					</div>
				</a>

				<a
					href="/keunggulan"
					class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors {$page.url.pathname === '/keunggulan' ? 'bg-blue-50 text-blue-600' : ''}"
					on:click={closeMenu}
				>
					<div class="flex items-center space-x-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						<span>Keunggulan</span>
					</div>
				</a>

				<a
					href="/dashboard"
					class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors {$page.url.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : ''}"
					on:click={closeMenu}
				>
					<div class="flex items-center space-x-3">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
						</svg>
						<span>Dashboard</span>
					</div>
				</a>

				{#if user?.role === 'admin'}
					<a
						href="/admin"
						class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors {$page.url.pathname.startsWith('/admin') ? 'bg-blue-50 text-blue-600' : ''}"
						on:click={closeMenu}
					>
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							<span>Admin Panel</span>
						</div>
					</a>
				{/if}

				{#if user?.role === 'client'}
					<a
						href="/project/new"
						class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
						on:click={closeMenu}
					>
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
							</svg>
							<span>Post Proyek</span>
						</div>
					</a>
				{/if}
			</nav>

			<!-- Divider -->
			<hr class="my-6 border-gray-200">

			<!-- Account Actions -->
			<div class="space-y-2">
				{#if user}
					<button class="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							<span>Settings</span>
						</div>
					</button>

					<button class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							<span>Sign Out</span>
						</div>
					</button>
				{:else}
					<a href="/login" class="block px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" on:click={closeMenu}>
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							<span>Masuk</span>
						</div>
					</a>

					<a href="/register" class="block px-4 py-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors" on:click={closeMenu}>
						<div class="flex items-center space-x-3">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
							</svg>
							<span>Daftar</span>
						</div>
					</a>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Ensure smooth transitions */
	.fixed {
		transition: transform 0.3s ease-in-out;
	}
</style>