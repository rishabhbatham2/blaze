import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";


export default function NewOrders() {
   

    const navigate = useNavigate()
    function convertToOriginalForm(array) {
        return array.map(item => {
            const { variant, quantity } = item;
            return {
                variant_id: variant.variant_id,
                product_id: variant.product_id,
                size: variant.size.trim(),
                color: variant.color.trim(),
                price: parseFloat(variant.price),
                stock_quantity: variant.stock_quantity,
                created_at: variant.created_at,
                updated_at: variant.updated_at,
                variantname: variant.variantname,
                image_url: variant.image_url.split(","),
                current_price: parseFloat(variant.current_price),
                status: variant.status,
                quantity: quantity
            };
        });
    }
  const columns = [
    { Header: "ID", accessor: "orderid" },
    { Header: "Image", accessor: "image_url" },
    { Header: "User id", accessor: "userid" },
    
    { Header: "Name", accessor: "customername" },
    { Header: "Price", accessor: "amount" },

    { Header: "Mobile No", accessor: "mobileno",Cell: ({ row }) => (

        
        <div onClick={()=>{navigate(`/admin/acceptorder/${row.original.orderid}`)}} style={{color:'skyblue',textDecoration:'underline',cursor:'pointer'}}> 
            
            {row.original.mobileno}
            
            </div>
      ), },
    { Header: "Address", accessor: "mainaddress",Cell: ({ row }) => (
        <div>{row.original.mainaddress},{row.original.city}</div>
      ), },

    { Header: "Created at", accessor: "created_at" },
  
  

  ];

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/order/neworders");
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
        title={"All Orders"}
        number={data?.length}
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

     <ReusablePages list={filteredList} setFilterList={setPaginatedList}/>
    </>
  );
}
