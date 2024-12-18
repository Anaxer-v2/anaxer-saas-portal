'use client'

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { SurveyCreatorComponent, SurveyCreator } from "survey-creator-react";
import { useSearchParams } from 'next/navigation';

// Import required styles
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: true,
  showJSONEditor: true,
  showTranslationTab: true,
  haveCommercialLicense: true,
  allowControlSurveyTitleVisibility: false,
  showState: false,
  showSidebar: true, // Enable the sidebar
  showToolbox: true, // Ensure toolbox is visible
  showPropertyGrid: true, // Show property grid
  maxTimeToFinishPage: 0,
  maxTimeToFinish: 0,
  sidebarLocation: "right" // Set sidebar location
};

const defaultJson = {
  pages: [{
    name: "Name",
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  }]
};

export interface SurveyCreatorWidgetRef {
  getJson: () => Promise<any>;
}

export const SurveyCreatorWidget = forwardRef<SurveyCreatorWidgetRef>((_, ref) => {
  const creatorRef = useRef<SurveyCreator | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Function to ensure proper UI initialization
  const initializeCreatorUI = (creator: SurveyCreator) => {
    try {
      // Force sidebar to be visible
      creator.showSidebar = true;
      
      // Switch to the designer tab
      creator.makeNewViewActive("designer");
      
      // Small delay to ensure UI is rendered
      setTimeout(() => {
        // Force a resize to ensure proper layout
        window.dispatchEvent(new Event('resize'));
        
        // Ensure toolbox is visible in the sidebar
        if (creator.toolbox) {
          creator.toolbox.isCompact = false;
        }
      }, 100);
    } catch (error) {
      console.error('Error initializing creator UI:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    getJson: async () => {
      return new Promise((resolve, reject) => {
        if (!creatorRef.current) {
          reject(new Error('Survey creator not initialized'));
          return;
        }

        if (isSaving) {
          reject(new Error('Save already in progress'));
          return;
        }

        setIsSaving(true);

        try {
          // Ensure we're on the designer tab
          if (creatorRef.current.activeTab !== 'designer') {
            creatorRef.current.makeNewViewActive('designer');
          }

          // Small delay to ensure UI is stable
          setTimeout(() => {
            try {
              const surveyJSON = creatorRef.current?.survey?.toJSON();
              if (!surveyJSON) {
                throw new Error('Failed to get survey JSON');
              }
              resolve(surveyJSON);
            } catch (error) {
              console.error('Error getting survey JSON:', error);
              reject(error);
            } finally {
              setIsSaving(false);
            }
          }, 100);
        } catch (error) {
          console.error('Error preparing to save:', error);
          setIsSaving(false);
          reject(error);
        }
      });
    }
  }));

  // Handle initialization
  useEffect(() => {
    let creator: SurveyCreator | null = null;
    const initCreator = () => {
      try {
        // Create the survey creator
        creator = new SurveyCreator(creatorOptions);
        
        // Try to get existing form JSON from URL params
        const templateData = searchParams.get('templateData');
        let initialJson = defaultJson;
        
        if (templateData) {
          try {
            const parsedData = JSON.parse(decodeURIComponent(templateData));
            if (parsedData.form_json) {
              initialJson = parsedData.form_json;
            }
          } catch (error) {
            console.error('Error parsing template data:', error);
          }
        }

        creator.text = JSON.stringify(initialJson);
        
        // Set up auto-save to store in memory
        creator.saveSurveyFunc = (saveNo: number, callback: (saveNo: number, success: boolean) => void) => { 
          try {
            callback(saveNo, true);
          } catch (error) {
            console.error('Error saving survey:', error);
            callback(saveNo, false);
          }
        };

        // Handle layout updates
        creator.onActiveTabChanged.add(() => {
          // Delay the resize event to ensure the new tab is fully rendered
          setTimeout(() => {
            if (creator && !isSaving) {
              window.dispatchEvent(new Event('resize'));
            }
          }, 250);
        });
        
        creatorRef.current = creator;
        
        // Initialize UI after setting the creator
        initializeCreatorUI(creator);
        
        setIsLoaded(true);
      } catch (err) {
        console.error('Error initializing survey creator:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize survey creator');
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initCreator, 100);

    return () => {
      clearTimeout(timer);
      if (creator) {
        creator.dispose();
      }
    };
  }, [searchParams, isSaving]);

  // Handle resize events with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (creatorRef.current && containerRef.current && !isSaving) {
          // Force re-render of the current tab
          const activeTab = creatorRef.current.activeTab;
          if (activeTab) {
            creatorRef.current.makeNewViewActive(activeTab);
          }
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Initial resize with a longer delay
    const initialResizeTimer = setTimeout(handleResize, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialResizeTimer);
      clearTimeout(resizeTimeout);
    };
  }, [isSaving]);

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading survey creator: {error}
      </div>
    );
  }

  if (!isLoaded || !creatorRef.current) {
    return (
      <div className="p-4">
        Loading Survey Creator...
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <SurveyCreatorComponent creator={creatorRef.current} />
    </div>
  );
});
