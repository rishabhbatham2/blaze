import React from "react";
import "./PaginationComp.css";

const PaginationComp = ({ currentPage, totalPages, handlePageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        {`<`}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination__button ${currentPage === page ? "active" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination__button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
       {`>`}
      </button>
    </div>
  );
};

export default PaginationComp;
