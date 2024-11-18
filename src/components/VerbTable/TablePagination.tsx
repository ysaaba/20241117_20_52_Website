interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({ currentPage, totalPages, onPageChange }: TablePaginationProps) {
  console.log('TablePagination props:', { currentPage, totalPages });
  // Show max 5 pages at a time (plus ellipses and first/last pages when needed)
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6 max-w-full overflow-x-auto">
      <button
        onClick={(e) => {
          e.preventDefault();
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg flex items-center ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">...</span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page as number);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg flex items-center ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}