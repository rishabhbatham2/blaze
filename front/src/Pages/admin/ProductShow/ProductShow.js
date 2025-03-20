import React, { useEffect, useState } from "react";
import ReusableShowComp from "../../../components/ReusableShowComponent/ReusableShowComponent";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { postData } from "../../../services/NodeServices";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import './ProductShow.css'
import { toast } from "react-toastify";




export default function ProductView(){
   
    let mydata = false;
  const storedData = sessionStorage.getItem("view-product");
  if (storedData) {
    mydata = JSON.parse(storedData);
    
  }



    const [variantList,setVariantList]=useState([])

    const columns = [
        { Header: "ID", accessor: "variant_id" },
        { Header: "Name", accessor: "variantname",Cell: ({ row }) => (
          <span
            onClick={() => {
              handleNameClick(row.original); // Function to run on click
            }}
            style={{
              cursor: "pointer",
              color: "#007bff",
              textDecoration:'underline',
              fontSize:'13px'
            }}
          >
            {row.original.variantname}
          </span>
        ) },
        { Header: 'Image', accessor: 'image_url' },
        { Header: "color", accessor: "color" },
        { Header: "Size", accessor: "size" },
        { Header: "Price", accessor: "current_price" },
        { Header: "Status", accessor: "status",Cell: ({ row }) => (
          <button
            onClick={() => toggleStatus(row)}
            style={{
              padding: "2px 5px",
              backgroundColor: row.original.status=='active' ? "#83abc5" : "#eee",
              color: row.original.status=='active' ? "#fff" : "#222",
              
              border: "none",
              borderRadius: "5px",
              fontSize:13
            }}
          >
            {row.original.status=='active' ? "active" : "inactive"}
          </button>
        ),
    },
       
      /*   { Header: "Created at", accessor: "created_at" },
        { Header: "Edited at", accessor: "updated_at" }, */
      
    
      ];


       const toggleStatus=async(row)=>{
            try{
              let body ={
                variant_id:row.original.variant_id,
                status:row.original.status=='active'?'inactive':'active'
              }
           const results = await postData('api/products/updatestatusvariant',body)
             
              if(results.status){
                toast.success('status updated successfully')
              }
               
              getvariantList()
        
              
            }
            catch{
              toast.error('failed to update status')
            }
        
           }
      

      const handleNameClick=(row)=>{
   

        sessionStorage.setItem("edit-variant", JSON.stringify(row));
        window.location.href = "/admin/variant-edit";
      }

    const getvariantList = async()=>{
        try{
            const result = await postData('api/products/allvariants',{product_id:mydata.product_id})
            if(result.status){
                setVariantList(result.data)
                console.log(result.data)
            }

        }catch{

        }

    }
    useEffect(()=>{
     getvariantList()
    },[])
    const editFunc = async (row) => {
        console.log("edit form is reciving ", row);
        sessionStorage.setItem("edit-variant", JSON.stringify(row));
        window.location.href = "/admin/variant-edit";
      };

      const addFunc = async (row) => {
        console.log("edit form is reciving ", row);
        sessionStorage.setItem("add-variant", JSON.stringify({product_id:mydata.product_id}));
        window.location.href = "/admin/variant-add";
      };
  const deleteApi = async (row) => {
    try {
      const result = await postData("api/products/deletevariant", {
        variant_id: row.variant_id,
      });
      if (result.status) {
        getvariantList()
        toast.success('Variant Deleted')
      }else{
        toast.error('error deleting variant')
      }
    } catch {
      toast.error('Error Deleting Variant')
    }
  };
    return(
        <div className="product__view" style={{paddingTop:64,paddingBottom:64}}>
          <ReusableShowComp data={mydata}/>
          <div className="product__header">
             <p>Variant List</p> <button onClick={addFunc} >Create</button>
          </div>
          <ReusableTable columns={columns} data={variantList} editApi={editFunc} deleteApi={deleteApi}/>
        </div>
    )
}