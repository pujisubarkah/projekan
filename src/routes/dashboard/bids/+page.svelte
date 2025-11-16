<script lang="ts">
	import { onMount } from 'svelte';
	import type { Bid } from '$lib/types';

	let bids: Bid[] = [];
	let loading = true;

	onMount(async () => {
		await loadBids();
		loading = false;
	});

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
				proposal: 'I have 5+ years of experience building e-commerce websites with modern technologies.',
				status: 'pending',
				createdAt: new Date('2024-01-16'),
			},
			{
				id: 2,
				projectId: 2,
				freelancerId: 3,
				freelancer: {
					id: 3,
					email: 'dev@example.com',
					name: 'Mike Chen',
					role: 'freelancer',
					skills: '["Flutter", "Firebase", "Dart"]',
				},
				amount: 1600,
				proposal: 'Experienced mobile developer with 3+ years building cross-platform apps.',
				status: 'accepted',
				createdAt: new Date('2024-01-21'),
			},
		];
	}
</script>

<svelte:head>
	<title>My Bids - Projekan</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">My Bids</h1>
		<p class="mt-2 text-gray-600">Track and manage your project bids</p>
	</div>

	{#if loading}
		<div class="flex justify-center items-center h-64">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
		</div>
	{:else}
		<!-- Filter Tabs -->
		<div class="mb-6">
			<div class="border-b border-gray-200">
				<nav class="-mb-px flex space-x-8">
					<button class="border-blue-500 text-blue-600 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
						All Bids ({bids.length})
					</button>
					<button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
						Pending ({bids.filter(b => b.status === 'pending').length})
					</button>
					<button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
						Accepted ({bids.filter(b => b.status === 'accepted').length})
					</button>
					<button class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
						Rejected ({bids.filter(b => b.status === 'rejected').length})
					</button>
				</nav>
			</div>
		</div>

		<!-- Bids List -->
		<div class="space-y-6">
			{#each bids as bid}
				<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
					<div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-3">
								<div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<span class="text-blue-600 font-medium text-sm">
										{bid.freelancer?.name?.charAt(0).toUpperCase() || 'U'}
									</span>
								</div>
								<div>
									<h3 class="text-lg font-semibold text-gray-900">{bid.freelancer?.name || 'Unknown Freelancer'}</h3>
									<p class="text-sm text-gray-600">{bid.freelancer?.email || ''}</p>
								</div>
								<span class="px-3 py-1 text-sm font-medium rounded-full
									{bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
									 bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
									 bid.status === 'rejected' ? 'bg-red-100 text-red-800' :
									 'bg-gray-100 text-gray-800'}">
									{bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
								</span>
							</div>

							<div class="mb-4">
								<h4 class="font-medium text-gray-900 mb-2">Proposal</h4>
								<p class="text-gray-700">{bid.proposal}</p>
							</div>

							<div class="flex flex-wrap gap-2 mb-4">
								{#if bid.freelancer?.skills}
									{#each JSON.parse(bid.freelancer.skills) as skill}
										<span class="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
											{skill}
										</span>
									{/each}
								{/if}
							</div>

							<div class="text-sm text-gray-500">
								Submitted on {bid.createdAt ? bid.createdAt.toLocaleDateString() : 'Unknown date'}
							</div>
						</div>

						<div class="lg:text-right">
							<div class="text-2xl font-bold text-green-600 mb-4">
								${bid.amount}
							</div>

							{#if bid.status === 'pending'}
								<div class="flex gap-2">
									<button class="flex-1 lg:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
										Accept Bid
									</button>
									<button class="flex-1 lg:flex-none bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
										Reject Bid
									</button>
								</div>
							{:else if bid.status === 'accepted'}
								<div class="text-green-600 font-medium">
									Bid Accepted ✓
								</div>
							{:else if bid.status === 'rejected'}
								<div class="text-red-600 font-medium">
									Bid Rejected
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>

		{#if bids.length === 0}
			<div class="text-center py-12">
				<div class="text-gray-400 mb-4">
					<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No bids yet</h3>
				<p class="text-gray-600">Bids from freelancers will appear here</p>
			</div>
		{/if}
	{/if}
</div>