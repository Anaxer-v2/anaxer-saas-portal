import React, { useLayoutEffect, useRef, useState } from 'react'
import Button from './button'

interface Column {
  key: string
  header: string
}

interface TableProps {
  columns: Column[]
  data: any[]
  onRowSelect?: (selectedRows: any[]) => void
  onEdit?: (row: any) => void
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function Table({ columns, data, onRowSelect, onEdit }: TableProps) {
  const checkbox = useRef<HTMLInputElement>(null)
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedRows.length > 0 && selectedRows.length < data.length
    setChecked(selectedRows.length === data.length)
    setIndeterminate(isIndeterminate)
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate
    }
  }, [selectedRows])

  function toggleAll() {
    setSelectedRows(checked || indeterminate ? [] : data)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
    if (onRowSelect) {
      onRowSelect(checked || indeterminate ? [] : data)
    }
  }

  return (
    <div className="mt-4 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="relative">
            {selectedRows.length > 0 && (
              <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                <Button variant="outline" size="small">
                  Bulk edit
                </Button>
                <Button variant="outline" size="small">
                  Delete all
                </Button>
              </div>
            )}
            <table className="min-w-full table-fixed divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      ref={checkbox}
                      checked={checked}
                      onChange={toggleAll}
                    />
                  </th>
                  {columns.map((column) => (
                    <th key={column.key} scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      {column.header}
                    </th>
                  ))}
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={`${selectedRows.includes(row) ? 'bg-gray-50' : 'hover:bg-gray-50'} transition-colors duration-200`}>
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      {selectedRows.includes(row) && (
                        <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                      )}
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        value={rowIndex}
                        checked={selectedRows.includes(row)}
                        onChange={(e) => {
                          const newSelectedRows = e.target.checked
                            ? [...selectedRows, row]
                            : selectedRows.filter((r) => r !== row)
                          setSelectedRows(newSelectedRows)
                          if (onRowSelect) {
                            onRowSelect(newSelectedRows)
                          }
                        }}
                      />
                    </td>
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm',
                          column.key === 'name' ? 'font-medium' : 'text-gray-500',
                          selectedRows.includes(row) && column.key === 'name' ? 'text-indigo-600' : 'text-gray-900'
                        )}
                      >
                        {row[column.key]}
                      </td>
                    ))}
                    <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                      <Button variant="outline" size="small" onClick={() => onEdit && onEdit(row)}>
                        Edit<span className="sr-only">, {row.name}</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}