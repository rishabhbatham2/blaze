import React, { useContext, useEffect, useState } from "react";
import "./ViewShirt.css";
import { postData, serverURL } from "../../services/NodeServices";
import { useParams } from "react-router-dom";

import CartValueComp from "../../components/CartValueComp/CartValueComp";
import ShirtImageCarosoul from "./ShirtImageCarosoul/ShirtImageCarosoul";
import Skeleton from "react-loading-skeleton";

const ShirtView = () => {
  console.log("shirt view rerendered");

  const [loading, setLoading] = useState(true);

  const [myproduct, setMyProduct] = useState(false);
  const [myVariant, setMyVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedCurrentPrice, setSelectedCurrentPrice] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpanded2, setIsExpanded2] = useState(false);
  const [isExpanded3, setIsExpanded3] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const toggleExpand2 = () => {
    setIsExpanded2(!isExpanded2);
  };
  const toggleExpand3 = () => {
    setIsExpanded3(!isExpanded3);
  };

  const [quantity, setQuantity] = useState(0);

  const { product_id } = useParams();

  useEffect(() => {
    if (!myproduct) {
      handleProductClick(product_id);
    }
  }, []);

  /*   useEffect(() => {
        const currentItem = cart.find((item) => item.variant.variant_id === selectedVariant);
        if (currentItem) {
            setQuantity(currentItem.quantity);
        } else {
            setQuantity(1);
        }
    }, [cart, selectedVariant]); */
  const getval = () => {
    console.log("current cart is ", localStorage.getItem("cart"));
  };

  const handleProductClick = async (product_id) => {
    const result = await postData("api/products/byid", {
      product_id: product_id,
    });
    if (result.status) {
      setSelectedVariant(result.variants[0].variant_id);
      setSelectedColor(result.variants[0].color);

      const available = result.variants
        .filter((variant) => variant.color == result.variants[0].color)
        .map((variant) => variant.size);

      setAvailableColors([
        ...new Set(result.variants.map((variant) => variant.color)),
      ]);
      setAvailableSizes(available);

      const selected = result.variants.find(
        (variant) =>
          variant.color === result.variants[0].color &&
          variant.size === result.variants[0].size
      );
      setSelectedPrice(selected.price)
      setSelectedCurrentPrice(selected.current_price)

      setSelectedImages(selected.image_url.split(","));
      setSelectedSizes(result.variants[0].size);

      setMyVariant(result.variants);
      setMyProduct(result.product);
    }
    setLoading(false)
  };
  const handleColorClick = (color) => {
    console.log("atm color is", selectedColor);
    console.log("color will be", color);
    let selected;
    const available = myVariant
      .filter((variant) => variant.color == color)
      .map((variant) => variant.size);
    console.log("aall avaible sizes are color is", available);
    setAvailableSizes(available);

    if (!available.includes(selectedSizes)) {
      setSelectedSizes(available[0]);
      console.log("as size wasnt avaiable sieswitched to", available[0]);
      selected = myVariant.find(
        (variant) => variant.color === color && variant.size === available[0]
        
      );
      setSelectedPrice(selected.price)
     setSelectedCurrentPrice(selected.current_price)
    } else {
      selected = myVariant.find(
        (variant) => variant.color === color && variant.size === selectedSizes
      );
      setSelectedPrice(selected.price)
      setSelectedCurrentPrice(selected.current_price)
    }
    console.log("ewn we getting for size", selectedSizes, color);

    setSelectedImages(selected.image_url.split(","));
    setSelectedVariant(selected.variant_id);
    setSelectedColor(color);

    console.log("console log product changed to new slectd product", selected);
  };

  const handleSizeClick = (size) => {
    setSelectedSizes(size);

    const selected = myVariant.find(
      (variant) => variant.color === selectedColor && variant.size === size
    );
    setSelectedImages(selected.image_url.split(","));
    setSelectedVariant(selected.variant_id);
  };
  useEffect(function(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // This enables smooth scrolling to the top
      });
    },[])

  const renderSkeletonCard = () => (
    <div className="viewskeletoncard">
      <div className="seleletonimage">
        <Skeleton height={410} />

        <Skeleton height={30} />
      </div>
      <div className="skeletondata">
        <div className="skeleton__name">
          <Skeleton height={29} width={197}/>
        </div>
        <div className="skeleton__name">
          <Skeleton height={29} width={97}/>
        </div>

        <div className="skeleton__color">
        <div>
        <Skeleton height={27} width={27} style={{borderRadius:'1rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={27} style={{borderRadius:'1rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={27} style={{borderRadius:'1rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={27} style={{borderRadius:'1rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={27} style={{borderRadius:'1rem'}}/>
        </div>
          
        </div>
        <div className="skeleton__color" style={{marginTop:'1rem'}}>
        <div>
        <Skeleton height={27} width={47} style={{borderRadius:'.2rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={47} style={{borderRadius:'.2rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={47} style={{borderRadius:'.2rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={47} style={{borderRadius:'.2rem'}}/>
        </div>
        <div>
        <Skeleton height={27} width={47} style={{borderRadius:'.2rem'}}/>
        </div>
          
        </div>
      </div>
    </div>
  );
console.log(myproduct&&selectedVariant)
  return (
    <div className="shirtmain">
      {!loading ? (
        <div className="shirt-view">
          <div className="shirt-view-left">
            {/*   {myproduct && (
            <img
              src={`${serverURL}images/${selectedImages[0]}`}
              alt="Men's Fashion Tshirt"
              className="main-image"
              onClick={getval}
            />
          )}
          <div className="thumbnail-container">
            {myproduct &&
              selectedImages.map((item, index) => (
                <img
                  key={item}
                  src={`${serverURL}images/${selectedImages[index]}`}
                  alt="Thumbnail"
                />
              ))}
          </div> */}
            <ShirtImageCarosoul images={selectedImages} />
          </div>
          <div className="shirt-view-right">
            <h1>{myproduct && myproduct.name}</h1>
            <p className="price">
               ₹ {myproduct && selectedCurrentPrice?selectedCurrentPrice:2111}
              <span className="original-price">
              ₹ {myproduct&&selectedPrice?selectedPrice:995}   
              </span>{" "}
              <span className="discount">
                {myproduct&&(selectedPrice-selectedCurrentPrice)} off
              </span>
            </p>
            <div className="size-options">
              <p className="sizeopt">Colors</p>
              <div
                style={{
                  display: "flex",
                  paddingTop: 15 /* scale:'.5',marginLeft:-121  */,
                  paddingLeft: "1rem",
                  paddingBottom: 14,
                }}
              >
                {myproduct &&
                  availableColors.map((item) => (
                    /*   <button
                                    key={item}
                                    className="color-button"
                                    style={{
                                        backgroundColor:
                                            selectedColor === item ? "var(--purple-color)" : "#eee",
                                        color: selectedColor === item ? "#fff" : "#444",
                                    }}
                                    onClick={() => handleColorClick(item)}
                                >
                                    {item}
                                </button> */
                    <div
                      className="coloroptions"
                      onClick={() => handleColorClick(item)}
                      style={{
                        width: 51,
                        height: 51,
                        backgroundColor: item,
                        marginRight: 17,
                        borderRadius: 71,
                        cursor: "pointer",
                        borderWidth: 4,
                        borderColor: selectedColor != item ? item : "#813588",
                        borderStyle: "solid",
                      }}
                    ></div>
                  ))}
              </div>
            </div>
            {/* <div className="size-options">
            <p className="sizeopt">Size</p>
            {myproduct &&
              availableSizes.map((item) => (
                <button
                  key={item}
                  className="size-button"
                  style={{
                    backgroundColor: selectedSizes === item ? "#ddd" : "transparent",
                    
                  }}
                  onClick={() => handleSizeClick(item)}
                >
                  {item}
                </button>
              ))}
          </div> */}
            <div className="size-options">
              <p className="sizeopt">Size</p>
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className="size-button"
                  style={{
                    backgroundColor:
                      selectedSizes === size ? "#ddd" : "transparent",
                    textDecoration: availableSizes.includes(size)
                      ? "none"
                      : "line-through",
                    color: availableSizes.includes(size) ? "#444" : "#999",
                    cursor: availableSizes.includes(size)
                      ? "pointer"
                      : "not-allowed",
                  }}
                  onClick={() =>
                    availableSizes.includes(size) && handleSizeClick(size)
                  }
                  disabled={!availableSizes.includes(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="action-buttons">
              {
                <CartValueComp
                  selVariant={selectedVariant}
                  variant={myVariant}
                  
                />
              }
            </div>

            <div className="productview__desc">
              {/*     <div
              className="productview__desc"
              dangerouslySetInnerHTML={{
                __html: myproduct.description, // `value` contains your rich text HTML
              }}
            ></div> */}
              <div className="descitem" onClick={toggleExpand}>
                <div className="descicon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 3.00001V3.00001C19.6569 3.00001 21 4.34315 21 6.00001L21 8.14286C21 8.47698 21 8.64405 20.9234 8.76602C20.8834 8.82962 20.8296 8.8834 20.766 8.92336C20.644 9 20.477 9 20.1429 9L15 9M18 3.00001V3.00001C16.3431 3.00001 15 4.34315 15 6.00001L15 9M18 3.00001L7 3.00001C5.11438 3.00001 4.17157 3.00001 3.58579 3.58579C3 4.17158 3 5.11439 3 7.00001L3 21L6 20L9 21L12 20L15 21L15 9"
                      stroke="#222222"
                    />
                    <path
                      d="M7 7L11 7"
                      stroke="#222222"
                      stroke-linecap="round"
                    />
                    <path d="M8 11H7" stroke="#222222" stroke-linecap="round" />
                    <path
                      d="M7 15L10 15"
                      stroke="#222222"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="desctext">
                  <p>Product Description</p>
                  <p>Manufacture, Care and Fit</p>
                </div>
                <div className="arrowbutton">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 15L12 9L6 15" stroke="#222222" />
                  </svg>
                </div>
              </div>
              <div
                className={`item__cont ${isExpanded ? "expanded" : ""}`}
                dangerouslySetInnerHTML={{ __html: myproduct.description }}
              ></div>
            </div>
            <div className="productview__desc">
              {/*     <div
              className="productview__desc"
              dangerouslySetInnerHTML={{
                __html: myproduct.description, // `value` contains your rich text HTML
              }}
            ></div> */}
              <div className="descitem" onClick={toggleExpand2}>
                <div className="descicon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 3.00001V3.00001C19.6569 3.00001 21 4.34315 21 6.00001L21 8.14286C21 8.47698 21 8.64405 20.9234 8.76602C20.8834 8.82962 20.8296 8.8834 20.766 8.92336C20.644 9 20.477 9 20.1429 9L15 9M18 3.00001V3.00001C16.3431 3.00001 15 4.34315 15 6.00001L15 9M18 3.00001L7 3.00001C5.11438 3.00001 4.17157 3.00001 3.58579 3.58579C3 4.17158 3 5.11439 3 7.00001L3 21L6 20L9 21L12 20L15 21L15 9"
                      stroke="#222222"
                    />
                    <path
                      d="M7 7L11 7"
                      stroke="#222222"
                      stroke-linecap="round"
                    />
                    <path d="M8 11H7" stroke="#222222" stroke-linecap="round" />
                    <path
                      d="M7 15L10 15"
                      stroke="#222222"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="desctext">
                  <p>3-4 Days Shipping</p>
                  <p>We ship across the india</p>
                </div>
                <div className="arrowbutton">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 15L12 9L6 15" stroke="#222222" />
                  </svg>
                </div>
              </div>
              <div
                className={`item__cont ${isExpanded2 ? "expanded" : ""}`}
                dangerouslySetInnerHTML={{ __html: myproduct.description }}
              ></div>
            </div>
            <div className="productview__desc">
              {/*     <div
              className="productview__desc"
              dangerouslySetInnerHTML={{
                __html: myproduct.description, // `value` contains your rich text HTML
              }}
            ></div> */}
              <div className="descitem" onClick={toggleExpand3}>
                <div className="descicon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 8L3.64645 8.35355L3.29289 8L3.64645 7.64645L4 8ZM9 19.5C8.72386 19.5 8.5 19.2761 8.5 19C8.5 18.7239 8.72386 18.5 9 18.5L9 19.5ZM8.64645 13.3536L3.64645 8.35355L4.35355 7.64645L9.35355 12.6464L8.64645 13.3536ZM3.64645 7.64645L8.64645 2.64645L9.35355 3.35355L4.35355 8.35355L3.64645 7.64645ZM4 7.5L14.5 7.5L14.5 8.5L4 8.5L4 7.5ZM14.5 19.5L9 19.5L9 18.5L14.5 18.5L14.5 19.5ZM20.5 13.5C20.5 16.8137 17.8137 19.5 14.5 19.5L14.5 18.5C17.2614 18.5 19.5 16.2614 19.5 13.5L20.5 13.5ZM14.5 7.5C17.8137 7.5 20.5 10.1863 20.5 13.5L19.5 13.5C19.5 10.7386 17.2614 8.5 14.5 8.5L14.5 7.5Z"
                      fill="#222222"
                    />
                  </svg>
                </div>
                <div className="desctext">
                  <p>Return And Exchange</p>
                  <p>Know return And Exchange Policy</p>
                </div>
                <div className="arrowbutton">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 15L12 9L6 15" stroke="#222222" />
                  </svg>
                </div>
              </div>
              <div
                className={`item__cont ${isExpanded3 ? "expanded" : ""}`}
                dangerouslySetInnerHTML={{ __html: myproduct.description }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <>{renderSkeletonCard()}</>
      )}
    </div>
  );
};

export default ShirtView;
