'use client'

import React, { useState } from 'react';

const InstallationInstructions: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const embedCode = 
  `<div id="widget-container"></div>
<script src="https://required-app.github.io/required-app-widget/widget.js" async></script>
<script>
window.addEventListener('load', function() {
  if (typeof RequiredWidget !== 'undefined' && typeof RequiredWidget.initWidget === 'function') {
    RequiredWidget.initWidget('widget-container');
  }
});
</script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="max-w-[800px]">
          <h1 className="text-base font-semibold leading-6 text-gray-900 mb-4">Install Your Widget on Your Website</h1>
          <p className="text-sm text-gray-500 mb-6">To install your widget on your website, please follow the steps below to embed the widget.</p>
          
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Embed the Widget</h2>
          <p className="text-sm text-gray-500 mb-2">Add the following script tag to your HTML, ideally just before the closing &lt;/body&gt; tag:</p>
          <div className="relative">
            <pre className="bg-gray-100 text-gray-800 p-4 rounded-md overflow-x-auto text-sm mb-6">
              <code>{embedCode}</code>
            </pre>
            <button
              onClick={copyToClipboard}
              className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded text-xs hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Useful Tips</h2>
          <ul className="list-disc list-inside mb-6 text-sm text-gray-500 space-y-2">
            <li>Ensure the script is loaded on every page where you want the widget to appear.</li>
            <li>The widget container (div with id="widget-container") can be placed anywhere on your page where you want the widget to render.</li>
            <li>If your website uses a Content Security Policy (CSP), make sure to allow scripts from the widget domain.</li>
            <li>For optimal performance, consider loading the script asynchronously as shown in the example.</li>
            <li>Test the widget on different devices and browsers to ensure compatibility.</li>
            <li>If you're using a single-page application framework (like React, Vue, or Angular), you may need to reinitialize the widget after route changes.</li>
          </ul>
          
          <p className="mt-6 text-sm text-gray-500">If you encounter any issues during installation, please don't hesitate to contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  );
};

export default InstallationInstructions;