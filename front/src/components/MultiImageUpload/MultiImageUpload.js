import React, { useEffect, useState } from "react";
import ImageGrid from "../ui/ReusableImage/ReeusableImage";
import { getData, postData, serverURL } from "../../services/NodeServices";
import ReusableForm from "../ReusableTable/ReusableForm/ReusableForm";
import { toast } from "react-toastify";

const MultiImageUpload = () => {

 const [currentImages,setCurrentImages]=useState(false)

 const getCurrentImages=async()=>{
    try{
 const result = await postData('api/products/getbanners')
 console.log(result)
 if(result.status){
    setCurrentImages(result.banners.set1)
    console.log('current images areeeeeeeeeeeeeee',currentImages)
 }
    }catch{

    }
 }

 useEffect(function(){
getCurrentImages()
 },[])


  const handleUpload = async (data) => {
    // Create a new FormData object
    const formData = new FormData();

    // Append scalar fields
    let scalarData = {
      urlImages: data.urlImages?.join(","),
      bannerid:1
    };

    formData.append("data", JSON.stringify(scalarData));

    // Append file images
    if (data.fileImages && Array.isArray(data.fileImages)) {
      data.fileImages.forEach((file, index) => {
        formData.append(`images`, file.value); // Assuming `value` holds the File object
      });
    }

    try {
      // Submit formData to the server

      const res = await postData("api/products/editbanners1", formData);

      toast.success("banner added Succesfully");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error adding the Product");
    }
  };

  let data = [{ name: "image_url", type: "image", value: currentImages?currentImages:'' }];

  return (
    <div
      style={{ backgroundColor: "#fff", padding: "2rem", marginTop: "1rem" }}
    >
    
      <ReusableForm
        data={data}
        submitApi={handleUpload}
        title={"Desptop Banner"}
       filter={false}
       bread= ''
      />

      {/*  <button className="submit-button" onClick={handleUpload}>Upload All</button> */}
    </div>
  );
};

export default MultiImageUpload;
