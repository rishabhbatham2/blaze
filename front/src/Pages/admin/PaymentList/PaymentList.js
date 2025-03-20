import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";


export default function PaymentList() {
  const columns = [
    { Header: "ID", accessor: "paymentid" },
    { Header: "UserID", accessor: "userid" },
    { Header: "Stats", accessor: "status" },
    { Header: "Amount", accessor: "amount",Cell: ({ row }) => (
      <span
     /*    onClick={() => {
          handleNameClick(row.original); // Function to run on click
        }} */
        style={{
          cursor: "pointer",
          color: "rgb(65 142 40)",
          textDecoration:'underline',
          fontSize:'13px'

        }}
      >
        {row.original.amount}
      </span>
    ) },
    { Header: "Created at", accessor: "created_at" },
  
  

  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/payments/all");
    if (results.status) {
      setData(results.data);
      setFilteredList(results.data)
      
      console.log(results.data)
    }
  };

  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [paginatedList,setpaginatedList]=useState([])

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
        bread="dashboad/payments"
        filter={false}
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
        showMenu={false}
      />

     <ReusablePages list={filteredList} setFilterList={setpaginatedList} set2={setData} set3={setFilteredList}/>
    </>
  );
}


