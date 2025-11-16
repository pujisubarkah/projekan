<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types';

	let projects: Project[] = [];
	let loading = true;
	let searchQuery = '';
	let selectedCategory = '';
	let categories = ['All', 'Web Development', 'Mobile Development', 'Design', 'Writing', 'Marketing'];

	onMount(async () => {
		await loadProjects();
		loading = false;
	});

	async function loadProjects() {
		// Mock data - in production, fetch from API
		projects = [
			{
				id: 1,
				title: 'Build E-commerce Website',
				description: 'Need a modern e-commerce website with payment integration. Looking for experienced developers with React and Node.js skills.',
				budget: 2500,
				category: 'Web Development',
				status: 'open',
				clientId: 1,
				client: {
					id: 1,
					email: 'client@example.com',
					name: 'John Smith',
					role: 'client',
				},
				deadline: new Date('2024-02-15'),
				createdAt: new Date('2024-01-15'),
			},
			{
				id: 2,
				title: 'Mobile App Development',
				description: 'Cross-platform mobile app for task management. Required skills: Flutter, Firebase, and Dart.',
				budget: 1800,
				category: 'Mobile Development',
				status: 'open',
				clientId: 2,
				client: {
					id: 2,
					email: 'sarah@example.com',
					name: 'Sarah Johnson',
					role: 'client',
				},
				deadline: new Date('2024-03-01'),
				createdAt: new Date('2024-01-20'),
			},
			{
				id: 3,
				title: 'Logo Design Project',
				description: 'Need a professional logo design for a tech startup. Must be modern and scalable.',
				budget: 300,
				category: 'Design',
				status: 'open',
				clientId: 3,
				client: {
					id: 3,
					email: 'startup@example.com',
					name: 'Tech Startup Inc',
					role: 'client',
				},
				deadline: new Date('2024-02-10'),
				createdAt: new Date('2024-01-25'),
			},
		];
	}

	$: filteredProjects = projects.filter(project => {
		const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
							 project.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || project.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});
</script>

<svelte:head>
	<title>Available Projects - Projekan</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
			<div>
				<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Available Projects</h1>
				<p class="mt-2 text-gray-600">Find and bid on projects that match your skills</p>
			</div>
			<div class="flex gap-4">
				<span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
					{filteredProjects.length} projects available
				</span>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="search" class="block text-sm font-medium text-gray-700 mb-2">
					Search Projects
				</label>
				<input
					type="text"
					id="search"
					bind:value={searchQuery}
					placeholder="Search by title or description..."
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>

			<div>
				<label for="category" class="block text-sm font-medium text-gray-700 mb-2">
					Category
				</label>
				<select
					id="category"
					bind:value={selectedCategory}
					class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
				>
					{#each categories as category}
						<option value={category === 'All' ? '' : category}>{category}</option>
					{/each}
				</select>
			</div>

			<div class="flex items-end">
				<button
					on:click={() => { searchQuery = ''; selectedCategory = ''; }}
					class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
				>
					Clear Filters
				</button>
			</div>
		</div>
	</div>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	{:else}
		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredProjects as project}
				<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
					<div class="flex justify-between items-start mb-4">
						<div class="flex-1">
							<h3 class="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
							<div class="flex items-center gap-2 mb-3">
								<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
									{project.category}
								</span>
								<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
									Open for bids
								</span>
							</div>
						</div>
					</div>

					<p class="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

					<div class="space-y-2 mb-4">
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Budget:</span>
							<span class="font-semibold text-green-600">${project.budget}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Client:</span>
							<span class="font-medium">{project.client?.name}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Deadline:</span>
							<span class="font-medium">{project.deadline ? project.deadline.toLocaleDateString() : 'Not set'}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Posted:</span>
							<span class="font-medium">{project.createdAt ? project.createdAt.toLocaleDateString() : 'Unknown'}</span>
						</div>
					</div>

					<div class="flex gap-2">
						<a href="/project/{project.id}" class="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
							View Details
						</a>
						<button class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
							Place Bid
						</button>
					</div>
				</div>
			{/each}
		</div>

		{#if filteredProjects.length === 0}
			<div class="text-center py-12">
				<div class="text-gray-400 mb-4">
					<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
				<p class="text-gray-600 mb-6">Try adjusting your search criteria or check back later for new projects</p>
				<button
					on:click={() => { searchQuery = ''; selectedCategory = ''; }}
					class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					Clear Filters
				</button>
			</div>
		{/if}
	{/if}
</div>