'use client'

import React, { useState, useEffect } from 'react'
import { loadConnectAndInitialize, StripeConnectInstance } from '@stripe/connect-js'
import SectionTabs from '../../../shared/sectionTabs'
import PaymentGatewayOverview from './overview'
import PaymentMethods from './paymentMethods'
import Integrations from './integrations'

const tabs = [
  { name: 'Overview', href: '#overview' },
  { name: 'Payment Methods', href: '#payment-methods' },
  { name: 'Settings and Tax', href: '#settings-and-tax' },
  { name: 'Integrations', href: '#integrations' }
]

export default function PaymentGatewaySettingsLayout() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [stripeConnectInstance, setStripeConnectInstance] = useState<StripeConnectInstance | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeStripeConnect = async () => {
      try {
        const instance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          appearance: {
            variables: {
              colorPrimary: '#247bff',
              colorBackground: '#FFFFFF',
              colorText: '#4b5563',
              colorDanger: '#DF1B41',
              fontFamily: 'open sans',
              fontSizeBase: '16px',
              spacingUnit: '4px',
              borderRadius: '4px',
            },
          },
          fetchClientSecret: async () => {
            const response = await fetch('/api/stripe/create-account-session', { method: "POST" })
            if (!response.ok) {
              const { error } = await response.json()
              throw new Error(error || 'Failed to fetch client secret')
            }
            const { clientSecret } = await response.json()
            if (!clientSecret) {
              throw new Error('Client secret is missing')
            }
            return clientSecret
          },
        })
        setStripeConnectInstance(instance)
      } catch (err) {
        console.error('Error initializing Stripe Connect:', err)
        setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      }
    }

    initializeStripeConnect()
  }, [])

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8"> {/* Changed from max-w-7xl to max-w-[1500px] */}
      <div className="-mt-5">
        <SectionTabs 
          tabs={tabs.map(tab => ({ ...tab, current: tab.name === activeTab }))} 
          onTabChange={handleTabChange} 
        />
      </div>
      <div className="mt-6">
        {activeTab === 'Overview' && <PaymentGatewayOverview stripeConnectInstance={stripeConnectInstance} />}
        {activeTab === 'Payment Methods' && (
          <PaymentMethods accountId={'acct_1PKYbW0183tUaz77'} />
        )}
        {activeTab === 'Integrations' && <Integrations />}
      </div>
    </div>
  )
}