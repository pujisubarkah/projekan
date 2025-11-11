<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let projectId: number;
	export let amount: number;
	export let description: string = '';
	export let onPaymentSuccess: (() => void) | undefined = undefined;
	export let onPaymentCancel: (() => void) | undefined = undefined;

	let qrCode: string = '';
	let paymentId: string = '';
	let status: string = 'pending';
	let expiresAt: string = '';
	let isLoading = false;
	let error: string = '';
	let timeLeft: number = 900; // 15 minutes in seconds
	let timer: ReturnType<typeof setInterval>;

	// Generate QRIS payment
	async function createPayment() {
		isLoading = true;
		error = '';

		try {
			const response = await fetch('/api/payments/qris', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					projectId,
					amount,
					description,
				}),
			});

			const result = await response.json();

			if (result.success) {
				qrCode = result.data.qrString;
				paymentId = result.data.id;
				expiresAt = result.data.expiresAt;
				status = 'pending';
				startTimer();
			} else {
				error = result.error || 'Failed to create payment';
			}
		} catch (err) {
			error = 'Network error. Please try again.';
			console.error('Payment creation error:', err);
		} finally {
			isLoading = false;
		}
	}

	// Start countdown timer
	function startTimer() {
		timer = setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				clearInterval(timer);
				status = 'expired';
			}
		}, 1000);
	}

	// Format time remaining
	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	// Check payment status
	async function checkStatus() {
		if (!paymentId) return;

		try {
			const response = await fetch(`/api/payments/status/${paymentId}`);
			const result = await response.json();

			if (result.success) {
				status = result.data.status;
				if (status === 'paid') {
					clearInterval(timer);
					if (onPaymentSuccess) {
						onPaymentSuccess();
					}
				}
			}
		} catch (err) {
			console.error('Status check error:', err);
		}
	}

	// Auto-check status every 5 seconds when payment is active
	$: (() => {
		let statusTimer;
		if (status === 'pending' && paymentId) {
			statusTimer = setInterval(checkStatus, 5000);
		}
		// Cleanup interval when reactive block re-runs or component unmounts
		return () => {
			if (statusTimer) clearInterval(statusTimer);
		};
	})();

	onMount(() => {
		createPayment();
	});

	// Cleanup timer on unmount
	onMount(() => {
		return () => {
			if (timer) clearInterval(timer);
		};
	});
</script>

<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
	<h3 class="text-lg font-semibold text-gray-900 mb-4">Pembayaran QRIS</h3>

	{#if error}
		<div class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
			<p class="text-red-800 text-sm">{error}</p>
		</div>
	{/if}

	{#if isLoading}
		<div class="text-center py-8">
			<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
			<p class="mt-2 text-gray-600">Membuat QRIS...</p>
		</div>
	{:else if qrCode}
		<div class="text-center">
			<!-- QR Code Display -->
			<div class="bg-gray-50 p-4 rounded-lg mb-4">
				<div class="text-center mb-2">
					<p class="text-sm text-gray-600 mb-2">QRIS Code:</p>
					<div class="bg-white p-3 rounded border-2 border-dashed border-gray-300 max-w-xs mx-auto">
						<p class="text-xs font-mono text-gray-800 break-all">{qrCode}</p>
					</div>
					<p class="text-xs text-gray-500 mt-2">Scan dengan aplikasi e-wallet</p>
				</div>
			</div>

			<!-- Payment Info -->
			<div class="space-y-2 mb-4">
				<p class="text-sm text-gray-600">Jumlah: <span class="font-semibold">Rp {amount.toLocaleString('id-ID')}</span></p>
				<p class="text-sm text-gray-600">Status: <span class="font-semibold {status === 'paid' ? 'text-green-600' : status === 'expired' ? 'text-red-600' : 'text-yellow-600'}">{status.toUpperCase()}</span></p>
				{#if status === 'pending'}
					<p class="text-sm text-gray-600">Waktu tersisa: <span class="font-semibold text-red-600">{formatTime(timeLeft)}</span></p>
				{/if}
			</div>

			<!-- Instructions -->
			<div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
				<h4 class="text-sm font-medium text-blue-800 mb-2">Cara Pembayaran:</h4>
				<ol class="text-sm text-blue-700 space-y-1 text-left">
					<li>1. Buka aplikasi e-wallet (GoPay, OVO, Dana, dll)</li>
					<li>2. Pilih menu "Scan QR" atau "Bayar"</li>
					<li>3. Scan QR code di atas</li>
					<li>4. Konfirmasi pembayaran</li>
				</ol>
			</div>

			<!-- Status Messages -->
			{#if status === 'paid'}
				<div class="bg-green-50 border border-green-200 rounded-md p-4">
					<p class="text-green-800 text-sm font-medium">✅ Pembayaran berhasil!</p>
					<p class="text-green-700 text-sm">Proyek akan segera diproses.</p>
				</div>
			{:else if status === 'expired'}
				<div class="bg-red-50 border border-red-200 rounded-md p-4">
					<p class="text-red-800 text-sm font-medium">⏰ QRIS kedaluwarsa</p>
					<div class="flex gap-2 mt-2">
						<button
							on:click={createPayment}
							class="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
						>
							Buat QRIS Baru
						</button>
						{#if onPaymentCancel}
							<button
								on:click={onPaymentCancel}
								class="px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
							>
								Batal
							</button>
						{/if}
					</div>
				</div>
			{:else}
				<div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
					<p class="text-yellow-800 text-sm font-medium">⏳ Menunggu pembayaran...</p>
					<p class="text-yellow-700 text-sm">Halaman ini akan update otomatis saat pembayaran diterima.</p>
					{#if onPaymentCancel}
						<button
							on:click={onPaymentCancel}
							class="mt-2 px-4 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700"
						>
							Batal Pembayaran
						</button>
					{/if}
				</div>
			{/if}
		</div>
	{:else}
		<div class="text-center py-8">
			<p class="text-gray-600">Gagal membuat QRIS. Silakan coba lagi.</p>
			<button
				on:click={createPayment}
				class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
			>
				Coba Lagi
			</button>
		</div>
	{/if}
</div>

<style>
	/* Additional styles if needed */
</style>