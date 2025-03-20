const bcrypt = require("bcryptjs");

const UserModel = require("../models/user"); // Import the User model
const AddressModel = require("../models/address"); 
const { sequelize } = require("../config/db");
const { route } = require("../routes/user");
const passport = require("passport");
const user = require("../models/user");
const jwt = require('jsonwebtoken');
const { sendOTP, verifyOTP } = require("../otpService");
const User = UserModel(sequelize, require("sequelize").DataTypes);
const Address = AddressModel(sequelize, require("sequelize").DataTypes);
const IpAddress = UserModel(sequelize, require("sequelize").DataTypes);


const WalletModel = require('../models/wallet');
const WalletHistoryModel = require('../models/wallethistory');
const { date } = require("joi");
const Wallet = WalletModel(sequelize, require("sequelize").DataTypes);
const Wallethistory = WalletHistoryModel(sequelize, require("sequelize").DataTypes);


require("../passport");


exports.userSignup = async (req, res, next) => {
  const {
    firstname,
    lastname,
    mobile,
    email,
    password,
  } = req.body;

  try {
    // Check if user with email or mobile already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "Email or mobile number already registered",
      });
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the current date and time
    const currentDateTime = new Date();


  

    const newUser = await User.create({
      firstname:firstname,
      lastname:lastname,
      mobile:mobile,

      
      email,
      password: hashedPassword,

      role: "user",
      status: "active",
      created_at:new Date()
      // Save the current date and time
    });

    const token = jwt.sign(
      {
        userid: newUser.userid,
        email: newUser.email,
      },
      process.env.JWT_SECRET || "your_secret_key",
      {
        expiresIn: "45h",
      }
    );
    let myuser =newUser
    myuser['token'] =token 
    res.status(201).json({
      status: true,
      message: "User created successfully",
      user:myuser
       
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.userSignin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password in the database

    if(existingUser.dataValues.role=='admin'&&existingUser.dataValues.password==password)
    {
      const token = jwt.sign(
        { id: existingUser.userid, password: existingUser.password,email:existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "41d" }
      );
      let myuser = existingUser.dataValues
      myuser['token']=token
      return res
      .status(200)
      .json({token:token, status: true, message: "adminlogged in", data:myuser,redirectUrl:'/admin' });   

       

    }
    else{
      console.log("password we recived is ",password)
      console.log("password from db is ",existingUser.password)
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );
        


      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid email or password" });
      }
      console.log("existing user is", existingUser.dataValues.userid,existingUser.dataValues.firstname,existingUser.dataValues.email);
  
      const token = jwt.sign(
        { id: existingUser.userid, password: existingUser.password,email:existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "45d" }
      );


      const myrole = existingUser.dataValues.status;
  
   
    
      // Respond with user details
      res.status(200).json({
        status: true,
        message: "Signed in",
        token:token,
        data: {
          user: {
            userid: existingUser.userid,
            firstname: existingUser.dataValues.firstname,
            mobile: existingUser.dataValues.mobile,
            role:existingUser.dataValues.role,
            lastname: existingUser.dataValues.lastname,
            gender: existingUser.dataValues.gender,
            
            email: existingUser.dataValues.email,
            town: existingUser.dataValues.town,
            country: existingUser.dataValues.country,
            state: existingUser.dataValues.state,
            address: existingUser.dataValues.address,
            zip: existingUser.dataValues.zip,
            status: existingUser.dataValues.status,
           
            token:token
            
          },
        },
      });
    }
  
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({
        status: false,
        message: "Something went wrong. Please try again later.",
      });
  }
};


