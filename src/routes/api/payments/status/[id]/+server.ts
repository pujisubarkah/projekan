import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PaymentService } from '$lib/payment';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const { id } = params;

    if (!id) {
      throw error(400, 'Payment ID is required');
    }

    const payment = await PaymentService.getPaymentStatus(id);

    return json({
      success: true,
      data: payment,
    });
  } catch (err: any) {
    console.error('Payment status check error:', err);
    throw error(500, err.message || 'Failed to check payment status');
  }
};