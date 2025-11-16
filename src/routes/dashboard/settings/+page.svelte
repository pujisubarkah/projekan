<script lang="ts">
	let settings = {
		emailNotifications: true,
		projectUpdates: true,
		bidNotifications: true,
		marketingEmails: false,
		twoFactorAuth: false,
		theme: 'light'
	};

	function saveSettings() {
		// In production, save to API
		alert('Settings saved successfully!');
	}
</script>

<svelte:head>
	<title>Settings - Projekan</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
		<p class="mt-2 text-gray-600">Manage your account preferences and settings</p>
	</div>

	<div class="space-y-6">
		<!-- Notification Settings -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<label for="emailNotifications" class="text-sm font-medium text-gray-700">Email Notifications</label>
						<p class="text-sm text-gray-600">Receive email notifications for important updates</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input id="emailNotifications" type="checkbox" class="sr-only peer" bind:checked={settings.emailNotifications}>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</label>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<label for="projectUpdates" class="text-sm font-medium text-gray-700">Project Updates</label>
						<p class="text-sm text-gray-600">Get notified when projects are updated</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input id="projectUpdates" type="checkbox" class="sr-only peer" bind:checked={settings.projectUpdates}>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</label>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<label for="bidNotifications" class="text-sm font-medium text-gray-700">Bid Notifications</label>
						<p class="text-sm text-gray-600">Receive notifications for new bids on your projects</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input id="bidNotifications" type="checkbox" class="sr-only peer" bind:checked={settings.bidNotifications}>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</label>
				</div>

				<div class="flex items-center justify-between">
					<div>
						<label for="marketingEmails" class="text-sm font-medium text-gray-700">Marketing Emails</label>
						<p class="text-sm text-gray-600">Receive promotional emails and newsletters</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input id="marketingEmails" type="checkbox" class="sr-only peer" bind:checked={settings.marketingEmails}>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</label>
				</div>
			</div>
		</div>

		<!-- Security Settings -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Security</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between">
					<div>
						<label for="twoFactorAuth" class="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
						<p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
					</div>
					<label class="relative inline-flex items-center cursor-pointer">
						<input id="twoFactorAuth" type="checkbox" class="sr-only peer" bind:checked={settings.twoFactorAuth}>
						<div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
					</label>
				</div>

				<div class="pt-4 border-t border-gray-200">
					<button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
						Change Password
					</button>
				</div>
			</div>
		</div>

		<!-- Appearance Settings -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Appearance</h2>
			<div class="space-y-4">
				<div>
					<label for="theme-select" class="block text-sm font-medium text-gray-700 mb-2">Theme</label>
					<select
						id="theme-select"
						bind:value={settings.theme}
						class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						<option value="auto">Auto (System)</option>
					</select>
				</div>
			</div>
		</div>

		<!-- Account Actions -->
		<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<h2 class="text-lg font-semibold text-gray-900 mb-4">Account Actions</h2>
			<div class="space-y-4">
				<div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
					<div>
						<h3 class="text-sm font-medium text-gray-900">Export Data</h3>
						<p class="text-sm text-gray-600">Download a copy of your data</p>
					</div>
					<button class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
						Export
					</button>
				</div>

				<div class="flex items-center justify-between p-4 border border-red-200 rounded-lg">
					<div>
						<h3 class="text-sm font-medium text-red-900">Delete Account</h3>
						<p class="text-sm text-red-600">Permanently delete your account and all data</p>
					</div>
					<button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm">
						Delete
					</button>
				</div>
			</div>
		</div>

		<!-- Save Button -->
		<div class="flex justify-end">
			<button
				on:click={saveSettings}
				class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
			>
				Save Settings
			</button>
		</div>
	</div>
</div>