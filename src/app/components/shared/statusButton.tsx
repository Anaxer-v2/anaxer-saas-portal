import React from 'react'

type StatusType = 'off' | 'safety mode' | 'live'

interface StatusButtonProps {
  status: StatusType
  isActive: boolean
  onClick: () => void
}

const statusColors = {
  off: 'bg-gray-400',
  'safety mode': 'bg-amber-400',
  live: 'bg-green-400'
}

export default function StatusButton({ status, isActive, onClick }: StatusButtonProps) {
  return (
    <button
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isActive ? 'bg-white border border-gray-300' : 'bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {status}
        {isActive && (
          <div className={`w-2 h-2 rounded-full ml-2 ${statusColors[status]}`} />
        )}
      </div>
    </button>
  )
}