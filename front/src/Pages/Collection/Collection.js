import React, { useEffect, useRef, useState } from "react";

import "./Collection.css";
import SliderSection from "../../components/Swiper";
import { getDatanew, postData, serverURL } from "../../services/NodeServices";
import { Pagination } from "react-admin";
import PaginationComp from "../../components/Pagination/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import dummy from "./dummy.json";
import Skeleton from "react-loading-skeleton";
export default function Collection() {
  const [topProducts, SetTopProducts] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const { name, subcategory } = useParams();
  const navigate = useNavigate();

  const [miniMenu, setMiniMenu] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state
  const [timeoutError, setTimeoutError] = useState(false); // Track timeout state
  const [error, setErr] = useState(null);
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXl"];
  const prices = [1000, 2000, 3000, 5000, 7000];

  const menuRef = useRef(null);

  const [selectedSize, setSelectedSize] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(false);
 /*  const [selectedSubcat, setselectedSubcat] = useState(false); */

  const handleSize = (size,nr) => {
    if (size == selectedSize) {
      setSelectedSize(false);
      if(!nr){
        refreshData(subcategory, false, selectedPrice);}
    } else {
      setSelectedSize(size);
      if(!nr){
        refreshData(subcategory, size, selectedPrice);}
    }
  };
  const handlePrice = (price,nr) => {
    if (price == selectedPrice) {
      setSelectedPrice(false);
      if(!nr){
        refreshData(subcategory, selectedSize, false);}
    } else {
      setSelectedPrice(price);
      if(!nr){
        refreshData(subcategory, selectedSize, price);}
    }
  };

/*   const handleSubCat = (subcat,nr) => {
    console.log(subcat);
    if (subcat == selectedSubcat) {
      setselectedSubcat(false);
     if(!nr){
       refreshData(false, selectedSize, selectedPrice);}
    } else {
      setselectedSubcat(subcat);
      if(!nr){
        refreshData(subcat, selectedSize, selectedPrice);}
    }
  }; */
  const handleSubCat = (subcat,nr) => {
   navigate(`/category/${name}/${subcat}`)
  };

  const refreshData = async (subcat, size, price) => {
    setLoading(true);
    try {
      let body = {
        category: name,
        subcategory: subcat=='All'?false:subcat,
        size: size,
        price: price,
      };

      const result = await postData("api/products/bycat3", body);
      if (result.status) {
        SetTopProducts(result.data);
      } else {
        SetTopProducts([]);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const renderSkeletonCard = () => (
    <div className="col2-md-3  col-6">
      <div className="firstsection_card">
        <Skeleton height={300} />
        <Skeleton width={211} />
        <Skeleton width={`60%`} />
      </div>
    </div>
  );
  const handleOutsideClick = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMiniMenu(false);
    }
  };

  useEffect(() => {
    if (miniMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [miniMenu]);

  const handleClosee = () => {
   /*  refreshData(selectedSubcat, selectedSize, selectedPrice) */
    setMiniMenu(false);
    /* getProducts(); */
   
  };
  const handleClear = () => {
    setMiniMenu(false);
    setSelectedPrice(false);
    setSelectedSize(false);
   /*  setselectedSubcat(false); */
    getProducts();
  };

  const gettopProducts = async () => {
    const results = await postData("api/products/top");
    /*  const results = await getDatanew("api/productcategory/all"); */

    if (results.status) {
      SetTopProducts(results.data.sort(() => Math.random() - 0.5));
    }
  };
  const getAllSubcategory = async () => {
    const results = await postData("api/productsubcategory/bycategory", {
      productcategoryname: name,
    });

    /*  const results = await getDatanew("api/productcategory/all"); */

    if (results.status) {
      setSubCat(results.data);
    } else {
      setSubCat([]);
    }
  };
  const getProducts = async (subcat) => {
    setLoading(true);
    setTimeoutError(false);

    const timeout = setTimeout(() => {
      setTimeoutError(true);
      setLoading(false);
    }, 7000);

    try {
      const results = await postData("api/products/bycat3", {
        category: name,
        subcategory: subcategory=='All'?false:subcategory,
        price: selectedPrice,
        size: selectedSize,
      }); /*  dummy */
      clearTimeout(timeout);
      if (results.status) {
        SetTopProducts(results.data);
        console.log(results.data);
      } else {
        SetTopProducts([]);
        clearTimeout(timeout);
      }
    } catch {
      clearTimeout(timeout);
    } finally {
      setLoading(false);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This enables smooth scrolling to the top
    });
  };

  const handleProductClick = async (product_id) => {
    navigate(`/view/${product_id}`);
  };

  useEffect(() => {
    /*   gettopProducts(); */
    getAllSubcategory();
    getProducts();
  }, [name,subcategory]);

  useEffect(() => {
    /*  gettopProducts(); */
    getProducts();
  }, []);

  const items = [
    "Classic Tees",
    "Oversized Tees",
    "Fashion Joggers",
    "Hoodies",
    "Travel Jogger",
    "Travel Hoodie",
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = topProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(topProducts.length / productsPerPage);

  useEffect(function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This enables smooth scrolling to the top
    });
  }, []);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // This enables smooth scrolling to the top
    });
  };
  return (
    <>
      {/*   <SliderSection /> */}
      <div className="collection__cont">
        <div className="collection__inner">
          <div className="breadcumb">{`Home  > ${name} > ${subcategory}`}</div>
          <div className="collection__heading1">
            <p>{name}</p>{" "}
            <p>{topProducts ? topProducts.length : ""} Products</p>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setMiniMenu(true);
              }}
            >
              <path
                d="M11 8L20 8"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M4 16L14 16"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <ellipse
                cx="7"
                cy="8"
                rx="3"
                ry="3"
                transform="rotate(90 7 8)"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <ellipse
                cx="17"
                cy="16"
                rx="3"
                ry="3"
                transform="rotate(90 17 16)"
                stroke="#33363F"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>

          <div className="collectioncontent">
            <div className="collection__content__left">
              <div className="collection__contenth">
                <p>Filter</p> <p onClick={handleClear}>Clear All</p>
              </div>

              <div className="filtervalues"></div>

              <div className="filterheading2">
                <p>Categories</p>
              </div>

              <div
                className="filtervalues"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: "1rem",
                }}
              >
                  <div
                      className="search__prices2"
                      onClick={() => {
                        handleSubCat('All');
                      }}
                      style={
                       subcategory=='All'
                          ? { color: "#222", backgroundColor: "#f4ebf7" }
                          : {}
                      }
                    >
                      {'All.'}
                    </div>
                {subcat.map((item) => {
                  return (
                    <div
                      className="search__prices2"
                      onClick={() => {
                        handleSubCat(item.productsubcategoryname);
                      }}
                      style={
                        item.productsubcategoryname == subcategory
                          ? { color: "#222", backgroundColor: "#f4ebf7" }
                          : {}
                      }
                    >
                      {item.productsubcategoryname}
                    </div>
                  );
                })}
              </div>
              <div className="filterheading2">
                <p>Price</p>
              </div>

              <div
                className="filtervalues"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: "1rem",
                }}
              >
                {prices.map((item) => {
                  return (
                    <div
                      className="search__prices"
                      onClick={() => {
                        handlePrice(item);
                      }}
                      style={
                        item == selectedPrice
                          ? { color: "#222", backgroundColor: "#f4ebf7" }
                          : {}
                      }
                    >
                      ₹ {item}
                    </div>
                  );
                })}
              </div>

              <div className="filterheading3">
                <p>Sizes</p>
              </div>

              <div
                className="filtervalues3"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: "1rem",
                }}
              >
                {sizes.map((item) => {
                  return (
                    <div
                      className="filtersizemap"
                      onClick={() => {
                        handleSize(item);
                      }}
                      style={
                        item == selectedSize
                          ? { color: "#222", backgroundColor: "#f4ebf7" }
                          : {}
                      }
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="collection__content__right">
              {loading ? (
                Array(9)
                  .fill(0)
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      {renderSkeletonCard()}
                    </React.Fragment>
                  ))
              ) : timeoutError ? (
                <div className="timeout-error">
                  Server took too long to respond. Please try again later.
                </div> // Timeout message
              ) : error ? (
                <div className="error-message">{error}</div> // Display error message if server fails
              ) : topProducts.length != 0 ? (
                currentProducts.map((item) => (
                  <div
                    className="col2-md-3 col-6"
                    onClick={() => {
                      handleProductClick(item.product_id);
                    }}
                  >
                    <div className="thirdsection_card card2">
                      <img
                        src={`${serverURL}images/${item.image_url}`}
                        alt=""
                        width={361}
                        height={539}
                      />
                      <div className="bottomtitles">
                        <p>{item.name}</p>
                        <div className="bottomprices">
                          <p>
                            ₹ {item.current_price ? item.current_price : 511}
                          </p>{" "}
                          <p>₹ {item.base_price}</p>{" "}
                          <p>
                            ₹{" "}
                            {item.base_price -
                              (item.current_price
                                ? item.current_price
                                : 511)}{" "}
                            OFF
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="nomatach">
                    <img src="/image/no result.jpg" />
                    <p>No matching Results</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <PaginationComp
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>

        <div
          className={`rightfilterbar ${miniMenu ? "rightfilteractive" : ""}`}
        >
          <div className="cancelbutonn" onClick={handleClosee}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#444444"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="rightfilter__cont">
            <div
              className="collection__contenth"
              style={{ width: "99%", cursor: "pointer" }}
            >
              <p>Filter</p> <p onClick={handleClear}>Clear All</p>
            </div>

            <div className="filtervalues"></div>

            <div className="filterheading2">
              <p>Categories</p>
            </div>

            <div
              className="filtervalues"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "1rem",
              }}
            >
                <div
                      className="search__prices2"
                      onClick={() => {
                        handleSubCat('All');
                      }}
                      style={
                       subcategory=='All'
                          ? { color: "#222", backgroundColor: "#f4ebf7" }
                          : {}
                      }
                    >
                      {'All.'}
                    </div>
              {subcat.map((item) => {
                return (
                  <div
                    className="search__prices2"
                    onClick={() => {
                      handleSubCat(item.productsubcategoryname);
                    }}
                    style={
                      item.productsubcategoryname == subcategory
                        ? { color: "#222", backgroundColor: "#f4ebf7" }
                        : {}
                    }
                  >
                    {item.productsubcategoryname}
                  </div>
                );
              })}
            </div>
            <div className="filterheading2">
              <p>Price</p>
            </div>

            <div
              className="filtervalues"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "1rem",
              }}
            >
              {prices.map((item) => {
                return (
                  <div
                    className="search__prices"
                    onClick={() => {
                      handlePrice(item);
                    }}
                    style={
                      item == selectedPrice
                        ? { color: "#222", backgroundColor: "#f4ebf7" }
                        : {}
                    }
                  >
                    ₹ {item}
                  </div>
                );
              })}
            </div>

            <div className="filterheading3">
              <p>Sizes</p>
            </div>

            <div
              className="filtervalues3"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingTop: "1rem",
              }}
            >
              {sizes.map((item) => {
                return (
                  <div
                    className="filtersizemap"
                    onClick={() => {
                      handleSize(item);
                    }}
                    style={
                      item == selectedSize
                        ? { color: "#222", backgroundColor: "#f4ebf7" }
                        : {}
                    }
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
