'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Switch } from '@headlessui/react'
import { ChromePicker } from 'react-color'

interface BrandConfig {
  headerBannerEnabled: boolean;
  headerBannerBackgroundColor: string;
  headerBannerLogo: string | null;
  headerBannerLogoAlignment: 'left' | 'center' | 'right';
  headerBannerSize: number;
  backgroundColor: string;
  primaryColor: string;
  successPrimaryColor: string;
  successSecondaryColor: string;
  destructionColor: string;
  progressBarColor: string;
  watermarkEnabled: boolean;
}

const initialBrandConfig: BrandConfig = {
  headerBannerEnabled: true,
  headerBannerBackgroundColor: '#000000',
  headerBannerLogo: null,
  headerBannerLogoAlignment: 'left',
  headerBannerSize: 50,
  backgroundColor: '#FFFFFF',
  primaryColor: '#000000',
  successPrimaryColor: '#2B713F',
  successSecondaryColor: '#E9FCD4',
  destructionColor: '#DB0E45',
  progressBarColor: '#1C2A3A',
  watermarkEnabled: true,
}

export default function BrandConfiguration() {
  const [config, setConfig] = useState<BrandConfig>(initialBrandConfig)
  const [activeColorPicker, setActiveColorPicker] = useState<keyof BrandConfig | null>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)
  const [previewIndex, setPreviewIndex] = useState(0)
  const previews = ['Checklist view', 'Form view', 'Summary view'] // Add more preview types as needed

  const handleInputChange = (key: keyof BrandConfig, value: any) => {
    setConfig({ ...config, [key]: value })
  }

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving configuration:', config)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setActiveColorPicker(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const ColorPicker = ({ label, colorKey }: { label: string; colorKey: keyof BrandConfig }) => {
    const handleColorChange = (color: any) => {
      handleInputChange(colorKey, color.hex)
    }

    const toggleColorPicker = () => {
      setActiveColorPicker(activeColorPicker === colorKey ? null : colorKey)
    }

    return (
      <div className="relative">
        <label className="block py-2 text-left text-sm font-semibold text-gray-900">{label}</label>
        <div className="flex items-center space-x-2">
          <div
            className="h-8 w-8 rounded-md border border-gray-300 cursor-pointer"
            style={{ backgroundColor: config[colorKey] as string }}
            onClick={toggleColorPicker}
          />
          <span className="text-sm text-gray-500">{config[colorKey] as string}</span>
        </div>
        {activeColorPicker === colorKey && (
          <div className="absolute z-10 mt-2" ref={colorPickerRef}>
            <ChromePicker
              color={config[colorKey] as string}
              onChange={handleColorChange}
              disableAlpha={true}
            />
          </div>
        )}
      </div>
    )
  }

  const AlignmentButton = ({ alignment, currentAlignment, onClick }: { alignment: 'left' | 'center' | 'right', currentAlignment: string, onClick: () => void }) => {
    const iconPath = {
      left: "M3 4.5h14a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm0 5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm0 5h14a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1z",
      center: "M3 4.5h14a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm2 5h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zm0 5h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1z",
      right: "M3 4.5h14a.5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1zm4 5h10a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1zm0 5h10a.5.5 0 0 1 0 1H7a.5.5 0 0 1 0-1z"
    }

    return (
      <button
        type="button"
        onClick={onClick}
        className={`p-2 rounded-md ${currentAlignment === alignment ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
          <path d={iconPath[alignment]} />
        </svg>
      </button>
    )
  }

  const nextPreview = () => {
    setPreviewIndex((prevIndex) => (prevIndex + 1) % previews.length)
  }

  const prevPreview = () => {
    setPreviewIndex((prevIndex) => (prevIndex - 1 + previews.length) % previews.length)
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">Appearance settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block py-2 text-left text-sm font-semibold text-gray-900">Header banner</label>
                  <Switch
                    checked={config.headerBannerEnabled}
                    onChange={(value) => handleInputChange('headerBannerEnabled', value)}
                    className={`${config.headerBannerEnabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable header banner</span>
                    <span
                      className={`${config.headerBannerEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>

                {config.headerBannerEnabled && (
                  <>
                    <ColorPicker label="Header banner background colour" colorKey="headerBannerBackgroundColor" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block py-2 text-left text-sm font-semibold text-gray-900">Header banner logo</label>
                        <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Upload
                        </button>
                      </div>
                      <div>
                        <label className="block py-2 text-left text-sm font-semibold text-gray-900">Header banner logo alignment</label>
                        <div className="flex space-x-2">
                          <AlignmentButton
                            alignment="left"
                            currentAlignment={config.headerBannerLogoAlignment}
                            onClick={() => handleInputChange('headerBannerLogoAlignment', 'left')}
                          />
                          <AlignmentButton
                            alignment="center"
                            currentAlignment={config.headerBannerLogoAlignment}
                            onClick={() => handleInputChange('headerBannerLogoAlignment', 'center')}
                          />
                          <AlignmentButton
                            alignment="right"
                            currentAlignment={config.headerBannerLogoAlignment}
                            onClick={() => handleInputChange('headerBannerLogoAlignment', 'right')}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block py-2 text-left text-sm font-semibold text-gray-900">Header banner size</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={config.headerBannerSize}
                        onChange={(e) => handleInputChange('headerBannerSize', parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                <hr className="my-6 border-gray-200" />

                <div className="grid grid-cols-2 gap-4">
                  <ColorPicker label="Background colour" colorKey="backgroundColor" />
                  <ColorPicker label="Primary colour" colorKey="primaryColor" />
                  <ColorPicker label="Success primary colour" colorKey="successPrimaryColor" />
                  <ColorPicker label="Success secondary colour" colorKey="successSecondaryColor" />
                  <ColorPicker label="Destruction colour" colorKey="destructionColor" />
                  <ColorPicker label="Progress bar colour" colorKey="progressBarColor" />
                </div>
                
                <div>
                  <label className="block py-2 text-left text-sm font-semibold text-gray-900">'Powered by Required' watermark</label>
                  <Switch
                    checked={config.watermarkEnabled}
                    onChange={(value) => handleInputChange('watermarkEnabled', value)}
                    className={`${config.watermarkEnabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable watermark</span>
                    <span
                      className={`${config.watermarkEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <h2 className="text-xl font-semibold leading-6 text-gray-900 mb-6">Widget preview - {previews[previewIndex]}</h2>
              <div className="relative flex-grow">
                <button
                  onClick={prevPreview}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="bg-gray-100 rounded-md flex items-center justify-center h-full">
                  <p className="text-gray-500">Preview placeholder for {previews[previewIndex]}</p>
                </div>
                <button
                  onClick={nextPreview}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-[#247bff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1a5cd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#247bff] w-44"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}