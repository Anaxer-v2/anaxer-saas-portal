'use client'

import React, { useState } from 'react'
import Button from '../../shared/button'
import StatusButton from '../../shared/statusButton'
import { AgentStatus } from '../../../types/aiAgents'
import AIRules from './aiRules'
import AIChat from './aiChat'
import DropdownStatus from '../../shared/dropdownStatus'
import { VscChecklist } from 'react-icons/vsc'
import { GrTest } from 'react-icons/gr'
import { GoChecklist } from 'react-icons/go'
import { GiBrain } from 'react-icons/gi'

export type RequirementTemplate = 
  | 'Payslips'
  | 'Bank statements'
  | 'Driver licence'
  | 'Passport'
  | 'Tax return'
  | 'Medicare card'
  | 'Employment details'
  | 'Income details'
  | 'Debts and liabilities'
  | 'Living expenses'

interface AIAgentsCardProps {
  agentsCount: number
  verificationCount: number
  verificationLimit: number
  onUpgrade: () => void
  status: AgentStatus
}

interface StatusOption {
  id: number;
  name: string;
  color: 'green' | 'amber' | 'gray';
}

export default function AIAgentsCard({ agentsCount, verificationCount, verificationLimit, onUpgrade, status }: AIAgentsCardProps) {
  const templates: RequirementTemplate[] = [
    'Payslips',
    'Bank statements',
    'Driver licence',
    'Passport',
    'Tax return',
    'Medicare card',
    'Employment details',
    'Income details',
    'Debts and liabilities',
    'Living expenses'
  ]
  const [selectedTemplate, setSelectedTemplate] = useState<RequirementTemplate>(templates[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [agentModes, setAgentModes] = useState<Record<RequirementTemplate, AgentStatus>>(
    templates.reduce((acc, template) => ({ ...acc, [template]: 'live' }), {} as Record<RequirementTemplate, AgentStatus>)
  );
  const [activeView, setActiveView] = useState<'rules' | 'chat'>('rules')

  const filteredTemplates = templates.filter(template => 
    template.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusOptions: StatusOption[] = [
    { id: 1, name: 'Off', color: 'gray' },
    { id: 2, name: 'Safety mode', color: 'amber' },
    { id: 3, name: 'Live', color: 'green' },
  ]

  const handleModeChange = (template: RequirementTemplate, selectedStatus: StatusOption) => {
    setAgentModes(prev => ({ ...prev, [template]: selectedStatus.name.toLowerCase() as AgentStatus }))
  }

  const getStatusLight = (status: AgentStatus) => {
    switch (status) {
      case 'live':
        return 'bg-green-500 light-live emit-light'
      case 'safety mode':
        return 'bg-yellow-500 light-testing emit-light'
      default:
        return 'bg-gray-500 light-off'
    }
  }

  return (
    <div className="min-h-[700px] flex flex-col">
      <div className="flex space-x-8 flex-grow">
        <div className="w-[400px] flex-shrink-0 border-r border-gray-200 pr-8">
          <p className="text-sm text-gray-500 mb-4">Select a requirement template below to assign verification instructions to your agents</p>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-8 border border-gray-300 rounded-md"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-2">
            {filteredTemplates.map((template) => (
              <div
                key={template}
                className={`
                  flex items-center justify-between p-3 rounded-md cursor-pointer
                  ${selectedTemplate === template ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}
                  hover:bg-gray-50 transition-colors duration-150 ease-in-out
                `}
                onClick={() => setSelectedTemplate(template)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full mr-3 flex-shrink-0 border">
                    {selectedTemplate === template && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  <h3 className="text-sm font-medium text-gray-700">{template}</h3>
                </div>
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full ${getStatusLight(agentModes[template])}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow flex flex-col pl-8">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">{selectedTemplate}</h3>
            <div className="flex items-center space-x-2">
              <button 
                className={`p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md ${activeView === 'rules' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveView('rules')}
              >
                <GoChecklist size={20} />
              </button>
              <button 
                className={`p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md ${activeView === 'chat' ? 'bg-gray-100' : ''}`}
                onClick={() => setActiveView('chat')}
              >
                <GiBrain size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md">
                <GrTest size={20} />
              </button>
              <DropdownStatus
                options={statusOptions}
                selected={statusOptions.find(option => option.name.toLowerCase() === agentModes[selectedTemplate]) || statusOptions[0]}
                onChange={(selected) => handleModeChange(selectedTemplate, selected)}
                width="170px"
              />
            </div>
          </div>
          <div className="flex-grow">
            {activeView === 'rules' ? (
              <AIRules 
                selectedTemplate={selectedTemplate ? { id: '0', name: selectedTemplate } : null}
                agentMode={agentModes[selectedTemplate]}
                onModeChange={(mode) => handleModeChange(selectedTemplate, statusOptions.find(option => option.name.toLowerCase() === mode.toLowerCase()) || statusOptions[0])}
                onChatClick={() => setActiveView('chat')}
              />
            ) : (
              <AIChat 
                selectedTemplate={selectedTemplate} 
                userFirstName="Cameron" // Replace with actual user's first name
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
