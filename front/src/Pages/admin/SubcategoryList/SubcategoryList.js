import React, { useEffect, useState } from "react";
import ReusableHeader from "../../../components/ReusableHeader/ReusableHeader";
import ReusableTable from "../../../components/ReusableTable/ReusatbleTable";
import { getData, getDatanew, postData } from "../../../services/NodeServices";
import { useNavigate } from "react-router-dom";
import ReusablePages from "../../../components/ui/ReusableFilterComponent/ReusableFilterComponent";

export default function SubCategoryList() {
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Name", accessor: "productsubcategoryname" },
    { Header: "Category", accessor: "productcategoryname" },
    { Header: "Products", accessor: "products", color: "#2b5bee" },
    { Header: "Created at", accessor: "created_at" },
    { Header: "Edited at", accessor: "updated_at" },
  ];
  const [catlist, setCatList] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  const nav = useNavigate();

  const getDataa = async () => {
    const results = await getDatanew("api/productsubcategory/all");
    const result2 = await getDatanew("api/productcategory/all");
    if (results.status) {
      setData(results.data);
      setFilteredList(results.data);
    }
    if (result2.status) {
      setCatList(result2.data);
    }
  };

  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    getDataa();
  }, []);

  const deleteApi = async (row) => {
    try {
      const result = await postData("api/productsubcategory/delete", {
        id: row.id,
      });
      if (result.status) {
        getDataa();
      }
    } catch {}
  };
  const editFunc = async (row) => {
    console.log("edit form is reciving data", row);
    sessionStorage.setItem("edit-subcategory", JSON.stringify(row));
    window.location.href = "/admin/subcategory-edit";
  };
  const addFuncc = async () => {
    /*  console.log('edit form is reciving data',row)
    sessionStorage.setItem("edit-category", JSON.stringify(row)); */
    window.location.href = "/admin/subcategory-add";
  };

  const handleCategoryChange = (categoryName) => {
    setSelectedCat(categoryName);
    if (categoryName) {
      // Filter subcategories based on the selected category
      const filtered = data.filter(
        (item) => item.productcategoryname === categoryName
      );
      setFilteredList(filtered);
    } else {
      // If no category is selected, show all subcategories
      setFilteredList(data);
    }
  };
  


  return (
    <>
      <ReusableHeader
        addFunc={addFuncc}
        title={"Sub Category"}
        number={data?.length}
        bread="dashboard / subcategory"
      />

      <div className="dashboard__categorystats">
        <div className="header__categorystats">All Categories</div>
        <div className="dashboard__categorystats__list">
        <div
                  className="dashboard__categorystatsitem"
                  onClick={() => {
                    handleCategoryChange(null);
                  }}
                  style={{
                    color:
                       selectedCat ==null
                        ? "#205c97"
                        : "#878787",
                    backgroundColor:
                       selectedCat == null
                        ? "#ece6f3"
                        : "#fff",
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

      

      <ReusableTable
        columns={columns}
        data={filteredList}
        deleteApi={deleteApi}
        editApi={editFunc}
        showView={false}
      />

      <ReusablePages list={data} setFilterList={setFilteredList} />
    </>
  );
}
