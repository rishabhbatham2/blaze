import React, { useState, useEffect } from 'react';
import './ReusableFilter.css'

const ReusablePages = ({ list, setFilterList,set2,set3 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust items per page

  const totalPages = Math.ceil(list.length / itemsPerPage);

  useEffect(() => {
    // Calculate the start and end index for current page data
    const startIndex = (currentPage - 1) * itemsPerPage;
    const filteredData = list.slice(startIndex, startIndex + itemsPerPage);
    setFilterList(filteredData);
  }, [currentPage, list, setFilterList,set2,set3]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='reusable__filter'>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
      {`<`}
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageClick(index + 1)}
          disabled={currentPage === index + 1}
          style={currentPage==index+1?{color:'#333',backgroundColor:'#eee'}:{}}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        {`>`}
      </button>
    </div>
  );
};

export default ReusablePages;