exports.getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll({
      attributes: [
         'userid', 'firstname', 'lastname', 'gender', 'mobile',
        'email',
        'username', 'role', 'status','from','group','created_at'
      ], 

    /*   order: [
        [sequelize.literal('dateandtime IS NULL'), 'ASC'], // Nulls last
        ['dateandtime', 'DESC'] // Non-null dates descending
      ] */

    });

    if (!users) {
      return res.status(404).json({ status: false, message: "No users found" });
    }

    // Respond with user details
    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users.reverse()
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later."
    });
  }
};
exports.deleteUser = async (req, res, next) => {
  const { id } = req.body; // Assuming the user ID is passed as a URL parameter

  try {
    // Find the user by their ID
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    // Delete the user
    await user.destroy();

    // Respond with success
    res.status(200).json({
      status: true,
      message: `User with ID ${id} has been deleted successfully`,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};


exports.editUser = async (req, res, next) => {
  const { userid } = req.body; // Assume you pass userid as a URL parameter
  const {
      firstname,
      lastname,
      gender,
      mobile,
      email,
      town,
      country,
      state,
      address,
      zip,
      username,
      password,
      status,
  } = req.body;

  try {
      // Check if the user exists
      const existingUser = await User.findOne({ where: { userid } });

      if (!existingUser) {
          return res.status(404).json({ status: false, message: "User not found" });
      }

      // Create an update object with only the fields that are provided
      const updateData = {};
      if (firstname) updateData.firstname = firstname;
      if (lastname) updateData.lastname = lastname;
      if (gender) updateData.gender = gender;
      if (mobile) updateData.mobile = mobile;
      if (email) updateData.email = email;
      if (town) updateData.town = town;
      if (country) updateData.country = country;
      if (state) updateData.state = state;
      if (address) updateData.address = address;
      if (zip) updateData.zip = zip;
      if (username) updateData.username = username;
      if (password) updateData.password = password; // Make sure to hash the password if necessary before saving
      if (status) updateData.status = status;

      // Update user details only for the fields provided
      await User.update(updateData, {
          where: { userid },
      });

      // Respond with success message
      res.status(200).json({
          status: true,
          message: "User updated successfully",
          data: {
              userid,
              ...updateData, // Send back the updated fields
          },
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          status: false,
          message: "Something went wrong. Please try again later.",
      });
  }
};



exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch total customers from User model
    const totalCustomers = await User.count();

    // Fetch active customers from User model (assuming 'active' status indicates an active customer)
    const activeCustomers = await User.count({
      where: { status: 'active' }
    });

    // Fetch pending customers from the Accounts model
    const pendingAccounts = await Accounts(sequelize, require("sequelize").DataTypes).count({
      where: { status: 'pending' }
    });

    // Fetch total inquiries (assuming you have an Inquiry model)
    const totalInquiries = await InquiryModel(sequelize, require("sequelize").DataTypes).count();

    // Send the response with all the stats
    res.status(200).json({
      status: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalCustomers,
        activeCustomers,
        pendingAccounts,
        totalInquiries
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Error fetching dashboard stats",
      error: err.message,
    });
  }
};


exports.updateUserStatus = async (req, res) => {
  const { userid, status } = req.body; // Expecting userid and status in the request body

  try {
      // Check if the user exists
      const existingUser = await User.findOne({ where: { userid } });

      if (!existingUser) {
          return res.status(404).json({ status: false, message: "User not found" });
      }

      // Update the status
      await User.update({ status }, {
          where: { userid },
      });

      // Respond with success message
      res.status(200).json({
          status: true,
          message: "User status updated successfully",
          data: {
              userid,
              status // Send back the updated status
          },
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          status: false,
          message: "Error updating user status",
          error: err.message,
      });
  }
};

exports.allIds = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'userid'
      ]
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ status: false, message: "No users found" });
    }

    res.status(200).json({
      status: true,
      message: "Users fetched successfully",
      data: users
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again later."
    });
  }
};

