import React, { useContext, useEffect, useState } from "react";
import "./ViewShirt.css"; // External CSS file for styling
import { postData, serverURL } from "../../services/NodeServices";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const ShirtView = () => {
  const [quantity, setQuantity] = useState(1);
  const [myproduct, setMyProduct] = useState(false);
  const [myVariant, setMyVariant] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState("");
  const [availableSizes, setAvailableSizes] = useState([]);
  const [availableColors, setAvilableColors] = useState([]);
  const [selectedImages, setSelectedImages] = useState("");

  const { cart, setCart } = useContext(UserContext);
  const isInCart = cart.some((item) => item.variant.variant_id === selectedVariant);


  const { product_id } = useParams();
  useEffect(() => {
    handleProductClick(product_id);
  }, []);

  const handleProductClick = async (product_id) => {
    const result = await postData("api/products/byid", {
      product_id: product_id,
    });
    if (result.status) {
      setSelectedVariant(result.variants[0].variant_id);
      setSelectedColor(result.variants[0].color);
      const availabe = result.variants
        .filter((variant) => variant.color === result.variants[0].color)
        .map((variant) => variant.size);
      const unique = [
        ...new Set(result.variants.map((variant) => variant.color)),
      ];
      setAvilableColors(unique);

      setAvailableSizes(availabe);
      const selected = result.variants.find(
        (variant) =>
          variant.color === result.variants[0].color &&
          variant.size === result.variants[0].size
      );
      setSelectedImages(selected.image_url.split(","));
      setSelectedSizes(result.variants[0].size);

      setMyVariant(result.variants);
      setMyProduct(result.product);

      console.log("avaiable sizes are", availabe);
      console.log("selected colors are", unique);
    }
  };
  const testButton=()=>{

    let mycart = localStorage.getItem('cart')
    console.log('presetly selected bariant is ',selectedVariant)
    console.log('presetly cart is',cart)
    console.log('presetbly local storateg is ',mycart)
  }
  const handleColorClick = (color) => {
    const available = myVariant
      .filter((variant) => variant.color == color)
      .map((variant) => variant.size);

    if (!available.includes(selectedSizes)) {
      setSelectedSizes(available[0]);
    }

    const selected = myVariant.find(
      (variant) => variant.color === color && variant.size === selectedSizes
    );
    setSelectedImages(selected.image_url.split(","));
    setSelectedVariant(selected.variant_id);
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSizes(size);
    // Find the corresponding variant based on selected color and size
    const selected = myVariant.find(
      (variant) => variant.color === selectedColor && variant.size === size
    );
    setSelectedImages(selected.image_url.split(","));
    setSelectedVariant(selected.variant_id);
  };
  const increaseQuantity = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = currentCart.map((item) =>
        item.variant.variant_id === selectedVariant
            ? { ...item, quantity: item.quantity + 1 }
            : item
    );

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setQuantity((prevQuantity) => prevQuantity + 1);
    console.log(updatedCart)
};

const decreaseQuantity = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = currentCart
        .map((item) =>
            item.variant.variant_id === selectedVariant
                ? { ...item, quantity: item.quantity - 1 }
                : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity <= 0

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
    console.log(updatedCart)
};

  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the variant already exists in the cart
    const existingItem = currentCart.find((item) => item.variant.variant_id === selectedVariant);

    let updatedCart;
    if (existingItem) {
      /*   // Update the quantity of the existing item
        updatedCart = currentCart.map((item) =>
            item.variant.variant_id === selectedVariant
                ? { ...item, quantity: item.quantity + quantity }
                : item
        ); */
    } else {
        // Add the new variant with raw data and quantity
        const selectedVariantData = myVariant.find((variant) => variant.variant_id === selectedVariant);
        updatedCart = [...currentCart, { variant: selectedVariantData, quantity }];
    }

    // Update the cart state and save it to localStorage
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
};

  return (
    <div className="shirtmain">
      <div className="shirt-view">
        <div className="shirt-view-left">
          {myproduct && (
            <img
              src={`${serverURL}images/${selectedImages[0]}`}
              alt="Men's Fashion Tshirt"
              className="main-image"
            />
          )}
          <div className="thumbnail-container">
            {myproduct &&
              selectedImages.map((item, index) => {
                return (
                  <img
                    key={item}
                    src={`${serverURL}images/${selectedImages[index]}`}
                    alt="Thumbnail 1"
                    onClick={testButton}
                  />
                );
              })}
          </div>
        </div>
        <div className="shirt-view-right">
          <p className="breadcrumb"></p>
          <h1>{myproduct && myproduct.name}</h1>
          <p className="price">
            $139.00{" "}
            <span className="original-price">
              $ {myproduct && myproduct.base_price}
            </span>{" "}
            <span className="discount">82% off</span>
          </p>
          <div className="size-options">
            <div>
              <p className="sizeopt">Colors</p>
            </div>

            {myproduct &&
              availableColors.map((item) => {
                return (
                  <button
                    className="color-button"
                    style={{
                      backgroundColor:
                        selectedColor == item ? "var(--purple-color)" : "#eee",
                      color: selectedColor == item ? "#fff" : "#444",
                    }}
                    onClick={() => {
                      handleColorClick(item);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
          </div>
          <div className="size-options">
            <div>
              <p className="sizeopt">Size</p>
            </div>

            {myproduct &&
              availableSizes.map((item) => {
                return (
                  <button
                    className="size-button"
                    style={{
                      backgroundColor: selectedSizes == item ? "#222" : "#eee",
                      color: selectedSizes == item ? "#fff" : "#444",
                    }}
                    onClick={() => {
                      handleSizeClick(item);
                    }}
                  >
                    {item}
                  </button>
                );
              })}
          </div>
        {/*   <div className="quantity-selector">
            <p>Qty:</p>
            <button onClick={decreaseQuantity} className="quantity-button">
              -
            </button>
            <span className="quantity-display">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-button">
              +
            </button>
          </div> */}
          <div className="action-buttons">
            {!isInCart? (
              <button className="add-to-cart" onClick={addToCart}>
                Add To Cart
              </button>
            ) : (
              <div className="quantity-selector">
                <p>Qty:</p>
                <button onClick={decreaseQuantity} className="quantity-button">
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button onClick={increaseQuantity} className="quantity-button">
                  +
                </button>
              </div>
            )}
            <button className="buy-now">Buy Now</button>
          </div>
          <div className="product-details">
            <h3>Product Details</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Blanditiis eum debitis cupiditate, ducimus ad totam magni
              reprehenderit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShirtView;
