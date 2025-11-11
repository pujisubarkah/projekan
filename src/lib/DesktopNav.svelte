<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let user: any = null;

	onMount(() => {
		// Check if user is logged in
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			user = JSON.parse(userData);
		}
	});

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		user = null;
		window.location.href = '/';
	}
</script>

<!-- Desktop Navbar -->
<div class="hidden lg:block bg-white shadow-sm border-b">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Logo/Brand -->
			<div class="flex items-center">
				<a href="/" class="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
					Projekan
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="flex items-center space-x-8">
				<a
					href="/"
					class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname === '/' ? 'text-blue-600' : ''}"
				>
					Proyek
				</a>

				<a
					href="/forum"
					class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname === '/forum' ? 'text-blue-600' : ''}"
				>
					Forum
				</a>

				<a
					href="/keunggulan"
					class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname === '/keunggulan' ? 'text-blue-600' : ''}"
				>
					Keunggulan
				</a>

				{#if user}
					<a
						href="/dashboard"
						class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname === '/dashboard' ? 'text-blue-600' : ''}"
					>
						Dashboard
					</a>

					{#if user.role === 'admin'}
						<a
							href="/admin"
							class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors {$page.url.pathname.startsWith('/admin') ? 'text-blue-600' : ''}"
						>
							Admin
						</a>
					{/if}

					{#if user.role === 'client'}
						<a
							href="/project/new"
							class="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
						>
							Post Proyek
						</a>
					{/if}
				{/if}
			</div>

			<!-- Auth Buttons -->
			<div class="flex items-center space-x-4">
				{#if user}
					<!-- User Menu -->
					<div class="flex items-center space-x-4">
						<span class="text-sm text-gray-700">Halo, {user.name}</span>
						<button
							on:click={handleLogout}
							class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
						>
							Logout
						</button>
					</div>
				{:else}
					<!-- Login/Register Buttons -->
					<div class="flex items-center space-x-3">
						<a
							href="/login"
							class="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors"
						>
							Masuk
						</a>
						<a
							href="/register"
							class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
						>
							Daftar
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Additional styles if needed */
</style>