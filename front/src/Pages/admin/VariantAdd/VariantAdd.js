import React from "react";
import { useEffect, useState } from "react";
import ReusableForm from "../../../components/ReusableTable/ReusableForm/ReusableForm";
import { type } from "@testing-library/user-event/dist/type";
import { getDatanew, postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function VariantAdd({ mode = "add" }) {
  let mydata = false;
  const storedData = sessionStorage.getItem("add-variant");
  if (storedData) {
    mydata = JSON.parse(storedData);
  }
  console.log('stored data issssssssssssss',mydata)
  const navigate = useNavigate();

  const submitApi = async (data) => {
    // Create a new FormData object
    const formData = new FormData();

    // Append scalar fields

    let scalarData = {
      
      price: data.price,
      current_price: data.current_price,
      product_id:mydata.product_id,
      variantname:data.variantname,
      size: data.size,
      color: data.color,
      stock_quantity:data.stock_quantity||1,
      product_id:mydata.product_id,
      

      urlImages: data.urlImages?.join(","), // Convert urlImages array to a comma-separated string
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
    
        const res = await postData("api/products/addvariant", formData);
        if (res.status) {
          toast.success("Variant Added Succesfully");
         /*  navigate("/admin/view-product"); */
        } else {
          toast.error(`error adding variants ${res.message}`)
        }
      
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  let data = [
    {
      name: "variantname",
      type: "text",
      value: mode == "edit" ? (mydata ? mydata.variantname : "") : "",
    },
    {
      name: "price",
      type: "numeric",
      value: mode == "edit" ? (mydata ? mydata.price : "") : "",
    },
    {
      name: "current_price",
      type: "numeric",
      value: mode == "edit" ? (mydata ? mydata.current_price : "") : "",
    },
   /*  {
      name: "stock_quantity",
      type: "numeric",
      value: mode == "edit" ? (mydata ? mydata.stock_quantity : "") : "",
    }, */
    {
      name: "color",
      type: "text",
      value: mode == "edit" ? (mydata ? mydata.color : "") : "",
    },
    {
      name: "image_url",
      type: "image",
      value: mode == "edit" ? (mydata ? mydata.image_url : "") : "",
    },

    {
      name: "size",
      type: "select",
      value: mode == "edit" ? (mydata ? mydata.size : "") : "",
      list: ["XS", "S", "M", "L", "XL"],
      api: (name) => {},
    },
  ];

  return (
    <ReusableForm data={data} submitApi={submitApi} title={"Variant Edit"} />
  );
}
