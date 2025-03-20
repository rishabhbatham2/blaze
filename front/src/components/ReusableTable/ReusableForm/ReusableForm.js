import React, { useState, useEffect } from "react";
import ReusableInput from "../../ui/ReusableInput/Reusable";
import ReusableHeader from "../../ReusableHeader/ReusableHeader";
import "./ReusableForm.css";
import ReusableText from "../../ui/ReusableTextField/ReusableTextField";
import ReusableDropdown from "../../ui/ReusableDropDown/ReusableDropDown";
import ImageGrid from "../../ui/ReusableImage/ReeusableImage";
import ReusableRichText from "../../ui/ReusableRichText/ReusableRichText";
// Assuming this is a custom component

export default function ReusableForm({ data,submitApi,title,filter=true,bread='dashboard / category'}) {


  // Initialize the state with values from data
  const [formData, setFormData] = useState(
    data.reduce((acc, curr) => {
      acc[curr.name] = curr.value;
      return acc;
    }, {})
  );

 

  // Handle input change dynamically
  const handleInputChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Dynamically render the appropriate input based on type
  const renderInput = (field) => {
    const { name, type, value, list = false, api = false } = field;

    switch (type) {
      case "text":
      case "numeric":
        return (
          <ReusableInput
            key={name}
            label={name}
            value={formData[name] !== undefined ? formData[name] : value}
            setValue={(value) => handleInputChange(name, value)}
          />
        );

      case "textfield":
        return (
          <ReusableText
            key={name}
            label={name}
            value={formData[name] || value}
            setValue={(value) => handleInputChange(name, value)}
          />
        );
        case "rich":
          return (
            <ReusableRichText
              key={name}
              label={name}
              value={formData[name] || value}
              setValue={(value) => handleInputChange(name, value)}
            />
          );
      case "select":
        return (
          <ReusableDropdown
            key={name}
            heading={name}
            value={formData[name]}
            setValue={(value) => handleInputChange(name, value)}
            list={list}
            api={api} // Run the API function when an option is selected
          />
        );
        case "image":

      

        return (
          <ImageGrid imageUrls={value}

          formData={formData} setFormData={setFormData}
          
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="reusableform__container">
    <ReusableHeader title={title} filter={filter} bread={bread} />
    <div className="reusable__form" >
      {data.map((field) => renderInput(field))}
      <button type="submit" className="submit-button" onClick={()=>{submitApi(formData)}}>
        Submit
      </button>
    </div>
  </div>

  );
}
