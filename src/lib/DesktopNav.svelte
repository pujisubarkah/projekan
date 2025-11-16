<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let user: any = null;
	let isUserMenuOpen = false;

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
		isUserMenuOpen = false;
		window.location.href = '/';
	}

	function toggleUserMenu() {
		isUserMenuOpen = !isUserMenuOpen;
	}

	function closeUserMenu() {
		isUserMenuOpen = false;
	}
</script>

<!-- Modern Desktop Navbar -->
<div class="hidden lg:block fixed top-0 left-0 right-0 z-50">
	<!-- Glassmorphism Background -->
	<div class="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"></div>

	<div class="relative max-w-7xl mx-auto px-6 lg:px-8">
		<div class="flex justify-between items-center h-20">
			<!-- Logo/Brand -->
			<div class="flex items-center">
				<a href="/" class="group flex items-center space-x-3">
					<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
						<span class="text-white font-bold text-lg">P</span>
					</div>
					<span class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
						Projekan
					</span>
				</a>
			</div>

			<!-- Navigation Links -->
			<div class="flex items-center space-x-1">
				<a
					href="/"
					class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname === '/' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
				>
					<div class="flex items-center space-x-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
						</svg>
						<span>Proyek</span>
					</div>
					{#if $page.url.pathname === '/'}
						<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
					{/if}
				</a>

				<a
					href="/courses"
					class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname.startsWith('/courses') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
				>
					<div class="flex items-center space-x-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
						</svg>
						<span>Courses</span>
					</div>
					{#if $page.url.pathname.startsWith('/courses')}
						<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
					{/if}
				</a>

				<a
					href="/forum"
					class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname === '/forum' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
				>
					<div class="flex items-center space-x-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
						</svg>
						<span>Forum</span>
					</div>
					{#if $page.url.pathname === '/forum'}
						<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
					{/if}
				</a>

				<a
					href="/keunggulan"
					class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname === '/keunggulan' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
				>
					<div class="flex items-center space-x-2">
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
						</svg>
						<span>Keunggulan</span>
					</div>
					{#if $page.url.pathname === '/keunggulan'}
						<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
					{/if}
				</a>

				{#if user}
					<a
						href="/dashboard"
						class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname === '/dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
					>
						<div class="flex items-center space-x-2">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
							</svg>
							<span>Dashboard</span>
						</div>
						{#if $page.url.pathname === '/dashboard'}
							<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
						{/if}
					</a>

					{#if user.role === 'admin'}
						<a
							href="/admin"
							class="relative px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 group {$page.url.pathname.startsWith('/admin') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'}"
						>
							<div class="flex items-center space-x-2">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
								</svg>
								<span>Admin</span>
							</div>
							{#if $page.url.pathname.startsWith('/admin')}
								<div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 rounded-full"></div>
							{/if}
						</a>
					{/if}

					{#if user.role === 'client'}
						<a
							href="/project/new"
							class="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							<div class="flex items-center space-x-2">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
								</svg>
								<span>Post Proyek</span>
							</div>
						</a>
					{/if}
				{/if}
			</div>

			<!-- Auth Section -->
			<div class="flex items-center space-x-4">
				{#if user}
					<!-- User Menu -->
					<div class="relative">
						<button
							on:click={toggleUserMenu}
							class="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
						>
							{#if user.avatar}
								<img
									src={user.avatar}
									alt={user.name}
									class="w-8 h-8 rounded-full ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300"
								/>
							{:else}
								<div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-gray-200 group-hover:ring-blue-300 transition-all duration-300">
									<span class="text-white font-medium text-sm">
										{user.name.charAt(0).toUpperCase()}
									</span>
								</div>
							{/if}
							<div class="hidden md:block text-left">
								<p class="text-sm font-medium text-gray-900">Halo, {user.name.split(' ')[0]}</p>
								<p class="text-xs text-gray-500 capitalize">{user.role}</p>
							</div>
							<svg class="w-4 h-4 text-gray-400 transition-transform duration-300 {isUserMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
							</svg>
						</button>

						<!-- Dropdown Menu -->
						{#if isUserMenuOpen}
							<div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-xl py-2 z-50">
								<div class="px-4 py-3 border-b border-gray-100">
									<p class="text-sm font-medium text-gray-900">{user.name}</p>
									<p class="text-xs text-gray-500">{user.email}</p>
								</div>

								<a href="/profile" class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" on:click={closeUserMenu}>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
									</svg>
									<span>Profile</span>
								</a>

								<a href="/settings" class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" on:click={closeUserMenu}>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
									<span>Settings</span>
								</a>

								<hr class="my-2 border-gray-100">

								<button
									on:click={handleLogout}
									class="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
								>
									<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
									</svg>
									<span>Sign Out</span>
								</button>
							</div>
						{/if}
					</div>
				{:else}
					<!-- Login/Register Buttons -->
					<div class="flex items-center space-x-3">
						<a
							href="/login"
							class="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
						>
							Masuk
						</a>
						<a
							href="/register"
							class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
						>
							Daftar
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Click outside to close dropdown -->
	{#if isUserMenuOpen}
				<!-- Backdrop -->
		<div
			class="fixed inset-0 z-40"
			on:click={closeUserMenu}
			on:keydown={closeUserMenu}
			role="button"
			tabindex="0"
		></div>
	{/if}
</div>

<!-- Spacer for fixed navbar -->
<div class="h-20"></div>

<style>
	/* Custom scrollbar for dropdown */
	.bg-white::-webkit-scrollbar {
		width: 4px;
	}
	.bg-white::-webkit-scrollbar-track {
		background: transparent;
	}
	.bg-white::-webkit-scrollbar-thumb {
		background: #cbd5e0;
		border-radius: 2px;
	}
	.bg-white::-webkit-scrollbar-thumb:hover {
		background: #a0aec0;
	}
</style>