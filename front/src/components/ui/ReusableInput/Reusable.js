import React from 'react';
import './ReusableInput.css';

const ReusableInput = ({ label, value, setValue, placeholder ,regex,onKeyDown,onFocus,errorlabel,maxLength}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    const key = e.key;

    // If a regex is provided, prevent invalid keypresses
    if (regex && !regex.test(key)) {
      e.preventDefault(); // Prevent the keypress
    }
  };
  const handleKeyDown = (e) => {
    const key = e.key;

    // If a regex is provided, prevent invalid keypresses
    if (regex && !regex.test(key)) {
      e.preventDefault(); // Prevent the keydown event
    }

    // If a custom onKeyDown handler is provided, call it
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const handleFocus = (e) => {
    // Call the custom onFocus handler if provided
    if (onFocus) {
      onFocus(e);
    }
  };
  return (
    <div className="reusable-input-wrapper">
      <label className="reusable-input-label" htmlFor="reusable-input">
        {label}
      </label>
      <input
        id="reusable-input"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        onFocus={handleFocus}
        onKeyUp={handleKeyDown}
        maxLength={maxLength || undefined} 

        className="reusable-input"
      />
       <label className="errorlabel" >{errorlabel?errorlabel:''}</label>
    </div>
  );
};

export default ReusableInput;
