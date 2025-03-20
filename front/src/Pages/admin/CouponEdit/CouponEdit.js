import React from "react";
import { useEffect, useState } from "react";
import ReusableForm from "../../../components/ReusableTable/ReusableForm/ReusableForm";
import { type } from "@testing-library/user-event/dist/type";
import { postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";

export default function CouponEdit({ mode }) {
  let mydata = false;
  const storedData = sessionStorage.getItem("edit-coupon");
  if (storedData) {
    mydata = JSON.parse(storedData);
    console.log("Received Data:", mydata);
  }

  let data = [
    {
      name: "couponname",
      type: "text",
      value: mode == "edit" ? (mydata ? mydata.couponname : "") : "",
    },
    {
        name: "value",
        type: "text",
        value: mode == "edit" ? (mydata ? mydata.value : "") : "",
      },
      {
        name: "maxval",
        type: "text",
        value: mode == "edit" ? (mydata ? mydata.maxval : "") : "",
      },
  ];

  const submitApi = async (data) => {


    try {
        let body = {
            couponid:mydata.couponid,
            couponname: data.couponname,
            value: data.value,
            maxval:data.maxval,
          };
          
      if (mode == "edit") {
        const result = await postData("api/coupons/edit", body);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      } else {
        let body = {
          couponname: data.couponname,
          value: data.value,
          maxval:data.maxval,
        };

        const result = await postData("api/coupons/add", body);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      }
    } catch {}
  };

  return <ReusableForm data={data} submitApi={submitApi} />;
}
