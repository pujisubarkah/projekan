<script lang="ts">
	import type { Project, Bid } from '$lib/types';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let project: Project | null = null;
	let bids: Bid[] = [];
	let loading = true;

	// Pagination state
	let currentPage = 1;
	const itemsPerPage = 5; // Show 5 bids per page

	// Get project ID from URL
	$: projectId = $page.params.id;

	// Pagination computed properties
	$: totalPages = Math.ceil(bids.length / itemsPerPage);
	$: startIndex = (currentPage - 1) * itemsPerPage;
	$: endIndex = startIndex + itemsPerPage;
	$: currentBids = bids.slice(startIndex, endIndex);

	// Pagination functions
	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage++;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage--;
		}
	}

	onMount(async () => {
		if (projectId) {
			await loadProject();
			await loadBids();
		}
		loading = false;
	});

	async function loadProject() {
		if (!projectId) return;

		// Mock data - in production, fetch from API
		const mockProjects: Project[] = [
			{
				id: 1,
				title: 'Desain Logo dan Branding untuk UMKM Batik',
				description: 'Membutuhkan desain logo yang modern dan branding lengkap untuk usaha batik keluarga. Logo harus mencerminkan nilai-nilai tradisional namun tetap terlihat contemporary. Termasuk desain logo, kartu nama, kemasan produk, dan konsep visual untuk media sosial.',
				budget: 2500000,
				category: 'Desain Grafis',
				status: 'open',
				clientId: 1,
				client: {
					id: 1,
					email: 'umkm@example.com',
					name: 'Siti Aminah',
					role: 'client',
				},
				deadline: new Date('2024-02-15'),
				createdAt: new Date('2024-01-15'),
			},
		];

		project = mockProjects.find(p => p.id === parseInt(projectId)) || null;
	}

	async function loadBids() {
		if (!projectId) return;

		// Mock data - in production, fetch from API
		bids = [
			{
				id: 1,
				projectId: parseInt(projectId),
				freelancerId: 2,
				freelancer: {
					id: 2,
					email: 'desainer@example.com',
					name: 'Maya Sari',
					role: 'freelancer',
					skills: '["Adobe Illustrator", "Adobe Photoshop", "Branding", "Logo Design"]',
				},
				amount: 2200000,
				proposal: 'Saya memiliki pengalaman 4 tahun di bidang desain grafis, khususnya branding untuk UMKM. Saya akan buatkan konsep logo yang unik dengan sentuhan budaya batik yang modern. Deadline 2 minggu dengan revisi hingga 3 kali.',
				status: 'pending',
				createdAt: new Date('2024-01-16'),
			},
			{
				id: 2,
				projectId: parseInt(projectId),
				freelancerId: 3,
				freelancer: {
					id: 3,
					email: 'kreatif@example.com',
					name: 'Ahmad Rahman',
					role: 'freelancer',
					skills: '["Graphic Design", "UI/UX", "Canva", "Marketing Visual"]',
				},
				amount: 2400000,
				proposal: 'Spesialis desain branding untuk bisnis lokal. Portfolio saya banyak yang untuk UMKM fashion dan kuliner. Saya akan buatkan paket lengkap branding termasuk mockup produk dan panduan penggunaan warna.',
				status: 'pending',
				createdAt: new Date('2024-01-17'),
			},
			{
				id: 3,
				projectId: parseInt(projectId),
				freelancerId: 4,
				freelancer: {
					id: 4,
					email: 'designpro@example.com',
					name: 'Siti Nurhaliza',
					role: 'freelancer',
					skills: '["Logo Design", "Brand Identity", "Adobe Creative Suite", "Typography"]',
				},
				amount: 2100000,
				proposal: 'Designer profesional dengan fokus pada brand identity. Saya akan buatkan logo yang timeless dan scalable untuk berbagai media. Termasuk file vector dan panduan implementasi.',
				status: 'pending',
				createdAt: new Date('2024-01-18'),
			},
			{
				id: 4,
				projectId: parseInt(projectId),
				freelancerId: 5,
				freelancer: {
					id: 5,
					email: 'creative@example.com',
					name: 'Budi Santoso',
					role: 'freelancer',
					skills: '["Graphic Design", "Digital Marketing", "Social Media Design", "Print Design"]',
				},
				amount: 2300000,
				proposal: 'Pengalaman 6 tahun di industri kreatif. Spesialisasi di branding UMKM dan digital marketing. Saya akan deliver konsep yang marketable dan sesuai target audience.',
				status: 'pending',
				createdAt: new Date('2024-01-19'),
			},
			{
				id: 5,
				projectId: parseInt(projectId),
				freelancerId: 6,
				freelancer: {
					id: 6,
					email: 'artisan@example.com',
					name: 'Dewi Kartika',
					role: 'freelancer',
					skills: '["Traditional Art", "Digital Illustration", "Cultural Design", "Hand-lettering"]',
				},
				amount: 2500000,
				proposal: 'Artist dengan background seni tradisional Indonesia. Saya akan gabungkan elemen budaya batik dengan desain modern untuk menciptakan brand yang autentik dan unik.',
				status: 'pending',
				createdAt: new Date('2024-01-20'),
			},
			{
				id: 6,
				projectId: parseInt(projectId),
				freelancerId: 7,
				freelancer: {
					id: 7,
					email: 'brandmaster@example.com',
					name: 'Rizky Pratama',
					role: 'freelancer',
					skills: '["Brand Strategy", "Logo Design", "Packaging Design", "Visual Identity"]',
				},
				amount: 2600000,
				proposal: 'Brand strategist dan designer. Saya akan mulai dari research pasar dan positioning brand sebelum masuk ke desain visual. Garansi hasil yang sesuai visi bisnis Anda.',
				status: 'pending',
				createdAt: new Date('2024-01-21'),
			},
			{
				id: 7,
				projectId: parseInt(projectId),
				freelancerId: 8,
				freelancer: {
					id: 8,
					email: 'visual@example.com',
					name: 'Nina Amelia',
					role: 'freelancer',
					skills: '["Visual Design", "UI Design", "Motion Graphics", "Brand Guidelines"]',
				},
				amount: 2350000,
				proposal: 'Designer dengan expertise di visual communication. Saya akan buatkan brand identity yang comprehensive termasuk animasi logo dan brand guidelines yang detail.',
				status: 'pending',
				createdAt: new Date('2024-01-22'),
			},
		];
	}

	function submitBid() {
		// In production, this would open a modal or navigate to bid form
		alert('Bid submission feature coming soon!');
	}
