'use client';

import React, { useState } from 'react';
import SectionTabs from '../../shared/sectionTabs';
import ClientOverview from './overview';
import ClientVerification from './verification';
import ClientActivityTimeline from './activityTimeline';

const tabs = [
  { name: 'Overview', href: '#overview' },
  { name: 'Verification', href: '#verification' },
  { name: 'Activity Timeline', href: '#activity-timeline' }
];

export default function ClientsOverview({ clientId }: { clientId: string }) {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="-mt-5">
        <SectionTabs 
          tabs={tabs.map(tab => ({ ...tab, current: tab.name === activeTab }))} 
          onTabChange={handleTabChange} 
        />
      </div>
      <div className="mt-6">
        {activeTab === 'Overview' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <ClientOverview />
          </div>
        )}
        {activeTab === 'Verification' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Client Verification</h2>
            <ClientVerification />
          </div>
        )}
        {activeTab === 'Activity Timeline' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Client Activity Timeline</h2>
            <ClientActivityTimeline />
          </div>
        )}
      </div>
    </div>
  );
}