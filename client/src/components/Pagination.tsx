import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex space-x-2 mt-4">
      <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className="px-2 py-1 bg-gray-300 rounded">Prev</button>
      <span>{currentPage} / {totalPages}</span>
      <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className="px-2 py-1 bg-gray-300 rounded">Next</button>
    </div>
  );
};

export default Pagination;
