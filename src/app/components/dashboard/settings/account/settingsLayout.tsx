'use client'

import React, { useState } from 'react'
import SectionTabs from '../../../shared/sectionTabs'
import AccountSettings from './account'
import BillingSettings from './billing'
import TeamSettings from './team'  // Import the new TeamSettings component

const tabs = [
  { name: 'Account', href: '#account' },
  { name: 'Billing', href: '#billing' },
  { name: 'Team', href: '#team' }
]

export default function SettingsLayout() {
  const [activeTab, setActiveTab] = useState('Account')

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName)
  }

  // You might want to manage this state at a higher level or fetch it from an API
  const currentPlan = {
    name: 'Pro',
    maxSeats: 10
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="-mt-5">
        <SectionTabs 
          tabs={tabs.map(tab => ({ ...tab, current: tab.name === activeTab }))} 
          onTabChange={handleTabChange} 
        />
      </div>
      <div className="mt-6">
        {activeTab === 'Account' && <AccountSettings />}
        {activeTab === 'Billing' && <BillingSettings />}
        {activeTab === 'Team' && <TeamSettings currentPlan={currentPlan} />}
      </div>
    </div>
  )
}