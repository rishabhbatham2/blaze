import React from "react";
import { useEffect, useState } from "react";
import ReusableForm from "../../../components/ReusableTable/ReusableForm/ReusableForm";
import { type } from "@testing-library/user-event/dist/type";
import { postData } from "../../../services/NodeServices";
import { toast } from "react-toastify";

export default function CategoryEdit({ mode }) {
  let mydata = false;
  const storedData = sessionStorage.getItem("edit-coupon");
  if (storedData) {
    mydata = JSON.parse(storedData);
    console.log("Received Data:", mydata);
  }

  let data = [
    {
      name: "productcategoryname",
      type: "text",
      value: mode == "edit" ? (mydata ? mydata.productcategoryname : "") : "",
    },
  ];

  const submitApi = async (data) => {
    mydata["productcategoryname"] = data.productcategoryname;

    try {
      if (mode == "edit") {
        const result = await postData("api/productcategory/edit", mydata);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      } else {
        let body = {
          productcategoryname: data.productcategoryname,
        };

        const result = await postData("api/productcategory/add", body);

        if (result.status) {
          console.log(result);
          toast.success("data edited");
        }
      }
    } catch {}
  };

  return <ReusableForm data={data} submitApi={submitApi} />;
}
