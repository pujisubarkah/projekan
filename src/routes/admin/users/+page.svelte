<script lang="ts">
	import { onMount } from 'svelte';

	let users = [];
	let searchTerm = '';
	let selectedRole = 'all';
	let currentPage = 1;
	const itemsPerPage = 10;

	$: filteredUsers = users.filter(user => {
		const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
							 user.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesRole = selectedRole === 'all' || user.role === selectedRole;
		return matchesSearch && matchesRole;
	});

	$: totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
	$: startIndex = (currentPage - 1) * itemsPerPage;
	$: endIndex = startIndex + itemsPerPage;
	$: currentUsers = filteredUsers.slice(startIndex, endIndex);

	onMount(async () => {
		try {
			const response = await fetch('/api/users');
			const result = await response.json();

			if (result.success) {
				users = result.data.map(user => ({
					...user,
					status: user.isVerified ? 'active' : 'inactive',
					role: user.role?.name || 'client',
					joinedAt: new Date(user.createdAt),
					projects: 0, // TODO: Calculate from projects table
				}));
			} else {
				console.error('Failed to fetch users:', result.error);
			}
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	});

	function toggleUserStatus(userId: number) {
		const user = users.find(u => u.id === userId);
		if (user) {
			user.status = user.status === 'active' ? 'inactive' : 'active';
			users = [...users]; // Trigger reactivity
		}
	}

	function suspendUser(userId: number) {
		const user = users.find(u => u.id === userId);
		if (user) {
			user.status = 'suspended';
			users = [...users];
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
			<h1 class="text-2xl font-bold text-gray-900">Manajemen Users</h1>
			<p class="text-gray-600">Kelola semua pengguna platform Projekan</p>
		</div>
		<button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
			Tambah User
		</button>
	</div>

	<!-- Filters -->
	<div class="bg-white rounded-lg shadow p-6">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
			<div>
				<label for="search-user" class="block text-sm font-medium text-gray-700 mb-2">Cari User</label>
				<input
					id="search-user"
					type="text"
					bind:value={searchTerm}
					placeholder="Nama atau email..."
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
			</div>
			<div>
				<label for="role-filter" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
				<select
					id="role-filter"
					bind:value={selectedRole}
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<option value="all">Semua Role</option>
					<option value="admin">Admin</option>
					<option value="client">Client</option>
					<option value="freelancer">Freelancer</option>
				</select>
			</div>
			<div>
				<label for="status-filter" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
				<select id="status-filter" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
					<option value="all">Semua Status</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
					<option value="suspended">Suspended</option>
				</select>
			</div>
		</div>
	</div>

	<!-- Users Table -->
	<div class="bg-white rounded-lg shadow overflow-hidden">
		<div class="px-6 py-4 border-b border-gray-200">
			<h3 class="text-lg font-medium text-gray-900">Daftar Users ({filteredUsers.length})</h3>
		</div>

		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
						<th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
					</tr>
				</thead>
				<tbody class="bg-white divide-y divide-gray-200">
					{#each currentUsers as user}
						<tr>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									{#if user.avatarUrl}
										<img src={user.avatarUrl} alt={user.name} class="w-10 h-10 rounded-full object-cover">
									{:else}
										<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
											<span class="text-gray-600 font-medium">{user.name.charAt(0)}</span>
										</div>
									{/if}
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">{user.name}</div>
										<div class="text-sm text-gray-500">{user.email}</div>
										{#if user.location}
											<div class="text-xs text-gray-400">{user.location}</div>
										{/if}
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
									{user.role === 'freelancer' ? 'bg-blue-100 text-blue-800' :
									 user.role === 'client' ? 'bg-green-100 text-green-800' :
									 'bg-red-100 text-red-800'}">
									{user.role?.label || user.role}
								</span>
								{#if user.rating && user.rating > 0}
									<div class="text-xs text-gray-500 mt-1">⭐ {user.rating.toFixed(1)}</div>
								{/if}
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span class="inline-flex px-2 py-1 text-xs font-medium rounded-full
									{user.status === 'active' ? 'bg-green-100 text-green-800' :
									 user.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
									 'bg-red-100 text-red-800'}">
									{user.status}
								</span>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
								{user.projects}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
								{user.joinedAt.toLocaleDateString('id-ID')}
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
								<button
									on:click={() => toggleUserStatus(user.id)}
									class="text-blue-600 hover:text-blue-900"
								>
									{user.status === 'active' ? 'Deactivate' : 'Activate'}
								</button>
								{#if user.status !== 'suspended'}
									<button
										on:click={() => suspendUser(user.id)}
										class="text-red-600 hover:text-red-900"
									>
										Suspend
									</button>
								{/if}
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
					Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredUsers.length)} dari {filteredUsers.length} users
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