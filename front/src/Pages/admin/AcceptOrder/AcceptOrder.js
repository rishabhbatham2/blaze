import React from "react";
import { useState, useEffect } from "react";
import "./AcceptOrder.css";
import { postData, serverURL } from "../../../services/NodeServices";
import ShipItem from "../ShipItem/ShipItem";
import { useParams } from "react-router-dom";

export default function AcceptOrder() {
  const { id } = useParams();

  const getOrderById = async () => {
    try {
      const result = await postData("api/order/byorderid", { orderid: id });
      console.log(result);
      setOrder({
        orderid:result.data.orderid ,
        add1: result.data.addline1,
        add2:result.data.addline2?result.data.addline2:'',
        city: result.data.city,
        state:result.data.state,
        status: "",
        created_at:result.data.created_at,
        zip: result.data.zipcode,
        total_amount: result.data.amount,
        is_billing_same_as_shipping: "yes",
        name: result.data.customername,
        amount: result.data.amount,
        discount:result.data.discount,
        shipping:result.data.shippingfees,
        mobileno: result.data.mobileno,
        paymentmode:result.data.paymentmode,
      
      })

      setListItem(result.data.productlist)
    } catch {}
  };
  useEffect(function () {
    getOrderById();
  }, []);

  const [order, setOrder] = useState(false);

  const [listItem, setListItem] = useState(false);

  return (
    <div className="accept__order">
    {order?<>  <div className="order__details">
        <div className="order__heading">Customer</div>
        <div className="orderdata">
          <p>Placed by</p>
          <p>{order.name}</p>
        </div>
      </div>

      <div className="shipping__details">
        <div className="orderdata">
          <p>Mobile Number</p>
          <p>{order.mobileno} </p>
        </div>
        <div className="orderdata">
          <p>email address</p>
          <p>{order.email}</p>
        </div>
        <div className="orderdata">
          <p>Address line 1</p>
          <p>{order.add1} </p>
        </div>
        <div className="orderdata">
          <p>Address line 2</p>
          <p>{order.add2} </p>
        </div>
        <div className="orderdata">
          <p>Pincode</p>
          <p>{order.zip} </p>
        </div>
      </div>

      <div className="orderitems">
        {listItem.map((item) => {
            const images = item.image_url.split(',')
          return (
            <div className="listitemcard">
              <div className="itemimage">
                <img src={`${serverURL}images/${images[0]}`} />
              </div>
              <div className="itemdata">
                <div>
                  <p className="itemname">{item.name}</p>
                </div>
                <div className="item__details">
                  <p>{item.size}</p>
                </div>
                <div className="item__details">
                 <p style={{marginRight:11}}>Color</p> <p
                    style={{
                      width: 15,
                      height: 15,
                      backgroundColor: item.color,
                      borderRadius:7
                    }}
                  ></p>
                </div>
                <div className="item__details">
                <p>Price: </p>  <p>{item.price}</p>
                </div>
                <div className="item__details">
                  <p>{item.quantity}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div></>:<><div>Fetching Order Details...</div></>}

     {order&& <ShipItem order={order} listItem={listItem} />}
    </div>
  );
}
