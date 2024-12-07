import React, { useState } from 'react';
import { ArrowLeftIcon, UserCircleIcon, EnvelopeIcon, PhoneIcon, MapPinIcon, PencilIcon, CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function ClientOverview() {
  const router = useRouter();
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, text: 'Client prefers email communication', timestamp: '2023-06-15T14:30:00', author: 'Jane Smith' },
    { id: 2, text: 'Discussed new product launch', timestamp: '2023-06-10T09:15:00', author: 'John Doe' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St., Suite 100, New York, NY 10001'
  });

  const [requests, setRequests] = useState({
    outstanding: [
      { id: 1, title: 'Financial Statement', description: 'Annual financial statement for 2022' },
      { id: 2, title: 'Tax Returns', description: 'Last 3 years of tax returns' },
    ],
    pendingReview: [
      { id: 3, title: 'Business Plan', description: 'Updated business plan for next fiscal year' },
    ],
    verified: [
      { id: 4, title: 'Proof of Address', description: 'Utility bill or bank statement' },
    ],
  });

  const addNote = () => {
    if (newNote.trim()) {
      const now = new Date();
      setNotes([
        { 
          id: notes.length + 1, 
          text: newNote, 
          timestamp: now.toISOString(), 
          author: 'Current User' 
        },
        ...notes
      ]);
      setNewNote('');
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleNoteAction = (noteId: number, action: 'edit' | 'delete' | 'pin') => {
    // Implement the logic for edit, delete, and pin actions
    console.log(`${action} note with id ${noteId}`);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const handleAddRequest = () => {
    // Implement logic to add a new request
    console.log('Add new request');
  };

  const handleReviewRequest = (requestId: number) => {
    // Implement logic to review a request
    console.log(`Review request ${requestId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold">John Doe</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="bg-white p-6 rounded-lg shadow relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <button onClick={toggleEdit} className="text-gray-600 hover:text-gray-900">
              {isEditing ? <CheckIcon className="h-5 w-5" /> : <PencilIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <UserCircleIcon className="h-5 w-5 text-gray-400 mr-2" />
              {isEditing ? (
                <input
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-black"
                />
              ) : (
                <p className="font-medium">{contactInfo.name}</p>
              )}
            </div>
            <div className="flex items-center">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
              {isEditing ? (
                <input
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-black"
                />
              ) : (
                <p>{contactInfo.email}</p>
              )}
            </div>
            <div className="flex items-center">
              <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
              {isEditing ? (
                <input
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-black"
                />
              ) : (
                <p>{contactInfo.phone}</p>
              )}
            </div>
            <div className="flex items-center">
              <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
              {isEditing ? (
                <input
                  name="address"
                  value={contactInfo.address}
                  onChange={handleContactInfoChange}
                  className="border-b border-gray-300 focus:outline-none focus:border-black"
                />
              ) : (
                <p>{contactInfo.address}</p>
              )}
            </div>
          </div>

          {/* Notes Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <div className="mb-4">
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Add a new note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={2}
              ></textarea>
              <button
                className="mt-2 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors float-right"
                onClick={addNote}
              >
                Add Note
              </button>
            </div>
            <div className="clear-both"></div>
            <div className="mt-4 space-y-4">
              {notes.map((note) => (
                <div 
                  key={note.id} 
                  className="border-b pb-2 flex justify-between items-start hover:bg-gray-50 transition-colors duration-150 ease-in-out p-2 rounded"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{formatTimestamp(note.timestamp)} - {note.author}</p>
                    <p className="text-sm text-gray-600">{note.text}</p>
                  </div>
                  <div className="relative">
                    <EllipsisVerticalIcon className="h-5 w-5 text-gray-400 cursor-pointer" onClick={() => {/* Toggle menu visibility */}} />
                    {/* Dropdown menu (hidden by default) */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 hidden">
                      <div className="py-1">
                        <button onClick={() => handleNoteAction(note.id, 'edit')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Edit</button>
                        <button onClick={() => handleNoteAction(note.id, 'delete')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Delete</button>
                        <button onClick={() => handleNoteAction(note.id, 'pin')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">Pin</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Requests Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Requests</h3>
            <button 
              onClick={handleAddRequest}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Add Request
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>

          {/* Outstanding Requests */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Outstanding</h4>
            {requests.outstanding.map((request) => (
              <div key={request.id} className="bg-gray-50 p-3 rounded mb-2">
                <h5 className="font-medium">{request.title}</h5>
                <p className="text-sm text-gray-600">{request.description}</p>
              </div>
            ))}
          </div>

          {/* Pending Review Requests */}
          <div className="mb-6">
            <h4 className="font-medium mb-2">Pending Review</h4>
            {requests.pendingReview.map((request) => (
              <div key={request.id} className="bg-gray-50 p-3 rounded mb-2 flex justify-between items-center">
                <div>
                  <h5 className="font-medium">{request.title}</h5>
                  <p className="text-sm text-gray-600">{request.description}</p>
                </div>
                <button 
                  onClick={() => handleReviewRequest(request.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Review
                </button>
              </div>
            ))}
          </div>

          {/* Verified Requests */}
          <div>
            <h4 className="font-medium mb-2">Verified</h4>
            {requests.verified.map((request) => (
              <div key={request.id} className="bg-gray-50 p-3 rounded mb-2">
                <h5 className="font-medium">{request.title}</h5>
                <p className="text-sm text-gray-600">{request.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}