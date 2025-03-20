const express = require('express');
const { sequelize } = require("../config/db");
const  ProductCategoryModel  = require('../models/productcategory');  // Assuming Sequelize model for product categories
const ProductCategory = ProductCategoryModel(sequelize, require("sequelize").DataTypes);
const router = express.Router();

// Add a new product category
router.post('/add', async (req, res) => {
  const data = req.body;  // Receive the entire data object
  try {
    const newCategory = await ProductCategory.create({
      ...data,  // Spread the data object to include all fields (e.g., productcategoryname, etc.)
      created_at:new Date(),
      updated_at:new Date()
    });

    // Add status directly in the response object
    

    res.status(201).json({status:true,data:newCategory});  // Return category with status added
  } catch (error) {
    res.status(500).json({ message: 'Error adding product category', error });
  }
});

// Delete a product category
router.post('/delete', async (req, res) => {
  const { productcategoryid } = req.body;  // Use productcategoryid in the body
  try {
    const category = await ProductCategory.findByPk(productcategoryid);
    if (!category) {
      return res.status(404).json({status:true, message: 'Product category not found' });
    }
    await category.destroy();
    res.status(200).json({status:false, message: 'Product category deleted' });
  } catch (error) {
    res.status(500).json({ status:false,message: 'Error deleting product category', error });
  }
});

// Edit a product category
router.post('/edit', async (req, res) => {
    const data = req.body; // Receive the entire data object
    const { productcategoryid, ...updateData } = data; // Destructure to extract productcategoryid
    
    console.log(productcategoryid,data)
    try {
      const category = await ProductCategory.findByPk(productcategoryid);
      if (!category) {
        return res.status(200).json({ status:false,message: 'Product category not found' });
      }
      
      // Explicitly set updated_at to a provided value (or default it to current timestamp)
      updateData.updated_at =  new Date();
  
      // Update the category with the remaining fields, including the explicitly set updated_at
      await category.update(updateData);
      
      res.status(200).json({status:true,data:category,message: 'Product category submitted'}); // Return the updated category
    } catch (error) {
      res.status(500).json({status:false, message: 'Error updating product category', error });
    }
  });
  

router.get('/all', async (req, res) => {
  try {
    const categories = await ProductCategory.findAll();
   let myproductcategory = categories

    res.status(200).json({status:true,data:myproductcategory});  // Return all categories with status added
  } catch (error) {
    res.status(500).json({ status:true,message: 'Error retrieving product categories', error });
  }
});
/* const ProductSubCategoryModel = require(''); // Assuming Sequelize model for product subcategories
const ProductSubCategory = ProductSubCategoryModel(sequelize, require("sequelize").DataTypes); */

// Get all subcategories by category
router.get('/subcategories/:categoryId', async (req, res) => {
  const { categoryId } = req.params; // Get categoryId from the request parameters
  try {
    // Fetch all subcategories related to the category
    const subcategories = await ProductSubCategory.findAll({
      where: {
        productcategoryid: categoryId, // Filter by category ID
      },
    });

    // If no subcategories found, send a 404 response
    if (subcategories.length === 0) {
      return res.status(404).json({ status: false, message: 'No subcategories found for this category' });
    }

    // Send the subcategories
    res.status(200).json({ status: true, data: subcategories });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error retrieving subcategories', error });
  }
});

module.exports = router;
