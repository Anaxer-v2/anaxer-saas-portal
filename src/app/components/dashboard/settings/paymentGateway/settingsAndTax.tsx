'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import StripeConnectEmbed from '../../../stripe/connectPayments'
import StripeAccountManagement from '../../../stripe/accountManagement'

interface SettingsAndTaxProps {
  stripeConnectInstance: StripeConnectInstance | null;
}

export default function SettingsAndTax({ stripeConnectInstance }: SettingsAndTaxProps) {
  if (!stripeConnectInstance) {
    return <div>Loading Stripe Connect...</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6">Settings and Tax</h2>
      <div>
        <h3 className="text-xl font-semibold mb-4">Connect Payments</h3>
        <StripeConnectEmbed stripeConnectInstance={stripeConnectInstance} />
        
        <h3 className="text-xl font-semibold mt-8 mb-4">Account Management</h3>
        <StripeAccountManagement stripeConnectInstance={stripeConnectInstance} />
      </div>
    </div>
  )
}
