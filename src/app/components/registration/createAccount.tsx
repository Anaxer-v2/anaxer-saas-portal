import React, { ChangeEvent } from 'react';

interface CreateAccountProps {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateAccount({ formData, handleInputChange }: CreateAccountProps) {
  return (
    <>
      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="first-name" className="block text-sm leading-6 text-gray-900">
            First name
          </label>
          <div className="mt-2">
            <input
              id="first_name"
              name="first_name"
              type="text"
              autoComplete="given-name"
              required
              placeholder="First name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 h-[46px] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#3b82f6] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="last-name" className="block text-sm leading-6 text-gray-900">
            Last name
          </label>
          <div className="mt-2">
            <input
              id="last_name"
              name="last_name"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Last name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="block w-full rounded-md border-0 h-[46px] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#3b82f6] sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 h-[46px] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#3b82f6] sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm leading-6 text-gray-900">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className="block w-full rounded-md border-0 h-[46px] py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#3b82f6] sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </>
  );
}