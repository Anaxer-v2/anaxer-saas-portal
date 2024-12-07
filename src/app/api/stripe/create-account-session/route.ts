import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const accountId = 'acct_1PKYbW0183tUaz77';

    const accountSession = await stripe.accountSessions.create({
      account: accountId,
      components: {
        account_management: {
          enabled: true,
        },
          account_onboarding: {
          enabled: true,
          features: {
            external_account_collection: true,
          },
        },
        payments: {
          enabled: true,
        },
        payouts: {
          enabled: true,
        },
        notification_banner: {
          enabled: true,
        },
        documents: {
          enabled: true,
        },
        payment_details: {
          enabled: true,
        },
        balances: {
          enabled: true,
        },
      },
    });

    return NextResponse.json({ clientSecret: accountSession.client_secret });
  } catch (error) {
    console.error('Error creating account session:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: error.message }, { status: error.statusCode });
    }
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}