import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";


export default function OrderList() {
  const columns = [
    { Header: "ID", accessor: "orderid" },
    { Header: "Image", accessor: "image_url" },
    { Header: "Name", accessor: "name" },
    { Header: "Size", accessor: "size" },
    { Header: "Color", accessor: "color" },
    { Header: "Price", accessor: "price" },
    { Header: "Address", accessor: "mainaddress",Cell: ({ row }) => (
        <div>{row.original.mainaddress},{row.original.city}</div>
      ), },

    { Header: "Created at", accessor: "created_at" },
  
  

  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/order/all");
    if (results.status) {
      setData(results.data);
      setFilteredList(results.data)
      
    }
  };

  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [paginatedList,setPaginatedList]=useState([])

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    
    try {
      const result = await postData("api/products/delete", { product_id: row.product_id});
      if (result.status) {
       
        getDataa()
      }

    } catch {}
  };
  const editFunc = async (row) => {
    console.log("edit form is reciving ", row);
    sessionStorage.setItem("edit-product", JSON.stringify(row));
    window.location.href = "/admin/product-edit";
  };
  const viewApi = async (row) => {
    console.log("edit form is reciving ", row);
    sessionStorage.setItem("view-product", JSON.stringify(row));
    window.location.href = "/admin/view-product";
  };
  const addFuncc = async () => {
    /*  console.log('edit form is reciving data',row)
    sessionStorage.setItem("edit-category", JSON.stringify(row)); */
    window.location.href = "/admin/product-add";
  };
  const newestFirst = () => {
    // Create a new reversed array
    const reverseList = [...data].reverse();
    setFilteredList(reverseList);
  };
  
  const oldestFirst = () => {
    // Reset the filtered list to the original order
    setFilteredList([...data]);
  };
  

  return (
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"All Payments"}
        number={data?.length}
      />
      <ReusableSearchComponent list={data} refresh={getDataa} setFilterList={setFilteredList} searchKeys={['userid','amount','email','mobile']} />

      <div className="datafilters">
          <div className="datafilters__item" onClick={newestFirst}>
            newest first
          </div>
          <div className="datafilters__item" onClick={oldestFirst}>
            oldest first
          </div>
      </div>
      
      <ReusableTable
        columns={columns}
        data={paginatedList}
        deleteApi={deleteApi}
        editApi={editFunc}
        viewApi={viewApi}
      />

     <ReusablePages list={filteredList} setFilterList={setPaginatedList}/>
    </>
  );
}
