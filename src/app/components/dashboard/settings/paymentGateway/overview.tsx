'use client'

import React, { lazy, Suspense, useState, useEffect } from 'react'
import { StripeConnectInstance } from '@stripe/connect-js'
import { ConnectComponentsProvider } from "@stripe/react-connect-js"
import SkeletonLoader from '../../../shared/skeletonLoader'

const NotificationBannerUI = lazy(() => import('../../../stripe/notificationBanner'))
const StripePayouts = lazy(() => import('../../../stripe/payouts'))
const StripeDocuments = lazy(() => import('../../../stripe/documents'))
const ConnectPayments = lazy(() => import('@stripe/react-connect-js').then(module => ({ default: module.ConnectPayments })))

interface PaymentGatewayOverviewProps {
  stripeConnectInstance: StripeConnectInstance | null
}

const MemoizedComponent = React.memo(({ children }: { children: React.ReactNode }) => children)

function DelayedSuspense({ children, fallback, delay = 500 }: { children: React.ReactNode, fallback: React.ReactNode, delay?: number }) {
  const [showFallback, setShowFallback] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <Suspense fallback={showFallback ? fallback : null}>
      {children}
    </Suspense>
  )
}

export default function PaymentGatewayOverview({ stripeConnectInstance }: PaymentGatewayOverviewProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6">Payments</h2>
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <DelayedSuspense fallback={<SkeletonLoader height="50px" />}>
            <MemoizedComponent>
              <NotificationBannerUI stripeConnectInstance={stripeConnectInstance} />
            </MemoizedComponent>
          </DelayedSuspense>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Payouts</h3>
              <DelayedSuspense fallback={<SkeletonLoader height="200px" />}>
                <MemoizedComponent>
                  <StripePayouts stripeConnectInstance={stripeConnectInstance} />
                </MemoizedComponent>
              </DelayedSuspense>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Payments</h3>
              <DelayedSuspense fallback={<SkeletonLoader height="200px" />}>
                <MemoizedComponent>
                  <ConnectPayments />
                </MemoizedComponent>
              </DelayedSuspense>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <DelayedSuspense fallback={<SkeletonLoader height="200px" />}>
                <MemoizedComponent>
                  <StripeDocuments stripeConnectInstance={stripeConnectInstance} />
                </MemoizedComponent>
              </DelayedSuspense>
            </div>
          </div>
        </ConnectComponentsProvider>
      )}
    </div>
  )
}