</script>

{#if loading}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
			<p class="mt-4 text-gray-600">Memuat proyek...</p>
		</div>
	</div>
{:else if project}
	<div class="min-h-screen bg-gray-50">
		<!-- Header -->
		<div class="bg-white shadow">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="py-4 sm:py-6">
					<a href="/" class="text-blue-600 hover:text-blue-800 mb-2 inline-block text-sm sm:text-base">← Kembali ke Proyek</a>
					<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div class="flex-1">
							<h1 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{project.title}</h1>
							<p class="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Diposting oleh {project.client?.name} • {project.category}</p>
						</div>
						<div class="text-left sm:text-right">
							<div class="text-2xl sm:text-3xl font-bold text-green-600">Rp {project.budget.toLocaleString('id-ID')}</div>
							<div class="text-xs sm:text-sm text-gray-500">Budget</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				<!-- Project Details -->
				<div class="lg:col-span-2">
					<div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
						<h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Deskripsi Proyek</h2>
						<div class="prose prose-sm sm:prose-base max-w-none">
							<p class="text-gray-700 whitespace-pre-line">{project.description}</p>
						</div>

						<div class="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<h3 class="text-sm font-medium text-gray-500">Status</h3>
								<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
									{project.status === 'open' ? 'bg-green-100 text-green-800' :
									 project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
									 project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
									 'bg-gray-100 text-gray-800'}">
									{project.status.replace('_', ' ').toUpperCase()}
								</span>
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-500">Deadline</h3>
								<p class="text-sm text-gray-900">
									{project.deadline ? project.deadline.toLocaleDateString() : 'Tidak ada deadline'}
								</p>
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-500">Posted</h3>
								<p class="text-sm text-gray-900">
									{project.createdAt?.toLocaleDateString()}
								</p>
							</div>
							<div>
								<h3 class="text-sm font-medium text-gray-500">Category</h3>
								<p class="text-sm text-gray-900">{project.category}</p>
							</div>
						</div>
					</div>

					<!-- Bids Section -->
					<div class="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-6 sm:mt-8">
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
							<h2 class="text-lg sm:text-xl font-semibold text-gray-900">Penawaran ({bids.length})</h2>
							<button
								on:click={submitBid}
								class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
							>
								Kirim Penawaran
							</button>
						</div>

						<div class="space-y-4">
							{#each currentBids as bid}
								<div class="border border-gray-200 rounded-lg p-4">
									<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
										<div class="flex-1">
											<h3 class="font-medium text-gray-900">{bid.freelancer?.name}</h3>
											<p class="text-sm text-gray-500">
												Penawaran dikirim {bid.createdAt?.toLocaleDateString()}
											</p>
										</div>
										<div class="text-left sm:text-right">
											<div class="text-xl font-bold text-green-600">Rp {bid.amount.toLocaleString('id-ID')}</div>
											<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
												{bid.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
												 bid.status === 'accepted' ? 'bg-green-100 text-green-800' :
												 'bg-red-100 text-red-800'}">
												{bid.status.toUpperCase()}
											</span>
										</div>
									</div>
									<p class="text-gray-700 mb-3 text-sm sm:text-base">{bid.proposal}</p>
									{#if bid.freelancer?.skills}
										<div class="flex flex-wrap gap-1">
											{#each JSON.parse(bid.freelancer.skills) as skill}
												<span class="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
													{skill}
												</span>
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>

						<!-- Pagination -->
						{#if totalPages > 1}
							<div class="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
								<div class="text-sm text-gray-700">
									Menampilkan {startIndex + 1}-{Math.min(endIndex, bids.length)} dari {bids.length} penawaran
								</div>
								<div class="flex items-center space-x-2">
									<button
										on:click={prevPage}
										disabled={currentPage === 1}
										class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Sebelumnya
									</button>

									{#each Array(totalPages) as _, i}
										<button
											on:click={() => goToPage(i + 1)}
											class="px-3 py-1 text-sm border rounded-md {currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}"
										>
											{i + 1}
										</button>
									{/each}

									<button
										on:click={nextPage}
										disabled={currentPage === totalPages}
										class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										Selanjutnya
									</button>
								</div>
							</div>
						{/if}

						{#if bids.length === 0}
							<div class="text-center py-8">
								<p class="text-gray-500 text-sm sm:text-base">Belum ada penawaran.</p>
							</div>
						{/if}
					</div>
				</div>

				<!-- Sidebar -->
				<div class="space-y-6">
					<!-- Client Info -->
					<div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
						<h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Informasi Klien</h3>
						<div class="flex items-center mb-4">
							<div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center">
								<span class="text-gray-600 font-medium text-sm sm:text-base">
									{project.client?.name?.charAt(0).toUpperCase()}
								</span>
							</div>
							<div class="ml-3">
								<h4 class="font-medium text-gray-900 text-sm sm:text-base">{project.client?.name}</h4>
								<p class="text-xs sm:text-sm text-gray-500">Client</p>
							</div>
						</div>
						<div class="space-y-2 text-xs sm:text-sm">
							<div class="flex justify-between">
								<span class="text-gray-500">Bergabung sejak:</span>
								<span class="text-gray-900">Jan 2024</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-500">Proyek diposting:</span>
								<span class="text-gray-900">5</span>
							</div>
						</div>
					</div>

					<!-- Quick Actions -->
					<div class="bg-white rounded-lg shadow-md p-4 sm:p-6">
						<h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
						<div class="space-y-3">
							<button class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base">
								Submit Proposal
							</button>
							<button class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base">
								Save Project
							</button>
							<button class="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base">
								Share Project
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
			<p class="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
			<a href="/" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
				Back to Projects
			</a>
		</div>
	</div>
{/if}