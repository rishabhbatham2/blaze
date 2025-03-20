import React from "react";
import { useEffect, useState } from "react";
import ReusableForm from "../../../components/ReusableTable/ReusableForm/ReusableForm";
import { type } from "@testing-library/user-event/dist/type";
import { getDatanew, postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProductEdit({mode='add'}) {
  let mydata = false;
  const storedData = sessionStorage.getItem("edit-product");
  const navigate = useNavigate()
  if (storedData) {
    mydata = JSON.parse(storedData);
    
  }
  const [mylist, setList] = useState([]);
  const [subcatlist,setSubCatList]=useState([])
  const [mysubcat,setMySubCat]=useState([])

  const getList = async () => {
    try {
      const result = await getDatanew("api/productcategory/all");
      if (result.status) {
        setList(result.data.map((item) => item.productcategoryname));
      
      }
    } catch {}
  };
  
  const getSubCatList = async () => {
    try {
      const result = await getDatanew("api/productsubcategory/all");
      if (result.status) {
        setSubCatList(result.data);
        if(storedData){
          const filteredSubcategories = result.data
          .filter((item) => item.productcategoryname == mydata.productcategoryname)
          .map((item) => item.productsubcategoryname);
        setMySubCat(filteredSubcategories);
        }
      }
    } catch {}
  };

  const submitApi=async(data)=>{

    // Create a new FormData object
    const formData = new FormData();

    // Append scalar fields
    let scalarData = {
      product_id:mydata.product_id,
      base_price: data.base_price,
      current_price: data.current_price,
      description:data.description,
      name: data.name,
      productcategoryname: data.productcategoryname,
      productsubcategoryname: data.productsubcategoryname,
      sku:data.sku,
      hsn:data.hsn,
      meta__title:data.meta__title,
      meta__description:data.meta__description,
      urlImages: data.urlImages?.join(","), // Convert urlImages array to a comma-separated string
    };
    
    if(mode!='edit'){
      delete scalarData.product_id;
      delete scalarData.image_url;
    }
  
    // Append the scalarData object as a JSON string under the key "data"
    formData.append("data", JSON.stringify(scalarData));
  
    // Append file images
    if (data.fileImages && Array.isArray(data.fileImages)) {
      data.fileImages.forEach((file, index) => {
        formData.append(`images`, file.value); // Assuming `value` holds the File object
      });
    }
    
  
   
    try {
      // Submit formData to the server
    if(mode=='edit'){
     
      const res = await postData('api/products/edit',formData)
       
      toast.success('Product added Succesfully')
      navigate(-1)
      
    }else{
    
      const res = await postData('api/products/add',formData)
       if(res.status){
        toast.success('Product edited Succesfully')
        navigate(-1)
       }else{
        toast.error(`error ${res.message}`)
       }
    }
  
     
      
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error('Error adding the Product')
    }
  

    
  }


  useEffect(function () {
    getList();
    getSubCatList()
  }, []);

  const handleCategoryChange = (selectedCategory) => {
    console.log('subcat list was',subcatlist)
    console.log('selected cat was',selectedCategory)

    const filteredSubcategories = subcatlist
      .filter((item) => item.productcategoryname == selectedCategory)
      .map((item) => item.productsubcategoryname);
    setMySubCat(filteredSubcategories);
    console.log('filtered sub catssssssssssssssssssssss',filteredSubcategories,selectedCategory)
  };

  let data = [
    { name: "name", type: "text", value: mode == "edit" ? (mydata ? mydata.name : "") : "" },
    { name: "base_price", type: "numeric", value: mode == "edit" ? (mydata ? mydata.base_price : "") : "" },
    { name: "current_price", type: "numeric", value: mode == "edit" ? (mydata ? mydata.current_price : "") : "" },
    { name: "image_url", type: "image", value:mode == "edit" ? (mydata ? mydata.image_url : "") : "" },
    { name: "description", type: "rich", value:mode == "edit" ? (mydata ? mydata.description : "") : "" },

    { name: "sku", type: "text", value:mode == "edit" ? (mydata ? mydata.sku : "") : "" },
    { name: "hsn", type: "text", value:mode == "edit" ? (mydata ? mydata.hsn : "") : "" },

    { name: "meta__description", type: "text", value:mode == "edit" ? (mydata ? mydata.meta__description : "") : "" },
    { name: "meta__title", type: "text", value:mode == "edit" ? (mydata ? mydata.meta__title : "") : "" },
    {
      name: "productcategoryname",
      type: "select",
      value: mode == "edit" ? (mydata ? mydata.productcategoryname : "") : "",
      list: mylist,
      api: handleCategoryChange
      
    },
    
    {
        name: "productsubcategoryname",
        type: "select",
        value: mode == "edit" ? (mydata ? mydata.productsubcategoryname : "") : "",
        list: mysubcat,
        api: (name) => {
           
        },
        
      },
  ];


  return <ReusableForm data={data} submitApi={submitApi} title={'Product Edit'} />;
}
