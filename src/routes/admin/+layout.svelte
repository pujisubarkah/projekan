<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let sidebarOpen = false;

	// Admin navigation items
	const navItems = [
		{ name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
		{ name: 'Users', href: '/admin/users', icon: '👥' },
		{ name: 'Projects', href: '/admin/projects', icon: '📋' },
		{ name: 'Forum', href: '/admin/forum', icon: '💬' },
		{ name: 'Settings', href: '/admin/settings', icon: '⚙️' },
	];

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function closeSidebar() {
		sidebarOpen = false;
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Mobile sidebar backdrop -->
	{#if sidebarOpen}
		<button
			type="button"
			class="fixed inset-0 z-40 lg:hidden"
			on:click={closeSidebar}
			aria-label="Close sidebar"
			tabindex="0"
		>
			<div class="absolute inset-0 bg-gray-600 opacity-75"></div>
		</button>
	{/if}

	<!-- Sidebar -->
	<div class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform {sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0">
		<div class="flex flex-col h-full">
			<!-- Logo -->
			<div class="flex items-center justify-center h-16 px-4 bg-blue-600">
				<h1 class="text-xl font-bold text-white">Admin Panel</h1>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 px-4 py-6 space-y-2">
				{#each navItems as item}
					<a
						href={item.href}
						class="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
							{$page.url.pathname === item.href
								? 'bg-blue-100 text-blue-700 border-r-4 border-blue-700'
								: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
						on:click={closeSidebar}
					>
						<span class="mr-3 text-lg">{item.icon}</span>
						{item.name}
					</a>
				{/each}
			</nav>

			<!-- Footer -->
			<div class="p-4 border-t border-gray-200">
				<a href="/" class="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900">
					<span class="mr-3">🏠</span>
					Back to Site
				</a>
			</div>
		</div>
	</div>

	<!-- Main content -->
	<div class="lg:pl-64">
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

			<div class="flex items-center space-x-4">
				<span class="text-sm text-gray-600">Welcome, Admin</span>
				<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
					<span class="text-white font-medium text-sm">A</span>
				</div>
			</div>
		</div>

		<!-- Page content -->
		<main class="flex-1 p-4 lg:p-6">
			<slot />
		</main>
	</div>
</div>