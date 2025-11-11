<script lang="ts">
	import type { ForumCategory, ForumThread } from '$lib/types';

	// Mock data for forum categories and threads
	let categories: ForumCategory[] = [
		{
			id: 1,
			name: 'Diskusi Umum',
			description: 'Tempat ngobrol santai dan sharing pengalaman',
			icon: '💬',
			threads: 245,
			lastPost: '2024-01-20T10:30:00Z'
		},
		{
			id: 2,
			name: 'Tips & Trik Freelance',
			description: 'Berbagi tips sukses sebagai freelancer',
			icon: '💡',
			threads: 189,
			lastPost: '2024-01-19T15:45:00Z'
		},
		{
			id: 3,
			name: 'Desain Grafis',
			description: 'Diskusi seputar dunia desain dan kreativitas',
			icon: '🎨',
			threads: 156,
			lastPost: '2024-01-20T08:20:00Z'
		},
		{
			id: 4,
			name: 'Fotografi & Video',
			description: 'Tips fotografi dan produksi video',
			icon: '📸',
			threads: 98,
			lastPost: '2024-01-19T12:15:00Z'
		},
		{
			id: 5,
			name: 'Penulisan & Konten',
			description: 'Diskusi tentang copywriting dan content creation',
			icon: '✍️',
			threads: 134,
			lastPost: '2024-01-18T16:30:00Z'
		},
		{
			id: 6,
			name: 'Marketing Digital',
			description: 'Strategi marketing online dan bisnis',
			icon: '📈',
			threads: 87,
			lastPost: '2024-01-17T14:20:00Z'
		},
		{
			id: 7,
			name: 'Teknologi & IT',
			description: 'Diskusi teknologi dan programming',
			icon: '💻',
			threads: 76,
			lastPost: '2024-01-16T11:45:00Z'
		},
		{
			id: 8,
			name: 'Bisnis & Keuangan',
			description: 'Tips mengelola bisnis dan keuangan freelance',
			icon: '💰',
			threads: 92,
			lastPost: '2024-01-15T09:30:00Z'
		}
	];

	let recentThreads: ForumThread[] = [
		{
			id: 1,
			title: 'Tips dapetin proyek desain logo pertama?',
			categoryId: 3,
			author: 'Maya Sari',
			replies: 23,
			views: 456,
			lastReply: '2024-01-20T10:30:00Z',
			isSticky: false,
			isLocked: false
		},
		{
			id: 2,
			title: 'Rekomendasi software editing video gratis',
			categoryId: 4,
			author: 'Ahmad Rahman',
			replies: 45,
			views: 892,
			lastReply: '2024-01-20T09:15:00Z',
			isSticky: true,
			isLocked: false
		},
		{
			id: 3,
			title: 'Cara negosiasi harga yang profesional',
			categoryId: 2,
			author: 'Siti Aminah',
			replies: 67,
			views: 1234,
			lastReply: '2024-01-19T16:45:00Z',
			isSticky: false,
			isLocked: false
		},
		{
			id: 4,
			title: 'Portfolio yang menarik untuk content writer',
			categoryId: 5,
			author: 'Budi Santoso',
			replies: 34,
			views: 678,
			lastReply: '2024-01-19T14:20:00Z',
			isSticky: false,
			isLocked: false
		},
		{
			id: 5,
			title: 'Pengalaman kerja remote dari rumah',
			categoryId: 1,
			author: 'Rina Wijaya',
			replies: 89,
			views: 1456,
			lastReply: '2024-01-18T11:30:00Z',
			isSticky: false,
			isLocked: false
		}
	];

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		if (diffDays === 1) {
			return 'Hari ini';
		} else if (diffDays === 2) {
			return 'Kemarin';
		} else if (diffDays <= 7) {
			return `${diffDays - 1} hari yang lalu`;
		} else {
			return date.toLocaleDateString('id-ID');
		}
	}

	function getCategoryName(categoryId: number): string {
		const category = categories.find(c => c.id === categoryId);
		return category ? category.name : 'Unknown';
	}
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
			<div class="text-center">
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
					Forum Projekan
				</h1>
				<div class="text-lg sm:text-xl lg:text-2xl mb-6">
					<p class="mb-2">Tempat nongkrongnya komunitas freelancer Indonesia</p>
					<p>Diskusi, berbagi tips, dan networking bareng!</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="#categories" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
						Jelajahi Kategori
					</a>
					<button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
						Buat Thread Baru
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Categories Sidebar -->
			<div class="lg:col-span-1">
				<div class="bg-white rounded-lg shadow-md p-6">
					<h2 class="text-xl font-semibold text-gray-900 mb-6">Kategori Diskusi</h2>
					<div id="categories" class="space-y-4">
						{#each categories as category}
							<a
								href="/forum/category/{category.id}"
								class="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
							>
								<div class="flex items-start space-x-3">
									<span class="text-2xl">{category.icon}</span>
									<div class="flex-1">
										<h3 class="font-medium text-gray-900">{category.name}</h3>
										<p class="text-sm text-gray-600 mt-1">{category.description}</p>
										<div class="flex items-center justify-between mt-2 text-xs text-gray-500">
											<span>{category.threads} threads</span>
											<span>{formatDate(category.lastPost)}</span>
										</div>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Recent Threads -->
			<div class="lg:col-span-2">
				<div class="bg-white rounded-lg shadow-md p-6">
					<div class="flex items-center justify-between mb-6">
						<h2 class="text-xl font-semibold text-gray-900">Thread Terbaru</h2>
						<a href="/forum/all" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
							Lihat Semua →
						</a>
					</div>

					<div class="space-y-4">
						{#each recentThreads as thread}
							<div class="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
								<div class="flex items-start justify-between">
									<div class="flex-1">
										<div class="flex items-center space-x-2 mb-2">
											{#if thread.isSticky}
												<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
													📌 Sticky
												</span>
											{/if}
											{#if thread.isLocked}
												<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
													🔒 Locked
												</span>
											{/if}
											<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
												{getCategoryName(thread.categoryId)}
											</span>
										</div>
										<h3 class="font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
											{thread.title}
										</h3>
										<div class="flex items-center text-sm text-gray-600 space-x-4">
											<span>oleh <strong>{thread.author}</strong></span>
											<span>{thread.replies} balasan</span>
											<span>{thread.views} dilihat</span>
										</div>
									</div>
									<div class="text-right text-xs text-gray-500">
										<div>{formatDate(thread.lastReply)}</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Forum Stats -->
				<div class="bg-white rounded-lg shadow-md p-6 mt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Statistik Forum</h3>
					<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
						<div class="text-center">
							<div class="text-2xl font-bold text-blue-600">1,234</div>
							<div class="text-sm text-gray-600">Total Threads</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-green-600">8,567</div>
							<div class="text-sm text-gray-600">Total Replies</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-purple-600">456</div>
							<div class="text-sm text-gray-600">Anggota Aktif</div>
						</div>
						<div class="text-center">
							<div class="text-2xl font-bold text-orange-600">89</div>
							<div class="text-sm text-gray-600">Online Sekarang</div>
						</div>
					</div>
				</div>

				<!-- Quick Actions -->
				<div class="bg-white rounded-lg shadow-md p-6 mt-6">
					<h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<button class="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
							</svg>
							Buat Thread Baru
						</button>
						<button class="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
							<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
							Cari Thread
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>