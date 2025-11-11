<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { User, Project, Bid } from '$lib/types';

	let user: User | null = null;
	let projects: Project[] = [];
	let bids: Bid[] = [];
	let loading = true;

	onMount(async () => {
		await loadUserData();
		await loadProjects();
		await loadBids();
		loading = false;
	});

	async function loadUserData() {
		// Mock data - in production, get from auth context or API
		user = {
			id: 1,
			email: 'client@example.com',
			name: 'John Smith',
			role: 'client',
		};
	}

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

	async function loadBids() {
		// Mock data - in production, fetch from API
		bids = [
			{
				id: 1,
				projectId: 1,
				freelancerId: 2,
				freelancer: {
					id: 2,
					email: 'freelancer@example.com',
					name: 'Sarah Johnson',
					role: 'freelancer',
					skills: '["React", "Node.js", "MongoDB"]',
				},
				amount: 2200,
				proposal: 'I have 5+ years of experience building e-commerce websites.',
				status: 'pending',
				createdAt: new Date('2024-01-16'),
			},
		];
	}
</script>

<svelte:head>
	<title>Dashboard - Projekan</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
		<!-- Page Header -->
		<div class="mb-6 sm:mb-8">
			<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
			<p class="mt-2 text-gray-600">Kelola proyek dan aktivitas Anda</p>
		</div>
		{#if loading}
			<div class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		{:else}
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2 space-y-6 sm:space-y-8">
					<!-- Projects Section -->
					<div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
						<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3">
							<h2 class="text-lg sm:text-xl font-semibold text-gray-900">My Projects</h2>
							<a href="/project/new" class="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm sm:text-base">
								Create New Project
							</a>
						</div>

						<div class="space-y-4">
							{#each projects as project (project.id)}
								<!-- Explicitly type project as Project for TypeScript -->
								{@const typedProject: Project = project}
								<div class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
									<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
										<h3 class="text-base sm:text-lg font-medium text-gray-900 flex-1">{typedProject.title}</h3>
										<span class="px-2 py-1 text-xs font-medium rounded-full self-start sm:self-auto
											{typedProject.status === 'open' ? 'bg-green-100 text-green-800' :
											 typedProject.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
											 'bg-gray-100 text-gray-800'}">
											{typedProject.status.replace('_', ' ').toUpperCase()}
										</span>
									</div>
									<p class="text-gray-600 mb-3 line-clamp-2 text-sm sm:text-base">{typedProject.description}</p>
									<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-500 gap-2">
										<span>Budget: ${typedProject.budget}</span>
										<span>Deadline: {typedProject.deadline ? typedProject.deadline.toLocaleDateString() : 'Not set'}</span>
									</div>
									<div class="mt-3">
										<a href="/project/{typedProject.id}" class="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base">
											View Details →
										</a>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<!-- Recent Bids Section -->
					<div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
						<h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Recent Bids</h2>

						<div class="space-y-4">
							{#each bids as bid}
								<div class="border border-gray-200 rounded-lg p-3 sm:p-4">
									<div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
										<div class="flex-1">
											<h4 class="font-medium text-gray-900 text-sm sm:text-base">{bid.freelancer?.name || 'Unknown Freelancer'}</h4>
											<p class="text-xs sm:text-sm text-gray-600">Project: {projects.find(p => p.id === bid.projectId)?.title}</p>
										</div>
										<span class="text-base sm:text-lg font-semibold text-green-600">${bid.amount}</span>
									</div>
									<p class="text-gray-700 mb-3 text-sm sm:text-base">{bid.proposal}</p>
									<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
										<span class="text-xs sm:text-sm text-gray-500">{bid.createdAt ? bid.createdAt.toLocaleDateString() : 'Unknown date'}</span>
										<div class="flex gap-2">
											<button class="flex-1 sm:flex-none bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-green-700 transition-colors">
												Accept
											</button>
											<button class="flex-1 sm:flex-none bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm hover:bg-red-700 transition-colors">
												Reject
											</button>
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="hidden lg:block lg:col-span-1 space-y-4 sm:space-y-6">
					<!-- Stats Card -->
					<div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
						<h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Statistics</h3>
						<div class="space-y-2 sm:space-y-3">
							<div class="flex justify-between text-sm sm:text-base">
								<span class="text-gray-600">Active Projects</span>
								<span class="font-semibold">{projects.filter(p => p.status === 'in_progress').length}</span>
							</div>
							<div class="flex justify-between text-sm sm:text-base">
								<span class="text-gray-600">Open Projects</span>
								<span class="font-semibold">{projects.filter(p => p.status === 'open').length}</span>
							</div>
							<div class="flex justify-between text-sm sm:text-base">
								<span class="text-gray-600">Total Projects</span>
								<span class="font-semibold">{projects.length}</span>
							</div>
							<div class="flex justify-between text-sm sm:text-base">
								<span class="text-gray-600">Pending Bids</span>
								<span class="font-semibold">{bids.filter(b => b.status === 'pending').length}</span>
							</div>
						</div>
					</div>

					<!-- Quick Actions -->
					<div class="bg-white rounded-lg shadow-sm p-4 sm:p-6">
						<h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
						<div class="space-y-2">
							<a href="/project/new" class="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
								Post New Project
							</a>
							<button class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
								View All Bids
							</button>
							<button class="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base">
								Payment History
							</button>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>