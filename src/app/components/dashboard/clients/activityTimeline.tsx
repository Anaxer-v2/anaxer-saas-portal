import React from 'react';

const activities = [
  { id: 1, client: 'John Doe', action: 'Completed verification', date: '2023-06-01' },
  { id: 2, client: 'Jane Smith', action: 'Started verification', date: '2023-05-31' },
  { id: 3, client: 'Bob Johnson', action: 'Updated information', date: '2023-05-30' },
  // Add more activities as needed
];

export default function ClientActivityTimeline() {
  return (
    <div>
      <ul className="space-y-6">
        {activities.map((activity) => (
          <li key={activity.id} className="relative flex gap-x-4">
            <div className="absolute left-0 top-0 flex w-6 justify-center -bottom-6">
              <div className="w-px bg-gray-200"></div>
            </div>
            <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300"></div>
            </div>
            <div className="flex-auto py-0.5 text-sm leading-5">
              <span className="font-medium text-gray-900">{activity.client}</span> {activity.action}
              <span className="block text-gray-500">{activity.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}