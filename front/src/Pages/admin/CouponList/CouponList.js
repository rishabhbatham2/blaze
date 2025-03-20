import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getData, getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";

export default function CouponList() {
    const navigate = useNavigate()


  const columns = [
    { Header: "ID", accessor: "couponid" },
    { Header: "Name", accessor: "couponname",Cell: ({ row }) => (

        
        <div onClick={()=>{editFunc(row.original)}} style={{color:'skyblue',textDecoration:'underline',cursor:'pointer'}}> 
            
            {row.original.couponname}
            
            </div>
      ), },
    { Header: "Value", accessor: "value" },
    { Header: "Max Value", accessor: "maxval" },
    { Header: "Updated at", accessor: "updated_at" },
  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/coupons/all");
    if (results.status) {
        console.log(results.data)
      setData(results.data);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    
    try {
      const result = await postData("api/coupons/delete", { productcategoryid: row.productcategoryid});
      if (result.status) {
       
        getDataa()
      }
    } catch {}
  };
  const editFunc = async (row) => {
    console.log("edit form is reciving data", row);
    sessionStorage.setItem("edit-coupon", JSON.stringify(row));
    window.location.href = "/admin/coupon-edit";
  };
  const addFuncc = async () => {
    /*  console.log('edit form is reciving data',row)
    sessionStorage.setItem("edit-category", JSON.stringify(row)); */
    window.location.href = "/admin/coupon-add";
  };

  return (
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"Coupons"}
        number={data?.length}
        bread="dashboard / coupons"
      />
      <ReusableTable
        columns={columns}
        data={data}
        deleteApi={deleteApi}
        editApi={editFunc}
        showView={false}
      />
    </>
  );
}
