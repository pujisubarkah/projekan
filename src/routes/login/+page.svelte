<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';
	let isLoading = false;
	let error = '';

	onMount(() => {
		// Check if user is already logged in
		const token = localStorage.getItem('token');
		if (token) {
			goto('/dashboard');
		}
	});

	async function handleLogin() {
		if (!email || !password) {
			error = 'Email dan password harus diisi';
			return;
		}

		isLoading = true;
		error = '';

		try {
			// Mock login - in production, call your API
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', JSON.stringify(data.user));
				goto('/dashboard');
			} else {
				error = 'Email atau password salah';
			}
		} catch (err) {
			error = 'Terjadi kesalahan. Silakan coba lagi.';
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Masuk - Projekan</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900">Projekan</h1>
			<h2 class="mt-2 text-center text-xl font-semibold text-gray-900">
				Masuk ke akun Anda
			</h2>
			<p class="mt-2 text-center text-sm text-gray-600">
				Atau
				<a href="/register" class="font-medium text-blue-600 hover:text-blue-500">
					daftar akun baru
				</a>
			</p>
		</div>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="space-y-6" on:submit|preventDefault={handleLogin}>
				{#if error}
					<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
						{error}
					</div>
				{/if}

				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">
						Email
					</label>
					<div class="mt-1">
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							required
							bind:value={email}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="nama@email.com"
						/>
					</div>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">
						Password
					</label>
					<div class="mt-1">
						<input
							id="password"
							name="password"
							type="password"
							autocomplete="current-password"
							required
							bind:value={password}
							class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							placeholder="Password Anda"
						/>
					</div>
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<input
							id="remember-me"
							name="remember-me"
							type="checkbox"
							class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label for="remember-me" class="ml-2 block text-sm text-gray-900">
							Ingat saya
						</label>
					</div>

					<div class="text-sm">
						<a href="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
							Lupa password?
						</a>
					</div>
				</div>

				<div>
					<button
						type="submit"
						disabled={isLoading}
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if isLoading}
							<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
						{/if}
						Masuk
					</button>
				</div>
			</form>

			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<div class="w-full border-t border-gray-300"></div>
					</div>
					<div class="relative flex justify-center text-sm">
						<span class="px-2 bg-white text-gray-500">Atau lanjutkan dengan</span>
					</div>
				</div>

				<div class="mt-6 grid grid-cols-2 gap-3">
					<button
						type="button"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<svg class="w-5 h-5" viewBox="0 0 24 24">
							<path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						<span class="ml-2">Google</span>
					</button>

					<button
						type="button"
						class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
						</svg>
						<span class="ml-2">Twitter</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>