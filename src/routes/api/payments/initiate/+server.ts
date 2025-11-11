import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Payment, ApiResponse } from '$lib/types';
import { generateQRIS } from '$lib/qris';

// POST /api/payments/initiate - Initiate a QRIS payment
export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();

		// Validate required fields
		const { projectId, amount, description } = body;

		if (!projectId || !amount || !description) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Missing required fields: projectId, amount, description',
			};
			return json(response, { status: 400 });
		}

		const paymentAmount = Number(amount);
		if (isNaN(paymentAmount) || paymentAmount <= 0) {
			const response: ApiResponse<null> = {
				success: false,
				error: 'Invalid payment amount',
			};
			return json(response, { status: 400 });
		}

		// Generate QRIS payment
		const qrisPayment = await generateQRIS(paymentAmount, `PROJECT_${projectId}_${Date.now()}`);

		// Mock payment record creation - in production, save to database
		const payment: Payment = {
			id: Date.now(), // Mock ID generation
			projectId: Number(projectId),
			amount: paymentAmount,
			status: 'pending',
			qrisReference: qrisPayment.id,
			createdAt: new Date(),
		};

		const response: ApiResponse<{ payment: Payment; qrisString: string }> = {
			success: true,
			data: {
				payment,
				qrisString: qrisPayment.qrisString,
			},
		};

		return json(response, { status: 201 });
	} catch (error) {
		console.error('Error initiating payment:', error);
		const response: ApiResponse<null> = {
			success: false,
			error: 'Failed to initiate payment',
		};
		return json(response, { status: 500 });
	}
};