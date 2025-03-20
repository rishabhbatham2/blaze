const express = require('express');
const { sequelize } = require("../config/db");
const  PaymentModel  = require('../models/payment');  // Assuming Sequelize model for product categories
const Payment = PaymentModel(sequelize, require("sequelize").DataTypes);
const router = express.Router();



router.get('/all', async (req, res) => {
  try {
    const subCategories = await Payment.findAll({
  /*     attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT *
              FROM user AS p
              WHERE p.userid = payment.userid
            )`),
            'user'
          ]
        ]
      } */
    });

    res.status(200).json({ status: true, data: subCategories }); // Return all subcategories with product count
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Error retrieving product subcategories', error });
  }
});

module.exports = router;

