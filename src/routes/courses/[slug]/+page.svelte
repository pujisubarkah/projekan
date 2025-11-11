<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { Course, CourseReview } from '$lib/types';

	let course: Course | null = null;
	let reviews: CourseReview[] = [];
	let loading = true;
	let activeTab = 'overview';
	let isEnrolled = false;

	// Get course slug from URL
	import { get } from 'svelte/store';
	let slug = get(page).params.slug;

	async function loadCourse() {
		if (!slug) return;

		try {
			loading = true;
			const response = await fetch(`/api/courses/${slug}`);
			const result = await response.json();

			if (result.success) {
				course = result.data;
				reviews = result.data.reviews || [];
			}
		} catch (error) {
			console.error('Error loading course:', error);
		} finally {
			loading = false;
		}
	}

	async function enrollInCourse() {
		if (!course) return;

		try {
			const response = await fetch('/api/enrollments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					courseId: course.id,
					userId: 1, // Mock user ID
				}),
			});

			const result = await response.json();

			if (result.success) {
				isEnrolled = true;
				alert('Successfully enrolled in course!');
			} else {
				alert(result.error || 'Failed to enroll');
			}
		} catch (error) {
			console.error('Error enrolling:', error);
			alert('Failed to enroll in course');
		}
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

	function getTotalLessons(modules: any[]): number {
		return modules.reduce((total, module) => total + (module.lessons?.length || 0), 0);
	}

	onMount(() => {
		loadCourse();
	});
</script>

<svelte:head>
	<title>{course?.title || 'Course'} - Projekan LMS</title>
	<meta name="description" content={course?.description || 'Learn new skills'} />
</svelte:head>

