'use client'

import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import CardOption from '@/app/components/shared/cardOption'

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
}

interface EmailConfig {
  templates: EmailTemplate[];
  senderIdentity: {
    verified: boolean;
    email: string;
  };
  notificationSettings: {
    sendReminders: boolean;
    reminderFrequency: number;
    enforceBlackout: boolean;
    blackoutTime: string;
  };
}

const initialEmailConfig: EmailConfig = {
  templates: [
    { id: 1, name: 'Welcome Email', subject: 'Welcome!', content: 'Welcome content...' },
    { id: 2, name: 'Verification Email', subject: 'Verify your account', content: 'Verification content...' },
    { id: 3, name: 'All information has been provided', subject: 'All information has been provided', content: 'All information has been provided content...' },
    { id: 4, name: 'We need some more information', subject: 'We need some more information', content: 'We need some more information content...' },
  ],
  senderIdentity: {
    verified: true,
    email: 'example@business.com',
  },
  notificationSettings: {
    sendReminders: true,
    reminderFrequency: 3,
    enforceBlackout: true,
    blackoutTime: '21:00',
  },
}

export default function EmailConfiguration() {
  const [config, setConfig] = useState<EmailConfig>(initialEmailConfig)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const handleInputChange = (key: string, value: any) => {
    setConfig({ ...config, [key]: value })
  }

  const handleNotificationSettingChange = (key: string, value: any) => {
    setConfig({
      ...config,
      notificationSettings: {
        ...config.notificationSettings,
        [key]: value,
      },
    })
  }

  const handleEditTemplate = (templateId: number) => {
    console.log('Editing template:', templateId)
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">Templates</h2>
              <div className="space-y-2">
                {config.templates.map((template) => (
                  <CardOption
                    key={template.id}
                    id={String(template.id)}
                    name={template.name}
                    isSelected={selectedTemplate === template.id}
                    onSelect={(id: string) => setSelectedTemplate(Number(id))}
                    onEdit={() => handleEditTemplate(template.id)}
                  />
                ))}
              </div>

              <h2 className="text-xl font-semibold leading-6 text-gray-900 mt-8 mb-4">Sender identity</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="text-sm text-gray-700">Sender identity is </span>
                  <span className="text-sm font-semibold text-[#097026] ml-1 flex items-center">
                    VERIFIED
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#097026] ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Emails to your customers will be sent from{' '}
                    <a href={`mailto:${config.senderIdentity.email}`} className="underline">
                      {config.senderIdentity.email}
                    </a>
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold leading-6 text-gray-900 mt-8 mb-4">Notification settings</h2>
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Send reminder emails to customers who have outstanding requirements.</span>
                  <Switch
                    checked={config.notificationSettings.sendReminders}
                    onChange={(value) => handleNotificationSettingChange('sendReminders', value)}
                    className={`${config.notificationSettings.sendReminders ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable reminders</span>
                    <span
                      className={`${config.notificationSettings.sendReminders ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                <div className="text-sm font-light text-gray-500">
                  Reminders are sent every {config.notificationSettings.reminderFrequency} days
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">
                Template preview - {config.templates.find(t => t.id === selectedTemplate)?.name}
              </h2>
              <div className="bg-gray-100 rounded-md flex-grow p-6 overflow-auto">
                {/* Add your email template preview content here */}
                <p className="text-gray-500">Email template preview placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}