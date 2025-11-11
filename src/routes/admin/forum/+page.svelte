<script lang="ts">
	import { onMount } from 'svelte';

	let forumPosts = [];
	let searchTerm = '';
	let selectedCategory = 'all';
	let currentPage = 1;
	const itemsPerPage = 10;

	$: filteredPosts = forumPosts.filter(post => {
		const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
							post.author.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	$: totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
	$: startIndex = (currentPage - 1) * itemsPerPage;
	$: endIndex = startIndex + itemsPerPage;
	$: currentPosts = filteredPosts.slice(startIndex, endIndex);

	onMount(async () => {
		// Mock data - in production, fetch from API
		forumPosts = [
			{
				id: 1,
				title: 'Tips Sukses sebagai Freelancer di Indonesia',
				author: 'Maya Sari',
				category: 'Tips & Tricks',
				replies: 24,
				views: 156,
				status: 'active',
				createdAt: new Date('2024-01-15'),
				lastReply: new Date('2024-01-16')
			},
			{
				id: 2,
				title: 'Berapa Range Harga yang Wajar untuk Desain Logo?',
				author: 'Ahmad Rahman',
				category: 'Pricing',
				replies: 18,
				views: 203,
				status: 'active',
				createdAt: new Date('2024-01-14'),
				lastReply: new Date('2024-01-15')
			},
			{
				id: 3,
				title: 'Pengalaman Kerja dengan Client Sulit',
				author: 'Siti Nurhaliza',
				category: 'Experience',
				replies: 31,
				views: 289,
				status: 'active',
				createdAt: new Date('2024-01-13'),
				lastReply: new Date('2024-01-16')
			},
			{
				id: 4,
				title: 'Rekomendasi Tools Desain Terbaik 2024',
				author: 'Budi Santoso',
				category: 'Tools',
				replies: 15,
				views: 178,
				status: 'active',
				createdAt: new Date('2024-01-12'),
				lastReply: new Date('2024-01-14')
			},
			{
				id: 5,
				title: 'Cara Membuat Portfolio yang Menarik',
				author: 'Dewi Kartika',
				category: 'Portfolio',
				replies: 22,
				views: 245,
				status: 'pinned',
				createdAt: new Date('2024-01-10'),
				lastReply: new Date('2024-01-15')
			},
			{
				id: 6,
				title: 'Spam Post - Laporan',
				author: 'System',
				category: 'General',
				replies: 0,
				views: 12,
				status: 'deleted',
				createdAt: new Date('2024-01-11'),
				lastReply: null
			},
		];
	});

	function updatePostStatus(postId: number, newStatus: string) {
		const post = forumPosts.find(p => p.id === postId);
		if (post) {
			post.status = newStatus;
			forumPosts = [...forumPosts]; // Trigger reactivity
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
			<h1 class="text-2xl font-bold text-gray-900">Manajemen Forum</h1>
			<p class="text-gray-600">Kelola postingan dan diskusi di forum Projekan</p>
		</div>
		<div class="flex space-x-2">
			<button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
				Tambah Kategori
			</button>
			<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
				Moderasi
			</button>
		</div>
	</div>

	<!-- Stats Cards -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-blue-100 rounded-lg">
					<span class="text-2xl">📝</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Posts</p>
					<p class="text-2xl font-bold text-gray-900">{forumPosts.length}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-green-100 rounded-lg">
					<span class="text-2xl">💬</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Replies</p>
					<p class="text-2xl font-bold text-gray-900">{forumPosts.reduce((sum, post) => sum + post.replies, 0)}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-yellow-100 rounded-lg">
					<span class="text-2xl">👁️</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Total Views</p>
					<p class="text-2xl font-bold text-gray-900">{forumPosts.reduce((sum, post) => sum + post.views, 0)}</p>
				</div>
			</div>
		</div>

		<div class="bg-white rounded-lg shadow p-6">
			<div class="flex items-center">
				<div class="p-2 bg-red-100 rounded-lg">
					<span class="text-2xl">🚫</span>
				</div>
				<div class="ml-4">
					<p class="text-sm font-medium text-gray-600">Reported Posts</p>
					<p class="text-2xl font-bold text-gray-900">{forumPosts.filter(p => p.status === 'deleted').length}</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-lg shadow p-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="search-input" class="block text-sm font-medium text-gray-700 mb-2">Cari Post</label>
				<input
					id="search-input"
					type="text"
					bind:value={searchTerm}
					placeholder="Judul atau author..."
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
			</div>
			<div>
				<label for="category-select" class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
				<select
					id="category-select"
					bind:value={selectedCategory}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Kategori</option>
					<option value="Tips & Tricks">Tips & Tricks</option>
					<option value="Pricing">Pricing</option>
					<option value="Experience">Experience</option>
					<option value="Tools">Tools</option>
					<option value="Portfolio">Portfolio</option>
					<option value="General">General</option>
				</select>
			</div>
			<div>
				<label for="status-select" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
				<select
					id="status-select"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Status</option>
					<option value="active">Active</option>
					<option value="pinned">Pinned</option>
					<option value="deleted">Deleted</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Forum Posts Table -->
	<div class="bg-white rounded-lg shadow overflow-hidden">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Daftar Forum Posts ({filteredPosts.length})</h3>
		</div>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stats</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each currentPosts as post}
						<tr>
							<td class="px-6 py-4">
								<div>
									<div class="text-sm font-medium text-gray-900">{post.title}</div>
									<div class="text-sm text-gray-500">ID: {post.id}</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{post.author}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{post.category}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								<div>{post.replies} replies</div>
								<div>{post.views} views</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
									{post.status === 'active' ? 'bg-green-100 text-green-800' :
									 post.status === 'pinned' ? 'bg-blue-100 text-blue-800' :
									 'bg-red-100 text-red-800'}">
									{post.status}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{post.lastReply ? post.lastReply.toLocaleDateString('id-ID') : 'No replies'}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
								<button
									on:click={() => updatePostStatus(post.id, post.status === 'pinned' ? 'active' : 'pinned')}
									class="text-blue-600 hover:text-blue-900"
								>
									{post.status === 'pinned' ? 'Unpin' : 'Pin'}
								</button>
								<button
									on:click={() => updatePostStatus(post.id, 'deleted')}
									class="text-red-600 hover:text-red-900"
								>
									Delete
								</button>
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
					Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} dari {filteredPosts.length} posts
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