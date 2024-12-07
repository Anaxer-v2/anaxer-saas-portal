'use client'

import React, { useState } from 'react'
import { AgentStatus } from '../../../types/aiAgents'
import { MdEdit, MdCheck } from 'react-icons/md'
import Button from '../../shared/button'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// Define the RequirementTemplate type
interface RequirementTemplate {
  id: string;
  name: string;
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
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
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
    `.trim(),
    editable: isEditingInstructions,
  })

  const handleEditInstructions = () => {
    if (isEditingInstructions && editor) {
      // Save logic here if needed
      editor.setEditable(false)
    } else if (editor) {
      editor.setEditable(true)
    }
    setIsEditingInstructions(!isEditingInstructions)
  }

  return (
    <div className="mb-6">
      <style jsx global>{`
        .ProseMirror {
          min-height: 200px;
          padding: 1rem;
          border-radius: 0.375rem;
          outline: none;
        }
        .ProseMirror p {
          margin: 1em 0;
        }
        .ProseMirror ul {
          padding-left: 1em;
          margin: 1em 0;
        }
        .ProseMirror.ProseMirror-focused {
          outline: none;
          border-color: #3b82f6;
        }
        .editing-mode .ProseMirror {
          border: 1px solid #e2e8f0;
        }
        .read-only-mode .ProseMirror {
          border: none;
        }
      `}</style>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-700">Agent prompt</h3>
        <button
          onClick={handleEditInstructions}
          className="text-blue-500 hover:text-blue-600"
        >
          {isEditingInstructions ? <MdCheck size={20} /> : <MdEdit size={20} />}
        </button>
      </div>
      <div className={`editor-container ${isEditingInstructions ? 'editing-mode' : 'read-only-mode'}`}>
        <EditorContent editor={editor} />
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
