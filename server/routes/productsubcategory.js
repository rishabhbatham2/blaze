const express = require('express');
const { sequelize } = require("../config/db");
const ProductSubCategoryModel = require('../models/productsubcategory'); // Assuming Sequelize model for product subcategories
const ProductSubCategory = ProductSubCategoryModel(sequelize, require("sequelize").DataTypes);

const ProductsModel = require('../models/products'); // Assuming Sequelize model for product subcategories
const Product = ProductsModel(sequelize, require("sequelize").DataTypes);
const router = express.Router();

// Add a new product subcategory
router.post('/add', async (req, res) => {
  const data = req.body;  // Receive the entire data object
  console.log('data is',data)
  try {
    const newSubCategory = await ProductSubCategory.create({
      ...data,  // Spread the data object to include all fields (e.g., productsubbcategoryname, productcategoryname, etc.)
      createdat: new Date(),
      editedat: new Date()
    });

    res.status(201).json({status: true, data: newSubCategory});  // Return subcategory with status added
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding product subcategory', error });
  }
});

// Delete a product subcategory
router.post('/delete', async (req, res) => {
  const { id } = req.body;  // Use productsubcategoryid in the body
  console.log('subcat id ssssssssssssss',id)
  try {
    const subCategory = await ProductSubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ status: false, message: 'Product subcategory not found' });
    }
    await subCategory.destroy();
    res.status(200).json({ status: true, message: 'Product subcategory deleted' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error deleting product subcategory', error });
  }
});

// Edit a product subcategory
router.post('/edit', async (req, res) => {
  const data = req.body; // Receive the entire data object
  const { productsubcategoryid, ...updateData } = data; // Destructure to extract productsubcategoryid
  
  console.log(productsubcategoryid, data);
  try {
    const subCategory = await ProductSubCategory.findByPk(data.id);
    if (!subCategory) {
      return res.status(200).json({ status: false, message: 'Product subcategory not found' });
    }
    
    // Explicitly set editedat to a provided value (or default it to current timestamp)
    updateData.editedat = new Date();

    // Update the subcategory with the remaining fields, including the explicitly set editedat
    await subCategory.update(updateData);

    res.status(200).json({ status: true, data: subCategory, message: 'Product subcategory updated' }); // Return the updated subcategory
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error updating product subcategory', error });
  }
});

// Get all product subcategories
/* router.get('/all', async (req, res) => {
  try {
    const subCategories = await ProductSubCategory.findAll();
    let myProductSubCategory = subCategories;

    res.status(200).json({ status: true, data: myProductSubCategory });  // Return all subcategories with status added
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error retrieving product subcategories', error });
  }
}); */
router.get('/all', async (req, res) => {
  try {
    const subCategories = await ProductSubCategory.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM products AS p
              WHERE p.productsubcategoryname = productsubcategory.productsubcategoryname
            )`),
            'products'
          ]
        ]
      }
    });

    res.status(200).json({ status: true, data: subCategories }); // Return all subcategories with product count
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Error retrieving product subcategories', error });
  }
});


// Get subcategories by category
router.post('/bycategory', async (req, res) => {
  const { productcategoryname } = req.body; // Get category name from query parameters
  try {
    if (!productcategoryname) {
      return res.status(400).json({ status: false, message: 'Category name is required' });
    }

    // Fetch subcategories filtered by the given category name
    const subCategories = await ProductSubCategory.findAll({
      where: {
        productcategoryname
      }
    });

    if (subCategories.length === 0) {
      return res.status(404).json({ status: false, message: 'No subcategories found for this category' });
    }

    res.status(200).json({ status: true, data: subCategories }); // Return filtered subcategories
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Error retrieving subcategories by category', error });
  }
});

module.exports = router;
