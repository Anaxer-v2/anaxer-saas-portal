'use client';

import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, ArrowDownTrayIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { Menu } from '@headlessui/react';

const mockActivities = [
  {
    date: 'Dec 15th 2023, 7:42 pm',
    description: "Customer 'Acme Inc.' uploaded the document '2024 Financial Forecast.pdf' against the requirement 'Annual Financial Projections'.",
    user: 'example user',
  },
  {
    date: 'Dec 15th 2023, 7:42 pm',
    description: "Customer 'Beta Corp' acknowledged receipt of the requirement 'Data Privacy Compliance Agreement' and submitted the signed acknowledgment form.",
    user: 'example user',
  },
  {
    date: 'Dec 15th 2023, 7:41 pm',
    description: "Customer 'Charlie LLC' submitted a revised version of 'Product Design Specs.docx' for the requirement 'Initial Product Design Review'.",
    user: 'example user',
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const ActivityLog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-base font-semibold leading-6 text-gray-900">Activity Log</h1>
            <div className="mt-2 relative max-w-xs">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search for activity"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                Filter
              </Menu.Button>
              {/* ... Menu.Items ... */}
            </Menu>
            <button
              type="button"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <ArrowDownTrayIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Export
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <ul role="list" className="-mb-8">
            {mockActivities.map((activity, activityIdx) => (
              <li key={activityIdx} className="hover:bg-gray-50 transition-colors duration-200 rounded-md">
                <div className="relative pb-8 p-2">
                  {activityIdx !== mockActivities.length - 1 ? (
                    <span className="absolute left-[139px] top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div className="flex-shrink-0 w-32 text-right">
                      <span className="text-sm text-gray-500">{activity.date}</span>
                    </div>
                    <div className="relative flex h-8 w-8 items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-gray-300" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm text-gray-500">{activity.description}</p>
                      <p className="mt-0.5 text-sm text-gray-400">By {activity.user}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mt-6">
          <div className="-mt-px flex w-0 flex-1">
            {currentPage > 1 && (
              <a
                href="#"
                className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                Previous
              </a>
            )}
          </div>
          <div className="hidden md:-mt-px md:flex">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
              aria-current="page"
            >
              1
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              2
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              3
            </a>
            <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
              ...
            </span>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              8
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              9
            </a>
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              10
            </a>
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a
              href="#"
              className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              Next
              <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ActivityLog;
