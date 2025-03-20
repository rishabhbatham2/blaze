import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./TrackOrder.css";
import { postData } from "../../services/NodeServices";

export default function TrackOrder() {
  const { waybill } = useParams();
  const [trackingData, setTrackingData] = useState({
    901234567109: {
      message: "success",
      awb_no: "901234567109",
      logistic: "Fedex",
      order_type: "forward",
      current_status: "In Transit",
      current_status_code: "UD",
      return_tracking_no: "",
      last_scan_details: {
        status: "In Transit",
        status_code: "UD",
        status_date_time: "2017-06-07 18:11:26",
        scan_location: "Surat_Pandesra_Gateway (Gujarat)",
        remark: "Shipment Picked Up from Client Location",
      },
      order_details: {
        order_type: "COD",
        order_number: "11812",
        sub_order_number: "11812",
        order_sub_order_number: "11812-11812",
        phy_weight: "200.00",
        net_payment: "775.00",
        ship_length: "10.00",
        ship_width: "10.00",
        ship_height: "10.00",
      },
      order_date_time: {
        manifest_date_time: "2017-06-07 13:34:36",
        pickup_date: "2017-06-07",
        expected_delivery_date: "2017-06-07",
        delivery_date: "",
        rto_delivered_date: "",
      },
      customer_details: {
        customer_name: "John Doe",
        customer_address1: "60/40 st shenoy nagar",
        customer_address2: "",
        customer_address3: "",
        customer_city: "Chennai",
        customer_state: "Tamil Nadu",
        customer_country: "India",
        customer_pincode: "600030",
        customer_mobile: "9876543210",
        customer_phone: "2156789098",
      },
      scan_details: [
        {
          status: "Manifested",
          status_code: "UD",
          scan_location: "HQ (Haryana)",
          remark: "Consignment Manifested",
          scan_date_time: "2017-06-07 14:05:57",
        },
        {
          status: "In Transit",
          status_code: "UD",
          scan_location: "Surat_Pandesra_Gateway (Gujarat)",
          remark: "Shipment Picked Up from Client Location",
          scan_date_time: "2017-06-07 18:11:26",
        },
      ],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrackingData() {
      setLoading(true);
      try {
         const result = await postData("api/order/tracking", {
                   waybill
                 });

        
        if (result.status) {
          setTrackingData(result.data);
        } else {
          setError("Tracking data not found.");
        }
      } catch (err) {
        setError("Failed to fetch tracking data.");
      }
      setLoading(false);
    }
    fetchTrackingData();
  }, [waybill]);

  if (loading) return <div className="loadingcont">
    <p>Loading tracking details...</p>
  </div>;
  if (error) return <p>{error}</p>;

  const orderKey = Object.keys(trackingData)[0]; // Get the first key dynamically
  const order = trackingData[orderKey];

  return (
    <div className="tracking-container">
      <div className="tracking__inner">
        <div className="trackinglef">
          <div className="trackingleftrow">
            <div>Reciver Name</div>{" "}
            <div>{order.customer_details.customer_name}</div>
          </div>
          <div className="trackingleftrow">
            <div>Mobile Number</div>{" "}
            <div>{order.customer_details.customer_mobile}</div>
          </div>
          <div className="order__details">
            <div className="orderdetails__heading">
             Order Details
            </div>
            <div className="orderdetails__data">
            <p>Status :</p> <p>{order.current_status}</p>
            </div>
            <div className="orderdetails__data">
            <p>Expected Date :</p> <p>{order.order_date_time.expected_delivery_date}</p>
            </div>
          </div>
        </div>
        <div className="trackingright">
          {order.scan_details.map((scan, index) => (
            <div className="trackhistorycard">
              <div>
                <p>{scan.status}</p>
                <p className="trackinglocation">{scan.scan_location}</p>
              </div>
              <div className="trackinghistorydate">
                {new Date(scan.scan_date_time).toLocaleDateString()}
                <br />
                {new Date(scan.scan_date_time).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 
<h1>Order Tracking</h1>
<div className="order-summary">
  <p><strong>AWB No:</strong> {order.awb_no}</p>
  <p><strong>Logistic:</strong> {order.logistic}</p>
  <p><strong>Status:</strong> {order.current_status}</p>
</div>

<div className="customer-details">
  <h2>Customer Details</h2>
  <p><strong>Name:</strong> {order.customer_details.customer_name}</p>
  <p><strong>Address:</strong> {order.customer_details.customer_address1}, {order.customer_details.customer_city}, {order.customer_details.customer_state}, {order.customer_details.customer_country} - {order.customer_details.customer_pincode}</p>
  <p><strong>Phone:</strong> {order.customer_details.customer_mobile}</p>
</div>

<div className="order-details">
  <h2>Order Details</h2>
  <p><strong>Order Number:</strong> {order.order_details.order_number}</p>
  <p><strong>Payment:</strong> {order.order_details.net_payment}</p>
  <p><strong>Weight:</strong> {order.order_details.phy_weight}g</p>
</div>

<div className="tracking-history">
  <h2>Tracking History</h2>
  <ul>
    {order.scan_details.map((scan, index) => (
      <li key={index}>
        <p><strong>Status:</strong> {scan.status}</p>
        <p><strong>Location:</strong> {scan.scan_location}</p>
        <p><strong>Time:</strong> {scan.scan_date_time}</p>
      </li>
    ))}
  </ul>
</div> */
