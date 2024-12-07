'use client'

import React, { useState } from 'react'
import AIAgentsCard from './aiAgentsCard'
import { AgentStatus } from '../../../types/aiAgents'
import { RequirementTemplate } from './aiAgentsCard'

export default function AIAgents() {
  const [isOn, setIsOn] = useState(false)

  const handleUpgrade = () => {
    // Implement upgrade logic here
    console.log('Upgrade plan')
  }

  const getStatusLight = () => {
    return isOn ? 'bg-green-500' : 'bg-gray-500'
  }

  return (
    <div>
      <AIAgentsCard
        agentsCount={3}
        verificationCount={83}
        verificationLimit={1000}
        onUpgrade={handleUpgrade}
        status={isOn ? 'live' : 'off'}
      />
    </div>
  )
}