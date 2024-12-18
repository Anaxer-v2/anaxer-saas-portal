'use client'

import React from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import styles from './surveyPreview.module.css';

interface SurveyPreviewProps {
  formJson: any | null;
}

export const SurveyPreview: React.FC<SurveyPreviewProps> = ({ formJson }) => {
  if (!formJson) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-md p-6">
        <p className="text-gray-500">Select a template to preview the form</p>
      </div>
    );
  }

  try {
    const surveyJson = {
      ...formJson,
      showQuestionNumbers: "off",
      questionsOnPageMode: "singlePage",
      showProgressBar: "off",
      showNavigationButtons: false,
      showCompletedPage: false
    };
    
    const survey = new Model(surveyJson);
    survey.mode = 'preview';
    survey.showNavigationButtons = false;
    survey.showCompletedPage = false;
    
    return (
      <div className={styles.surveyContainer}>
        <div className="w-full">
          <Survey model={survey} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering survey preview:', error);
    return (
      <div className="flex items-center justify-center h-full bg-red-50 rounded-md p-6">
        <p className="text-red-500">Error loading survey preview</p>
      </div>
    );
  }
}; 