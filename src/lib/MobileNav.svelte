<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let isMenuOpen = false;
	let user: any = null;

	onMount(async () => {
		// Check if user is logged in
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			user = JSON.parse(userData);
		}
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		user = null;
		closeMenu();
		window.location.href = '/';
	}
</script>

<!-- Modern Mobile Navigation -->
{#if !$page.url.pathname.startsWith('/dashboard') && !$page.url.pathname.startsWith('/admin')}
<div class="lg:hidden">
	<!-- Floating Action Button for Menu -->
	<button
		on:click={toggleMenu}
		class="fixed top-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
		aria-label="Toggle menu"
	>
		<div class="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm"></div>
		<div class="relative flex flex-col justify-center items-center space-y-1">
			<span class="block w-5 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}"></span>
			<span class="block w-5 h-0.5 bg-white transition-opacity duration-300 {isMenuOpen ? 'opacity-0' : ''}"></span>
			<span class="block w-5 h-0.5 bg-white transition-all duration-300 {isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}"></span>
		</div>
	</button>

	<!-- Backdrop with Blur -->
	{#if isMenuOpen}
		<div
			class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
			on:click={closeMenu}
			on:keydown={closeMenu}
			role="button"
			tabindex="0"
		></div>
	{/if}

	<!-- Modern Slide-out Menu -->
	<div class="fixed top-0 right-0 h-full w-80 max-w-[90vw] z-50 transform transition-all duration-500 ease-out {isMenuOpen ? 'translate-x-0' : 'translate-x-full'}">
		<!-- Glassmorphism Background -->
		<div class="absolute inset-0 bg-white/95 backdrop-blur-xl rounded-l-3xl shadow-2xl"></div>

		<div class="relative h-full flex flex-col">
			<!-- Header -->
			<div class="flex-shrink-0 p-6 border-b border-gray-100/50">
				<!-- Close Button -->
				<button
					on:click={closeMenu}
					class="absolute top-6 left-6 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
					aria-label="Close menu"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>

				<!-- Logo -->
				<div class="flex justify-center">
					<div class="flex items-center space-x-3">
						<div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
							<span class="text-white font-bold text-lg">P</span>
						</div>
						<span class="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
							Projekan
						</span>
					</div>
				</div>
			</div>

			<!-- User Info Section -->
			{#if user}
				<div class="flex-shrink-0 p-6 border-b border-gray-100/50">
					<div class="flex items-center space-x-4">
						{#if user.avatar}
							<img
								src={user.avatar}
								alt={user.name}
								class="w-14 h-14 rounded-2xl ring-2 ring-blue-100"
							/>
						{:else}
							<div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center ring-2 ring-blue-100">
								<span class="text-white font-bold text-lg">
									{user.name.charAt(0).toUpperCase()}
								</span>
							</div>
						{/if}
						<div class="flex-1">
							<h3 class="font-semibold text-gray-900 text-lg">{user.name}</h3>
							<p class="text-sm text-gray-500 capitalize flex items-center space-x-1">
								<span class="w-2 h-2 bg-green-400 rounded-full"></span>
								<span>{user.role}</span>
							</p>
						</div>
					</div>
				</div>
			{/if}

			<!-- Navigation Links -->
			<div class="flex-1 overflow-y-auto py-6">
				<nav class="px-6 space-y-2">
					<a
						href="/"
						class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname === '/' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
						on:click={closeMenu}
					>
						<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname === '/' ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
							</svg>
						</div>
						<div class="flex-1">
							<span class="font-medium">Proyek</span>
							<p class="text-xs text-gray-500">Temukan proyek freelance</p>
						</div>
						{#if $page.url.pathname === '/'}
							<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
						{/if}
					</a>

					<a
						href="/courses"
						class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname.startsWith('/courses') ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
						on:click={closeMenu}
					>
						<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname.startsWith('/courses') ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
							</svg>
						</div>
						<div class="flex-1">
							<span class="font-medium">Courses</span>
							<p class="text-xs text-gray-500">Pelajari skill baru</p>
						</div>
						{#if $page.url.pathname.startsWith('/courses')}
							<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
						{/if}
					</a>

					<a
						href="/forum"
						class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname === '/forum' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
						on:click={closeMenu}
					>
						<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname === '/forum' ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
							</svg>
						</div>
						<div class="flex-1">
							<span class="font-medium">Forum</span>
							<p class="text-xs text-gray-500">Diskusi & networking</p>
						</div>
						{#if $page.url.pathname === '/forum'}
							<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
						{/if}
					</a>

					<a
						href="/keunggulan"
						class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname === '/keunggulan' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
						on:click={closeMenu}
					>
						<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname === '/keunggulan' ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
							</svg>
						</div>
						<div class="flex-1">
							<span class="font-medium">Keunggulan</span>
							<p class="text-xs text-gray-500">Mengapa pilih Projekan</p>
						</div>
						{#if $page.url.pathname === '/keunggulan'}
							<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
						{/if}
					</a>

					{#if user}
						<a
							href="/dashboard"
							class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname === '/dashboard' ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
							on:click={closeMenu}
						>
							<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname === '/dashboard' ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
								</svg>
							</div>
							<div class="flex-1">
								<span class="font-medium">Dashboard</span>
								<p class="text-xs text-gray-500">Kelola akun & proyek</p>
							</div>
							{#if $page.url.pathname === '/dashboard'}
								<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
							{/if}
						</a>

						{#if user.role === 'admin'}
							<a
								href="/admin"
								class="group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-300 {$page.url.pathname.startsWith('/admin') ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}"
								on:click={closeMenu}
							>
								<div class="w-10 h-10 rounded-xl flex items-center justify-center {$page.url.pathname.startsWith('/admin') ? 'bg-blue-100' : 'bg-gray-100 group-hover:bg-blue-50'} transition-colors duration-300">
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
									</svg>
								</div>
								<div class="flex-1">
									<span class="font-medium">Admin Panel</span>
									<p class="text-xs text-gray-500">Panel administrasi</p>
								</div>
								{#if $page.url.pathname.startsWith('/admin')}
									<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
								{/if}
							</a>
						{/if}

						{#if user.role === 'client'}
							<div class="pt-4">
								<a
									href="/project/new"
									class="group flex items-center justify-center space-x-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
									on:click={closeMenu}
								>
									<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
									</svg>
									<span class="font-medium">Post Proyek</span>
								</a>
							</div>
						{/if}
					{/if}
				</nav>
			</div>

			<!-- Footer Actions -->
			<div class="flex-shrink-0 p-6 border-t border-gray-100/50">
				{#if user}
					<div class="space-y-3">
						<a href="/profile" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors" on:click={closeMenu}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
							<span>Profile</span>
						</a>

						<a href="/settings" class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-2xl transition-colors" on:click={closeMenu}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							<span>Settings</span>
						</a>

						<hr class="border-gray-100">

						<button
							on:click={handleLogout}
							class="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
						>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							<span>Sign Out</span>
						</button>
					</div>
				{:else}
					<div class="space-y-3">
						<a href="/login" class="flex items-center justify-center space-x-3 w-full px-6 py-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors font-medium" on:click={closeMenu}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
							</svg>
							<span>Masuk</span>
						</a>

						<a href="/register" class="flex items-center justify-center space-x-3 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium" on:click={closeMenu}>
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
							</svg>
							<span>Daftar</span>
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Smooth animations */
	.fixed {
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Custom scrollbar */
	.overflow-y-auto::-webkit-scrollbar {
		width: 4px;
	}
	.overflow-y-auto::-webkit-scrollbar-track {
		background: transparent;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb {
		background: #cbd5e0;
		border-radius: 2px;
	}
	.overflow-y-auto::-webkit-scrollbar-thumb:hover {
		background: #a0aec0;
	}
</style>
{/if}