<script lang="ts">
	// Define the Project type locally
	type Project = {
		id: number;
		title: string;
		description: string;
		budget: number;
		category: string;
		status: 'open' | 'in_progress' | 'completed';
		createdAt: Date;
	};

	// Mock data - in production, fetch from API
	let projects: Project[] = [
		{
			id: 1,
			title: 'Desain Logo dan Branding untuk UMKM Batik',
			description: 'Membutuhkan desain logo yang modern dan branding lengkap untuk usaha batik keluarga',
			budget: 2500000,
			category: 'Desain Grafis',
			status: 'open',
			createdAt: new Date('2024-01-15'),
		},
		{
			id: 2,
			title: 'Fotografi Produk untuk Toko Online Fashion',
			description: 'Pemotretan produk fashion dengan gaya profesional untuk katalog online',
			budget: 800000,
			category: 'Fotografi',
			status: 'open',
			createdAt: new Date('2024-01-14'),
		},
		{
			id: 3,
			title: 'Penulisan Artikel Blog Marketing',
			description: 'Membuat konten blog SEO-friendly tentang tips bisnis online',
			budget: 300000,
			category: 'Penulisan',
			status: 'in_progress',
			createdAt: new Date('2024-01-13'),
		},
		{
			id: 4,
			title: 'Video Promosi Produk Kecantikan',
			description: 'Video iklan 30 detik untuk produk skincare dengan narasi yang menarik',
			budget: 1500000,
			category: 'Video & Animasi',
			status: 'open',
			createdAt: new Date('2024-01-12'),
		},
		{
			id: 5,
			title: 'Konsultan Social Media Marketing',
			description: 'Strategi pemasaran media sosial untuk meningkatkan engagement followers',
			budget: 500000,
			category: 'Marketing Digital',
			status: 'open',
			createdAt: new Date('2024-01-11'),
		},
	];
</script>

<div class="min-h-screen bg-gray-50">
	<!-- Hero Section -->
	<div class="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
			<div class="text-center">
				<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
					Projekan
				</h1>
				<div class="text-lg sm:text-xl lg:text-2xl mb-6">
					<p class="mb-2">Tempat nongkrongnya para pekerja lepas dan pencari proyek</p>
					<p>Mau cari kerjaan sampingan atau butuh orang buat bantuin proyekmu? Semua bisa di sini!</p>
				</div>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<a href="/register" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
						Mulai Sekarang
					</a>
					<a href="/#projects" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
						Lihat Proyek
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
		<!-- Filters -->
		<div id="projects" class="mb-6 sm:mb-8">
			<div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
				<div class="flex-1">
					<select class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
						<option value="">Semua Kategori</option>
						<option value="desain-grafis">Desain Grafis</option>
						<option value="fotografi">Fotografi</option>
						<option value="penulisan">Penulisan</option>
						<option value="video-animasi">Video & Animasi</option>
						<option value="marketing-digital">Marketing Digital</option>
					</select>
				</div>
				<div class="flex-1">
					<select class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
						<option value="">Rentang Budget</option>
						<option value="0-500000">Rp 0 - Rp 500.000</option>
						<option value="500000-1000000">Rp 500.000 - Rp 1.000.000</option>
						<option value="1000000-2000000">Rp 1.000.000 - Rp 2.000.000</option>
						<option value="2000000+">Rp 2.000.000+</option>
					</select>
				</div>
				<div class="sm:flex-shrink-0">
					<button class="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
						Terapkan Filter
					</button>
				</div>
			</div>
		</div>

		<!-- Projects Grid -->
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{#each projects as project}
				<div class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
					<div class="p-4 sm:p-6">
						<div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2">
							<h3 class="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 flex-1">
								{project.title}
							</h3>
							<span class="px-2 py-1 text-xs font-medium rounded-full self-start sm:self-auto
								{project.status === 'open' ? 'bg-green-100 text-green-800' :
								 project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
								 project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
								 'bg-gray-100 text-gray-800'}">
								{project.status.replace('_', ' ').toUpperCase()}
							</span>
						</div>

						<p class="text-gray-600 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
							{project.description}
						</p>

						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-3 sm:mb-4">
							<span class="text-xs sm:text-sm text-gray-500">{project.category}</span>
							<span class="text-base sm:text-lg font-bold text-green-600">Rp {project.budget.toLocaleString('id-ID')}</span>
						</div>

						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<span class="text-xs sm:text-sm text-gray-500">
								Posted {project.createdAt?.toLocaleDateString()}
							</span>
							<a
								href="/project/{project.id}"
								class="w-full sm:w-auto px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
							>
								Lihat Detail
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Empty State -->
		{#if projects.length === 0}
			<div class="text-center py-8 sm:py-12">
				<div class="text-gray-400 mb-4">
					<svg class="mx-auto h-10 w-10 sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
					</svg>
				</div>
				<h3 class="text-base sm:text-lg font-medium text-gray-900 mb-2">Tidak ada proyek ditemukan</h3>
				<p class="text-sm sm:text-base text-gray-500 px-4">Coba sesuaikan filter Anda atau periksa kembali nanti.</p>
			</div>
		{/if}
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
