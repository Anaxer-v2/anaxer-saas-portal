// src/app/components/journey-builder/Sidebar.tsx
import React, { useState } from 'react';
import { RequirementTemplate } from '../dashboard/verificationEngine/aiAgentsCard';
import { FaFileAlt, FaBell, FaEnvelope, FaCodeBranch, FaGripHorizontal, FaWpforms } from 'react-icons/fa';

const Sidebar: React.FC<{ 
  availableTemplates: RequirementTemplate[];
}> = ({ availableTemplates }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = availableTemplates.filter(template =>
    template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (template: RequirementTemplate) => {
    if (template === 'Income details' || template === 'Living expenses') {
      return <FaWpforms className="mr-2 text-gray-600" />;
    }
    return <FaFileAlt className="mr-2 text-gray-600" />;
  };

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-80 bg-white shadow-md p-4 pt-8" style={{ boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)' }}>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Requirement templates</h2>
        <input
          type="text"
          placeholder="Search templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <ul className="max-h-72 overflow-y-auto custom-scrollbar">
          {filteredTemplates.map((template) => (
            <li
              key={template}
              onDragStart={(event) => onDragStart(event, template)}
              draggable
              className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700"
            >
              <div className="flex items-center">
                {getIcon(template)} {template}
              </div>
              <FaGripHorizontal className="text-gray-400" />
            </li>
          ))}
        </ul>
        <button className="w-full p-2 mt-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition">
          + Create new requirement
        </button>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Event triggers</h2>
        <ul>
          <li
            onDragStart={(event) => onDragStart(event, 'Trigger webhook')}
            draggable
            className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <div className="flex items-center">
              <FaBell className="mr-2 text-gray-600" /> Trigger webhook
            </div>
            <FaGripHorizontal className="text-gray-400" />
          </li>
          <li
            onDragStart={(event) => onDragStart(event, 'Send email')}
            draggable
            className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <div className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-600" /> Send email
            </div>
            <FaGripHorizontal className="text-gray-400" />
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">Conditional logic</h2>
        <ul>
          <li
            onDragStart={(event) => onDragStart(event, 'Branching logic')}
            draggable
            className="flex items-center justify-between p-2 mb-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700"
          >
            <div className="flex items-center">
              <FaCodeBranch className="mr-2 text-gray-600" /> Branching logic
            </div>
            <FaGripHorizontal className="text-gray-400" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;