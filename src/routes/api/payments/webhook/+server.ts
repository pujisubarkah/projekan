import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PaymentService } from '$lib/payment';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Get raw body for webhook verification
    const rawBody = await request.text();
    const webhookData = JSON.parse(rawBody);

    console.log('Received Xendit webhook:', webhookData);

    // In production, you should verify the webhook signature
    // Xendit provides webhook verification via headers
    // For now, we'll process the webhook (add signature verification later)

    const result = await PaymentService.handleWebhook(webhookData);

    return json(result);
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    throw error(500, 'Webhook processing failed');
  }
};