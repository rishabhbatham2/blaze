import React, { useState, useEffect } from "react";
import './ReusableDropDown.css';

const ReusableDropdown = ({ heading, value, setValue, list, api }) => {
  const [options, setOptions] = useState(list);


  console.log('listtttttttttttttttttttttttttttttttt',list)

  const handleChange = (e) => {
   /*  const selectedValue = e.target.value; */
    setValue(e.target.value);

    // Run the API function when the selection changes
    if (api) {
      api(e.target.value)
    }
  };

  return (
    <div className="reusable-dropdown-wrapper">
      <label className="reusable-dropdown-label" htmlFor="reusable-dropdown">
        {heading}
      </label>
      <select
        id="reusable-dropdown"
        value={value}
        onChange={handleChange}
        className="reusable-dropdown"
      >
        <option value="">Select an option</option>
        {list.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ReusableDropdown;
