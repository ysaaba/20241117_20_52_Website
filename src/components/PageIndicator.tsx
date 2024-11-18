import React from 'react';

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PageIndicator({ currentPage, totalPages, onPageChange }: PageIndicatorProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisiblePages / 2),
        totalPages - maxVisiblePages + 1
      ),
      1
    );
    visiblePages = pages.slice(start - 1, start - 1 + maxVisiblePages);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      {totalPages > maxVisiblePages && currentPage < totalPages - 2 && (
        <span className="px-2">...</span>
      )}
      {totalPages > maxVisiblePages && currentPage < totalPages - 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium bg-white text-gray-700 hover:bg-gray-100"
        >
          {totalPages}
        </button>
      )}
    </div>
  );
}