<script lang="ts">
	import { onMount } from 'svelte';

	let projects = [];
	let searchTerm = '';
	let selectedStatus = 'all';
	let currentPage = 1;
	const itemsPerPage = 10;

	$: filteredProjects = projects.filter(project => {
		const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							project.client.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
		return matchesSearch && matchesStatus;
	});

	$: totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
	$: startIndex = (currentPage - 1) * itemsPerPage;
	$: endIndex = startIndex + itemsPerPage;
	$: currentProjects = filteredProjects.slice(startIndex, endIndex);

	onMount(async () => {
		// Mock data - in production, fetch from API
		projects = [
			{
				id: 1,
				title: 'Desain Logo dan Branding untuk UMKM Batik',
				client: 'Siti Aminah',
				category: 'Desain Grafis',
				status: 'open',
				budget: 2500000,
				bids: 7,
				createdAt: new Date('2024-01-15'),
				deadline: new Date('2024-02-15')
			},
			{
				id: 2,
				title: 'Website E-commerce untuk Toko Online',
				client: 'Ahmad Rahman',
				category: 'Web Development',
				status: 'in_progress',
				budget: 5000000,
				bids: 12,
				createdAt: new Date('2024-01-14'),
				deadline: new Date('2024-03-01')
			},
			{
				id: 3,
				title: 'Mobile App Development - Food Delivery',
				client: 'Dewi Kartika',
				category: 'Mobile Development',
				status: 'completed',
				budget: 15000000,
				bids: 8,
				createdAt: new Date('2024-01-10'),
				deadline: new Date('2024-02-28')
			},
			{
				id: 4,
				title: 'Content Writing - Blog Artikel',
				client: 'Maya Sari',
				category: 'Content Writing',
				status: 'open',
				budget: 500000,
				bids: 3,
				createdAt: new Date('2024-01-12'),
				deadline: new Date('2024-02-10')
			},
			{
				id: 5,
				title: 'Video Editing - Promotional Video',
				client: 'Budi Santoso',
				category: 'Video Editing',
				status: 'cancelled',
				budget: 2000000,
				bids: 5,
				createdAt: new Date('2024-01-08'),
				deadline: new Date('2024-02-20')
			},
		];
	});

	function updateProjectStatus(projectId: number, newStatus: string) {
		const project = projects.find(p => p.id === projectId);
		if (project) {
			project.status = newStatus;
			projects = [...projects]; // Trigger reactivity
		}
	}

	function prevPage() {
		if (currentPage > 1) currentPage--;
	}

	function nextPage() {
		if (currentPage < totalPages) currentPage++;
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Manajemen Projects</h1>
			<p class="text-gray-600">Kelola semua proyek di platform Projekan</p>
		</div>
		<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
			Tambah Project
		</button>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-lg shadow p-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="search-input" class="block text-sm font-medium text-gray-700 mb-2">Cari Project</label>
				<input
					id="search-input"
					type="text"
					bind:value={searchTerm}
					placeholder="Judul atau client..."
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
			</div>
			<div>
				<label for="status-select" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
				<select
					id="status-select"
					bind:value={selectedStatus}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Status</option>
					<option value="open">Open</option>
					<option value="in_progress">In Progress</option>
					<option value="completed">Completed</option>
					<option value="cancelled">Cancelled</option>
				</select>
			</div>
			<div>
				<label for="category-select" class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
				<select id="category-select" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
					<option value="all">Semua Kategori</option>
					<option value="Desain Grafis">Desain Grafis</option>
					<option value="Web Development">Web Development</option>
					<option value="Mobile Development">Mobile Development</option>
					<option value="Content Writing">Content Writing</option>
					<option value="Video Editing">Video Editing</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Projects Table -->
	<div class="bg-white rounded-lg shadow overflow-hidden">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Daftar Projects ({filteredProjects.length})</h3>
		</div>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bids</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each currentProjects as project}
						<tr>
							<td class="px-6 py-4">
								<div>
									<div class="text-sm font-medium text-gray-900">{project.title}</div>
									<div class="text-sm text-gray-500">ID: {project.id}</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{project.client}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{project.category}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								<select
									value={project.status}
									on:change={(e) => updateProjectStatus(project.id, (e.target as HTMLSelectElement).value)}
									class="text-xs px-2 py-1 border border-gray-300 rounded"
								>
									<option value="open">Open</option>
									<option value="in_progress">In Progress</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								Rp {project.budget.toLocaleString('id-ID')}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{project.bids}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{project.deadline.toLocaleDateString('id-ID')}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
								<a href="/project/{project.id}" class="text-blue-600 hover:text-blue-900">View</a>
								<button class="text-red-600 hover:text-red-900">Delete</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
				<div class="text-sm text-gray-700">
					Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredProjects.length)} dari {filteredProjects.length} projects
				</div>
				<div class="flex items-center space-x-2">
					<button
						on:click={prevPage}
						disabled={currentPage === 1}
						class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
					>
						Sebelumnya
					</button>
					<span class="text-sm text-gray-700">Halaman {currentPage} dari {totalPages}</span>
					<button
						on:click={nextPage}
						disabled={currentPage === totalPages}
						class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50"
					>
						Selanjutnya
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>