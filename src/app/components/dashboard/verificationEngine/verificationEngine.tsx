'use client';

import React, { useState } from 'react';
import SectionTabs from '../../shared/sectionTabs';
import Verification from './verification';
import AgentTraining from './agentTraining';
import AgentSettings from './agentSettings';
import AIAgentsCard from './aiAgentsCard';

const tabs = [
  { name: 'Verification', href: '#verification' },
  { name: 'Agent Training', href: '#agent-training' },
  { name: 'Agent Settings', href: '#agent-settings' }
];

export default function VerificationEngineLayout() {
  const [activeTab, setActiveTab] = useState('Verification');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleUpgrade = () => {
    // Implement upgrade logic here
    console.log('Upgrade plan')
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
        {activeTab === 'Verification' && <Verification />}
        {activeTab === 'Agent Training' && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Train your AI agents</h2>
            <AIAgentsCard
              agentsCount={5}
              verificationCount={544}
              verificationLimit={1000}
              onUpgrade={handleUpgrade}
              status="off"
            />
          </div>
        )}
        {activeTab === 'Agent Settings' && (
          <AgentSettings
            agentsCount={5}  // Replace with actual count
            verificationCount={544}  // Replace with actual count
            verificationLimit={1000}  // Replace with actual limit
            onUpgrade={handleUpgrade}
          />
        )}
      </div>
    </div>
  );
}