import React, { ChangeEvent } from 'react';

interface EntityDetailsProps {
  formData: {
    business_name: string;
    industry: string;
    country: string;
  };
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  industries: string[];
  countries: { name: string; code: string }[];
}

export default function EntityDetails({ formData, handleInputChange, industries, countries }: EntityDetailsProps) {
  return (
    <>
      <div>
        <label htmlFor="business_name" className="block text-sm font-medium leading-6 text-gray-900">
          Business name
        </label>
        <input
          id="business_name"
          name="business_name"
          type="text"
          required
          value={formData.business_name}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <div>
        <label htmlFor="industry" className="block text-sm font-medium leading-6 text-gray-900">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          required
          value={formData.industry}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select an industry</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
          Country
        </label>
        <select
          id="country"
          name="country"
          required
          value={formData.country}
          onChange={handleInputChange}
          className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>
    </>
  );
}