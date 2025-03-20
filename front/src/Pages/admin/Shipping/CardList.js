import React, { useState, useRef } from "react";
import "./CardList.css"; // Import CSS file
import { postData } from "../../../services/NodeServices";

const CardList = ({ orders }) => {
  const [loadingStates, setLoadingStates] = useState({});
  const [loadingStates2, setLoadingStates2] = useState({});

  const printshipment = async (awb_bill) => {
    setLoadingStates((prev) => ({ ...prev, [awb_bill]: true }));

    try {
      const result = await postData("api/order/printshipment", {
        awb_bill: awb_bill,
      });

      if (result.status === "success" && result.file_name) {
        setLoadingStates((prev) => ({ ...prev, [awb_bill]: false }));
        window.open(result.file_name, "_blank"); // Opens the file in a new tab
      } else {
        console.error("Failed to get the file URL.");
      }
    } catch {}
  };
  const printManifest = async (awb_bill) => {
    setLoadingStates2((prev) => ({ ...prev, [awb_bill]: true }));

    try {
      const result = await postData("api/order/printmanifest", {
        awb_bill: awb_bill,
      });

      if (result.status === "success" && result.file_name) {
        setLoadingStates2((prev) => ({ ...prev, [awb_bill]: false }));
        window.open(result.file_name, "_blank"); // Opens the file in a new tab
      } else {
        console.error("Failed to get the file URL.");
      }
    } catch {}
  };

  return (
    <div className="order-container">
      {orders.map((order, index) => (
        <div className="order-card" key={index}>
          <h2>AWB Number: {order.awb_no}</h2>
          <p>Customer:{order.customer_name}</p>
          <p>Phone:{order.customer_phone}</p>
          <p>Address:{order.customer_address}</p>
          <p>City:{order.customer_city}</p>
          <p>State: {order.customer_state}</p>
          <hr />

          <h3>Products</h3>
          {order.products.map((product, idx) => {
            const firstImage = product.image_url
              ? product.image_url.split(",")[0]
              : null;

            return (
              <div className="product" key={idx}>
                <div className="productim">
                  {firstImage ? (
                    <img src={firstImage} alt="" />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div>
                  <p>Name: {product.product_name}</p>
                  <p>Quantity: {product.product_quantity}</p>
                  <p>Price: {product.product_price}</p>
                </div>
              </div>
            );
          })}
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p className="total">Total Price:&#8377; {order.total_amount}</p>
            <button
              onClick={() => printshipment(order.awb_no)}
              disabled={loadingStates[order.awb_no]} // Disable button while loading
              className="buttonstyle44"
              style={{ marginLeft: "auto", marginRight: "1rem" }}
            >
              {loadingStates[order.awb_no] ? (
                <div className="loader"></div>
              ) : (
                "Print Shipment"
              )}
            </button>

            <button
              onClick={() => printManifest(order.awb_no)}
              disabled={loadingStates2[order.awb_no]} // Disable button while loading
              className="buttonstyle44"
            >
              {loadingStates2[order.awb_no] ? (
                <div className="loader"></div>
              ) : (
                "Print Manifest"
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
