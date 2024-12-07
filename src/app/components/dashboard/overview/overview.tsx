import React from 'react';
import { ClockIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Button from '@/app/components/shared/button';

const OverviewDashboard = () => {
  const requirementsData = [
    { title: 'Outstanding', count: 15, icon: ClockIcon, color: 'text-blue-600' },
    { title: 'Unverified', count: 5, icon: ExclamationTriangleIcon, color: 'text-yellow-600' },
    { title: 'Verified', count: 27, icon: CheckCircleIcon, color: 'text-green-600' },
  ];

  const recentActivity = [
    {
      date: 'Dec 15th 2023, 7:42 pm',
      description: 'Customer \'Acme Inc.\' uploaded the document \'2024 Financial Forecast.pdf\' against the requirement \'Annual Financial Projections\'.',
      user: 'example user',
    },
    {
      date: 'Dec 15th 2023, 7:42 pm',
      description: 'Customer \'Beta Corp\' acknowledged receipt of the requirement \'Data Privacy Compliance Agreement\' and submitted the signed acknowledgment form.',
      user: 'example user',
    },
    {
      date: 'Dec 15th 2023, 7:41 pm',
      description: 'Customer \'Charlie LLC\' submitted a revised version of \'Product Design Specs.docx\' for the requirement \'Initial Product Design Review\'.',
      user: 'example user',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Requirements overview</h2>
            <div className="grid grid-cols-3 gap-4">
              {requirementsData.map((item) => (
                <div key={item.title} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center">
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{item.title}</p>
                      <p className="text-2xl font-semibold text-gray-900">{item.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 mt-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Recent activity</h2>
            <ul className="space-y-6">
              {recentActivity.map((activity, index) => (
                <li key={index} className="relative pb-6 hover:bg-gray-50 p-2 rounded-md transition-colors duration-300">
                  {index !== recentActivity.length - 1 && (
                    <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                        <span className="text-sm font-medium text-white">AU</span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500">{activity.date}</p>
                      <p className="mt-0.5 text-sm text-gray-600">{activity.description}</p>
                      <p className="mt-2 text-xs text-gray-500">By {activity.user}.</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all activity</a>
            </div>
          </div>
        </div>

        <div className="col-span-1 space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick-start</h2>
            <p className="text-sm text-gray-600 mb-4">
              It only takes 5 minutes to setup Required.app and start automating your workflows.
              Click 'Get started' for a streamlined setup process.
            </p>
            <div className="text-right">
              <Button variant="primary">
                Get started
              </Button>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Team members</h2>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">EU</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Example User</p>
                  <p className="text-xs text-gray-500">Example@example.com</p>
                </div>
              </div>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                Admin
              </span>
            </div>
            <div className="mt-6 text-right">
              <Button variant="primary">Manage</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewDashboard;
