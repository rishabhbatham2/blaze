import React, { useEffect, useRef } from 'react';
import './ReusableText.css';

const ReusableText = ({ label, value, setValue, placeholder, type = "text" , maxLength}) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const textareaRef = useRef(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to match content
    }
  }, [value]);

  return (
    <div className="reusable-input2-wrapper">
      <label className="reusable-input2-label" htmlFor="reusable-input2">
        {label}
      </label>
      <textarea
        id="reusable-input2"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="reusable-input2"
        ref={textareaRef}
        maxLength={maxLength || undefined} 
      />
    </div>
  );
};

export default ReusableText;
