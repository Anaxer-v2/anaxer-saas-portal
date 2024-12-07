/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
import Button from '@/app/components/shared/button';
import Table from '@/app/components/shared/table';
import Pagination from '@/app/components/shared/pagination';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

interface Person {
  id: string;
  name: string;
  email: string;
  mobile: string;
  progress: string;
}

const people: Person[] = [
  {
    id: uuidv4(),
    name: 'Lindsay Walton',
    email: 'lindsay.w@example.com',
    mobile: '+1 (555) 123-4567',
    progress: '60%',
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    mobile: '+1 (555) 234-5678',
    progress: '85%',
  },
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    mobile: '+1 (555) 345-6789',
    progress: '45%',
  },
  {
    id: uuidv4(),
    name: 'David Rodriguez',
    email: 'david.r@example.com',
    mobile: '+1 (555) 456-7890',
    progress: '92%',
  },
  {
    id: uuidv4(),
    name: 'Emma Thompson',
    email: 'emma.t@example.com',
    mobile: '+1 (555) 567-8901',
    progress: '78%',
  },
  {
    id: uuidv4(),
    name: 'James Wilson',
    email: 'james.w@example.com',
    mobile: '+1 (555) 678-9012',
    progress: '33%',
  },
  {
    id: uuidv4(),
    name: 'Maria Garcia',
    email: 'maria.g@example.com',
    mobile: '+1 (555) 789-0123',
    progress: '55%',
  },
  {
    id: uuidv4(),
    name: 'Robert Kim',
    email: 'robert.k@example.com',
    mobile: '+1 (555) 890-1234',
    progress: '70%',
  },
  {
    id: uuidv4(),
    name: 'Lisa Patel',
    email: 'lisa.p@example.com',
    mobile: '+1 (555) 901-2345',
    progress: '25%',
  },
  {
    id: uuidv4(),
    name: 'Alex Martinez',
    email: 'alex.m@example.com',
    mobile: '+1 (555) 012-3456',
    progress: '95%',
  },
]

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function ClientsTable() {
  const checkbox = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [totalPages, setTotalPages] = useState(10); // Adjust this based on your actual data
  const router = useRouter();

  useLayoutEffect(() => {
    const isIndeterminate = selectedPeople.length > 0 && selectedPeople.length < people.length
    setChecked(selectedPeople.length === people.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedPeople])

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.mobile.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Clients</h1>
            <div className="mt-2 relative max-w-xs">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search clients"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button variant="primary">
              Add user
            </Button>
          </div>
        </div>
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'mobile', header: 'Mobile' },
            { key: 'progress', header: 'Progress' },
          ]}
          data={filteredPeople}
          onRowSelect={setSelectedPeople}
          onEdit={(person) => {
            router.push(`/workspace/clients/${person.id}`);
          }}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
