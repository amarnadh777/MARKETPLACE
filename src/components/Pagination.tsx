import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Show limited pages on mobile
  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;
    
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center mt-6 space-x-1 sm:space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-2 sm:px-3 py-1 rounded disabled:opacity-50 text-sm"
        style={{ backgroundColor: currentPage === 1 ? "#EEE0F9" : "#F4E8F3", color: "#333" }}
      >
        Prev
      </button>

      {getVisiblePages().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null}
          disabled={typeof page !== 'number'}
          className="px-2 sm:px-3 py-1 rounded text-sm disabled:opacity-50"
          style={{
            backgroundColor: page === currentPage ? "#FFF9DB" : "#EEE0F9",
            color: page === currentPage ? "#333" : "#555",
            cursor: typeof page === 'number' ? 'pointer' : 'default'
          }}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-2 sm:px-3 py-1 rounded disabled:opacity-50 text-sm"
        style={{ backgroundColor: currentPage === totalPages ? "#EEE0F9" : "#F4E8F3", color: "#333" }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;