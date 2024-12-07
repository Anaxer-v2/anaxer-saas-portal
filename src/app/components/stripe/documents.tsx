'use client'

import React from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import {
  ConnectDocuments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js"

interface StripeDocumentsProps {
  stripeConnectInstance: StripeConnectInstance
}

export default function StripeDocuments({ stripeConnectInstance }: StripeDocumentsProps) {
  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
      <ConnectDocuments />
    </ConnectComponentsProvider>
  )
}