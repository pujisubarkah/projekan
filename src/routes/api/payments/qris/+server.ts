import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PaymentService } from '$lib/payment';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { projectId, amount, description } = await request.json();

    if (!projectId || !amount) {
      throw error(400, 'Project ID and amount are required');
    }

    if (amount < 1000) {
      throw error(400, 'Minimum payment amount is Rp 1,000');
    }

    const payment = await PaymentService.createQRISPayment({
      projectId: parseInt(projectId),
      amount: parseInt(amount),
      description,
    });

    return json({
      success: true,
      data: payment,
    });
  } catch (err: any) {
    console.error('Payment creation error:', err);
    throw error(500, err.message || 'Failed to create payment');
  }
};