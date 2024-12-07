'use client'

import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import Button from '../../shared/button'
import { AgentStatus } from '../../../types/aiAgents'
import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface AgentSettingsProps {
  agentsCount: number
  verificationCount: number
  verificationLimit: number
  onUpgrade: () => void
}

export default function AgentSettings({ agentsCount, verificationCount, verificationLimit, onUpgrade }: AgentSettingsProps) {
  const [isAgentEnabled, setIsAgentEnabled] = useState(true)

  const getStatusLight = () => {
    return isAgentEnabled ? 'bg-green-500' : 'bg-gray-500'
  }

  // Mock data for the last 30 days
  const activityData = Array.from({ length: 30 }, (_, i) => ({
    x: new Date().setDate(new Date().getDate() - 29 + i),
    y: Math.floor(Math.random() * 50) + 10, // Random number between 10 and 60
  }))

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line' as const,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
        autoSelected: 'zoom'
      },
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      }
    },
    colors: ['#247bff'],
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'dd MMM'
      }
    },
    yaxis: {
      title: {
        text: 'Verifications'
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM'
      }
    },
    stroke: {
      curve: 'straight'
    }
  }

  const chartSeries = [
    {
      name: 'Verifications',
      data: activityData
    }
  ]

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">Agent Settings</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Number of AI Agents: {agentsCount}</p>
            <p className="text-sm text-gray-500 mt-1">Automated Verifications: {verificationCount} / {verificationLimit} per month</p>
          </div>
          <Button variant="outline" onClick={onUpgrade}>
            Upgrade plan for additional agents
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-medium">Enable AI Agent</h3>
          <p className="text-sm text-gray-500">Turn on to activate the AI agent for automated verifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isAgentEnabled}
            onChange={setIsAgentEnabled}
            className={`${
              isAgentEnabled ? 'bg-[#247bff]' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable agent</span>
            <span
              className={`${
                isAgentEnabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <span className="text-sm font-medium">{isAgentEnabled ? 'On' : 'Off'}</span>
          <div className={`w-2 h-2 rounded-full ${getStatusLight()}`}></div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Agent verification activity (last 30 Days)</h3>
        <div className="h-64">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height="100%"
          />
        </div>
      </div>
    </div>
  )
}