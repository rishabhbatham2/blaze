import React from "react";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { toast } from "react-toastify";
import MultiImageUpload from "../../../components/MultiImageUpload/MultiImageUpload";
import MultiImageUpload2 from "../../../components/MultiImageUpload copy/MultiImageUpload";
import MultiImageUpload3 from "../../../components/MultiImageUpload copy 2/MultiImageUpload";

export default function Dashboard() {
  const [catlist, setCatList] = useState([]);
  const [subcatlist, setSubCatList] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [dashstatus, setDashStats] = useState(false);

  const [selectedCat, setSelectedCat] = useState(false);

  const [selectedSubCat, setSelectedSubCat] = useState(false);

  const getAllData = async () => {
    try {
      const result = await getDatanew("api/productcategory/all");
      const result2 = await getDatanew("api/productsubcategory/all");
      const dashresult = await postData("dashboard-stats");

      if (result.status) {
        setCatList(result.data);
        setSelectedCat(result.data[0].productcategoryname);
        setSubCatList(result2.data);
      }
      setDashStats(dashresult.data);
    } catch {}
  };
  useEffect(function () {
    getAllData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCat(category);
    console.log("category selecetd to ", category);
    setSelectedSubCat(""); // Reset subcategory
    const filtered = products.filter(
      (product) => product.productcategoryname == category
    );
    setFilteredProducts(category ? filtered : products);

    console.log("category selecetd to ", category, filtered, products);
  };
  const handleSubCategoryChange = (subcategory) => {
    setSelectedSubCat(subcategory);
    const filtered = products.filter(
      (product) =>
        product.productcategoryname === selectedCat &&
        product.productsubcategoryname === subcategory
    );
    setFilteredProducts(
      subcategory
        ? filtered
        : products.filter(
            (product) => product.productcategoryname === selectedCat
          )
    );
  };

  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Image", accessor: "image_url" },
    { Header: "Variants", accessor: "variants",Cell: ({ row }) => (
      <span
        onClick={() => {
          handleNameClick(row.original); // Function to run on click
        }}
        style={{
          cursor: "pointer",
          color: "#232323",
         fontWeight:'bold',
          fontSize:'13px'
        }}
      >
        {row.original.variants}
      </span>
    ) },
    { Header: "Sub", accessor: "productsubcategoryname" },
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









    { Header: "Category", accessor: "productcategoryname" },
    { Header: "Name", accessor: "name",   Cell: ({ row }) => (
      <span
        onClick={() => {
          handleNameClick(row.original); // Function to run on click
        }}
        style={{
          cursor: "pointer",
          color: "#007bff",
          textDecoration: "underline",
          fontSize:'13px'
        }}
      >
        {row.original.name}
      </span>
    ),},
    { Header: "Created at", accessor: "created_at" },
    { Header: "Edited at", accessor: "updated_at" },
  ];


    const toggleStatus=async(row)=>{
      try{
        let body ={
          product_id:row.original.product_id,
          status:row.original.status=='active'?'inactive':'active'
        }
     const results = await postData('api/products/updatestatus',body)
       
        if(results.status){
          toast.success('status updated successfully')
        }
         getDataa()
  
        
      }
      catch{
        toast.error('failed to update status')
      }
  
     }

  const handleNameClick=(row)=>{
   

    sessionStorage.setItem("view-product", JSON.stringify(row));
    window.location.href = "/admin/view-product";
  }

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/products/top");
    if (results.status) {
      setProducts(results.data);
      setFilteredProducts(results.data);
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    try {
      const result = await postData("api/products/delete", {
        product_id: row.product_id,
      });
      if (result.status) {
        getDataa();
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

  return (
    <div className="dashboard__cont">
      <div className="dashboard__inner">
        <div className="dashboard__header">
          {dashstatus && (
            <>
              <div className="dashboard__item">
                <p>Total Orders</p>
                <p>{dashstatus.totalOrders}</p>
              </div>

              <div className="dashboard__item">
                <p>Total Revenue</p>
                <p>₹ {dashstatus.totalAmount}</p>
              </div>

              <div className="dashboard__item">
                <p>This week Orders</p>
                <p>{dashstatus.totalOrdersLastWeek}</p>
              </div>

              <div className="dashboard__item">
                <p>This week Revenue</p>
                <p>₹ {dashstatus.totalAmountLastWeek}</p>
              </div>
              <div className="dashboard__item">
                <p>Total registered users</p>
                <p> {dashstatus.totalUsers}</p>
              </div>
              <div className="dashboard__item">
                <p>This week registered Users</p>
                <p> 22322</p>
              </div>
            </>
          )}
        </div>
        <div>
          <MultiImageUpload />
          <MultiImageUpload2 />
          <MultiImageUpload3/>
        </div>
        <div className="dashboard__categorystats">
          <div className="header__categorystats">All Categories</div>
          <div className="dashboard__categorystats__list">
            {catlist &&
              catlist.map((item) => {
                return (
                  <div
                    className="dashboard__categorystatsitem"
                    onClick={() => {
                      handleCategoryChange(item.productcategoryname);
                    }}
                    style={{
                      color:
                        item.productcategoryname == selectedCat
                          ? "#205c97"
                          : "#878787",
                      backgroundColor:
                        item.productcategoryname == selectedCat
                          ? "#ece6f3"
                          : "#fff",
                    }}
                  >
                    <p>{item.productcategoryname}</p>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="dashboard__categorystats">
          <div className="header__categorystats">All Subcategories</div>
          <div className="dashboard__categorystats__list">
            {selectedCat &&
              subcatlist
                .filter((item) => item.productcategoryname === selectedCat) // Filter subcategories by selected category
                .map((item) => {
                  const productCount = products.filter(
                    (product) =>
                      product.productsubcategoryname ===
                      item.productsubcategoryname&&
                      product.productcategoryname==item.productcategoryname
                  ).length; // Count products in this subcategory

                  return (
                    <div
                      className="dashboard__categorystatsitem"
                      onClick={() =>
                        handleSubCategoryChange(item.productsubcategoryname)
                      }
                      key={item.productsubcategoryname}
                    >
                      <p>{item.productsubcategoryname}</p>
                      <p>{productCount} Products</p>
                    </div>
                  );
                })}
          </div>
        </div>

        <div className="dashboard__categorystats">
          <div className="header__categorystats">All products</div>
          <ReusableTable
            columns={columns}
            data={filteredProducts}
            deleteApi={deleteApi}
            editApi={editFunc}
            viewApi={viewApi}
          />
        </div>
      </div>
    </div>
  );
}
