'use client'

import React, { useState } from 'react'
import CreateSecretKeyModal from './secretKeyModal'

interface SecretKey {
  name: string;
  secretKey: string;
  created: string;
  lastUsed: string;
  permissions: string;
}

interface Webhook {
  url: string;
  created: string;
  events: string;
}

export const initialSecretKeys: SecretKey[] = [
  {
    name: 'Production Key',
    secretKey: 'sk_live_**********************ABCD',
    created: 'Mar 15, 2024',
    lastUsed: '2 hours ago',
    permissions: 'Full access',
  },
  {
    name: 'Test Key',
    secretKey: 'sk_test_**********************EFGH',
    created: 'Mar 10, 2024',
    lastUsed: '1 day ago',
    permissions: 'Read-only',
  },
]

const initialWebhooks: Webhook[] = [
  {
    url: 'https://api.required.app/api/35hUIBHe/collection/add',
    created: 'Feb 21, 2024',
    events: 'Restricted',
  },
  {
    url: 'https://webhook.site/123456789',
    created: 'Mar 1, 2024',
    events: 'All events',
  },
]

export default function APIConfiguration() {
  const [secretKeys, setSecretKeys] = useState<SecretKey[]>(initialSecretKeys)
  const [webhooks, setWebhooks] = useState<Webhook[]>(initialWebhooks)
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);

  const maskSecretKey = (key: string) => {
    const visiblePart = key.slice(-4);
    return `sk_****${visiblePart}`;
  };

  const handleCreateKey = (name: string, permissions: string) => {
    // Logic to create a new secret key
    const newKey: SecretKey = {
      name: name || `Key ${secretKeys.length + 1}`,
      secretKey: `sk_live_${Math.random().toString(36).substr(2, 9)}`,
      created: new Date().toLocaleDateString(),
      lastUsed: 'Never',
      permissions: permissions,
    };
    setSecretKeys([...secretKeys, newKey]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-12">
          <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">API keys</h2>
          <div className="max-w-[800px] mb-8">
            <p className="text-sm text-gray-500 mb-4">
              Below are your confidential API keys. Remember, these keys will not be visible again after their initial generation.
            </p>
            <p className="text-sm text-gray-500">
              Keep your API key private and avoid sharing it. Additionally, refrain from incorporating it into client-side code or web browsers. To safeguard your account's security, we may proactively deactivate any API key that appears to have been disclosed publicly.
            </p>
          </div>
          <table className="min-w-full divide-y divide-gray-300 mb-6">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Secret key</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last used</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Permissions</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {secretKeys.map((key, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{key.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">{maskSecretKey(key.secretKey)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{key.created}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{key.lastUsed}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{key.permissions}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button className="text-red-600 hover:text-red-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="mt-6 rounded-md bg-[#247bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1a5cd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247bff]"
            onClick={() => setIsCreateKeyModalOpen(true)}
          >
            Create new secret key
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">Webhook subscription</h2>
          <div className="max-w-[800px] mb-8">
            <p className="text-sm text-gray-500">
              Enhance your integration with our platform by subscribing to our Webhook service. This feature enables you to set up custom webhooks, allowing our system to automatically push real-time event notifications directly to your specified endpoint.
            </p>
          </div>
          <table className="min-w-full divide-y divide-gray-300 mb-6">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Webhook</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Events</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {webhooks.map((webhook, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{webhook.url}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{webhook.created}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{webhook.events}</td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="mt-6 rounded-md bg-[#247bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1a5cd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247bff]"
          >
            Add new webhook
          </button>
        </div>
      </div>

      <CreateSecretKeyModal
        isOpen={isCreateKeyModalOpen}
        onClose={() => setIsCreateKeyModalOpen(false)}
        onCreateKey={handleCreateKey}
      />
    </div>
  )
}