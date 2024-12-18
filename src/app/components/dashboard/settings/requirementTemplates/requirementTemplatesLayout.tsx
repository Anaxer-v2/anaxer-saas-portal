'use client'

import React, { useState, useEffect } from 'react'
import CardOption from '@/app/components/shared/cardOption'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { SurveyPreview } from './surveyPreview'
import ModalAlert from '@/app/components/shared/modalAlert'

interface RequirementTemplate {
  id: string;
  title: string;
  instruction: string | null;
  type: 'document_upload' | 'custom_form';
  form_json: any;
}

export default function RequirementTemplates() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient<Database>()
  const [templates, setTemplates] = useState<RequirementTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    instruction: '',
    type: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const [formJson, setFormJson] = useState<any>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<RequirementTemplate | null>(null)

  useEffect(() => {
    void fetchTemplates()

    // Check for form data in URL when returning from form builder
    const formData = searchParams.get('formData')
    if (formData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(formData))
        
        // First, ensure we have the correct template ID
        if (decodedData.id) {
          setSelectedTemplate(decodedData.id)
          setIsEditing(true)
        }

        // Then set the template data
        setNewTemplate({
          title: decodedData.title || '',
          instruction: decodedData.instruction || '',
          type: decodedData.type || ''
        })

        // If returnToEdit is true or we have form_json, show the edit form
        if (decodedData.returnToEdit || decodedData.form_json) {
          setShowAddForm(true)
          if (decodedData.form_json) {
            setFormJson(decodedData.form_json)
          }
        }

        // Clear the URL parameters after processing
        const url = new URL(window.location.href);
        url.searchParams.delete('formData');
        router.replace(url.pathname);
      } catch (error) {
        console.error('Error parsing form data:', error)
      }
    }
  }, [searchParams, router])

  const fetchTemplates = async () => {
    try {
      setIsLoading(true)
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError

      if (!session?.user?.id) return

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single()
      
      if (profileError) throw profileError

      const { data: entity, error: entityError } = await supabase
        .from('entities')
        .select('id')
        .eq('created_by', profile.id)
        .single()

      if (entityError) throw entityError

      const { data: templates, error: templatesError } = await supabase
        .from('requirement_templates')
        .select('*')
        .eq('entity_id', entity.id)
        .order('created_at', { ascending: true })

      if (templatesError) throw templatesError

      setTemplates(templates as RequirementTemplate[])
      // Set the first template as selected if none is selected and templates exist
      if (!selectedTemplate && templates && templates.length > 0) {
        setSelectedTemplate(templates[0].id)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTemplate = (id: string) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      // First set the selected template ID
      setSelectedTemplate(id)
      
      // Then set the form data
      setNewTemplate({
        title: template.title,
        instruction: template.instruction || '',
        type: template.type
      })
      
      // If it's a custom form, store the form JSON for later use
      if (template.type === 'custom_form') {
        setFormJson(template.form_json)
      }
      
      setIsEditing(true)
      setShowAddForm(true)
    }
  }

  const handleAddTemplate = () => {
    setNewTemplate({ title: '', instruction: '', type: '' })
    setIsEditing(false)
    setSelectedTemplate(null) // Clear selected template when adding new
    setFormJson(null)
    setShowAddForm(true)
  }

  const handleSaveTemplate = async () => {
    try {
      if (!newTemplate.title || !newTemplate.type) {
        alert('Please fill in all required fields')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user?.id) return

      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single()

      if (!profile) return

      const { data: entity } = await supabase
        .from('entities')
        .select('id')
        .eq('created_by', profile.id)
        .single()

      if (!entity) return

      // Prepare the template data
      const templateData = {
        title: newTemplate.title,
        instruction: newTemplate.instruction || null,
        type: newTemplate.type as 'document_upload' | 'custom_form',
        form_json: formJson // Include the form JSON if it exists
      }

      let templateId = selectedTemplate;

      if (isEditing && templateId) {
        console.log('Updating template with ID:', templateId) // Debug log
        // Update existing template
        const { error } = await supabase
          .from('requirement_templates')
          .update(templateData)
          .eq('id', templateId)

        if (error) throw error
      } else {
        // Create new template
        const { data, error } = await supabase
          .from('requirement_templates')
          .insert([{
            ...templateData,
            entity_id: entity.id,
            created_by: session.user.id,
          }])
          .select()

        if (error) throw error
        if (data && data[0]) {
          templateId = data[0].id
        }
      }

      // Only redirect to form builder if we're not returning from it
      if (newTemplate.type === 'custom_form' && !formJson) {
        handleCreateForm()
        return
      }

      await fetchTemplates() // Fetch templates first

      // Reset form state but keep the template selected
      setShowAddForm(false)
      setIsEditing(false)
      setNewTemplate({ title: '', instruction: '', type: '' })
      setFormJson(null)
      setSelectedTemplate(templateId) // Keep the saved template selected

    } catch (error) {
      console.error('Error saving template:', error)
      alert('Error saving template')
    }
  }

  const handleCreateForm = () => {
    // Pass the current template data to the form builder
    const templateData = {
      id: selectedTemplate, // Pass the ID when editing
      title: newTemplate.title,
      instruction: newTemplate.instruction,
      type: newTemplate.type,
      form_json: formJson // Pass existing form JSON if editing
    }
    const encodedData = encodeURIComponent(JSON.stringify(templateData))
    router.push(`/workspace/form-builder?templateData=${encodedData}`)
  }

  const getSelectedTemplate = () => {
    if (!selectedTemplate) return null;
    return templates.find(t => t.id === selectedTemplate) || null;
  };

  const handleDeleteClick = (id: string) => {
    const template = templates.find(t => t.id === id)
    if (template) {
      setTemplateToDelete(template)
      setDeleteModalOpen(true)
    }
  }

  const handleDeleteTemplate = async () => {
    if (!templateToDelete) return

    try {
      const { error } = await supabase
        .from('requirement_templates')
        .delete()
        .eq('id', templateToDelete.id)

      if (error) throw error

      // If we're deleting the currently selected template, clear the selection
      if (selectedTemplate === templateToDelete.id) {
        setSelectedTemplate(null)
      }

      // Refresh the templates list
      await fetchTemplates()
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('Error deleting template')
    }
  }

  if (isLoading) {
    return (
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <div className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                    {showAddForm ? (isEditing ? 'Edit requirement' : 'Add requirement') : 'Requirement Templates'}
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
                    {!isEditing && (
                      <div className="bg-blue-50 p-3 rounded-md mb-4">
                        <p className="text-sm text-blue-800">
                          Streamline the creation process by importing preconfigured templates. 
                          <a href="#" className="underline ml-1">View here.</a>
                        </p>
                      </div>
                    )}
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
                            {isEditing && formJson ? 'Edit form' : 'Create form'}
                          </button>
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => {
                            setShowAddForm(false)
                            setIsEditing(false)
                            setNewTemplate({ title: '', instruction: '', type: '' })
                            setFormJson(null)
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveTemplate}
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {isEditing ? 'Update' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 mt-6">
                    {templates.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">No templates found. Click 'Add Template' to create one.</p>
                    ) : (
                      templates.map((template) => (
                        <CardOption
                          key={template.id}
                          id={template.id}
                          name={template.title}
                          isSelected={selectedTemplate === template.id}
                          onSelect={setSelectedTemplate}
                          onEdit={() => handleEditTemplate(template.id)}
                          onDelete={() => handleDeleteClick(template.id)}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                    Preview
                  </h2>
                </div>
                <div className="bg-gray-100 rounded-md flex-grow p-6 overflow-auto mt-6">
                  {showAddForm ? (
                    newTemplate.title || newTemplate.instruction ? (
                      <div className="bg-white rounded-md p-6">
                        <h3 className="text-lg font-medium">{newTemplate.title}</h3>
                        {newTemplate.instruction && (
                          <p className="text-gray-600 mt-2 mb-6">{newTemplate.instruction}</p>
                        )}
                        {newTemplate.type === 'custom_form' && formJson && (
                          <SurveyPreview formJson={formJson} />
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500">The requirement doesn't contain any visible elements yet.</p>
                    )
                  ) : (
                    selectedTemplate ? (
                      <div>
                        {(() => {
                          const template = getSelectedTemplate();
                          if (!template) return <p className="text-gray-500">No preview available.</p>;
                          
                          return (
                            <div className="bg-white rounded-md p-6">
                              <h3 className="text-lg font-medium">{template.title}</h3>
                              {template.instruction && (
                                <p className="text-gray-600 mt-2 mb-6">{template.instruction}</p>
                              )}
                              {template.type === 'custom_form' && template.form_json && (
                                <SurveyPreview formJson={template.form_json} />
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <p className="text-gray-500">Select a template to preview.</p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalAlert
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setTemplateToDelete(null)
        }}
        title={`Delete "${templateToDelete?.title}" template`}
        message="Are you sure you want to delete this requirement template? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDeleteTemplate}
        type="danger"
      />
    </>
  )
}