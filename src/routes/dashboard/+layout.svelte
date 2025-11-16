<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let sidebarOpen = false;
	let userRole = 'client'; // Default role, nanti bisa dari auth context
	let userMenuOpen = false;

	// Get user role from localStorage or auth context
	onMount(() => {
		const userData = localStorage.getItem('user');
		if (userData) {
			try {
				const user = JSON.parse(userData);
				userRole = user.role || 'client';
			} catch (e) {
				userRole = 'client';
			}
		}
	});

	// Role-based navigation items
	$: navItems = getNavItems(userRole);

	function getNavItems(role: string) {
		switch (role) {
			case 'admin':
				return [
					{ name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
					{ name: 'Users', href: '/admin/users', icon: '👥' },
					{ name: 'Projects', href: '/admin/projects', icon: '📋' },
					{ name: 'Forum', href: '/admin/forum', icon: '💬' },
					{ name: 'Settings', href: '/admin/settings', icon: '⚙️' },
				];
			case 'freelancer':
				return [
					{ name: 'Dashboard', href: '/dashboard', icon: '📊' },
					{ name: 'Available Projects', href: '/projects', icon: '🔍' },
					{ name: 'My Bids', href: '/dashboard/bids', icon: '💼' },
					{ name: 'Messages', href: '/dashboard/messages', icon: '💬' },
					{ name: 'Learning', href: '/learn', icon: '🎓' },
					{ name: 'Profile', href: '/dashboard/profile', icon: '👤' },
					{ name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
				];
			case 'client':
			default:
				return [
					{ name: 'Dashboard', href: '/dashboard', icon: '📊' },
					{ name: 'My Projects', href: '/dashboard/projects', icon: '📋' },
					{ name: 'My Bids', href: '/dashboard/bids', icon: '💼' },
					{ name: 'Messages', href: '/dashboard/messages', icon: '💬' },
					{ name: 'Learning', href: '/learn', icon: '🎓' },
					{ name: 'Profile', href: '/dashboard/profile', icon: '👤' },
					{ name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
				];
		}
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}

	function toggleUserMenu() {
		userMenuOpen = !userMenuOpen;
	}

	function closeUserMenu() {
		userMenuOpen = false;
	}

	function handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		userMenuOpen = false;
		window.location.href = '/';
	}

	// Role-based sidebar styling
	$: sidebarStyles = getSidebarStyles(userRole);

	function getSidebarStyles(role: string) {
		switch (role) {
			case 'admin':
				return {
					headerBg: 'bg-red-600',
					headerText: 'text-white',
					activeBg: 'bg-red-100',
					activeText: 'text-red-700',
					activeBorder: 'border-red-700',
					avatarBg: 'bg-red-600',
					roleBadge: 'Admin',
					roleBadgeColor: 'bg-red-100 text-red-800'
				};
			case 'freelancer':
				return {
					headerBg: 'bg-green-600',
					headerText: 'text-white',
					activeBg: 'bg-green-100',
					activeText: 'text-green-700',
					activeBorder: 'border-green-700',
					avatarBg: 'bg-green-600',
					roleBadge: 'Freelancer',
					roleBadgeColor: 'bg-green-100 text-green-800'
				};
			case 'client':
			default:
				return {
					headerBg: 'bg-blue-600',
					headerText: 'text-white',
					activeBg: 'bg-blue-100',
					activeText: 'text-blue-700',
					activeBorder: 'border-blue-700',
					avatarBg: 'bg-blue-600',
					roleBadge: 'Client',
					roleBadgeColor: 'bg-blue-100 text-blue-800'
				};
		}
	}
</script>

<svelte:head>
	<title>Dashboard - Projekan</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex">
	<!-- Sidebar -->
	<div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0">
		<div class="flex flex-col h-full">
			<!-- Logo & Role Header -->
			<div class="flex items-center justify-between h-16 px-4 {sidebarStyles.headerBg}">
				<h1 class="text-xl font-bold {sidebarStyles.headerText}">Projekan</h1>
				<span class="px-2 py-1 text-xs font-medium rounded-full {sidebarStyles.roleBadgeColor}">
					{sidebarStyles.roleBadge}
				</span>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 px-4 py-6 space-y-2">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
							{$page.url.pathname === item.href
								? '{sidebarStyles.activeBg} {sidebarStyles.activeText} border-r-4 {sidebarStyles.activeBorder}'
								: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
						on:click={closeSidebar}
					>
						<span class="mr-3 text-lg">{item.icon}</span>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- Footer -->
			<div class="p-4 border-t border-gray-200 space-y-2">
				<a href="/" class="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
					<span class="mr-3">🏠</span>
					Back to Home
				</a>

				<button
					on:click={handleLogout}
					class="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors"
				>
					<span class="mr-3">🚪</span>
					Sign Out
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile sidebar backdrop -->
	{#if sidebarOpen}
		<button
			type="button"
			class="fixed inset-0 z-40 lg:hidden bg-gray-600 opacity-75"
			aria-label="Close sidebar backdrop"
			on:click={closeSidebar}
			tabindex="0"
		></button>
	{/if}

	<!-- Click outside to close user menu -->
	{#if userMenuOpen}
		<div
			class="fixed inset-0 z-30"
			on:click={closeUserMenu}
			on:keydown={closeUserMenu}
			role="button"
			tabindex="0"
		></div>
	{/if}
	<!-- Main content area -->
	<div class="flex-1 lg:ml-64">
		<!-- Top bar -->
		<div class="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6">
			<button
				on:click={toggleSidebar}
				class="p-2 text-gray-500 rounded-md hover:text-gray-600 hover:bg-gray-100 lg:hidden"
				aria-label="Open sidebar"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
				</svg>
			</button>

			<!-- User Menu -->
			<div class="relative">
				<button
					on:click={toggleUserMenu}
					class="flex items-center space-x-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 group"
				>
					<div class="w-8 h-8 {sidebarStyles.avatarBg} rounded-full flex items-center justify-center">
						<span class="text-white font-medium text-sm">U</span>
					</div>
					<div class="hidden md:block text-left">
						<p class="text-sm font-medium text-gray-900">Welcome back!</p>
						<p class="text-xs text-gray-500 capitalize">{userRole}</p>
					</div>
					<svg class="w-4 h-4 text-gray-400 transition-transform duration-300 {userMenuOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
					</svg>
				</button>

				<!-- Dropdown Menu -->
				{#if userMenuOpen}
					<div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200/50 backdrop-blur-xl py-2 z-50">
						<div class="px-4 py-3 border-b border-gray-100">
							<p class="text-sm font-medium text-gray-900">User Account</p>
							<p class="text-xs text-gray-500 capitalize">{userRole}</p>
						</div>

						<a href="/dashboard/profile" class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" on:click={closeUserMenu}>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
							</svg>
							<span>Profile</span>
						</a>

						<a href="/dashboard/settings" class="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors" on:click={closeUserMenu}>
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
		</div>

		<!-- Page content -->
		<main class="flex-1 p-4 lg:p-6">
			<slot />
		</main>
	</div>
</div>