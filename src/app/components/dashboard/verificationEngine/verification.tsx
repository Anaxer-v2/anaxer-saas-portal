'use client'

import React, { useState } from 'react'
import { GoCheck, GoX, GoPencil } from 'react-icons/go'

// Mock data
const customerDetails = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  comments: 'Customer has requested expedited processing.'
}

const requirements = [
  { id: 1, type: 'document', name: 'Payslips', status: 'verified' },
  { id: 2, type: 'document', name: 'Bank statements', status: 'unverified' },
  { id: 3, type: 'form', name: 'Employment details', status: 'agent_reviewed' },
  { id: 4, type: 'document', name: 'Driver licence', status: 'verified' },
  { id: 5, type: 'form', name: 'Income details', status: 'rejected' }
]

export default function Verification() {
  const [selectedRequirement, setSelectedRequirement] = useState(requirements[0])
  const [isEditingComments, setIsEditingComments] = useState(false)
  const [comments, setComments] = useState(customerDetails.comments)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-500'
      case 'unverified':
        return 'bg-gray-500'
      case 'rejected':
        return 'bg-red-500'
      case 'agent_reviewed':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{customerDetails.name}</h2>
        <div className="min-h-[700px] flex flex-col">
          <div className="flex space-x-8 flex-grow">
            {/* Left side */}
            <div className="w-[400px] flex-shrink-0 border-r border-gray-200 pr-8">
              {/* Customer details */}
              <div className="mb-6">
                <p><strong>Email:</strong> {customerDetails.email}</p>
                <p><strong>Phone:</strong> {customerDetails.phone}</p>
              </div>
              
              {/* Comments section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">Comments</h3>
                  <button 
                    className="p-1 text-gray-600 hover:text-gray-800"
                    onClick={() => setIsEditingComments(!isEditingComments)}
                  >
                    <GoPencil size={16} />
                  </button>
                </div>
                {isEditingComments ? (
                  <textarea 
                    className="w-full p-2 border border-gray-300 rounded-md" 
                    rows={4} 
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                ) : (
                  <p className="text-gray-700">{comments}</p>
                )}
              </div>
              
              {/* Requirements list */}
              <h3 className="text-xl font-semibold mb-2">Requirements</h3>
              <div className="space-y-2 overflow-y-auto flex-grow">
                {requirements.map((req) => (
                  <div
                    key={req.id}
                    className={`
                      flex items-center justify-between p-3 rounded-md cursor-pointer
                      ${selectedRequirement.id === req.id ? 'bg-blue-50 border border-blue-200' : 'bg-white border border-gray-200'}
                      hover:bg-gray-50 transition-colors duration-150 ease-in-out
                    `}
                    onClick={() => setSelectedRequirement(req)}
                  >
                    <h3 className="text-sm font-medium text-gray-700">{req.name}</h3>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(req.status)}`}></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex-grow flex flex-col pl-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">{selectedRequirement.name}</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-150">
                    <GoCheck size={20} />
                  </button>
                  <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-150">
                    <GoX size={20} />
                  </button>
                </div>
              </div>
              {selectedRequirement.type === 'document' ? (
                <div className="bg-gray-100 rounded-lg p-4 flex-grow">
                  <div className="bg-white rounded-md mb-4 p-4">
                    <h4 className="font-bold mb-2">Document Details</h4>
                    <div className="space-y-2">
                      <p><strong>Document Type:</strong> {selectedRequirement.name}</p>
                      <p><strong>Date Submitted:</strong> 2023-05-15</p>
                      <p><strong>File Name:</strong> {selectedRequirement.name.toLowerCase().replace(' ', '_')}.pdf</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-md p-4 h-[calc(100vh-300px)] overflow-auto">
                    <div className="w-full max-w-[595px] mx-auto" style={{ aspectRatio: '1 / 1.4142' }}>
                      <div className="w-full h-full border-2 border-gray-300 p-8 shadow-md bg-white overflow-auto">
                        <h2 className="text-2xl font-bold text-center mb-4">PAYSLIP</h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p><strong>Employee:</strong> John Doe</p>
                            <p><strong>Employee ID:</strong> EMP12345</p>
                          </div>
                          <div>
                            <p><strong>Pay Period:</strong> 01/05/2023 - 15/05/2023</p>
                            <p><strong>Pay Date:</strong> 20/05/2023</p>
                          </div>
                        </div>
                        <table className="w-full border-collapse border border-gray-300 mb-4">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2">Description</th>
                              <th className="border border-gray-300 p-2">Hours</th>
                              <th className="border border-gray-300 p-2">Rate</th>
                              <th className="border border-gray-300 p-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-2">Regular Pay</td>
                              <td className="border border-gray-300 p-2 text-right">80</td>
                              <td className="border border-gray-300 p-2 text-right">$25.00</td>
                              <td className="border border-gray-300 p-2 text-right">$2,000.00</td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">Overtime Pay</td>
                              <td className="border border-gray-300 p-2 text-right">5</td>
                              <td className="border border-gray-300 p-2 text-right">$37.50</td>
                              <td className="border border-gray-300 p-2 text-right">$187.50</td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-between">
                          <div>
                            <p><strong>Gross Pay:</strong> $2,187.50</p>
                            <p><strong>Deductions:</strong> $437.50</p>
                          </div>
                          <div>
                            <p><strong>Net Pay:</strong> $1,750.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 rounded-lg p-4 flex-grow">
                  <div className="bg-white rounded-md p-4">
                    <p className="mb-2">Form details:</p>
                    <div className="space-y-2">
                      <input type="text" placeholder="Field 1" className="w-full p-2 border rounded" />
                      <input type="text" placeholder="Field 2" className="w-full p-2 border rounded" />
                      <textarea placeholder="Additional information" className="w-full p-2 border rounded" rows={4}></textarea>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}