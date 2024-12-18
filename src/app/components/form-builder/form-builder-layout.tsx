'use client'

import React, { Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { SurveyCreatorWidgetRef } from './surveyCreator';

// Import required styles at the layout level
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';

// Dynamically import the SurveyCreator with no SSR
const SurveyCreatorWidget = dynamic(
  () => import('./surveyCreator').then((mod) => mod.SurveyCreatorWidget),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading Survey Creator...</div>
      </div>
    )
  }
);

interface FormBuilderLayoutProps {
  onSave?: (json: any) => void;
}

const FormBuilderLayout: React.FC<FormBuilderLayoutProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorRef = useRef<SurveyCreatorWidgetRef>(null);
  const templateData = searchParams.get('templateData') ? 
    JSON.parse(decodeURIComponent(searchParams.get('templateData') || '{}')) : null;

  const handleClose = () => {
    // Pass the template data back with returnToEdit flag
    const combinedData = {
      ...templateData,
      returnToEdit: true
    };
    const encodedData = encodeURIComponent(JSON.stringify(combinedData));
    router.push(`/workspace/settings/requirement-templates?formData=${encodedData}`);
  };

  const handleSave = async () => {
    try {
      if (!creatorRef.current) {
        throw new Error('Survey creator not initialized');
      }

      const json = await creatorRef.current.getJson();
      if (!json) {
        throw new Error('Unable to get survey JSON');
      }

      // Combine the template data with the form JSON
      const combinedData = {
        ...templateData,
        form_json: json,
        id: templateData?.id
      };
      
      // Encode the data to pass back to the requirement templates page
      const encodedData = encodeURIComponent(JSON.stringify(combinedData));
      router.push(`/workspace/settings/requirement-templates?formData=${encodedData}`);
    } catch (error) {
      console.error('Error getting survey JSON:', error);
      alert('Error saving form. Please try again.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gray-900 text-white">
        <div className="mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/assets/Anaxer_white.svg" 
              alt="Anaxer Logo" 
              width={150}
              height={41}
            />
            <h1 className="text-2xl font-bold ml-4">Build a custom journey</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-hidden">
        <div className="h-full w-full">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full">
              <div className="text-lg">Loading Survey Creator...</div>
            </div>
          }>
            <SurveyCreatorWidget ref={creatorRef} />
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default FormBuilderLayout;
