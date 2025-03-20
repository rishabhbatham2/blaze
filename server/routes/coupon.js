const express = require('express');
const { sequelize } = require("../config/db");
const  CouponModel  = require('../models/coupon');  // Assuming Sequelize model for product categories
const { date } = require('joi');
const Coupons = CouponModel(sequelize, require("sequelize").DataTypes);
const router = express.Router();





router.post('/add', async (req, res) => {
    try {
      const { couponname, value, maxval } = req.body;
      console.log('values recived areeeeeeeeeeeeee',couponname,value,maxval)
  
      if (!couponname || value == null || maxval == null) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (value < 0 || value > 100) {
        return res.status(400).json({ message: "Value must be between 0 and 100" });
      }
  
      if (maxval < 0) {
        return res.status(400).json({ message: "Max value cannot be negative" });
      }
  
      const newCoupon = await Coupons.create({ couponname, value, maxval });
      res.status(201).json({ status:true,message: "Coupon added successfully", data: newCoupon });
    } catch (error) {
      res.status(500).json({status:false ,message: "Internal server error", error });
    }
  });
  
  // Edit an existing coupon
  router.post('/edit', async (req, res) => {
    try {
      const { couponname, value, maxval,couponid } = req.body;
     

      console.log(couponname,value,maxval,couponid)
  
      const coupon = await Coupons.findByPk(couponid);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
  
      if (value != null && (value < 0 || value > 100)) {
        return res.status(400).json({ message: "Value must be between 0 and 100" });
      }
  
      if (maxval != null && maxval < 0) {
        return res.status(400).json({ message: "Max value cannot be negative" });
      }
  
      await coupon.update({ couponname, value, maxval });
      res.json({ message: "Coupon updated successfully", data:coupon,status:true });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
  // Delete a coupon
  router.post('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const coupon = await Coupons.findByPk(id);
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
  
      await coupon.destroy();
      res.json({ message: "Coupon deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  
  // Validate a coupon
  router.post('/validate', async (req, res) => {
    try {
      const { couponname } = req.body;
      console.log('recived couponname is ',couponname)
      if (!couponname) {
        return res.status(400).json({ message: "Coupon name is required" ,status:true,coupon:false});
      }
  
      const coupon = await Coupons.findOne({ where: { couponname } });
      if (!coupon) {
        return res.status(200).json({ message: "Invalid coupon" ,status:true,coupon:false});
      }
      
  
      res.json({ message: "Coupon is valid", coupon ,status:true});
    } catch (error) {
        
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  

  router.get('/all', async (req, res) => {
    try {
      const coupons = await Coupons.findAll(); 
      res.status(200).json({ message: "Coupons retrieved successfully", data:coupons, status: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  });
  




module.exports = router;