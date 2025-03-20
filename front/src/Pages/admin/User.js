import React, { useEffect, useState } from "react";
import ReusableTable from "../../components/ReusableTable/ReusatbleTable";
import ReusableHeader from "../../components/ReusableHeader/ReusableHeader";
import { postData } from "../../services/NodeServices";


export default function User() {
  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Name", accessor: "name" },
    { Header: "# Products", accessor: "base_price" },
    
  ];


  const gettopProducts=async()=>{
    const results = await  postData('api/products/top')
    if(results.status){
      SetTopProducts(results.data);
    }
  }
  
  const [topProducts,SetTopProducts]=useState([])
  


  useEffect(()=>{
   gettopProducts()

  },[])

  const deleteApi =async(id)=>{
    console.log(id)
   try{
    const result = await postData('api/products/delete',{product_id:id})
    if(result.status){
        SetTopProducts((prevProducts) => prevProducts.filter(product => product.id != id));
        gettopProducts()
    }
   }catch{

   }
  }

  return (
    <>
    
    <ReusableHeader/>
    <ReusableTable columns={columns} data={topProducts} deleteApi={deleteApi}/>
    
    </>
  );
}
