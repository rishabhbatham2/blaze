import React, { useEffect, useRef } from 'react';
import './ReusablRichText.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const ReusableRichText = ({ label, value, setValue, placeholder, type = "text" }) => {
    const handleChange = (content) => {
        setValue(content); // 'content' is the updated HTML string from the editor
      };

  const textareaRef = useRef(null);


  // Auto-resize the textarea based on content
/*   useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to match content
    }
  }, [value]); */

  return (
    <div className="reusable-input2-wrapper">
      <label className="reusable-input2-label" htmlFor="reusable-input2">
        {label}
      </label>
     {/*  <textarea
        id="reusable-input2"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="reusable-input2"
        ref={textareaRef}
      /> */}
       <ReactQuill
        theme="snow" 
        value={value} 
        onChange={handleChange} 
        placeholder="Write something amazing..." 
      />
    </div>
  );
};

export default ReusableRichText;