{#if loading}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
			<p class="mt-4 text-gray-600">Loading course...</p>
		</div>
	</div>
{:else if course}
	<div class="min-h-screen bg-gray-50">
		<!-- Course Header -->
		<div class="bg-white shadow">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<!-- Course Info -->
					<div class="lg:col-span-2">
						<div class="flex items-center space-x-2 mb-4">
							{#if course.category}
								<span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
									{course.category?.name}
								</span>
							{/if}
							<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm capitalize">
								{course.level}
							</span>
							{#if course.isFeatured}
								<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
									Featured
								</span>
							{/if}
						</div>

						<h1 class="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>

						{#if course.shortDescription}
							<p class="text-lg text-gray-600 mb-6">{course.shortDescription}</p>
						{/if}

						<div class="flex items-center space-x-6 mb-6">
							<div class="flex items-center">
								<div class="flex text-yellow-400">
									{#each Array(5) as _, i}
										<svg class="w-5 h-5 {i < Math.floor(course.rating) ? 'fill-current' : 'text-gray-300'}" viewBox="0 0 24 24">
											<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
										</svg>
									{/each}
								</div>
								<span class="ml-2 text-gray-600">
									{course.rating.toFixed(1)} ({course.reviewCount} reviews)
								</span>
							</div>

							<div class="text-gray-600">
								{course.enrollmentCount} students enrolled
							</div>
						</div>

						<div class="flex items-center space-x-4">
							<div class="flex items-center">
								{#if course.instructor?.avatar}
									<img
										src={course.instructor.avatar}
										alt={course.instructor?.name || 'Instructor'}
										class="w-10 h-10 rounded-full mr-3"
									/>
								{:else}
									<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
										<span class="text-gray-600 font-medium">
											{course.instructor?.name?.charAt(0).toUpperCase() || '?'}
										</span>
									</div>
								{/if}
								<div>
									<p class="font-medium text-gray-900">Created by {course.instructor?.name || 'Unknown Instructor'}</p>
									<p class="text-sm text-gray-600">Instructor</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Enrollment Card -->
					<div class="lg:col-span-1">
						<div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
							{#if course.thumbnailUrl}
								<img
									src={course.thumbnailUrl}
									alt={course.title}
									class="w-full aspect-video object-cover rounded-lg mb-4"
								/>
							{/if}

							<div class="mb-4">
								{#if course.isFree}
									<div class="text-3xl font-bold text-green-600 mb-2">Free</div>
								{:else}
									<div class="text-3xl font-bold text-gray-900 mb-2">
										{formatPrice(course.price)}
									</div>
									{#if course.originalPrice && course.originalPrice > course.price}
										<div class="text-lg text-gray-500 line-through">
											{formatPrice(course.originalPrice)}
										</div>
									{/if}
								{/if}
							</div>

							{#if isEnrolled}
								<button
									class="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors mb-4"
									disabled
								>
									Enrolled ✓
								</button>
							{:else}
								<button
									on:click={enrollInCourse}
									class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
								>
									{course.isFree ? 'Enroll for Free' : 'Enroll Now'}
								</button>
							{/if}

							<div class="space-y-3 text-sm">
								<div class="flex justify-between">
									<span class="text-gray-600">Duration:</span>
									<span class="font-medium">{formatDuration(course.duration)}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Lessons:</span>
									<span class="font-medium">{getTotalLessons(course.modules || [])}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Language:</span>
									<span class="font-medium capitalize">{course.language}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-gray-600">Level:</span>
									<span class="font-medium capitalize">{course.level}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Course Content -->
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Main Content -->
				<div class="lg:col-span-2">
					<!-- Tabs -->
					<div class="bg-white rounded-lg shadow mb-6">
						<div class="border-b border-gray-200">
							<nav class="flex">
								<button
									on:click={() => activeTab = 'overview'}
									class="px-6 py-3 text-sm font-medium border-b-2 {activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
								>
									Overview
								</button>
								<button
									on:click={() => activeTab = 'curriculum'}
									class="px-6 py-3 text-sm font-medium border-b-2 {activeTab === 'curriculum' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
								>
									Curriculum
								</button>
								<button
									on:click={() => activeTab = 'reviews'}
									class="px-6 py-3 text-sm font-medium border-b-2 {activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}"
								>
									Reviews ({course.reviewCount})
								</button>
							</nav>
						</div>

						<div class="p-6">
							{#if activeTab === 'overview'}
								<div class="prose max-w-none">
									<h3 class="text-lg font-semibold mb-4">About This Course</h3>
									<div class="text-gray-700 whitespace-pre-line mb-6">
										{course.description}
									</div>

									{#if course.learningObjectives && course.learningObjectives.length > 0}
										<h4 class="text-lg font-semibold mb-3">What You'll Learn</h4>
										<ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
											{#each course.learningObjectives as objective}
												<li>{objective}</li>
											{/each}
										</ul>
									{/if}

									{#if course.prerequisites}
										<h4 class="text-lg font-semibold mb-3">Prerequisites</h4>
										<p class="text-gray-700">{course.prerequisites}</p>
									{/if}
								</div>
							{:else if activeTab === 'curriculum'}
								<div>
									<h3 class="text-lg font-semibold mb-4">Course Curriculum</h3>
									<div class="space-y-4">
										{#each course.modules || [] as module, moduleIndex}
											<div class="border border-gray-200 rounded-lg">
												<div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
													<h4 class="font-medium text-gray-900">
														{module.title}
													</h4>
													{#if module.description}
														<p class="text-sm text-gray-600 mt-1">{module.description}</p>
													{/if}
												</div>
												<div class="divide-y divide-gray-200">
													{#each module.lessons || [] as lesson, lessonIndex}
														<div class="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
															<div class="flex items-center">
																<div class="flex-shrink-0 mr-3">
																	{#if lesson.type === 'video'}
																		<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
																			<path d="M8 5v14l11-7z"/>
																		</svg>
																	{:else if lesson.type === 'quiz'}
																		<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
																			<path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
																		</svg>
																	{:else}
																		<svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
																			<path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
																		</svg>
																	{/if}
																</div>
																<div>
																	<h5 class="text-sm font-medium text-gray-900">
																		{lesson.title}
																	</h5>
																	{#if lesson.description}
																		<p class="text-xs text-gray-600 mt-1">{lesson.description}</p>
																	{/if}
																</div>
															</div>
															<div class="text-sm text-gray-500">
																{lesson.type === 'video' ? formatDuration(lesson.duration) : 'Quiz'}
															</div>
														</div>
													{/each}
												</div>
											</div>
										{/each}
									</div>
								</div>
							{:else if activeTab === 'reviews'}
								<div>
									<h3 class="text-lg font-semibold mb-4">Student Reviews</h3>
									{#if reviews.length === 0}
										<p class="text-gray-600">No reviews yet.</p>
									{:else}
										<div class="space-y-6">
											{#each reviews as review}
												<div class="border-b border-gray-200 pb-6 last:border-b-0 flex">
													{#if review.student?.avatar}
														<img
															src={review.student.avatar}
															alt={review.student?.name || 'Student'}
															class="w-10 h-10 rounded-full mr-4"
														/>
													{:else}
														<div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
															<span class="text-gray-600 font-medium">
																{review.student?.name?.charAt(0).toUpperCase() || '?'}
															</span>
														</div>
													{/if}
													<div class="flex-1">
														<div class="flex items-center mb-2">
															<h5 class="font-medium text-gray-900 mr-3">
																{review.student?.name || 'Anonymous Student'}
															</h5>
															<div class="flex text-yellow-400">
																{#each Array(5) as _, i}
																	<svg class="w-4 h-4 {i < review.rating ? 'fill-current' : 'text-gray-300'}" viewBox="0 0 24 24">
																		<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
																	</svg>
																{/each}
															</div>
														</div>
														{#if review.review}
															<p class="text-gray-700">{review.review}</p>
														{/if}
														{#if review.isVerified}
															<div class="flex items-center mt-2">
																<svg class="w-4 h-4 text-green-500 mr-1" fill="currentColor" viewBox="0 0 24 24">
																	<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 12 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
																</svg>
																<span class="text-sm text-green-600">Verified completion</span>
															</div>
														{/if}
													</div>
												</div>
											{/each}
										</div>
									{/if}
								</div>
							{/if}
						</div>
					</div>
				</div>

				<!-- Sidebar -->
				<div class="lg:col-span-1">
					<!-- Instructor Info -->
					{#if course.instructor}
						<div class="bg-white rounded-lg shadow mb-6 p-6">
							<h3 class="text-lg font-semibold text-gray-900 mb-4">About the Instructor</h3>
							<div class="flex items-start">
								{#if course.instructor?.avatar}
									<img
										src={course.instructor.avatar}
										alt={course.instructor?.name || 'Instructor'}
										class="w-16 h-16 rounded-full mr-4"
									/>
								{:else}
									<div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-4">
										<span class="text-gray-600 font-medium text-xl">
											{course.instructor?.name?.charAt(0).toUpperCase() || '?'}
										</span>
									</div>
								{/if}
								<div>
									<h4 class="font-medium text-gray-900">{course.instructor?.name || 'Unknown Instructor'}</h4>
									<p class="text-sm text-gray-600 mt-1">{course.instructor?.bio || 'Experienced instructor'}</p>
								</div>
							</div>
						</div>
					{/if}
					<div class="bg-white rounded-lg shadow p-6">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">Course Stats</h3>
						<div class="space-y-4">
							<div class="flex justify-between">
								<span class="text-gray-600">Students</span>
								<span class="font-medium">{course.enrollmentCount}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Rating</span>
								<span class="font-medium">{course.rating.toFixed(1)} ⭐</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Reviews</span>
								<span class="font-medium">{course.reviewCount}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Language</span>
								<span class="font-medium capitalize">{course.language}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-gray-600">Last Updated</span>
								<span class="font-medium">
									{course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'N/A'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-gray-50 flex items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
			<p class="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
			<a href="/courses" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
				Browse Courses
			</a>
		</div>
	</div>
{/if}