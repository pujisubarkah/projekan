<script lang="ts">
	import { onMount } from 'svelte';
	import type { Course, CourseCategory } from '$lib/types';

	let courses: Course[] = [];
	let categories: CourseCategory[] = [];
	let loading = true;
	let searchQuery = '';
	let selectedCategory = '';
	let selectedLevel = '';
	let showFreeOnly = false;
	let currentPage = 1;
	let totalPages = 1;

	// Filter options
	const levels = ['beginner', 'intermediate', 'advanced'];

	async function loadCourses() {
		try {
			loading = true;
			const params = new URLSearchParams({
				page: currentPage.toString(),
				limit: '12',
			});

			if (searchQuery) params.set('search', searchQuery);
			if (selectedCategory) params.set('category', selectedCategory);
			if (selectedLevel) params.set('level', selectedLevel);
			if (showFreeOnly) params.set('free', 'true');

			const response = await fetch(`/api/courses?${params}`);
			const result = await response.json();

			if (result.success) {
				courses = result.data;
				totalPages = result.pagination.totalPages;
			}
		} catch (error) {
			console.error('Error loading courses:', error);
		} finally {
			loading = false;
		}
	}

	async function loadCategories() {
		try {
			// Mock categories for now
			categories = [
				{ id: 1, name: 'Web Development', slug: 'web-development' },
				{ id: 2, name: 'Mobile Development', slug: 'mobile-development' },
				{ id: 3, name: 'UI/UX Design', slug: 'ui-ux-design' },
				{ id: 4, name: 'Digital Marketing', slug: 'digital-marketing' },
				{ id: 5, name: 'Data Science', slug: 'data-science' },
			];
		} catch (error) {
			console.error('Error loading categories:', error);
		}
	}

	function handleSearch() {
		currentPage = 1;
		loadCourses();
	}

	function changePage(page: number) {
		currentPage = page;
		loadCourses();
	}

	function formatPrice(price: number): string {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
		}).format(price);
	}

	function formatDuration(minutes: number): string {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		if (hours > 0) {
			return `${hours}h ${mins}m`;
		}
		return `${mins}m`;
	}

	onMount(() => {
		loadCategories();
		loadCourses();
	});
</script>

<svelte:head>
	<title>Courses - Projekan LMS</title>
	<meta name="description" content="Learn new skills with our comprehensive course library" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="bg-white shadow">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="text-center">
				<h1 class="text-3xl font-bold text-gray-900">Courses</h1>
				<p class="mt-2 text-gray-600">Expand your skills with our expert-led courses</p>
			</div>
		</div>
	</div>

	<!-- Search and Filters -->
	<div class="bg-white border-b">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex flex-col lg:flex-row gap-4">
				<!-- Search -->
				<div class="flex-1">
					<div class="relative">
						<input
							type="text"
							placeholder="Search courses..."
							bind:value={searchQuery}
							on:keydown={(e) => e.key === 'Enter' && handleSearch()}
							class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
							</svg>
						</div>
					</div>
				</div>

				<!-- Filters -->
				<div class="flex flex-wrap gap-2">
					<select
						bind:value={selectedCategory}
						on:change={handleSearch}
						class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">All Categories</option>
						{#each categories as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>

					<select
						bind:value={selectedLevel}
						on:change={handleSearch}
						class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="">All Levels</option>
						{#each levels as level}
							<option value={level}>{level.charAt(0).toUpperCase() + level.slice(1)}</option>
						{/each}
					</select>

					<label class="flex items-center">
						<input
							type="checkbox"
							bind:checked={showFreeOnly}
							on:change={handleSearch}
							class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
						/>
						<span class="ml-2 text-sm text-gray-700">Free only</span>
					</label>
				</div>
			</div>
		</div>
	</div>

	<!-- Course Grid -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{#if loading}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each Array(8) as _}
					<div class="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
						<div class="h-48 bg-gray-300"></div>
						<div class="p-4">
							<div class="h-4 bg-gray-300 rounded mb-2"></div>
							<div class="h-3 bg-gray-300 rounded mb-2"></div>
							<div class="h-3 bg-gray-300 rounded w-2/3"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if courses.length === 0}
			<div class="text-center py-12">
				<div class="text-gray-400 mb-4">
					<svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
					</svg>
				</div>
				<h3 class="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
				<p class="text-gray-500">Try adjusting your search or filters</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{#each courses as course}
					<div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
						<a href="/courses/{course.slug}" class="block">
							<div class="aspect-video bg-gray-200 relative">
								{#if course.thumbnailUrl}
									<img
										src={course.thumbnailUrl}
										alt={course.title}
										class="w-full h-full object-cover"
									/>
								{:else}
									<div class="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
										<span class="text-white text-lg font-semibold">📚</span>
									</div>
								{/if}
								{#if course.isFeatured}
									<div class="absolute top-2 left-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
										Featured
									</div>
								{/if}
							</div>
						</a>

						<div class="p-4">
							<a href="/courses/{course.slug}" class="block">
								<h3 class="font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-blue-600 transition-colors">
									{course.title}
								</h3>
							</a>

							<p class="text-sm text-gray-600 mb-2">
								by {course.instructor?.name || 'Unknown Instructor'}
							</p>

							<div class="flex items-center justify-between mb-3">
								<div class="flex items-center">
									<div class="flex text-yellow-400">
										{#each Array(5) as _, i}
											<svg class="w-4 h-4 {i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}" viewBox="0 0 24 24">
												<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
											</svg>
										{/each}
									</div>
									<span class="text-sm text-gray-600 ml-1">
										({course.reviewCount})
									</span>
								</div>

								<span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
									{course.level}
								</span>
							</div>

							<div class="flex items-center justify-between">
								<div class="text-sm text-gray-600">
									{formatDuration(course.duration)}
								</div>

								<div class="text-right">
									{#if course.isFree}
										<div class="text-lg font-bold text-green-600">Free</div>
									{:else}
										<div class="text-lg font-bold text-gray-900">
											{formatPrice(course.price)}
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Pagination -->
			{#if totalPages > 1}
				<div class="flex justify-center mt-8">
					<div class="flex space-x-2">
						<button
							on:click={() => changePage(currentPage - 1)}
							disabled={currentPage === 1}
							class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>

						{#each Array(totalPages) as _, i}
							<button
								on:click={() => changePage(i + 1)}
								class="px-3 py-2 border rounded-md {currentPage === i + 1 ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}"
							>
								{i + 1}
							</button>
						{/each}

						<button
							on:click={() => changePage(currentPage + 1)}
							disabled={currentPage === totalPages}
							class="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			{/if}
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
</style>