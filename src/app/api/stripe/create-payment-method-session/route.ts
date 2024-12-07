import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20; embedded_connect_beta=v2' as '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { accountId } = await request.json();
    console.log('Received accountId:', accountId);

    const accountSession = await stripe.accountSessions.create({
      account: accountId,
      components: {
        payment_method_settings: {
          enabled: true,
        },
      } as any,
    });

    console.log('Account session created successfully');
    return NextResponse.json({ clientSecret: accountSession.client_secret });
  } catch (error) {
    console.error('Error creating payment method session:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}