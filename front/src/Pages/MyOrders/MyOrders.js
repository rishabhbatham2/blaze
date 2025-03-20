import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { getDatanew, postData, serverURL } from "../../services/NodeServices";
import "./MyOrders.css";
import { MyContext } from "../../context/MyContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orderList, setOrderList] = useState([]);
  const [trackingData, setTrackingData] = useState({});

  const navigate = useNavigate()

  const { user } = useContext(MyContext);

  const getOrderList = async () => {
    try {
      let userid = JSON.parse(localStorage.getItem("user")).userid;
      const result = await postData("api/order/byid", { userid: userid });

      if (result.status) {
        setOrderList(result.data);

        fetchTrackingData(result.data);
      } else {
      }
    } catch {
      toast.error("failed to get user");
    }
  };
  useEffect(() => {
    getOrderList();
  }, []);

  const fetchTrackingData = async (orders) => {
    const trackingResults = {};
    for (let order of orders) {
      if (order.waybill) {
        try {
          const trackingResult = await postData("api/order/tracking", {
            waybill: order.waybill,
          });
          trackingResults[order.waybill] =
            trackingResult.data || "No tracking data found";
        } catch {
          trackingResults[order.waybill] = "Tracking unavailable";
        }
      }
    }
    setTrackingData(trackingResults);

    console.log();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Short month (e.g., Mar)
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${day} ${month}, ${time}`;
  };
const handleTrackNavigate=(waybill)=>{
  navigate(`/track/${waybill}`)
}
  return (
    <div className="myorder__container">
      <div className="myorder__inner">
        <div className="myorder__left">
          {orderList.length != 0 ? (
            orderList.map((item) => {
              return (
                <div className="ordermain">
                  <div className="addresscard">
                    <div className="addresscard__row1">
                      <div className="addressrow1__leftdata">
                        <div>
                          Delivering to{" "}
                          {item.addline1 + ", " + item.city + ", " + item.state}
                        </div>
                        <div className="expecteddata">{
                          
                          trackingData['1333110034550']?  <>{"Expected Date: "+trackingData['1333110034550'][0].order_date_time.expected_delivery_date}</>:<div className="spinner"></div>
                          }</div>

                        <div className="orderdate">
                          {" " + formatDate(item.created_at)}
                        </div>
                        
                      </div>
                      {item?.waybill ? (
                        <>
                          <div className="trackorderbutton" onClick={()=>{handleTrackNavigate(item.waybill)}}>Track Order</div>
                        </>
                      ) : (
                        <>
                          <div>Order Accepted</div>
                        </>
                      )}
                    </div>
                  </div>

                  {item?.productlist.map((item) => {
                    return (
                      <div className="myorder__card">
                        <div className="order__left">
                          <div className="image__url">
                            <img src={`${serverURL}images/${item.image_url}`} />
                          </div>
                        </div>
                        <div className="order__right">
                          <div className="order__product">{item.name} </div>
                          <div className="order__id">
                            Size <span>{item.size}</span>{" "}
                          </div>
                          <div className="order__id">
                            Price <span> ₹ {item.price}</span>{" "}
                          </div>
                          <div className="order__id">
                            Item quantity <span> 1</span>{" "}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <>
              {" "}
              <div className="cart__empty">
                <img src="/image/empty.png" />
                <p>Your have no active orders</p>
                {/*  <button> Go to Home </button> */}
              </div>
            </>
          )}
        </div>

        <div className="myorder__right">
          <div className="myorderrightlist">
            <div className="myorderlistitem">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.17001 6.44L11 11.55L19.77 6.46997M11 20.61V11.54M16 12.24V8.58002L6.51001 3.09998M8.92999 1.48L3.59 4.45003C2.38 5.12003 1.39001 6.80001 1.39001 8.18001V13.83C1.39001 15.21 2.38 16.89 3.59 17.56L8.92999 20.53C10.07 21.16 11.94 21.16 13.08 20.53L18.42 17.56C19.63 16.89 20.62 15.21 20.62 13.83V8.18001C20.62 6.80001 19.63 5.12003 18.42 4.45003L13.08 1.48C11.93 0.84 10.07 0.84 8.92999 1.48Z"
                  stroke="#444444"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              orders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
