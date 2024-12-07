'use client'

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const SurveyCreatorWidget = dynamic(
  () => import('./surveyCreator').then((mod) => mod.SurveyCreatorWidget),
  { 
    ssr: false,
    loading: () => <div>Loading Survey Creator...</div>
  }
);

const FormBuilderLayout: React.FC = () => {
  const router = useRouter();

  const handleClose = () => {
    router.push('/workspace/settings/requirement-templates');
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
          <div>
            <button
              onClick={handleClose}
              className="px-4 py-2 border border-white rounded-md text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              Close
            </button>
          </div>
        </div>
      </header>
      <main className="flex-grow overflow-auto">
        <Suspense fallback={<div>Loading Survey Creator...</div>}>
          <SurveyCreatorWidget />
        </Suspense>
      </main>
    </div>
  );
};

export default FormBuilderLayout;
