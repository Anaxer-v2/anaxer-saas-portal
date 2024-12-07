'use client'

import React, { useRef, useCallback, useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
} from 'react-flow-renderer';
import Sidebar from './journey-builder-sidebar';
import CustomNode from './customNode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { RequirementTemplate } from '../dashboard/verificationEngine/aiAgentsCard';

const nodeTypes = {
  custom: CustomNode,
};

const JourneyBuilderLayout: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const initialTemplates: RequirementTemplate[] = [
    'Payslips',
    'Bank statements',
    'Driver licence',
    'Passport',
    'Tax return',
    'Medicare card',
    'Employment details',
    'Income details',
    'Debts and liabilities',
    'Living expenses',
  ];

  const [availableTemplates, setAvailableTemplates] = useState<RequirementTemplate[]>(
    initialTemplates.sort((a, b) => a.localeCompare(b))
  );

  const onConnect = useCallback(
    (params: Edge<any> | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const removeNode = useCallback(
    (id: string) => {
      const nodeToRemove = nodes.find((node) => node.id === id);
      if (nodeToRemove) {
        setAvailableTemplates((templates) => {
          const updatedTemplates = [...templates, nodeToRemove.data.label];
          return updatedTemplates.sort((a, b) => a.localeCompare(b));
        });
      }
      setNodes((nds) => nds.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    },
    [nodes, setAvailableTemplates, setNodes, setEdges]
  );

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type || !reactFlowBounds) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Adjust the position to account for the node's height
      const nodeHeight = 50; // Estimate the height of your custom node
      position.y -= nodeHeight / 2;

      const newNode = {
        id: `${type}_${nodes.length}`,
        type: 'custom',
        position,
        data: { label: type, type: 'requirementTemplate', removeNode },
      };

      setNodes((nds) => nds.concat(newNode));
      setAvailableTemplates((templates) => templates.filter((t) => t !== type));
    },
    [nodes, setNodes, setAvailableTemplates, removeNode]
  );

  const router = useRouter();

  const handleSaveAndClose = () => {
    // TODO: Implement save functionality here
    router.push('/workspace/settings/journey-templates');
  };

  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-screen">
        <header className="bg-gray-900 text-white">
          <div className="mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <Image 
                src="/assets/Anaxer_white.svg" 
                alt="Anaxer Logo" 
                width={150}
                height={41}
              />
              <div className="ml-4 flex items-center">
                <div className="h-6 w-0.5 bg-white" />
                <h1 className="ml-4 text-2xl font-semibold">Build a customer journey template</h1>
              </div>
            </div>
            <div className="space-x-4">
              <button
                onClick={handleSaveAndClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAndClose}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </div>
        </header>
        <div className="flex flex-grow">
          <Sidebar availableTemplates={availableTemplates} />
          <div className="flex-grow bg-gray-100 relative" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes.map((node) => ({ ...node, data: { ...node.data, removeNode } }))}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodesDelete={(deletedNodes) => deletedNodes.forEach(node => removeNode(node.id))}
              fitView
              nodeTypes={nodeTypes}
              defaultEdgeOptions={{
                style: { stroke: '#247BFF', strokeWidth: 2 },
                type: 'smoothstep',
                animated: true,
              }}
            >
              <Background color="#aaa" gap={16} />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default JourneyBuilderLayout;