const { where } = require("sequelize");
const { sequelize } = require("../config/db");
const ProductModel = require('../models/products')
const Products = ProductModel(sequelize, require("sequelize").DataTypes);
const VariantModel = require("../models/variants")
const Vartiant = VariantModel(sequelize, require("sequelize").DataTypes);

const BannersModel = require('../models/banners')
const Banners = BannersModel(sequelize, require("sequelize").DataTypes);
const fs = require('fs');
const path = require('path');




exports.getTopProducts= async (req, res) => {
    try {
      // Fetch all designs from the database
      const designs = await Products.findAll({ attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM variants AS v
              WHERE v.product_id = products.product_id
            )`),
            'variants'
          ]
        ]
      }});
  
      if (designs.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No designs found.",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "All designs fetched successfully.",
        data: designs,
      });
    } catch (err) {
      console.error("Error fetching designs:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  exports.getAllProducts= async (req, res) => {
    try {
      // Fetch all designs from the database
      const designs = await Products.findAll();
  
      if (designs.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No designs found.",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "All designs fetched successfully.",
        data: designs,
      });
    } catch (err) {
      console.error("Error fetching designs:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  exports.getTopProducts2= async (req, res) => {
    try {
      // Fetch all designs from the database
      const designs = await Products.findAll({where:{productcategoryname:'men'}});
  
      if (designs.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No designs found.",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "All designs fetched successfully.",
        data: designs,
      });
    } catch (err) {
      console.error("Error fetching designs:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  exports.getTopWomen= async (req, res) => {
    try {
      // Fetch all designs from the database
      const designs = await Products.findAll({where:{productcategoryname:'women'}});
  
      if (designs.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No designs found.",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "All designs fetched successfully.",
        data: designs,
      });
    } catch (err) {
      console.error("Error fetching designs:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  exports.getProductWithVariants = async (req, res) => {
    try {
      // Get the product ID from the request parameters
      const { product_id } = req.body;
  
      // Fetch the product along with its variants from the database
      const product = await Products.findOne({
        where: { product_id: product_id }, // Assuming productId is in the request params
        include: [
          {
            model: Vartiant, // Make sure to use the correct model for variants
            as: 'variants', // This should match the alias defined in your Sequelize associations
            required: false, // This ensures that even if no variants exist, the product is still returned
          },
        ],
      });
  
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found.",
        });
      }
  
      res.status(200).json({
        status: true,
        message: "Product and variants fetched successfully.",
        data: product,
      });
    } catch (err) {
      console.error("Error fetching product and variants:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const { product_id } = req.body; // Get the product_id from the request body
  
      // Ensure the product exists before attempting to delete
      const product = await Products.findOne({ where: { product_id: product_id } });
  
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found.",
        });
      }
  
      // Delete the product
      await Products.destroy({
        where: { product_id: product_id },
      });
  
      res.status(200).json({
        status: true,
        message: "Product deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  


  exports.handleProductClick = async (req, res) => {
    try {
      const { product_id } = req.body; // Assuming product_id is passed as a URL parameter
  
      // Query to fetch product details
      const productQuery = `SELECT * FROM products WHERE product_id = ?`;
      const variantsQuery = `SELECT * FROM variants WHERE product_id = ?`;
  
      // Running both queries using sequelize's query interface
      const [productData] = await sequelize.query(productQuery, {
        replacements: [product_id], // product_id passed in an array for the query placeholder
        type: sequelize.QueryTypes.SELECT,
      });
  
      const variantsData= await sequelize.query(variantsQuery, {
        replacements: [product_id], // same here for variants query
        type: sequelize.QueryTypes.SELECT,
      });
  
      if (productData.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Product not found.",
        });
      }
  
      // Returning the product and its variants
      return res.status(200).json({
        status: true,
        message: "Product and variants fetched successfully.",
        product: productData,
        variants: variantsData,
      });
    } catch (err) {
      console.error("Error fetching product and variants:", err);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  exports.getProductsByCategory = async (req, res) => {
    try {
      // Get the product category name from the request parameters
      const { category ,gender} = req.body; // Assuming category_name is passed as a URL parameter

      
  
      // Fetch products by category name
      let whereClause = { productcategoryname: category };

      if (gender) {
        whereClause.gender = gender; // Add gender to the where clause if it exists
      }
      if((category=='All')&&gender!='All'){
          whereClause = {gender:gender}
      }
      else if((category!='All')&&gender=='All'){
        whereClause = {productcategoryname:category}
   }
   else{
    whereClause = {   }; 
   } 
   

      const products = await Products.findAll({
        where: whereClause, // Apply the dynamic where clause
      });
  
      if (products.length === 0) {
        return res.status(404).json({
          status: false,
          message: `No products found in the category.`,
        });
      }
  
      // Return the products found in the requested category
      res.status(200).json({
        status: true,
        message: ` products fetched successfully.`,
        data: products,
      });
    } catch (err) {
      console.error("Error fetching products by category:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  

  exports.getProductsByCategory2 = async (req, res) => {
    try {
      // Get the product category name from the request parameters
      const { category ,subcategory} = req.body; // Assuming category_name is passed as a URL parameter

    
  
      // Fetch products by category name
      let whereClause = { productcategoryname: category };
    /*   if(category=='man'||'men'){
        whereClause = { productcategoryname: 'man'||'men' };
      } */
     

      if (subcategory&&subcategory!='All') {
        whereClause['productsubcategoryname'] = subcategory; // Add gender to the where clause if it exists
      }
     /*  if((category=='All')&&subcategory!='All'){
          whereClause = {}
      }
      else if((category!='All')&&subcategory=='All'){
        whereClause = {productcategoryname:category}
   }
   else{
    whereClause = {   }; 
   }  */
    console.log('where clause was',whereClause)

      const products = await Products.findAll({
        where: whereClause, // Apply the dynamic where clause
      });
  
      if (products.length === 0) {
        return res.status(404).json({
          status: false,
          message: `No products found in the category.`,
        });
      }
  
      // Return the products found in the requested category
      res.status(200).json({
        status: true,
        message: ` products fetched successfully.`,
        data: products.reverse(),
      });
    } catch (err) {
      console.error("Error fetching products by category:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  

 


  

exports.getProductsByCategory3 = async (req, res) => {
  try {
    const { category, subcategory, price ,size} = req.body;

    // Validate the required category name
    if (!category) {
      return res.status(400).json({
        status: false,
        message: "Category name is required.",
      });
    }

    // Start building the raw SQL query
    let query = `
      SELECT DISTINCT p.*
      FROM products p
      LEFT JOIN variants v ON p.product_id = v.product_id
      WHERE p.productcategoryname = '${category}'
    `;

    // Add subcategory filter if it exists and is not false
    if (subcategory) {
      query += ` AND p.productsubcategoryname = '${subcategory}'`;
    }

    // Add price filter if it exists
    if (price) {
      query += ` AND p.current_price <= ${price}`;
    }

    if (size) {
      query += ` AND EXISTS (
        SELECT 1 FROM variants v2 
        WHERE v2.product_id = p.product_id AND v2.size = '${size}'
      )`;
    }


    // Execute the raw query
    const products = await sequelize.query(query, { type: QueryTypes.SELECT });

    // Handle no products found
    if (products.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No products found matching the criteria.",
      });
    }

    // Return the filtered products
    return res.status(200).json({
      status: true,
      message: "Products fetched successfully.",
      data: products,
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};












  exports.addProduct = async (req, res) => {

    const files = req.files; 
     let filenames
     if(files.length!=0){
       filenames = files.map((file) => file.filename).join(',');
     }


    console.log(filenames)
    try {
      // Parse scalar data from the `data` key in the request body
      const { data } = req.body;
      let mydata = JSON.parse(data)
      delete mydata.product_id
      console.log(data)
      if (!data) {
        return res.status(400).json({
          status: false,
          message: 'Missing required data.',
        });
      }
  
    
    
  
    
      // Save product in the database
      const newProduct = await Products.create({
        ...mydata,
        status:'active',
        image_url:filenames, // Store as a comma-separated string
      });
  
      return res.status(201).json({
        status: true,
        message: 'Product added successfully.',
        data: newProduct,
      });
    } catch (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
  

  exports.addVariant = async (req, res) => {

    const files = req.files; 
     let filenames
     if(files.length!=0){
       filenames = files.map((file) => file.filename).join(',');
     }


    console.log(filenames)
    try {
      // Parse scalar data from the `data` key in the request body
      const { data } = req.body;
      
      console.log('add variant is reciving ',data)

      let mydata = JSON.parse(data)
      delete mydata.variant_id
      console.log(data)
      if (!data) {
        return res.status(400).json({
          status: false,
          message: 'Missing required data.',
        });
      }
  
    
    
  
    
      // Save product in the database
      const newProduct = await Vartiant.create({
        ...mydata,
        image_url:filenames, // Store as a comma-separated string
      });
  
      return res.status(201).json({
        status: true,
        message: 'Variant added successfully.',
        data: newProduct,
      });
    } catch (err) {
      console.error('Error adding product:', err);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
  


  exports.editProduct = async (req, res) => {
    const files = req.files;
  
    const filenames = files.map((file) => file.filename).join(',');
    console.log(filenames);
  
    try {
      // Parse scalar data from the `data` key in the request body
      const { data } = req.body;
  
      if (!data) {
        return res.status(400).json({
          status: false,
          message: 'Missing required data.',
        });
      }
  
      // Spread the data object to get all fields
      const { product_id, urlImages, ...productData } = JSON.parse(data);
  
      if (!product_id) {
        return res.status(400).json({
          status: false,
          message: 'Missing product_id to identify the product.',
        });
      }
  
      // Find the product to edit
      const productToEdit = await Products.findOne({ where: { product_id: product_id } });
  
      if (!productToEdit) {
        return res.status(404).json({
          status: false,
          message: 'Product not found.',
        });
      }
  
      // Combine URL-based images and uploaded images
      let allImages = [];
      console.log(allImages)
  
      if (urlImages) {
        // Assuming urlImages is a comma-separated string
        allImages = urlImages.split(','); // Convert to an array

        console.log(allImages)
      }
  

      const currentImages = productToEdit.image_url ? productToEdit.image_url.split(',') : [];
        
      // Determine which images are no longer needed (i.e., in the database but not in the new list)
      const imagesToDelete = currentImages.filter(image => !allImages.includes(image));
     console.log(imagesToDelete)
      // Delete those images from the server storage (public/images)
      imagesToDelete.forEach(image => {
        const imagePath = path.join(__dirname,'../', 'public', 'images', image); // Adjust the path to your public/images folder
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the file
          console.log(`Deleted image: ${image}`);
        }
      });



    




      if (files.length!=0) {
        // Add the uploaded file images (from Multer)
        allImages = allImages.concat(filenames.split(',')); // Concatenate the new filenames
       /*  console.log(allImages) */
      }
       console.log(productData)
      // Update the product in the database
      const updatedProduct = await productToEdit.update({
        ...productData, // Spread the rest of the fields
        image_url: allImages.join(','), // Store as a comma-separated string
      });
  
      return res.status(200).json({
        status: true,
        message: 'Product updated successfully.',
        data: updatedProduct,
      });
    } catch (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
  
  exports.editVariant = async (req, res) => {
    const files = req.files;
  
    const filenames = files.map((file) => file.filename).join(',');
    console.log(filenames);
  
    try {
      // Parse scalar data from the `data` key in the request body
      const { data } = req.body;
  
      if (!data) {
        return res.status(400).json({
          status: false,
          message: 'Missing required data.',
        });
      }
  
      // Spread the data object to get all fields
      const { variant_id, urlImages, ...productData } = JSON.parse(data);
  
      if (!variant_id) {
        return res.status(400).json({
          status: false,
          message: 'Missing product_id to identify the product.',
        });
      }
  
      // Find the product to edit
      const variantToEdit = await Vartiant.findOne({ where: { variant_id: variant_id } });
  
      if (!variantToEdit) {
        return res.status(404).json({
          status: false,
          message: 'Variant not found.',
        });
      }
  
      // Combine URL-based images and uploaded images
      let allImages = [];
      console.log(allImages)
  
      if (urlImages) {
        // Assuming urlImages is a comma-separated string
        allImages = urlImages.split(','); // Convert to an array

        console.log(allImages)
      }
  

      const currentImages = variantToEdit.image_url ? variantToEdit.image_url.split(',') : [];
        
      // Determine which images are no longer needed (i.e., in the database but not in the new list)
      const imagesToDelete = currentImages.filter(image => !allImages.includes(image));
     console.log(imagesToDelete)
      // Delete those images from the server storage (public/images)
      imagesToDelete.forEach(image => {
        const imagePath = path.join(__dirname,'../', 'public', 'images', image); // Adjust the path to your public/images folder
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath); // Delete the file
          console.log(`Deleted image: ${image}`);
        }
      });



    




      if (files.length!=0) {
        // Add the uploaded file images (from Multer)
        allImages = allImages.concat(filenames.split(',')); // Concatenate the new filenames
       /*  console.log(allImages) */
      }
       console.log(productData)


      // Update the product in the database
      const updatedProduct = await variantToEdit.update({
        ...productData, // Spread the rest of the fields
        image_url: allImages.join(','), // Store as a comma-separated string
      });
  
      return res.status(200).json({
        status: true,
        message: 'Variant updated successfully.',
        data: updatedProduct,
      });
    } catch (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
        error: err.message,
      });
    }
  };
  
  exports.getVariantsByProductId = async (req, res) => {
    try {
      const { product_id } = req.body; // Get the product_id from the request params
    
      // Fetch variants based on the product_id
      const variants = await Vartiant.findAll({
        where: { product_id: product_id }, // Fetch variants where product_id matches
      });
  
      if (variants.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No variants found for the given product ID.",
        });
      }
  
      // Return the variants if found
      res.status(200).json({
        status: true,
        message: "Variants fetched successfully.",
        data: variants,
      });
    } catch (err) {
      console.error("Error fetching variants:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  


 


  const { QueryTypes } = require("sequelize");

  exports.getSearchResults = async (req, res) => {
    try {
      const { search = "", category, sortBy = "name", order = "asc",price,size } = req.body;

      console.log(price)
  
      // Build the raw SQL query
      let query = `  SELECT DISTINCT p.* 
      FROM products p
      LEFT JOIN variants v ON p.product_id = v.product_id
      WHERE 1=1`;
      if (search) {
        query += ` AND name LIKE '%${search}%'`;
      }
      if (category) {
        query += ` AND productcategoryname = '${category}'`;
      }
      if (price) {
        query += ` AND p.current_price <= ${price}`;
      }
  
      if (size) {
        query += ` AND v.size = '${size}'`;
      }
  
      query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
      
  
      // Execute the raw query
      const products = await sequelize.query(query, { type: QueryTypes.SELECT });
  
      if (products.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No products found matching the criteria.",
        });
      }
  
      return res.status(200).json({
        status: true,
        message: "Products fetched successfully.",
        data: products,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  

  exports.updateProductStatus = async (req, res) => {
    try {
      // Extract product_id and status from the request body
      const { product_id, status } = req.body;
  
      // Validate the input
      if (!product_id || status === undefined) {
        return res.status(400).json({
          status: false,
          message: "Product ID and status are required.",
        });
      }
  
      // Check if the product exists
      const product = await Products.findOne({ where: { product_id } });
      if (!product) {
        return res.status(404).json({
          status: false,
          message: "Product not found.",
        });
      }
  
      // Update the product's status
      await Products.update(
        { status }, // Assuming "status" is the field in your database
        { where: { product_id } }
      );
  
      res.status(200).json({
        status: true,
        message: "Product status updated successfully.",
      });
    } catch (err) {
      console.error("Error updating product status:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };


  exports.updateVariantStatus = async (req, res) => {
    try {
      // Extract product_id and status from the request body
      const { variant_id, status } = req.body;
  
      // Validate the input
      if (!variant_id || status === undefined) {
        return res.status(400).json({
          status: false,
          message: " ID and status are required.",
        });
      }
  
      // Check if the product exists
      const variant = await Vartiant.findOne({ where: { variant_id } });
      if (!variant) {
        return res.status(404).json({
          status: false,
          message: "Variant not found.",
        });
      }
  
      // Update the product's status
      await Vartiant.update(
        { status }, // Assuming "status" is the field in your database
        { where: { variant_id } }
      );
  
      res.status(200).json({
        status: true,
        message: "Variant status updated successfully.",
      });
    } catch (err) {
      console.error("Error updating product status:", err);
      res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  
  exports.deleteVariant = async (req, res) => {
    try {
      const { variant_id } = req.body; // Extract the variant_id from the request body
  
      if (!variant_id) {
        return res.status(400).json({
          status: false,
          message: "Variant ID is required.",
        });
      }
  
      // Check if the variant exists
      const variant = await Vartiant.findOne({ where: { variant_id: variant_id } });
  
      if (!variant) {
        return res.status(404).json({
          status: false,
          message: "Variant not found.",
        });
      }
  
      // Delete the variant
      await Vartiant.destroy({
        where: { variant_id: variant_id },
      });
  
      return res.status(200).json({
        status: true,
        message: "Variant deleted successfully.",
      });
    } catch (err) {
      console.error("Error deleting variant:", err);
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  
  exports.getVariantByVariantId = async (req, res) => {
    try {
      const { variant_id } = req.body; // Extract variant_id from request params
      
  
      if (!variant_id) {
        return res.status(400).json({
          status: false,
          message: "Variant ID is required.",
        });
      }
  
      // Find the variant by variant_id
      const variant = await Vartiant.findOne({ where: { variant_id } });
  
      if (!variant) {
        return res.status(404).json({
          status: false,
          message: "Variant not found.",
        });
      }
  
      return res.status(200).json({
        status: true,
        message: "Variant retrieved successfully.",
        data: variant,
      });
    } catch (err) {
      console.error("Error retrieving variant:", err);
      return res.status(500).json({

        status: false,
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  


exports.editBanners = async (req, res) => {
  try {
    // Extract uploaded files
    const { set1Images, set2Images, set3Images } = req.files || {};

    // Extract URL-based images from the request body
    const { set1ImageUrls, set2ImageUrls, set3ImageUrls } = req.body;

    // Convert URLs to arrays (if present)
    const parseUrls = (urls) => (urls ? urls.split(",") : []);

    const banners = {
      set1: {
        files: set1Images ? set1Images.map((file) => file.filename) : [],
        urls: parseUrls(set1ImageUrls),
      },
      set2: {
        files: set2Images ? set2Images.map((file) => file.filename) : [],
        urls: parseUrls(set2ImageUrls),
      },
      set3: {
        files: set3Images ? set3Images.map((file) => file.filename) : [],
        urls: parseUrls(set3ImageUrls),
      },
    };

    // Merge files and URLs
    const mergedBanners = {
      set1: [...banners.set1.files, ...banners.set1.urls],
      set2: [...banners.set2.files, ...banners.set2.urls],
      set3: [...banners.set3.files, ...banners.set3.urls],
    };

    // Fetch current banner data from the database (Assuming you have a Banners table)
    const existingBanners = await Banners.findOne(); // Adjust query based on your structure

    if (existingBanners) {
      // Identify images to delete
      const imagesToDelete = {
        set1: existingBanners.set1.filter((img) => !mergedBanners.set1.includes(img)),
        set2: existingBanners.set2.filter((img) => !mergedBanners.set2.includes(img)),
        set3: existingBanners.set3.filter((img) => !mergedBanners.set3.includes(img)),
      };

      // Delete old images from server storage
      Object.values(imagesToDelete).flat().forEach((image) => {
        const imagePath = path.join(__dirname, "../public/images", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${image}`);
        }
      });

      // Update database with new images
      await existingBanners.update({
        set1: mergedBanners.set1.join(","),
        set2: mergedBanners.set2.join(","),
        set3: mergedBanners.set3.join(","),
      });

      return res.status(200).json({
        status: true,
        message: "Banners updated successfully.",
        banners: mergedBanners,
      });
    } else {
      // Create new banner entry if none exists
      const newBanners = await Banners.create({
        set1: mergedBanners.set1.join(","),
        set2: mergedBanners.set2.join(","),
        set3: mergedBanners.set3.join(","),
      });

      return res.status(201).json({
        status: true,
        message: "Banners created successfully.",
        banners: newBanners,
      });
    }
  } catch (err) {
    console.error("Error updating banners:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};



exports.editBanners1 = async (req, res) => {
  try {
    const files = req.files;
    const filenames = files.map((file) => file.filename).join(",");
    console.log(filenames);

    // Extract URL-based images from the request body
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Missing required data.",
      });
    }

    const { urlImages } = JSON.parse(data);

    // Convert URL images into an array
    let allImages = [];
    if (urlImages) {
      allImages = urlImages.split(",");
    }

    // Fetch current banner data
    const existingBanners = await Banners.findOne();

    if (existingBanners) {
      const currentImages = existingBanners.set1 ? existingBanners.set1.split(",") : [];

      // Identify images to delete
      const imagesToDelete = currentImages.filter((image) => !allImages.includes(image));
      console.log(imagesToDelete);

      // Delete old images from server storage
      imagesToDelete.forEach((image) => {
        const imagePath = path.join(__dirname, "../public/images", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${image}`);
        }
      });
    }

    if (files.length !== 0) {
      allImages = allImages.concat(filenames.split(","));
    }

    if (existingBanners) {
      await existingBanners.update({
        set1: allImages.join(","),
      });
    } else {
      await Banners.create({
        set1: allImages.join(","),
      });
    }

    return res.status(200).json({
      status: true,
      message: "Banners updated successfully.",
      banners: { set1: allImages },
    });
  } catch (err) {
    console.error("Error updating banners:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.editBanners2 = async (req, res) => {
  try {
    const files = req.files;
    const filenames = files.map((file) => file.filename).join(",");
    console.log(filenames);

    // Extract URL-based images from the request body
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Missing required data.",
      });
    }

    const { urlImages } = JSON.parse(data);

    // Convert URL images into an array
    let allImages = [];
    if (urlImages) {
      allImages = urlImages.split(",");
    }

    // Fetch current banner data
    const existingBanners = await Banners.findOne();

    if (existingBanners) {
      const currentImages = existingBanners.set2 ? existingBanners.set2.split(",") : [];

      // Identify images to delete
      const imagesToDelete = currentImages.filter((image) => !allImages.includes(image));
      console.log(imagesToDelete);

      // Delete old images from server storage
      imagesToDelete.forEach((image) => {
        const imagePath = path.join(__dirname, "../public/images", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${image}`);
        }
      });
    }

    if (files.length !== 0) {
      allImages = allImages.concat(filenames.split(","));
    }

    if (existingBanners) {
      await existingBanners.update({
        set2: allImages.join(","),
      });
    } else {
      await Banners.create({
        set2: allImages.join(","),
      });
    }

    return res.status(200).json({
      status: true,
      message: "Banners updated successfully.",
      banners: { set2: allImages },
    });
  } catch (err) {
    console.error("Error updating banners:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.editBanners3 = async (req, res) => {
  try {
    const files = req.files;
    const filenames = files.map((file) => file.filename).join(",");
    console.log(filenames);

    // Extract URL-based images from the request body
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({
        status: false,
        message: "Missing required data.",
      });
    }

    const { urlImages } = JSON.parse(data);

    // Convert URL images into an array
    let allImages = [];
    if (urlImages) {
      allImages = urlImages.split(",");
    }

    // Fetch current banner data
    const existingBanners = await Banners.findOne();

    if (existingBanners) {
      const currentImages = existingBanners.set3 ? existingBanners.set3.split(",") : [];

      // Identify images to delete
      const imagesToDelete = currentImages.filter((image) => !allImages.includes(image));
      console.log(imagesToDelete);

      // Delete old images from server storage
      imagesToDelete.forEach((image) => {
        const imagePath = path.join(__dirname, "../public/images", image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Deleted image: ${image}`);
        }
      });
    }

    if (files.length !== 0) {
      allImages = allImages.concat(filenames.split(","));
    }

    if (existingBanners) {
      await existingBanners.update({
        set3: allImages.join(","),
      });
    } else {
      await Banners.create({
        set3: allImages.join(","),
      });
    }

    return res.status(200).json({
      status: true,
      message: "Banners updated successfully.",
      banners: { set1: allImages },
    });
  } catch (err) {
    console.error("Error updating banners:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banners.findOne();

    if (!banners) {
      return res.status(200).json({
        status: false,
        message: "No banners found.",
      });
    }

    return res.status(200).json({
      status: true,
      banners,
    });
  } catch (err) {
    console.error("Error fetching banners:", err);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
