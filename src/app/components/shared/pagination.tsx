import React from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const renderPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1).map(renderPageButton);
    }

    const pageNumbers = [1, 2, 3];
    if (totalPages > 7) {
      pageNumbers.push(-1); // Represents ellipsis
    }
    pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);

    return pageNumbers.map((pageNumber, index) =>
      pageNumber === -1 ? (
        <span key={`ellipsis-${index}`} className="px-4 py-2">...</span>
      ) : (
        renderPageButton(pageNumber)
      )
    );
  };

  const renderPageButton = (pageNumber: number) => (
    <a
      key={pageNumber}
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onPageChange(pageNumber);
      }}
      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
        currentPage === pageNumber
          ? 'border-indigo-500 text-indigo-600'
          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
      }`}
      aria-current={currentPage === pageNumber ? 'page' : undefined}
    >
      {pageNumber}
    </a>
  );

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        {currentPage > 1 && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5 text-gray-400" />
            Previous
          </a>
        )}
      </div>
      <div className="hidden md:-mt-px md:flex">
        {renderPageNumbers()}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {currentPage < totalPages && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5 text-gray-400" />
          </a>
        )}
      </div>
    </nav>
  );
}
 