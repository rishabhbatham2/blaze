import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getData, getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";
import ReusableSearchComponent from "../../../components/ui/ReusableSearch/ReusabeSearch";
import { toast } from "react-toastify";

export default function ProductList() {
  const columns = [
    { Header: "ID", accessor: "product_id" },
    { Header: "Image", accessor: "image_url" },
    { Header: "Sub", accessor: "productsubcategoryname" },
    { Header: "Category", accessor: "productcategoryname" },
    { Header: "Name", accessor: "name" },
    { Header: "Created at", accessor: "created_at" },
    { Header: "Edited at", accessor: "updated_at" },
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
  ];

   const toggleStatus=async(row)=>{
    try{
      let body ={
        product_id:row.original.product_id,
        status:row.original.status=='active'?'inactive':'active'
      }
   const results = await postData('api/products/updatestatus',body)
     
       getDataa()

      
    }
    catch{
      toast.error('failed to update status')
    }

   }

  const [selectedCat, setSelectedCat] = useState(false);
  const [selectedSubCat, setSelectedSubCat] = useState(false);
  const [catlist, setCatList] = useState([]);
  const [subcatlist, setSubCatList] = useState([]);
  const [products, setProducts] = useState([]);
  const [paginatedList, setPaginatedList] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);

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
    console.log('selected category is ',selectedCat,subcategory)
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

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/products/top");
    const result2 = await getDatanew("api/productcategory/all");
    const result3 = await getDatanew("api/productsubcategory/all");
    if (results.status) {
      setProducts(results.data);
      setCatList(result2.data);
      setSubCatList(result3.data);
      setFilteredProducts(results.data)
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
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"ProductList"}
        number={filteredProducts?.length}
        bread="dashboard / product"
      />

<ReusableSearchComponent list={products} refresh={getDataa} setFilterList={setFilteredProducts} searchKeys={['name','description','email','mobile']} />

      <div className="dashboard__categorystats">
        <div className="header__categorystats">All Categories</div>
        <div className="dashboard__categorystats__list">
          <div
            className="dashboard__categorystatsitem"
            onClick={() => {
              handleCategoryChange(false);
            }}
            style={{
              color: selectedCat == false ? "#205c97" : "#878787",
              backgroundColor: selectedCat == false ? "#ece6f3" : "#fff",
            }}
          >
            <p>All</p>
          </div>
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
                    product.productcategoryname ===
                    item.productcategoryname
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
      <ReusableTable
        columns={columns}
        data={paginatedList}
        deleteApi={deleteApi}
        editApi={editFunc}
        viewApi={viewApi}
      />

      <ReusablePages list={filteredProducts} setFilterList={setPaginatedList} />
    </>
  );
}
