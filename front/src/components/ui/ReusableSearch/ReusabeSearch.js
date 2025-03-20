import React, { useState } from 'react';
import './Reusable.css'
import { data } from 'react-router-dom';

const ReusableSearchComponent = ({ list, searchKeys, setFilterList,refresh }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === '') {
      setFilterList(list); // Reset to original list if search is empty
    } else {
      const filteredData = list.filter((item) => {
        return searchKeys.some((key) =>
          item[key]?.toString().toLowerCase().includes(term.toLowerCase())
        );
      });
      setFilterList(filteredData);
    }
  };
const handleX=()=>{
  console.log('cancel')
  setSearchTerm("")
    refresh()
   
}
  return (
    <div className='search__component'>
      <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={handleSearch}
        style={{width:'99%',padding:'1rem'}}
      />


<div onClick={handleX}>
<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9" stroke="#222222" stroke-width="2"/>
<path d="M7.00009 12.9997L13.0001 6.99966" stroke="#222222" stroke-width="2"/>
<path d="M13 13L7 7" stroke="#222222" stroke-width="2"/>
</svg>


</div>

    </div>
  );
};

export default ReusableSearchComponent;
