'use client'

import React, { useState } from 'react'
import Button from '../../../shared/button'
import { Switch } from '@headlessui/react'

interface TeamMember {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  lastLogin: string
  active: boolean
}

interface TeamProps {
  currentPlan: {
    name: string
    maxSeats: number
  }
}

const initialTeamMembers: TeamMember[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', lastLogin: '2023-05-01', active: true },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', lastLogin: '2023-05-02', active: true },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', lastLogin: '2023-05-03', active: true },
]

export default function TeamSettings({ currentPlan }: TeamProps) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers)
  const [newMemberEmail, setNewMemberEmail] = useState('')

  const handleInviteMember = () => {
    if (teamMembers.length >= currentPlan.maxSeats) {
      alert('You have reached the maximum number of seats for your plan. Please upgrade to invite more team members.')
      return
    }

    const newMember: TeamMember = {
      id: (teamMembers.length + 1).toString(),
      name: 'New Member',
      email: newMemberEmail,
      role: 'Viewer',
      lastLogin: 'Never',
      active: true,
    }

    setTeamMembers([...teamMembers, newMember])
    setNewMemberEmail('')
  }

  const handleToggleActivation = (id: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, active: !member.active } : member
    ))
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-6">Team Settings</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Invite Team Member</h3>
        <div className="flex items-center max-w-[600px]">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter email address"
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <Button onClick={handleInviteMember} className="ml-2 whitespace-nowrap">
            Invite Member
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {teamMembers.length} / {currentPlan.maxSeats} seats used
        </p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Team Members</h3>
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Last Login</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {teamMembers.map((member) => (
              <tr key={member.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{member.name}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.email}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                    {member.role}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{member.lastLogin}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <Switch
                    checked={member.active}
                    onChange={() => handleToggleActivation(member.id)}
                    className={`${member.active ? 'bg-[#247bff]' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Toggle activation</span>
                    <span
                      className={`${member.active ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}