const express = require('express');




const orderModel = require('../models/order');
const listModel = require('../models/list')
const singleorderModel = require('../models/singleorder');
const { sequelize } = require("../config/db");
const { default: axios } = require('axios');
const { date } = require('joi');

const router = express.Router();

const order = orderModel(sequelize, require("sequelize").DataTypes);
const singleorder = singleorderModel(sequelize, require("sequelize").DataTypes);
const List = listModel(sequelize, require("sequelize").DataTypes);
async function createOrder(data) {
  const {
    bill,
    list,
  address,
    
  } = data;

  console.log(bill)
  let stringbill = JSON.stringify(bill)
  let stringlist = JSON.stringify(list)

  try {
    const newOrder = await order.create({
      bill:stringbill,
      list:stringlist,
      customername:address.username,
      mainaddress:address.mainaddress,
      mobileno:address.mobileno,
      city:address.city,
      zipcode:address.zipcode,
      userid:address.userid,
      


      
      status:'Order Accepted',
      
    });

    return {status:true,message:'order created successfully',order:newOrder};
  } catch (error) {
    console.log(error)
    return {status:false,message:error.message};
  }
}

/* router.post('/byid/', async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await singleorder.findAll({ where: { userid } });
    if (orders.length > 0) {
      res.status(200).json({ status: true, message: 'Orders retrieved successfully', data:orders });
    } else {
      res.status(404).json({ status: false, message: 'No orders found for this user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
}); */
router.post('/byid/', async (req, res) => {
  const { userid } = req.body;
  try {
    const orders = await order.findAll({ where: { userid } });
    if (orders.length > 0) {

      const ordersWithList = await Promise.all(
        orders.map(async (orderObj) => {
          const listItems = await List.findAll({ where: { orderid: orderObj.orderid } });
          return {
            ...orderObj.dataValues,  
            productlist: listItems       
          };
        })
      );

      res.status(200).json({ status: true, message: 'Orders retrieved successfully', data:ordersWithList });


    } else {
      res.status(404).json({ status: false, message: 'No orders found for this user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});

router.get('/neworders', async (req, res) => {
  
  try {
    const orders = await order.findAll({ where: { waybill:null} });
    if (orders.length > 0) {

      const ordersWithList = await Promise.all(
        orders.map(async (orderObj) => {
          const listItems = await List.findAll({ where: { orderid: orderObj.orderid } });
          return {
            ...orderObj.dataValues,  
            productlist: listItems       
          };
        })
      );

      res.status(200).json({ status: true, message: 'Orders retrieved successfully', data:ordersWithList.reverse() });


    } else {
      res.status(404).json({ status: false, message: 'No orders found for this user' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});


router.post('/byorderid', async (req, res) => {
  const { orderid } = req.body;
  try {
    const orderObj = await order.findOne({ where: { orderid } });

    if (orderObj) {
      const listItems = await List.findAll({ where: { orderid: orderObj.orderid } });

      res.status(200).json({
        status: true,
        message: 'Order retrieved successfully',
        data: { ...orderObj.dataValues, productlist: listItems }
      });
    } else {
      res.status(404).json({ status: false, message: 'Order not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: error.message });
  }
});


router.get('/all', async (req, res) => {
  try {
   /*  const subCategories = await singleorder.findAll({
 
    }); */
    const createdList = await order.findAll({

    })

    res.status(200).json({ status: true, data: createdList}); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Error retrieving product subcategories', error });
  }
});



router.post('/addwaybill', async (req, res) => {
  try {
    const { orderid, waybill } = req.body; // Expecting orderId and waybill in request body

    console.log('did we recive waybill and orderid',waybill)

    if (!orderid || !waybill) {
      return res.status(400).json({ status: false, message: "Order ID and Waybill are required." });
    }

    const orderToUpdate = await order.findByPk(orderid); // Find order by primary key

    if (!orderToUpdate) {
      return res.status(404).json({ status: false, message: "Order not found." });
    }

    // Update the waybill field
    await order.update({ waybill }, { where: { orderid: orderid } });

    res.status(200).json({ status: true, message: "Waybill added successfully." });

  } catch (error) {
    console.error("Error updating waybill:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});

/* router.post('/getshippedorders', async (req, res) => {
  try {
    const { startdate, enddate } = req.body; // Expecting orderId and waybill in request body

    console.log('did we recive waybill and orderid',waybill)

    if (!orderid || !waybill) {
      return res.status(400).json({ status: false, message: "Order ID and Waybill are required." });
    }

    const orderToUpdate = await order.findByPk(orderid); // Find order by primary key

    if (!orderToUpdate) {
      return res.status(404).json({ status: false, message: "Order not found." });
    }

    // Update the waybill field
    await order.update({ waybill }, { where: { orderid: orderid } });

    res.status(200).json({ status: true, message: "Waybill added successfully." });

  } catch (error) {
    console.error("Error updating waybill:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});
 */


router.post("/printshipment", async (req, res) => {
  try {
    const { awb_bill } = req.body;

    console.log('awubbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',awb_bill)
    if (!awb_bill) {
      return res.status(400).json({ status: false, message: "AWB number is required." });
    }

    const requestBody = {
      data: {
        awb_numbers:awb_bill,
        page_size: "A4",
        access_token:process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
        display_cod_prepaid: "1",
        display_shipper_mobile: "0",
        display_shipper_address: "0",
      },
    };

    const response = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/shipping/label.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching shipment details:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});
router.post("/printmanifest", async (req, res) => {
  try {
    const { awb_bill } = req.body;

    console.log('awubbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',awb_bill)
    if (!awb_bill) {
      return res.status(400).json({ status: false, message: "AWB number is required." });
    }

    const requestBody = {
      data: {
        awb_numbers:awb_bill,
      
        access_token:process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
     
      },
    };

    const response = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/shipping/manifest.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching shipment details:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});

router.post("/getshippedorders", async (req, res) => {
  try {
    const { start,end } = req.body;

    console.log('awubbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
   

    const requestBody = {
      data: {
        "awb_number_list" : "",  
        "order_no" : "",  
        "start_date":start, 
        "end_date":end,
        access_token:process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
     
      },
    };

    const result = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/order/get_details.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json({status:true,data:Object.values(result.data.data)});
  } catch (error) {
    console.error("Error fetching shipment details:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});



router.post("/getshipped", async (req, res) => {
  try {
    let { start, end } = req.body;

    const today = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(today.getFullYear() - 2);

    // Format dates as YYYYMMDD
    const formatDate = (date) => date.toISOString().split("T")[0].replace(/-/g, "");

    start = start ? formatDate(new Date(start)) : formatDate(twoYearsAgo);
    end = end ? formatDate(new Date(end)) : formatDate(today);

    const requestBody = {
      data: {
        "awb_number_list": "",
        "order_no": "",
        "start_date": start,
        "end_date": end,
        access_token: process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
      },
    };

    const result = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/order/get_details.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json({ status: true, data: Object.values(result.data.data) });
  } catch (error) {
    console.error("Error fetching shipment details:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});

router.post("/getcity", async (req, res) => {
  try {
    const { state } = req.body;

    const statelist = [
      { id: "1", state_name: "Andaman and Nicobar Islands" },
      { id: "2", state_name: "Andhra Pradesh" },
      { id: "3", state_name: "Arunachal Pradesh" },
      { id: "4", state_name: "Assam" },
      { id: "5", state_name: "Bihar" },
      { id: "6", state_name: "Chandigarh" },
      { id: "7", state_name: "Chhattisgarh" },
      { id: "8", state_name: "Dadra and Nagar Haveli" },
      { id: "9", state_name: "Daman and Diu" },
      { id: "10", state_name: "Delhi" },
      { id: "11", state_name: "Goa" },
      { id: "12", state_name: "Gujarat" },
      { id: "13", state_name: "Haryana" },
      { id: "14", state_name: "Himachal Pradesh" },
      { id: "15", state_name: "Jammu and Kashmir" },
      { id: "16", state_name: "Jharkhand" },
      { id: "17", state_name: "Karnataka" },
      { id: "19", state_name: "Kerala" },
      { id: "20", state_name: "Lakshadweep" },
      { id: "21", state_name: "Madhya Pradesh" },
      { id: "22", state_name: "Maharashtra" },
      { id: "23", state_name: "Manipur" },
      { id: "24", state_name: "Meghalaya" },
      { id: "25", state_name: "Mizoram" },
      { id: "26", state_name: "Nagaland" },
      { id: "29", state_name: "Odisha" },
      { id: "31", state_name: "Pondicherry" },
      { id: "32", state_name: "Punjab" },
      { id: "33", state_name: "Rajasthan" },
      { id: "34", state_name: "Sikkim" },
      { id: "35", state_name: "Tamil Nadu" },
      { id: "36", state_name: "Telangana" },
      { id: "37", state_name: "Tripura" },
      { id: "38", state_name: "Uttar Pradesh" },
      { id: "39", state_name: "Uttarakhand" },
      { id: "41", state_name: "West Bengal" },
    ];

    const stateData = statelist.find((s) => s.state_name.toLowerCase() === state.toLowerCase());

    if (!stateData) {
      return res.status(400).json({ status: false, message: "Invalid state name." });
    }

    const requestBody = {
      data: {
        state_id: stateData.id,
        access_token: process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
      },
    };

    const result = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/city/get.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );

    const cityNames = result.data.data.map((city) => city.city_name);

    console.log(cityNames)

    res.status(200).json({ status: true, data: cityNames });
  } catch (error) {
    console.error("Error fetching city list:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});



router.post("/is-serviceable", async (req, res) => {
  try {
    const { pincode } = req.body;

    if (!pincode) {
      return res.status(400).json({ status: false, message: "Pincode is required." });
    }

    const requestBody = {
      data: {
        pincode,
        access_token: process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
      },
    };

    const result = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/pincode/check.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(result.data,pincode)
    if (result.data.status !== "success" || !result.data.data[pincode]) {
      return res.status(200).json({ status: true, serviceable: false });
  
    }

    const couriers = result.data.data[pincode];
    const isServiceable = Object.keys(couriers).length > 0;

    res.status(200).json({ status: true, serviceable: isServiceable });
  } catch (error) {
    console.error("Error checking serviceability:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});


router.post("/tracking", async (req, res) => {
  try {
    const { waybill } = req.body;

    if (!waybill) {
      return res.status(400).json({ status: false, message: "Waybill is required." });
    }

    const requestBody = {
      data: {
        waybill,
        access_token: process.env.ACCESS_TOKEN,
        secret_key: process.env.SECRET_KEY,
      },
    };

    const result = await axios.post(
      "https://pre-alpha.ithinklogistics.com/api_v3/order/track.json",
      requestBody,
      { headers: { "Content-Type": "application/json" } }
    );
     let tracking = Object.values(result.data.data)

    res.status(200).json({ status: true, data: tracking });
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});


router.post("/get-tracking-list", async (req, res) => {
  try {
    const { waybills } = req.body; // Expecting a string of waybills separated by commas

    if (!waybills || typeof waybills !== "string") {
      return res.status(400).json({ status: false, message: "Waybills must be a comma-separated string." });
    }

    const waybillList = waybills.split(",").map((wb) => wb.trim());
    const trackingResults = [];

    for (const waybill of waybillList) {
      const requestBody = {
        data: {
          waybill,
          access_token: process.env.ACCESS_TOKEN,
          secret_key: process.env.SECRET_KEY,
        },
      };

      const result = await axios.post(
        "https://pre-alpha.ithinklogistics.com/api_v3/order/track.json",
        requestBody,
        { headers: { "Content-Type": "application/json" } }
      );

      trackingResults.push({ waybill, trackingData: result.data });
    }

    res.status(200).json({ status: true, data: trackingResults });
  } catch (error) {
    console.error("Error fetching tracking list:", error);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
});

module.exports = router;
module.exports.createOrder = createOrder;
