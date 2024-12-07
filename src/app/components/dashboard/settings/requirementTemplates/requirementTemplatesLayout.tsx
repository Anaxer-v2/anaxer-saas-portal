'use client'

import React, { useState } from 'react'
import CardOption from '@/app/components/shared/cardOption'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

interface RequirementTemplate {
  id: number;
  name: string;
  description: string;
}

const initialTemplates: RequirementTemplate[] = [
  { id: 1, name: 'Income Verification', description: 'Collect payslips and bank statements' },
  { id: 2, name: 'Identity Verification', description: 'Collect government-issued ID' },
  { id: 3, name: 'Employment Verification', description: 'Collect employment contract and contact details' },
]

export default function RequirementTemplates() {
  const router = useRouter()
  const [templates, setTemplates] = useState<RequirementTemplate[]>(initialTemplates)
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    instruction: '',
    type: ''
  })

  const handleEditTemplate = (id: number) => {
    // Implement edit functionality here
    console.log(`Editing template with id: ${id}`)
  }

  const handleAddTemplate = () => {
    setShowAddForm(true)
  }

  const handleSaveTemplate = () => {
    // Implement save functionality here
    console.log('Saving new template:', newTemplate)
    setShowAddForm(false)
    setNewTemplate({ title: '', instruction: '', type: '' })
  }

  const handleCreateForm = () => {
    router.push('/workspace/form-builder')
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold leading-6 text-gray-900">
                  {showAddForm ? 'Add requirement' : 'Requirement Templates'}
                </h2>
                {!showAddForm && (
                  <button
                    onClick={handleAddTemplate}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Template
                  </button>
                )}
              </div>
              {showAddForm ? (
                <div className="bg-white mb-4">
                  <div className="bg-blue-50 p-3 rounded-md mb-4">
                    <p className="text-sm text-blue-800">
                      Streamline the creation process by importing preconfigured templates. 
                      <a href="#" className="underline ml-1">View here.</a>
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Requirement title</label>
                      <input
                        type="text"
                        id="title"
                        value={newTemplate.title}
                        onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Requirement title"
                      />
                    </div>
                    <div>
                      <label htmlFor="instruction" className="block text-sm font-medium text-gray-700">Requirement instruction (optional)</label>
                      <textarea
                        id="instruction"
                        value={newTemplate.instruction}
                        onChange={(e) => setNewTemplate({...newTemplate, instruction: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Add a helpful instruction to assist your client in returning the information required"
                      />
                    </div>
                    <div>
                      <label htmlFor="type" className="block text-sm font-medium text-gray-700">Requirement type</label>
                      <select
                        id="type"
                        value={newTemplate.type}
                        onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Choose an option...</option>
                        <option value="document_upload">Document upload</option>
                        <option value="custom_form">Custom form</option>
                      </select>
                    </div>
                    {newTemplate.type === 'custom_form' && (
                      <div>
                        <button
                          onClick={handleCreateForm}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Create form
                        </button>
                      </div>
                    )}
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => setShowAddForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveTemplate}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
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
              )}
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                Preview
              </h2>
              <div className="bg-gray-100 rounded-md flex-grow p-6 overflow-auto">
                {showAddForm ? (
                  newTemplate.title || newTemplate.instruction ? (
                    <div>
                      <h3 className="font-medium">{newTemplate.title}</h3>
                      <p className="text-gray-600 mt-2">{newTemplate.instruction}</p>
                      <p className="text-gray-500 mt-4">Type: {newTemplate.type === 'document_upload' ? 'Document upload' : 'Custom form'}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">The survey doesn't contain any visible elements.</p>
                  )
                ) : (
                  <p className="text-gray-500">
                    {templates.find(t => t.id === selectedTemplate)?.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}