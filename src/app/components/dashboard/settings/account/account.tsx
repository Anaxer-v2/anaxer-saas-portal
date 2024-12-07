'use client'

import React, { useState } from 'react'
import Button from '../../../shared/button'
import { Switch } from '@headlessui/react'

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  twoFactorEnabled: boolean;
  marketingCommunication: boolean;
  productUpdateCommunication: boolean;
}

export default function AccountSettings() {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    mobile: '+1 (555) 123-4567',
    twoFactorEnabled: false,
    marketingCommunication: true,
    productUpdateCommunication: true,
  })

  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [isCurrentPasswordCorrect, setIsCurrentPasswordCorrect] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Profile updated:', profile)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCurrentPasswordCorrect) {
      // Check if current password is correct
      // This is a placeholder, replace with actual password verification logic
      if (currentPassword === 'correctpassword') {
        setIsCurrentPasswordCorrect(true)
      } else {
        alert('Current password is incorrect')
      }
    } else if (newPassword === confirmPassword) {
      // Handle password change logic here
      console.log('Password changed')
      setIsChangingPassword(false)
      setCurrentPassword('')
      setIsCurrentPasswordCorrect(false)
      setNewPassword('')
      setConfirmPassword('')
    } else {
      alert('New passwords do not match')
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold leading-6 text-gray-900 mb-6">Account Settings</h2>
      
      <div className="mb-8 max-w-[650px]">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Personal Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={profile.firstName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={profile.lastName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            id="mobile"
            value={profile.mobile}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Security Settings</h3>
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <Switch
              checked={profile.twoFactorEnabled}
              onChange={(checked) => setProfile(prev => ({ ...prev, twoFactorEnabled: checked }))}
              className={`${profile.twoFactorEnabled ? 'bg-[#247bff]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable Two-Factor Authentication</span>
              <span
                className={`${profile.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-md">
          {!isChangingPassword ? (
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
              <Button
                variant="outline"
                onClick={() => setIsChangingPassword(true)}
              >
                Change Password
              </Button>
            </div>
          ) : (
            <div className="space-y-4 max-w-[700px]">
              <h4 className="text-sm font-medium text-gray-900">Change Password</h4>
              <input
                type="password"
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {isCurrentPasswordCorrect && (
                <>
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </>
              )}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsChangingPassword(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handlePasswordChange}>
                  {isCurrentPasswordCorrect ? 'Update Password' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="marketingCommunication" className="text-sm text-gray-900">
              Receive Marketing Communications
            </label>
            <Switch
              checked={profile.marketingCommunication}
              onChange={(checked) => setProfile(prev => ({ ...prev, marketingCommunication: checked }))}
              className={`${profile.marketingCommunication ? 'bg-[#247bff]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Receive Marketing Communications</span>
              <span
                className={`${profile.marketingCommunication ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <label htmlFor="productUpdateCommunication" className="text-sm text-gray-900">
              Receive Product Update Communications
            </label>
            <Switch
              checked={profile.productUpdateCommunication}
              onChange={(checked) => setProfile(prev => ({ ...prev, productUpdateCommunication: checked }))}
              className={`${profile.productUpdateCommunication ? 'bg-[#247bff]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Receive Product Update Communications</span>
              <span
                className={`${profile.productUpdateCommunication ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  )
}