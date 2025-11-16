<script lang="ts">
	import { onMount } from 'svelte';

	let user = {
		name: 'John Smith',
		email: 'john@example.com',
		bio: 'Experienced project manager with 5+ years in tech industry.',
		location: 'Jakarta, Indonesia',
		website: 'https://example.com',
		skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership'],
		avatar: null
	};

	let isEditing = false;
	let formData = { ...user };

	function toggleEdit() {
		isEditing = !isEditing;
		if (!isEditing) {
			formData = { ...user };
		}
	}

	function saveProfile() {
		user = { ...formData };
		isEditing = false;
		// In production, save to API
	}
</script>

<svelte:head>
	<title>Profile - Projekan</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
			<div>
				<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
				<p class="mt-2 text-gray-600">Manage your personal information and preferences</p>
			</div>
			{#if !isEditing}
				<button
					on:click={toggleEdit}
					class="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
				>
					Edit Profile
				</button>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Profile Card -->
		<div class="lg:col-span-1">
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<div class="text-center">
					{#if user.avatar}
						<img
							src={user.avatar}
							alt={user.name}
							class="w-24 h-24 rounded-full mx-auto mb-4"
						/>
					{:else}
						<div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
							<span class="text-blue-600 font-bold text-2xl">
								{user.name.charAt(0).toUpperCase()}
							</span>
						</div>
					{/if}

					<h2 class="text-xl font-semibold text-gray-900 mb-1">{user.name}</h2>
					<p class="text-gray-600 mb-4">{user.email}</p>

					{#if user.location}
						<div class="flex items-center justify-center text-gray-600 text-sm mb-2">
							<svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
							</svg>
							{user.location}
						</div>
					{/if}

					{#if user.website}
						<a href={user.website} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-sm">
							{user.website}
						</a>
					{/if}
				</div>
			</div>
		</div>

		<!-- Profile Details -->
		<div class="lg:col-span-2">
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				{#if isEditing}
					<!-- Edit Form -->
					<form on:submit|preventDefault={saveProfile} class="space-y-6">
						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="name" class="block text-sm font-medium text-gray-700 mb-2">
									Full Name
								</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>

							<div>
								<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
									Email
								</label>
								<input
									type="email"
									id="email"
									bind:value={formData.email}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
						</div>

						<div>
							<label for="bio" class="block text-sm font-medium text-gray-700 mb-2">
								Bio
							</label>
							<textarea
								id="bio"
								bind:value={formData.bio}
								rows="4"
								class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								placeholder="Tell us about yourself..."
							></textarea>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label for="location" class="block text-sm font-medium text-gray-700 mb-2">
									Location
								</label>
								<input
									type="text"
									id="location"
									bind:value={formData.location}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									placeholder="City, Country"
								/>
							</div>

							<div>
								<label for="website" class="block text-sm font-medium text-gray-700 mb-2">
									Website
								</label>
								<input
									type="url"
									id="website"
									bind:value={formData.website}
									class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									placeholder="https://example.com"
								/>
							</div>
						</div>

						<div class="flex gap-4">
							<button
								type="submit"
								class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
							>
								Save Changes
							</button>
							<button
								type="button"
								on:click={toggleEdit}
								class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
							>
								Cancel
							</button>
						</div>
					</form>
				{:else}
					<!-- View Mode -->
					<div class="space-y-6">
						<div>
							<h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
							<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label for="view-name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
									<p id="view-name" class="text-gray-900">{user.name}</p>
								</div>
								<div>
									<div role="group" aria-labelledby="email-label">
										<label for="view-email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
										<p id="view-email" class="text-gray-900">{user.email}</p>
									</div>
								</div>
								<div>
									<label for="view-location" class="block text-sm font-medium text-gray-700 mb-1">Location</label>
									<p id="view-location" class="text-gray-900">{user.location || 'Not specified'}</p>
								</div>
								<div>
									<label for="view-website" class="block text-sm font-medium text-gray-700 mb-1">Website</label>
									<p id="view-website" class="text-gray-900">
										{#if user.website}
											<a href={user.website} target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
												{user.website}
											</a>
										{:else}
											Not specified
										{/if}
									</p>
								</div>
							</div>
						</div>

						<div>
							<label for="view-bio" class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
							<p id="view-bio" class="text-gray-900">{user.bio || 'No bio added yet.'}</p>
						</div>

						<div>
							<h4 class="block text-sm font-medium text-gray-700 mb-3">Skills</h4>
							<div class="flex flex-wrap gap-2">
								{#each user.skills as skill}
									<span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
										{skill}
									</span>
								{/each}
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>