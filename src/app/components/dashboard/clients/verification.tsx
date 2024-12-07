import React from 'react';

export default function ClientVerification() {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Verification Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h4 className="font-semibold">Completed</h4>
            <p className="text-2xl font-bold">75%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg">
            <h4 className="font-semibold">In Progress</h4>
            <p className="text-2xl font-bold">20%</p>
          </div>
          <div className="bg-red-100 p-4 rounded-lg">
            <h4 className="font-semibold">Not Started</h4>
            <p className="text-2xl font-bold">5%</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Verifications</h3>
        {/* Add a table or list of recent verifications here */}
        <p>Table of recent verifications will go here</p>
      </div>
    </div>
  );
}