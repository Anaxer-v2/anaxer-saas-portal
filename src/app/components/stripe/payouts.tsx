'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import {
  ConnectPayouts,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"

interface StripePayoutsProps {
  stripeConnectInstance: StripeConnectInstance
}

export default function StripePayouts({ stripeConnectInstance }: StripePayoutsProps) {
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectPayouts />
    </ConnectComponentsProvider>
  )
}