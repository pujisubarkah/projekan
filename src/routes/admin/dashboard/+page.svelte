<script lang="ts">
	import { onMount } from 'svelte';

	let stats = {
		totalUsers: 0,
		totalProjects: 0,
		totalBids: 0,
		totalForumPosts: 0,
		revenue: 0
	};

	let recentProjects = [];
	let recentUsers = [];

	onMount(async () => {
		// Mock data - in production, fetch from API
		stats = {
			totalUsers: 1247,
			totalProjects: 89,
			totalBids: 456,
			totalForumPosts: 234,
			revenue: 12500000
		};

		recentProjects = [
			{ id: 1, title: 'Desain Logo UMKM Batik', client: 'Siti Aminah', status: 'open', createdAt: new Date('2024-01-15') },
			{ id: 2, title: 'Website E-commerce', client: 'Ahmad Rahman', status: 'in_progress', createdAt: new Date('2024-01-14') },
			{ id: 3, title: 'Mobile App Development', client: 'Dewi Kartika', status: 'completed', createdAt: new Date('2024-01-13') },
		];

		recentUsers = [
			{ id: 1, name: 'Maya Sari', email: 'maya@example.com', role: 'freelancer', joinedAt: new Date('2024-01-10') },
			{ id: 2, name: 'Budi Santoso', email: 'budi@example.com', role: 'client', joinedAt: new Date('2024-01-09') },
			{ id: 3, name: 'Siti Nurhaliza', email: 'siti@example.com', role: 'freelancer', joinedAt: new Date('2024-01-08') },
		];
	});
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
			<p class="text-gray-600">Selamat datang di panel admin Projekan</p>
		</div>
		<div class="text-sm text-gray-500">
			{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-blue-100 rounded-lg">
					<span class="text-2xl">👥</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Users</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-green-100 rounded-lg">
					<span class="text-2xl">📋</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Projects</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalProjects.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-yellow-100 rounded-lg">
					<span class="text-2xl">💰</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Bids</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalBids.toLocaleString()}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-purple-100 rounded-lg">
					<span class="text-2xl">💬</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Forum Posts</p>
					<p class="text-2xl font-bold text-gray-900">{stats.totalForumPosts.toLocaleString()}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Revenue Card -->
	<div class="bg-white rounded-lg shadow p-6">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-lg font-medium text-gray-900">Total Revenue</h3>
				<p class="text-3xl font-bold text-green-600">Rp {stats.revenue.toLocaleString('id-ID')}</p>
			</div>
			<div class="p-3 bg-green-100 rounded-full">
				<span class="text-3xl">💵</span>
			</div>
		</div>
	</div>

	<!-- Recent Activity -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
		<!-- Recent Projects -->
		<div class="bg-white rounded-lg shadow">
			<div class="px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-medium text-gray-900">Proyek Terbaru</h3>
			</div>
			<div class="divide-y divide-gray-200">
				{#each recentProjects as project}
					<div class="px-6 py-4">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<h4 class="text-sm font-medium text-gray-900">{project.title}</h4>
								<p class="text-sm text-gray-600">Oleh {project.client}</p>
							</div>
							<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
								{project.status === 'open' ? 'bg-green-100 text-green-800' :
								 project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
								 'bg-blue-100 text-blue-800'}">
								{project.status.replace('_', ' ').toUpperCase()}
							</span>
						</div>
						<p class="text-xs text-gray-500 mt-1">
							{project.createdAt.toLocaleDateString('id-ID')}
						</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Recent Users -->
		<div class="bg-white rounded-lg shadow">
			<div class="px-6 py-4 border-b border-gray-200">
				<h3 class="text-lg font-medium text-gray-900">User Terbaru</h3>
			</div>
			<div class="divide-y divide-gray-200">
				{#each recentUsers as user}
					<div class="px-6 py-4">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<h4 class="text-sm font-medium text-gray-900">{user.name}</h4>
								<p class="text-sm text-gray-600">{user.email}</p>
							</div>
							<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
								{user.role === 'freelancer' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
								{user.role.toUpperCase()}
							</span>
						</div>
						<p class="text-xs text-gray-500 mt-1">
							Bergabung {user.joinedAt.toLocaleDateString('id-ID')}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>