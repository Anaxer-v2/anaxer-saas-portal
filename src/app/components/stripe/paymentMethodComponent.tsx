'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import {
  ConnectPaymentMethodSettings,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"

interface PaymentMethodComponentProps {
  stripeConnectInstance: StripeConnectInstance
}

export default function PaymentMethodComponent({ stripeConnectInstance }: PaymentMethodComponentProps) {
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectPaymentMethodSettings />
    </ConnectComponentsProvider>
  )
}


