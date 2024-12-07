'use client'

import React, { useEffect, useState } from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import PaymentMethodComponent from '../../../stripe/paymentMethodComponent'

interface PaymentMethodsProps {
  accountId: string
}

export default function PaymentMethods({ accountId }: PaymentMethodsProps) {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<StripeConnectInstance | null>(null)

  useEffect(() => {
    const initializeStripeConnect = async () => {
      try {
        const response = await fetch('/api/stripe/create-payment-method-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accountId }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to create payment method session')
        }

        const { clientSecret } = await response.json()

        const instance = await (window as any).StripeConnect.initialize({
          clientSecret,
          appearance: { /* your appearance options */ },
        }) as StripeConnectInstance

        setStripeConnectInstance(instance)
      } catch (error) {
        console.error('Error initializing Stripe Connect:', error)
      }
    }

    initializeStripeConnect()
  }, [accountId])

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
      {stripeConnectInstance ? (
        <PaymentMethodComponent stripeConnectInstance={stripeConnectInstance} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}