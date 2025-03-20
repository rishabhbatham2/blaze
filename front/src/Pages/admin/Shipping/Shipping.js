import { getFacetedUniqueValues } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import React from "react";
import CardList from "./CardList";
import { postData } from "../../../services/NodeServices";
import data from "./data.json";
import axios from "axios";

export default function Shipping() {
  const [shipping, setShipping] = useState(false);

  const [filter, setFilter] = useState("week"); // Default: last 7 days

  const getDateRange = (type) => {
    const today = new Date();
    let start, end;

    if (type === "day") {
      start = new Date(today);
      start.setDate(today.getDate() - 1);
    } else if (type === "week") {
      start = new Date(today);
      start.setDate(today.getDate() - 7);
    } else if (type === "year") {
      start = new Date(today);
      start.setFullYear(today.getFullYear() - 1);
    }

    end = today;
    return {
      start: start.toISOString().split("T")[0].replace(/-/g, ""), // Format YYYYMMDD
      end: end.toISOString().split("T")[0].replace(/-/g, ""),
    };
  };

  useEffect(() => {
    // Assuming you get `data` dynamically (e.g., from an API response)
    const fetchData = async () => {
      const { start, end } = getDateRange(filter);

      /*       const response = await postData("api/order/getshippedorders", {
        start,
        end,
      });
      const result = await response; */

      let requestBody = {
        data: {
          awb_number_list: "",
          order_no: "",
          start_date: start,
          end_date:new Date().toISOString().split("T")[0],

          access_token: "5a7b40197cd919337501dd6e9a3aad9a",
          secret_key: "2b54c373427be180d1899400eeb21aab",
        },
      };

      const result = await axios.post(
        "https://pre-alpha.ithinklogistics.com/api_v3/order/get_details.json",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      if (result) {
        setShipping(Object.values(result.data.data).reverse());
        console.log(Object.values(result.data.data).reverse())
      }
    };

    fetchData();
  }, []);

  return (
    <div className="shipping__maincont">
      <div className="shipping__cont"></div>
      <div className="shipping__cont"></div>

      <div className="carddata">
        {shipping && <CardList orders={shipping} />}
      </div>
    </div>
  );
}
