'use client'

import React, { useState, useRef, useEffect } from 'react'
import { AgentStatus } from '../../../types/aiAgents'
import StatusButton from '../../shared/statusButton'
import { MdEdit, MdCheck } from 'react-icons/md'
import Button from '../../shared/button'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import dynamic from 'next/dynamic'
import type ReactQuill from 'react-quill';

const ReactQuillComponent = dynamic<React.ComponentProps<typeof ReactQuill> & { readOnly?: boolean, theme?: string }>(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'

// Define the RequirementTemplate type
interface RequirementTemplate {
  id: string;
  name: string;
  // ... other properties
}

interface AgentTrainingProps {
  selectedTemplate: RequirementTemplate | null | undefined;
  agentMode: AgentStatus;
  onModeChange: (mode: AgentStatus) => void;
  onChatClick: () => void;
}

const AgentTraining: React.FC<AgentTrainingProps> = ({
  selectedTemplate,
  agentMode,
  onModeChange,
  onChatClick
}) => {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false)
  const [instructions, setInstructions] = useState(`
<p><strong>Mark the document as verified if all of the conditions are true:</strong></p>
<ul>
  <li>Document is dated within the last 60 days.</li>
  <li>Document contains the client's name.</li>
  <li>Employer name matches the client's employer.</li>
  <li>Document appears to be authentic and matches training data.</li>
</ul>
<br>
<p><strong>Reject the document if any of the following are true:</strong></p>
<ul>
  <li>Document does not contain the clients name.</li>
  <li>Document is dated more than 60 days ago.</li>
</ul>
<br>
<p>If you are unable to make a conclusion, notify me for further review.</p>
  `.trim())

  const handleEditInstructions = () => {
    if (isEditingInstructions) {
      // Save logic here
      // You might want to add logic here to save the instructions to a backend
    }
    setIsEditingInstructions(!isEditingInstructions)
  }

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-700">Agent prompt</h3>
        <button
          onClick={handleEditInstructions}
          className="text-blue-500 hover:text-blue-600"
        >
          {isEditingInstructions ? <MdCheck size={20} /> : <MdEdit size={20} />}
        </button>
      </div>
      <div className={`custom-quill ${isEditingInstructions ? 'editing-mode' : 'read-only-mode'}`}>
        <ReactQuillComponent 
          key={isEditingInstructions ? 'edit' : 'read'}
          value={instructions} 
          onChange={setInstructions}
          modules={isEditingInstructions ? modules : {}}
          readOnly={!isEditingInstructions}
          theme={isEditingInstructions ? 'snow' : 'bubble'}
        />
      </div>
      {!isEditingInstructions && (
        <div className="mt-8">
          <Button
            onClick={onChatClick}
            className="w-[270px] py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-150 ease-in-out flex items-center justify-center"
          >
            <IoChatboxEllipsesOutline className="mr-2" size={20} />
            Chat with your agent
          </Button>
        </div>
      )}
    </div>
  )
}

export default AgentTraining