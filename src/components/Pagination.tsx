import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-3 py-1 rounded disabled:opacity-50"
        style={{ backgroundColor: currentPage === 1 ? "#EEE0F9" : "#F4E8F3", color: "#333" }}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="px-3 py-1 rounded"
          style={{
            backgroundColor: page === currentPage ? "#FFF9DB" : "#EEE0F9",
            color: page === currentPage ? "#333" : "#555",
          }}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1 rounded disabled:opacity-50"
        style={{ backgroundColor: currentPage === totalPages ? "#EEE0F9" : "#F4E8F3", color: "#333" }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;