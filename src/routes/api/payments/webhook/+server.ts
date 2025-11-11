import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { ApiResponse } from '$lib/types';
import { verifyWebhook, checkPaymentStatus } from '$lib/qris';

// POST /api/payments/webhook - Handle QRIS payment webhook notifications
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.text(); // Webhooks often send raw data
		const signature = request.headers.get('x-signature') || '';

		// Parse webhook payload (format depends on QRIS provider)
		let payload;
		try {
			payload = JSON.parse(body);
		} catch (e) {
			// Some providers send form data or other formats
			payload = body;
		}

		// Verify webhook signature (in production, this is crucial for security)
		const isValid = await verifyWebhook(payload, signature);
		if (!isValid) {
			console.warn('Invalid webhook signature received');
			const response: ApiResponse<null> = {
				success: false,
				error: 'Invalid signature',
			};
			return json(response, { status: 401 });
		}

		// Process webhook based on provider format
		// This is a generic implementation - adapt based on your QRIS provider
		let paymentId: string;
		let status: string;

		if (typeof payload === 'object' && payload !== null) {
			// Assuming a common webhook format
			paymentId = payload.paymentId || payload.id || payload.reference;
			status = payload.status || payload.paymentStatus;
		} else {
			// Handle other formats as needed
			console.log('Received webhook payload:', payload);
			const response: ApiResponse<null> = {
				success: false,
				error: 'Unsupported webhook format',
			};
			return json(response, { status: 400 });
		}

		if (!paymentId || !status) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Missing payment ID or status in webhook',
			};
			return json(response, { status: 400 });
		}

		// Update payment status in database
		// In production, update your database here
		console.log(`Payment ${paymentId} status updated to: ${status}`);

		// For successful payments, you might want to:
		// 1. Update project status
		// 2. Notify the client/freelancer
		// 3. Release funds to freelancer
		// 4. Send confirmation emails

		if (status === 'paid' || status === 'completed') {
			// Handle successful payment
			console.log(`Payment ${paymentId} completed successfully`);

			// TODO: Implement payment completion logic
			// - Update payment status in database
			// - Update project status if this completes the project
			// - Notify relevant parties
		} else if (status === 'failed' || status === 'expired') {
			// Handle failed payment
			console.log(`Payment ${paymentId} failed or expired`);

			// TODO: Implement failure handling
			// - Update payment status
			// - Notify client
			// - Possibly retry or cancel project
		}

		// Always respond with success to acknowledge receipt
		const response: ApiResponse<{ received: true }> = {
			success: true,
			data: { received: true },
		};

		return json(response);
	} catch (error) {
		console.error('Error processing webhook:', error);
		const response: ApiResponse<null> = {
			success: false,
			error: 'Failed to process webhook',
		};
		return json(response, { status: 500 });
	}
};