exports.updatePassword = async (req, res, next) => {
  const { userid, currentpass, newpass } = req.body;

  try {
    // Check if user with the given userid exists
    const user = await User.findOne({ where: { userid } });

    if (!user) {
      return res.status(200).json({ status: false, message: "User not found" });
    }

    // Compare the provided current password with the stored password in the database
    const isPasswordValid = await bcrypt.compare(currentpass, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({ status: false, message: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newpass, 10);

    // Update the user's password in the database
    await User.update(
      { password: hashedNewPassword },
      { where: { userid } }
    );

    res.status(200).json({
      status: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.updateUser = async (req, res, next) => {
  const { 
    userid, firstname, lastname, gender, mobile, email, town, country, 
    state, address, zip, status 
  } = req.body;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({ where: { userid } });

    if (!existingUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    console.log('was lastname provided',lastname)

    // Create an object to store updated fields
    const updatedFields = {};

    // Only update the fields that are provided
    if (firstname) updatedFields.firstname = firstname;
    if (lastname) updatedFields.lastname = lastname;
    if (gender) updatedFields.gender = gender;
    if (mobile) updatedFields.mobile = mobile;
    if (email) updatedFields.email = email;
    if (town) updatedFields.town = town;
    if (country) updatedFields.country = country;
    if (state) updatedFields.state = state;
    if (address) updatedFields.address = address;
    if (zip) updatedFields.zip = zip;
    if (status) updatedFields.status = status;

    // Update the user data if any fields are provided
    if (Object.keys(updatedFields).length > 0) {
      await User.update(updatedFields, { where: { userid } });


      const updatedUser = await User.findOne({ where: { userid } });

      // Respond with the updated data
      res.status(200).json({
        status: true,
        message: "User updated successfully",
        data:updatedUser
      });
    } else {
      res.status(400).json({ status: false, message: "No fields to update" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


exports.getUserByUserId = async (req, res) => {
  const { userid } = req.body; // Expecting userid as a route parameter

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ where: { userid } });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    // Respond with the user data
    res.status(200).json({
      status: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};




exports.getAddressesByUserId = async (req, res) => {
  try {
    const { userid } = req.body; // Extract userid from request parameters

    // Validate userid
    if (!userid) {
      return res.status(400).json({
        status: false,
        message: "User ID is required.",
      });
    }

    // Fetch all addresses for the given userid
    const addresses = await Address.findAll({
      where: { userid: userid },
    });

    if (addresses.length === 0) {
      return res.status(200).json({
        status: false,
        message: "No addresses found for the given user.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Addresses fetched successfully for the user.",
      data: addresses,
    });
  } catch (err) {

    console.error("Error fetching addresses by userid:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};


exports.addAddress = async (req, res) => {
  try {
    const { data } = req.body; // Extract userid from request parameters

  console.log(data)
  const existingUser = await User.findOne({ where: { userid: data.userid } });

    if (!existingUser) {
      return res.status(404).json({
        status: false,
        message: "User not found.",
      });
    }

    // Dynamically create the address object using keys of the data object
    const newAddress = await Address.create({
      ...data, // Spread all the properties of 'data' into the new record
    });

    res.status(200).json({
      status: true,
      message: "Addresses fetched successfully for the user.",
      data: newAddress,
    });
  } catch (err) {
    
    console.error("Error fetching addresses by userid:", err);
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
exports.editAddress = async (req, res) => {
  try {
    const { addressid, addline1, addline2, city, state, zipcode, username, mobileno } = req.body;

    console.log(addline1, addline2, city, state, zipcode, username, mobileno)


    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "Access denied" });
    }

    // Verify token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    // Find the address and check ownership
    const address = await Address.findOne({
      where: { addressid: addressid ,userid:userid}
    });

    if (!address) {
      return res.status(403).json({ status: false, message: "Unauthorized access" });
    }
    
    console.log('found address was', address)
    // Update only provided fields
    if (addline1) address.addline1 = addline1;
    if (addline2) address.addline2 = addline2;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zipcode) address.zipcode = zipcode;
    if (username) address.username = username;
    if (mobileno) address.mobileno = mobileno;

    await address.save();
    res.json({ status: true, message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


exports.updatePasswordByOtp = async (req, res, next) => {
  const { email, otp, newpass } = req.body;

  try {
    // Check if user with the given userid exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(200).json({ status: false, message: "User not found" });
    }

    const response = await verifyOTP(email,otp);
    console.log(response)

    if (response.success) {
    

  

      const hashedNewPassword = await bcrypt.hash(newpass, 10);

      // Update the user's password in the database
      await User.update(
        { password: hashedNewPassword },
        { where: { email } }
      );
  
      res.status(200).json({
        status: true,
        message: "Password updated successfully",
      });


    }else{
      return res.status(200).json({
        status: false,
        message: "failed to send otp",
      });
    }




    // Compare the provided current passwor
    // 
    // 
    // 
    // d with the stored password in the database
  /*   const isPasswordValid = await bcrypt.compare(currentpass, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({ status: false, message: "Current password is incorrect" });
    }
 */
    // Hash the new password
  

  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};


exports.existingUser = async (req, res, next) => {
  const { email } = req.body;

  console.log('have account got email',email)


try{
  const existingUser = await User.findOne({ where: { email } });

if (existingUser) {
  return res.status(200).json({
    status: true,
    message: "",
  });
}else{
  return res.status(200).json({
    status: false,
    message: "no account exist with given name",
  });
}
}catch{
  console.log(err);
  res.status(500).json({ status: false, message: "Server error" });

}


};


exports.sendOtp = async (req, res, next) => {
  const { email } = req.body;


try{


  const response = await sendOTP(email);

  console.log(response)

  if (response.success) {
    res.status(200).json({ message: "OTP sent successfully",status:true });
  }else{
    return res.status(200).json({
      status: false,
      message: "failed to send otp",
    });
  }

 

}catch{
  console.log(err);
  res.status(500).json({ status: false, message: "Server error" });

}


};

exports.verifyyOtp = async (req, res, next) => {
  const { email,otp } = req.body;


try{




  const response = await verifyOTP(email,otp);
  console.log(response)


  if (response.success) {
    res.status(200).json({ message: "OTP verified successfully", status:true });
  }else{
    return res.status(200).json({
      status: false,
      message: "Incorrent Otp",
    });
  }

 

}catch{
  console.log(err);
  res.status(500).json({ status: false, message: "Server error" });

}


};




exports.getUserWallet = async (req, res) => {
  const { userid } = req.body;

  console.log('ae we reicing userid ',userid)

  try {
    let userWallet = await Wallet.findOne({ where: { userid } });

    if (!userWallet) {
      userWallet = await Wallet.create({ userid, coins: 0 });
      console.log("New wallet created:", userWallet);
    }

    res.status(200).json({ status: true, data: userWallet });
  } catch (err) {
    console.error("Error fetching wallet:", err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.createWalletWithdrawal = async (req, res) => {
  try {
    // Destructure userid, coins, and the rest of the fields for wallet history.
    const { walletid, coins, account,IFSC,name,bank,branch } = req.body;

    // Find the user's wallet.
    let userWallet = await Wallet.findOne({ where: { walletid } });
    if (!userWallet) {
      return res.status(404).json({
        status: false,
        message: "Wallet not found for this user."
      });
    }

    console.log('got user',userWallet)

    // Check if the user has enough coins.
    if (userWallet.coins < coins) {
      return res.status(400).json({
        status: false,
        message: "Insufficient coins in the wallet."
      });
    }

    // Deduct the coins from the wallet.
    userWallet.coins -= coins;

  
    await userWallet.save();

    // Create a new wallet history record with status set to 'pending'.
    const newHistory = await Wallethistory.create({
      account,
      amount:coins,
      IFSC,
      name,
      bank,
      branch,
      walletid,      // Optionally include userid for reference.
      coins,       // The withdrawal amount.
      stat: "pending",
      created_at:new Date(),
      
    });

    console.log("Wallet updated and new history created:", {
      wallet: userWallet,
      history: newHistory
    });

    return res.status(200).json({
      status: true,
      data: { wallet: userWallet, history: newHistory }
    });
  } catch (err) {
    console.error("Error processing withdrawal:", err);
    return res.status(500).json({
      status: false,
      message: "Server error."
    });
  }
};


exports.getWalletHistoryByWalletId = async (req, res) => {

  console.log('waalleeetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
  try {
    const { walletid } = req.body;

    console.log('waalleeetttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt',walletid)
    // Fetch all wallet history records for the given walletid.
    const historyRecords = await Wallethistory.findAll({
      where: { walletid }
    });

    if (!historyRecords || historyRecords.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No wallet history found for this walletid."
      });
    }

    return res.status(200).json({
      status: true,
      data: historyRecords
    });
  } catch (err) {
    console.error("Error fetching wallet history:", err);
    return res.status(500).json({
      status: false,
      message: "Server error"
    });
  }
};

exports.getAllWalletHistory = async (req, res) => {
  try {
    const walletHistories = await Wallethistory.findAll();
    return res.status(200).json({ status: true, data: walletHistories.reverse() });
  } catch (err) {
    console.error("Error fetching wallet history:", err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.updateWalletHistoryStatus = async (req, res) => {
  try {
    const { wallethistoryid, status } = req.body;
    
    // Validate inputs.
    if (!wallethistoryid || !status) {
      return res.status(400).json({ status: false, message: "Missing required fields." });
    }

    // Update the status field.
    const updateResult = await Wallethistory.update(
      { stat:status },
      { where: { wallethistoryid } }
    );

    // updateResult[0] returns the number of affected rows.
    if (updateResult[0] === 0) {
      return res.status(404).json({
        status: false,
        message: "Wallet history record not found."
      });
    }

    return res.status(200).json({
      status: true,
      message: "Status updated successfully."
    });
  } catch (err) {
    console.error("Error updating wallet history status:", err);
    return res.status(500).json({
      status: false,
      message: "Server error."
    });
  }
};


exports.deleteAddress = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    // Extract address ID from request params/body
    const { addressid } = req.body; // Assuming it's passed as a URL parameter

    // Find the address and check if it belongs to the user
    const address = await Address.findOne({ where: { addressid, userid: userid } });

    if (!address) {
      return res.status(403).json({ status: false, message: "Forbidden: Address does not belong to user" });
    }

    // Send the address details
    await Address.destroy({ where: { addressid, userid } });
    res.status(200).json({ status: true, message: "Address deleted ", });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ status: false, message: "Unauthorized" });
    }

    // Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    // Extract address ID from request params/body
    const { addressid } = req.body; // Assuming it's passed as a URL parameter

    // Find the address and check if it belongs to the user
    const address = await Address.findOne({ where: { addressid, userid: userid } });

    if (!address) {
      return res.status(403).json({ status: false, message: "Forbidden: Address does not belong to user" });
    }

    // Send the address details
    
    res.status(200).json({ status: true, message: "Address deleted ",data:address });

  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};