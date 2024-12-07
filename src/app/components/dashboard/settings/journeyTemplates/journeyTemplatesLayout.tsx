'use client'

import React, { useState } from 'react'
import CardOption from '@/app/components/shared/cardOption'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface JourneyTemplate {
  id: number;
  name: string;
  description: string;
}

const initialTemplates: JourneyTemplate[] = [
  { id: 1, name: 'New Client Onboarding', description: 'Standard process for onboarding new clients' },
  { id: 2, name: 'Loan Application', description: 'Journey for clients applying for a loan' },
  { id: 3, name: 'Annual Review', description: 'Yearly review process for existing clients' },
]

export default function JourneyTemplates() {
  const router = useRouter()
  const [templates] = useState<JourneyTemplate[]>(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1)

  const handleEditTemplate = (id: number) => {
    // Implement edit functionality here
    console.log(`Editing template with id: ${id}`)
  }

  const handleCreateJourney = () => {
    router.push('/workspace/journey-builder')
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold leading-6 text-gray-900">
                  Journey Templates
                </h2>
                <button
                  onClick={handleCreateJourney}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create Journey
                </button>
              </div>
              <div className="space-y-2">
                {templates.map((template) => (
                  <CardOption
                    key={template.id}
                    id={template.id}
                    name={template.name}
                    isSelected={selectedTemplate === template.id}
                    onSelect={setSelectedTemplate}
                    onEdit={() => handleEditTemplate(template.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                Preview
              </h2>
              <div className="bg-gray-100 rounded-md flex-grow p-6 overflow-auto">
                <p className="text-gray-500">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}