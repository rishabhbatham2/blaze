import React, { useState, useEffect, useRef } from "react";
import "./ReusableImage.css";
import { serverURL } from "../../../services/NodeServices";

const ImageGrid = ({ imageUrls, setFormData, formData }) => {
  // State to manage image URLs and file uploads separately
  const [myImageUrls, setMyImageUrls] = useState([]);  // For managing image URLs
  const [myFileImages, setMyFileImages] = useState([]); // For managing uploaded files
  const fileInputRef = useRef(null);

  // Initialize `myImageUrls` from `imageUrls` (only once)
  useEffect(() => {
    if (imageUrls) {
      const initialImageUrls = imageUrls?.split(",")||[]
      setMyImageUrls(initialImageUrls);

      // Initialize formData with image URLs
      setFormData((prevData) => ({
        ...prevData,
        urlImages: initialImageUrls,  // Add urlImages key if it doesn't exist
      }));
    }
  }, [imageUrls, setFormData]);


  // Ensure formData contains 'fileImages' and 'urlImages' keys
  const ensureImageKeys = () => {
    if (!formData.fileImages) {
      setFormData((prevData) => ({
        ...prevData,
        fileImages: [], // Initialize fileImages if it doesn't exist
      }));
    }

    if (!formData.urlImages) {
        const initialImageUrls = imageUrls?.split(",")||[]

      setFormData((prevData) => ({
        ...prevData,
        urlImages: initialImageUrls, // Initialize urlImages if it doesn't exist
      }));
    }
  };

  // Handle removing an image URL
  const handleRemoveUrl = (index) => {
    const updatedImageUrls = myImageUrls.filter((_, i) => i !== index);
    setMyImageUrls(updatedImageUrls);

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      urlImages: updatedImageUrls, // Update urlImages in formData
    }));
  };

  // Handle removing an uploaded file image
  const handleRemoveFile = (index) => {
    const updatedFileImages = myFileImages.filter((_, i) => i !== index);
    setMyFileImages(updatedFileImages);

    // Update formData
    setFormData((prevData) => ({
      ...prevData,
      fileImages: updatedFileImages, // Update fileImages in formData
    }));
  };

  // Handle adding new images (multiple file uploads)
  const handleAddByFiles = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const newFileImages = files.map((file) => ({ imageType: "file", value: file }));
      setMyFileImages((prevImages) => [...prevImages, ...newFileImages]);

      // Update formData with new file images
      setFormData((prevData) => ({
        ...prevData,
        fileImages: [...prevData.fileImages, ...newFileImages], // Add to fileImages in formData
      }));
    }
    event.target.value = ""; // Reset input
  };

  // Trigger file input when button is clicked
  const triggerFileUpload = (event) => {
    event.preventDefault(); // Prevent form submission
    fileInputRef.current.click();
  };

  // Handle the image upload process (send to server)
  const handleUpload = () => {

    console.log(formData)
    const formData = new FormData();
    
    // Add file images to FormData
    myFileImages.forEach((image) => {
      if (image.imageType === "file") {
        formData.append("images", image.value); // Append file to FormData
      }
    });

    // Optionally, add image URLs if needed (could be used for metadata or linking)
    myImageUrls.forEach((url) => {
      formData.append("imageUrls", url); // Append URLs if needed
    });

    // Example: upload the formData to the server (make sure to adjust the endpoint)
    fetch(`${serverURL}/upload-endpoint`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload Success:", data);
      })
      .catch((error) => {
        console.error("Upload Error:", error);
      });
  };

  // Ensure the image keys are initialized
  useEffect(() => {
    ensureImageKeys();
  }, [formData]);

  return (
    <div className="imagewrappermain">
      <div className="image-grid-wrapper">
        {/* Display Image URLs */}
        {myImageUrls.map((url, index) => (
          <div className="image-grid-item" key={index}>
            <img
              src={`${serverURL}/images/${url}`}
              alt={`Image ${index + 1}`}
              className="image-grid-img"
            />
            <button
              className="image-grid-remove"
              onClick={() => handleRemoveUrl(index)}
            >
              X
            </button>
          </div>
        ))}

        {/* Display File Images */}
        {myFileImages.map((image, index) => (
          <div className="image-grid-item" key={index}>
            <img
              src={URL.createObjectURL(image.value)}
              alt={`Uploaded Image ${index + 1}`}
              className="image-grid-img"
            />
            <button
              className="image-grid-remove"
              onClick={() => handleRemoveFile(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="image-grid-actions">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleAddByFiles}
          className="image-grid-file-input"
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button
          type="button"
          className="image-grid-add-button"
          onClick={triggerFileUpload}
        >
          Add Images
        </button>
      </div>

     {/*  <button type="button" className="upload-button" onClick={handleUpload}>
        Upload Images
      </button> */}
    </div>
  );
};

export default ImageGrid;
