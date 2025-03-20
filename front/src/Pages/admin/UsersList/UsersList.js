import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getData, getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";
import './UsersList.css'

export default function UserList() {
  const columns = [
    { Header: "ID", accessor: "userid" },
    { Header: "Email", accessor: "email" },
    { Header: "Mobile", accessor: "mobile" },
    { Header: "Created at", accessor: "date",Cell: ({ row }) => (
    <div>
      {new Date(row.original.created_at).toLocaleString()}
    </div>
    ), },
  
  

  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/users/all");
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
        title={"Users"}
        number={data?.length}
        filter={false}
        bread="dashboad/users"
      />
      <ReusableSearchComponent list={data} refresh={getDataa} setFilterList={setFilteredList} searchKeys={['firstname','lastname','email','mobile']} />

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
        showView={false}
        showEdit={false}
        
      />
       
     <ReusablePages list={filteredList} setFilterList={setPaginatedList}/>
    </>
  );
}
