import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getData, getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const columns = [
    { Header: "ID", accessor: "productcategoryid" },
    { Header: "Name", accessor: "productcategoryname" },
  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/productcategory/all");
    if (results.status) {
      setData(results.data);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    
    try {
      const result = await postData("api/productcategory/delete", { productcategoryid: row.productcategoryid});
      if (result.status) {
       
        getDataa()
      }
    } catch {}
  };
  const editFunc = async (row) => {
    console.log("edit form is reciving data", row);
    sessionStorage.setItem("edit-category", JSON.stringify(row));
    window.location.href = "/admin/category-edit";
  };
  const addFuncc = async () => {
    /*  console.log('edit form is reciving data',row)
    sessionStorage.setItem("edit-category", JSON.stringify(row)); */
    window.location.href = "/admin/category-add";
  };

  return (
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"Category"}
        number={data?.length}
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
