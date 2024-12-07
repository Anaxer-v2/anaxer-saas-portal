import React from 'react'

interface CardOptionProps {
  id: number
  name: string
  isSelected: boolean
  onSelect: (id: number) => void
  onEdit: () => void
}

export default function CardOption({ id, name, isSelected, onSelect, onEdit }: CardOptionProps) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-md cursor-pointer border ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
      }`}
      onClick={() => onSelect(id)}
    >
      <div className="flex items-center">
        <div className={`w-4 h-4 rounded-full mr-3 border ${
          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        } flex items-center justify-center`}>
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-white" />
          )}
        </div>
        <span className="text-sm text-gray-700">{name}</span>
      </div>
      <button className="text-gray-400 hover:text-gray-600" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>
  )
}