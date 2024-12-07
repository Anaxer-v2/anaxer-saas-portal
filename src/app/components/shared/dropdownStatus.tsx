'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

interface StatusOption {
  id: number;
  name: string;
  color: 'green' | 'amber' | 'gray';
}

interface DropdownStatusProps {
  options: StatusOption[];
  selected: StatusOption;
  onChange: (selected: StatusOption) => void;
  width?: string;
}

export default function DropdownStatus({ options, selected, onChange, width = 'auto' }: DropdownStatusProps) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative" style={{ width }}>
        <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span className="flex items-center">
            <span
              className={classNames(
                selected.color === 'green' ? 'bg-green-400' : 
                selected.color === 'amber' ? 'bg-amber-400' : 'bg-gray-200',
                'inline-block h-2 w-2 flex-shrink-0 rounded-full'
              )}
            />
            <span className="ml-3 block truncate">{selected.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              value={option}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
                <span
                  aria-hidden="true"
                  className={classNames(
                    option.color === 'green' ? 'bg-green-400' : 
                    option.color === 'amber' ? 'bg-amber-400' : 'bg-gray-200',
                    'inline-block h-2 w-2 flex-shrink-0 rounded-full',
                  )}
                />
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {option.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
