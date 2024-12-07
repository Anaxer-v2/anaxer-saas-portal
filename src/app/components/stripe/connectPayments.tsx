'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"

interface StripeConnectEmbedProps {
  stripeConnectInstance: StripeConnectInstance
}

export default function StripeConnectEmbed({ stripeConnectInstance }: StripeConnectEmbedProps) {
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectPayments />
    </ConnectComponentsProvider>
  )
}