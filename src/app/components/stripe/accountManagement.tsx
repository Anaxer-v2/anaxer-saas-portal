'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import {
  ConnectAccountManagement,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"

interface StripeAccountManagementProps {
  stripeConnectInstance: StripeConnectInstance
}

export default function StripeAccountManagement({ stripeConnectInstance }: StripeAccountManagementProps) {
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectAccountManagement />
    </ConnectComponentsProvider>
  )
}