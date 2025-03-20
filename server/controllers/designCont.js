const { sequelize } = require("../config/db");
const DesignModel = require("../models/design");
const PaymentModel = require("../models/payment")


const Design = DesignModel(sequelize, require("sequelize").DataTypes);
const Payment = PaymentModel(sequelize,require("sequelize").DataTypes)
const upload = require('../multer')

exports.submitDesign = async (req, res) => {
  try {
    const { userid, category } = req.body; // Form data
    const files = req.files; // Uploaded files



    if (!files || files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one file must be uploaded",
      });
    }

    // Check if payment exists for the user and if it's not verified
    const paymentLog = await Payment.findOne({
      where: {
        userid: userid,
        verified: false, // Only proceed if payment is not verified
      },
    });

    if (!paymentLog) {
      return res.status(400).json({
        status: false,
        message: "Payment not found. Please complete payment verification first.",
      });
    }

    // Extract filenames and join them with commas
    const filenames = files.map((file) => file.filename).join(',');

    // Save design to the database
    const newDesign = await Design.create({
      category: category,
      images: filenames,
      preselect:false,
      selected:false,
      userid: userid, // User ID
    });

    // After the design is submitted, update the payment log as verified
  /*   await Payment.update(
      { verified: true },
      { where: { userid: userid, verified: false} }
    ); */

    res.status(201).json({
      status: true,
      message: "Design submitted successfully, and payment verified.",
      data: newDesign,
    });
  } catch (err) {
    console.error("Error submitting design:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.submitDesign2 = async (req, res) => {
  try {
    const { userid, category } = req.body; // Form data
    const files = req.files; // Uploaded files



    if (!files || files.length === 0) {
      return res.status(400).json({
        status: false,
        message: "At least one file must be uploaded",
      });
    }

 /*    // Check if payment exists for the user and if it's not verified
    const paymentLog = await Payment.findOne({
      where: {
        userid: userid,
        verified: false, // Only proceed if payment is not verified
      },
    });

    if (!paymentLog) {
      return res.status(400).json({
        status: false,
        message: "Payment not found. Please complete payment verification first.",
      });
    } */

    // Extract filenames and join them with commas
    const filenames = files.map((file) => file.filename).join(',');

    // Save design to the database
    const newDesign = await Design.create({
      category: category,
      images: filenames,
      preselect:false,
      selected:false,
      userid: userid, // User ID
    });

    // After the design is submitted, update the payment log as verified
  /*   await Payment.update(
      { verified: true },
      { where: { userid: userid, verified: false} }
    ); */

    res.status(201).json({
      status: true,
      message: "Design submitted successfully, and payment verified.",
      data: newDesign,
    });
  } catch (err) {
    console.error("Error submitting design:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.updatePreselect = async (req, res) => {
  try {
    const { designid, preselect } = req.body; // Expecting designId and preselect value in the request body

    if (typeof preselect !== "boolean") {
      return res.status(400).json({
        status: false,
        message: "Preselect value must be a boolean (true or false).",
      });
    }

    // Find the design by ID
    const design = await Design.findByPk(designid);

    if (!design) {
      return res.status(404).json({
        status: false,
        message: "Design not found.",
      });
    }

    // Update the preselect field
    await design.update({ preselect });

    res.status(200).json({
      status: true,
      message: "Preselect value updated successfully.",
      data: design,
    });
  } catch (err) {
    console.error("Error updating preselect:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


exports.getAllDesigns = async (req, res) => {
  try {
    // Fetch all designs from the database
    const designs = await Design.findAll();

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

exports.updateSelect = async (req, res) => {
  try {
    const { designid, selected } = req.body; // Expecting designId and selected value in the request body

    if (typeof selected !== "boolean") {
      return res.status(400).json({
        status: false,
        message: "Selected value must be a boolean (true or false).",
      });
    }

    // Find the design by ID
    const design = await Design.findByPk(designid);

    if (!design) {
      return res.status(404).json({
        status: false,
        message: "Design not found.",
      });
    }

    // Update the selected field
    await design.update({ selected });

    res.status(200).json({
      status: true,
      message: "Selected value updated successfully.",
      data: design,
    });
  } catch (err) {
    console.error("Error updating selected:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


exports.getDesignsByUserId = async (req, res) => {
  try {
    const { userid } = req.body; // Extract userid from request parameters

    // Fetch all designs for the given userid
    const designs = await Design.findAll({
      where: { userid: userid },
    });

    if (designs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No designs found for the given user.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Designs fetched successfully for the user.",
      data: designs,
    });
  } catch (err) {
    console.error("Error fetching designs by userid:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.updateWinner = async (req, res) => {
  try {
    const { designid, winner } = req.body; // Expecting designId and winner value in the request body

    if (typeof winner !== "boolean") {
      return res.status(400).json({
        status: false,
        message: "Winner value must be a boolean (true or false).",
      });
    }

    // Find the design by ID
    const design = await Design.findByPk(designid);

    if (!design) {
      return res.status(404).json({
        status: false,
        message: "Design not found.",
      });
    }

    // Update the winner field
    await design.update({ winner });

    res.status(200).json({
      status: true,
      message: "Winner status updated successfully.",
      data: design,
    });
  } catch (err) {
    console.error("Error updating winner:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.getUserDesignCount = async (req, res) => {
  try {
    const { userid } = req.body;

    // Validate userid
    if (!userid) {
      return res.status(400).json({
        status: false,
        message: "User ID is required.",
      });
    }

    // Fetch the count of designs submitted by the user
    const designCount = await Design.count({
      where: { userid },
    });

    res.status(200).json({
      status: true,
      message: "Design count fetched successfully.",
      data: { userid, designCount },
    });
  } catch (err) {
    console.error("Error fetching user design count:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
