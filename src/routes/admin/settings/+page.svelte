<script lang="ts">
	import { onMount } from 'svelte';

	let settings = {
		siteName: 'Projekan',
		siteDescription: 'Platform marketplace freelancer Indonesia',
		contactEmail: 'admin@projekan.com',
		maintenanceMode: false,
		allowRegistration: true,
		emailNotifications: true,
		maxFileSize: 10,
		commissionRate: 5,
		currency: 'IDR',
		timezone: 'Asia/Jakarta'
	};

	let saving = false;

	async function saveSettings() {
		saving = true;
		// Simulate API call
		await new Promise(resolve => setTimeout(resolve, 1000));
		saving = false;
		alert('Pengaturan berhasil disimpan!');
	}

	function resetToDefaults() {
		if (confirm('Apakah Anda yakin ingin mereset semua pengaturan ke default?')) {
			settings = {
				siteName: 'Projekan',
				siteDescription: 'Platform marketplace freelancer Indonesia',
				contactEmail: 'admin@projekan.com',
				maintenanceMode: false,
				allowRegistration: true,
				emailNotifications: true,
				maxFileSize: 10,
				commissionRate: 5,
				currency: 'IDR',
				timezone: 'Asia/Jakarta'
			};
		}
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold text-gray-900">Pengaturan Sistem</h1>
			<p class="text-gray-600">Kelola konfigurasi dan pengaturan platform Projekan</p>
		</div>
		<div class="flex space-x-2">
			<button
				on:click={resetToDefaults}
				class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
			>
				Reset to Default
			</button>
			<button
				on:click={saveSettings}
				disabled={saving}
				class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
			>
				{saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
			</button>
		</div>
	</div>

	<!-- General Settings -->
	<div class="bg-white rounded-lg shadow">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Pengaturan Umum</h3>
		</div>
		<div class="p-6 space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="siteName" class="block text-sm font-medium text-gray-700 mb-2">Nama Situs</label>
					<input
						id="siteName"
						type="text"
						bind:value={settings.siteName}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
				</div>
				<div>
					<label for="contactEmail" class="block text-sm font-medium text-gray-700 mb-2">Email Kontak</label>
					<input
						id="contactEmail"
						type="email"
						bind:value={settings.contactEmail}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
				</div>
			</div>
			<div>
				<label for="siteDescription" class="block text-sm font-medium text-gray-700 mb-2">Deskripsi Situs</label>
				<textarea
					id="siteDescription"
					bind:value={settings.siteDescription}
					rows="3"
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				></textarea>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="timezone" class="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
					<select
						id="timezone"
						bind:value={settings.timezone}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
						<option value="Asia/Makassar">Asia/Makassar (WITA)</option>
						<option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
					</select>
				</div>
				<div>
					<label for="currency" class="block text-sm font-medium text-gray-700 mb-2">Mata Uang</label>
					<select
						id="currency"
						bind:value={settings.currency}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="IDR">IDR (Rupiah)</option>
						<option value="USD">USD (Dollar)</option>
					</select>
				</div>
			</div>
		</div>
	</div>

	<!-- System Settings -->
	<div class="bg-white rounded-lg shadow">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Pengaturan Sistem</h3>
		</div>
		<div class="p-6 space-y-6">
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-sm font-medium text-gray-900">Mode Maintenance</h4>
					<p class="text-sm text-gray-500">Nonaktifkan situs untuk maintenance</p>
				</div>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						bind:checked={settings.maintenanceMode}
						class="sr-only peer"
					>
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
				</label>
			</div>

			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-sm font-medium text-gray-900">Izinkan Registrasi</h4>
					<p class="text-sm text-gray-500">Pengguna baru dapat mendaftar</p>
				</div>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						bind:checked={settings.allowRegistration}
						class="sr-only peer"
					>
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
				</label>
			</div>

			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-sm font-medium text-gray-900">Email Notifications</h4>
					<p class="text-sm text-gray-500">Kirim notifikasi email ke pengguna</p>
				</div>
				<label class="relative inline-flex items-center cursor-pointer">
					<input
						type="checkbox"
						bind:checked={settings.emailNotifications}
						class="sr-only peer"
					>
					<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
				</label>
			</div>
		</div>
	</div>

	<!-- Business Settings -->
	<div class="bg-white rounded-lg shadow">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Pengaturan Bisnis</h3>
		</div>
		<div class="p-6 space-y-6">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label for="commissionRate" class="block text-sm font-medium text-gray-700 mb-2">Komisi Platform (%)</label>
					<input
						id="commissionRate"
						type="number"
						min="0"
						max="100"
						bind:value={settings.commissionRate}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
					<p class="text-xs text-gray-500 mt-1">Persentase komisi yang diambil dari setiap transaksi</p>
				</div>
				<div>
					<label for="maxFileSize" class="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
					<input
						id="maxFileSize"
						type="number"
						min="1"
						max="100"
						bind:value={settings.maxFileSize}
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
					<p class="text-xs text-gray-500 mt-1">Ukuran maksimal file yang dapat diupload</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Danger Zone -->
	<div class="bg-white rounded-lg shadow border-l-4 border-red-500">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-red-900">Danger Zone</h3>
		</div>
		<div class="p-6 space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-sm font-medium text-gray-900">Reset Database</h4>
					<p class="text-sm text-gray-500">Hapus semua data dan reset ke kondisi awal</p>
				</div>
				<button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
					Reset Database
				</button>
			</div>
			<div class="flex items-center justify-between">
				<div>
					<h4 class="text-sm font-medium text-gray-900">Export Data</h4>
					<p class="text-sm text-gray-500">Download semua data dalam format JSON</p>
				</div>
				<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
					Export Data
				</button>
			</div>
		</div>
	</div>
</div>