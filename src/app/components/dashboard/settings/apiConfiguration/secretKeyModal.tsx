import React, { useState, useEffect, useRef } from 'react';

interface CreateSecretKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (name: string, permissions: string) => void;
}

const CreateSecretKeyModal: React.FC<CreateSecretKeyModalProps> = ({ isOpen, onClose, onCreateKey }) => {
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState('full-access');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const permissionOptions = [
    { value: 'full-access', label: 'Full access' },
    { value: 'restricted', label: 'Restricted' },
    { value: 'read-only', label: 'Read Only' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div ref={modalRef} className="p-8 border w-full max-w-[800px] shadow-lg rounded-md bg-white">
        <h3 className="text-lg font-semibold mb-4">Create new secret key</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name (Optional)</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Test Key"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="flex space-x-2">
            {permissionOptions.map((option) => (
              <button
                key={option.value}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  permissions === option.value
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setPermissions(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end items-center space-x-6">
          <button
            className="text-gray-600 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#247bff] text-white rounded-md hover:bg-[#357ABD] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A90E2]"
            onClick={() => {
              onCreateKey(name, permissions);
              onClose();
            }}
          >
            Create secret key
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSecretKeyModal;