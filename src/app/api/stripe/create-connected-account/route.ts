import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US', // or the appropriate country code
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });

    return NextResponse.json({ accountId: account.id });
  } catch (error) {
    console.error('Error creating connected account:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}