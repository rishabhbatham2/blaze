import React from "react";
import { useEffect, useState } from "react";
import ReusableForm from "../../../components/ReusableTable/ReusableForm/ReusableForm";
import { type } from "@testing-library/user-event/dist/type";
import { getDatanew, postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";

export default function SubCategoryEdit({ mode }) {
  let mydata = false;
  const storedData = sessionStorage.getItem("edit-subcategory");
  if (storedData) {
    mydata = JSON.parse(storedData);
 
  }
  const [mylist,setList]=useState([])
  const getList=async()=>{
    try{
        const result = await getDatanew('api/productcategory/all')
        if(result.status){
            setList(result.data.map(item => item.productcategoryname))
        }

       
    }catch{

    }
  }
   
  useEffect(function(){
  getList()
  },[])

   console.log(mylist)

  let data = [
    {
      name: "productsubcategoryname",
      type: "text",
      value: mode == "edit" ? (mydata ? mydata.productsubcategoryname : "") : "",
    },
    {
        name: "productcategoryname",
        type: "select",
        value: mode == "edit" ? (mydata ? mydata.productcategoryname : "") : "",
        list:mylist,
        api:false
        
        

      },
  ];

  const submitApi = async (data) => {
   

   

    try {
      if (mode == "edit") {

        let subdata = mydata
        subdata["productcategoryname"] = data.productcategoryname;
        subdata["productsubcategoryname"] = data.productsubcategoryname;

        const result = await postData("api/productsubcategory/edit", subdata);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      } else {
        let body = {
          productcategoryname: data.productcategoryname
          ,productsubcategoryname: data.productsubcategoryname,
        
        };

        const result = await postData("api/productsubcategory/add", body);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      }
    } catch {}
  };

  return <ReusableForm data={data} submitApi={submitApi} />;
}
