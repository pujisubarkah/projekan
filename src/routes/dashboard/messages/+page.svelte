<script lang="ts">
	import { onMount } from 'svelte';

	let messages = [
		{
			id: 1,
			from: 'Sarah Johnson',
			subject: 'Project Proposal for E-commerce Website',
			preview: 'Hi! I\'m interested in your e-commerce project. I have extensive experience...',
			date: new Date('2024-01-16'),
			unread: true,
			avatar: null
		},
		{
			id: 2,
			from: 'Mike Chen',
			subject: 'Mobile App Development Update',
			preview: 'The mobile app development is progressing well. Here\'s the latest update...',
			date: new Date('2024-01-15'),
			unread: false,
			avatar: null
		},
		{
			id: 3,
			from: 'Projekan Support',
			subject: 'Welcome to Projekan!',
			preview: 'Thank you for joining Projekan. Here are some tips to get started...',
			date: new Date('2024-01-10'),
			unread: false,
			avatar: null
		}
	];

	let selectedMessage = null;

	function selectMessage(message) {
		selectedMessage = message;
		message.unread = false;
	}
</script>

<svelte:head>
	<title>Messages - Projekan</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
	<!-- Page Header -->
	<div class="mb-6 sm:mb-8">
		<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Messages</h1>
		<p class="mt-2 text-gray-600">Communicate with freelancers and clients</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Messages List -->
		<div class="lg:col-span-1">
			<div class="bg-white rounded-lg shadow-sm border border-gray-200">
				<div class="p-4 border-b border-gray-200">
					<h2 class="text-lg font-semibold text-gray-900">Inbox</h2>
					<p class="text-sm text-gray-600">{messages.filter(m => m.unread).length} unread messages</p>
				</div>

				<div class="divide-y divide-gray-200 max-h-96 overflow-y-auto">
					{#each messages as message}
						<button
							type="button"
							class="w-full text-left p-4 cursor-pointer hover:bg-gray-50 transition-colors {selectedMessage?.id === message.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''}"
							on:click={() => selectMessage(message)}
							tabindex="0"
						>
							<div class="flex items-start gap-3">
								{#if message.avatar}
									<img
										src={message.avatar}
										alt={message.from}
										class="w-10 h-10 rounded-full"
									/>
								{:else}
									<div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
										<span class="text-blue-600 font-medium text-sm">
											{message.from.charAt(0).toUpperCase()}
										</span>
									</div>
								{/if}

								<div class="flex-1 min-w-0">
									<div class="flex items-center justify-between mb-1">
										<h3 class="text-sm font-medium text-gray-900 truncate">
											{message.from}
										</h3>
										{#if message.unread}
											<div class="w-2 h-2 bg-blue-600 rounded-full"></div>
										{/if}
									</div>
									<h4 class="text-sm font-medium text-gray-900 mb-1 truncate {message.unread ? 'font-semibold' : ''}">
										{message.subject}
									</h4>
									<p class="text-xs text-gray-600 truncate">
										{message.preview}
									</p>
									<p class="text-xs text-gray-500 mt-1">
										{message.date.toLocaleDateString()}
									</p>
								</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Message Content -->
		<div class="lg:col-span-2">
			<div class="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96">
				{#if selectedMessage}
					<div class="p-6">
						<div class="border-b border-gray-200 pb-4 mb-4">
							<div class="flex items-center gap-3 mb-2">
								{#if selectedMessage.avatar}
									<img
										src={selectedMessage.avatar}
										alt={selectedMessage.from}
										class="w-12 h-12 rounded-full"
									/>
								{:else}
									<div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
										<span class="text-blue-600 font-medium">
											{selectedMessage.from.charAt(0).toUpperCase()}
										</span>
									</div>
								{/if}
								<div>
									<h2 class="text-lg font-semibold text-gray-900">{selectedMessage.from}</h2>
									<p class="text-sm text-gray-600">{selectedMessage.date.toLocaleDateString()}</p>
								</div>
							</div>
							<h3 class="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h3>
						</div>

						<div class="prose max-w-none">
							<p class="text-gray-700">
								{selectedMessage.preview}
							</p>
							<p class="text-gray-700 mt-4">
								This is a sample message content. In a real application, this would contain the full message body with proper formatting and attachments.
							</p>
							<p class="text-gray-700 mt-4">
								Best regards,<br>
								{selectedMessage.from}
							</p>
						</div>

						<div class="mt-6 pt-4 border-t border-gray-200">
							<div class="flex gap-4">
								<button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
									Reply
								</button>
								<button class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
									Forward
								</button>
								<button class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
									Delete
								</button>
							</div>
						</div>
					</div>
				{:else}
					<div class="flex items-center justify-center h-96">
						<div class="text-center">
							<div class="text-gray-400 mb-4">
								<svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
								</svg>
							</div>
							<h3 class="text-lg font-medium text-gray-900 mb-2">Select a message</h3>
							<p class="text-gray-600">Choose a message from the list to view its content</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>