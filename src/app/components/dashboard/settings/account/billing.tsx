'use client'

import React, { useState } from 'react'
import Button from '../../../shared/button'

interface Plan {
  name: string
  description: string
  price: number
  features: string[]
  popular?: boolean
}

interface PaymentMethod {
  type: string
  last4: string
  expiryDate: string
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: string
}

const plans: Plan[] = [
  {
    name: 'Free plan',
    description: 'Perfect for exploring the platform and learning how it works.',
    price: 0,
    features: ['1 seat', 'Limited theming', 'Limited API access', '25 requests per month']
  },
  {
    name: 'Basic plan',
    description: 'Great for those starting out or managing a small business.',
    price: 49,
    features: ['1 seat', 'Full custom theming', 'Full API access', '250 requests per month']
  },
  {
    name: 'Plus plan',
    description: 'Our most popular plan with multi-seat licenses, payment gateway, and OTP verification.',
    price: 99,
    features: ['5 seats', 'Full custom theming', 'Full API access', '500 requests per month', 'Payment gateway', 'Client email OTP'],
    popular: true
  },
  {
    name: 'Pro plan',
    description: 'Ideal for larger businesses needing both production and development environments.',
    price: 199,
    features: ['10 seats', 'Full custom theming', 'Full API access', '1000 requests per month', 'Payment gateway', 'Client email & SMS OTP', 'Test and prod environments']
  },
]

export default function BillingSettings() {
  const [currentPlan, setCurrentPlan] = useState<Plan>(plans[0])
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'Visa',
    last4: '4242',
    expiryDate: '12/2024',
  })
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 'INV-001', date: '2023-05-01', amount: 10, status: 'Paid' },
    { id: 'INV-002', date: '2023-06-01', amount: 10, status: 'Paid' },
  ])

  const handleChangePlan = (plan: Plan) => {
    setCurrentPlan(plan)
    // Implement plan change logic here
  }

  const handleChangePaymentMethod = () => {
    // Implement payment method change logic here
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    // Implement invoice download logic here
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold leading-6 text-gray-900 mb-6">Billing Settings</h2>
      
      {/* Current Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Current Plan</h3>
        <p className="mb-4">You are currently on the <strong>{currentPlan.name}</strong>.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`border rounded-lg p-4 flex flex-col ${
                plan.name === currentPlan.name 
                  ? 'bg-blue-50 border-blue-500' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <h4 className="font-medium mb-2">{plan.name}</h4>
              <p className="text-sm mb-4">{plan.description}</p>
              <p className="text-3xl font-bold mb-2">${plan.price}<span className="text-sm font-normal"> monthly</span></p>
              <p className="text-sm mb-4">plus local taxes</p>
              <ul className="mb-4 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="text-sm mb-1">• {feature}</li>
                ))}
              </ul>
              {plan.name !== currentPlan.name && (
                <Button
                  variant="outline"
                  onClick={() => handleChangePlan(plan)}
                  className="mt-auto"
                >
                  Switch plan
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-md">
          <div>
            <p className="font-medium">{paymentMethod.type} ending in {paymentMethod.last4}</p>
            <p className="text-sm text-gray-500">Expires {paymentMethod.expiryDate}</p>
          </div>
          <Button variant="outline" onClick={handleChangePaymentMethod}>
            Change Payment Method
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Billing History</h3>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Invoice</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">{invoice.id}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.date}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${invoice.amount}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.status}</td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <button
                    onClick={() => handleDownloadInvoice(invoice.id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
