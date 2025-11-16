<script lang="ts">
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types';

	let projects: Project[] = [];
	let loading = true;

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
				description: 'Need a modern e-commerce website with payment integration.',
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
				description: 'Cross-platform mobile app for task management.',
				budget: 1800,
				category: 'Mobile Development',
				status: 'in_progress',
				clientId: 1,
				client: {
					id: 1,
					email: 'client@example.com',
					name: 'John Smith',
					role: 'client',
				},
				deadline: new Date('2024-03-01'),
				createdAt: new Date('2024-01-20'),
			},
		];
	}
</script>

<svelte:head>
	<title>My Projects - Projekan</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
			<div>
				<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">My Projects</h1>
				<p class="mt-2 text-gray-600">Manage your projects and track progress</p>
			</div>
			<a href="/project/new" class="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium">
				Create New Project
			</a>
		</div>
	</div>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	{:else}
		<!-- Projects Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each projects as project}
				<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
					<div class="flex justify-between items-start mb-4">
						<h3 class="text-lg font-semibold text-gray-900 flex-1">{project.title}</h3>
						<span class="px-2 py-1 text-xs font-medium rounded-full ml-2
							{project.status === 'open' ? 'bg-green-100 text-green-800' :
							 project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
							 'bg-gray-100 text-gray-800'}">
							{project.status.replace('_', ' ').toUpperCase()}
						</span>
					</div>

					<p class="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

					<div class="space-y-2 mb-4">
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Budget:</span>
							<span class="font-medium">${project.budget}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Category:</span>
							<span class="font-medium">{project.category}</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-gray-500">Deadline:</span>
							<span class="font-medium">{project.deadline ? project.deadline.toLocaleDateString() : 'Not set'}</span>
						</div>
					</div>

					<div class="flex gap-2">
						<a href="/project/{project.id}" class="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
							View Details
						</a>
						<button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
							Edit
						</button>
					</div>
				</div>
			{/each}
		</div>

		{#if projects.length === 0}
			<div class="text-center py-12">
				<div class="text-gray-400 mb-4">
					<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
				<p class="text-gray-600 mb-6">Create your first project to get started</p>
				<a href="/project/new" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
					Create New Project
				</a>
			</div>
		{/if}
	{/if}
</div>