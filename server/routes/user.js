// routes/user.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {userSignup, userSignin, getAllUsers, deleteUser, editUser, allIds, updatePassword, updateUser, getUserByUserId, getAddressesByUserId, addAddress, existingUser, updatePasswordByOtp, sendOtp, verifyyOtp, getUserWallet, createWalletWithdrawal, getWalletHistoryByWalletId, getAllWalletHistory, updateWalletHistoryStatus, deleteAddress, getAddressByID, getAddressById, editAddress,}  = require('../controllers/userController')

const { sequelize } = require('../config/db'); // Import your sequelize instance
const UserModel = require('../models/user'); // Import the User model
const adminAuthenticator = require('../middle/adminAuthenticator');
const { getUserDesignCount } = require('../controllers/designCont');



const User = UserModel(sequelize, require('sequelize').DataTypes); 


// POST /api/users
router.get('/', async (req, res) => {
 

  try {
    
   
   
    const user = await User.findOne();

    res.status(201).json({ data:user });
  } catch (err) {
   

 
  }

 

});


router.post('/signu', /* signupValidation, */ userSignup);
router.post('/login', /* signupValidation, */ userSignin);
router.get('/all',getAllUsers)
router.post('/deleteuser', deleteUser);
router.post('/edit',editUser)

router.get('/allids',allIds)
router.post('/updatepassword',updatePassword)
router.post('/updateuser',updateUser);
router.post('/byid',getUserByUserId);
router.post('/designbyid',getUserDesignCount);
router.post('/address',getAddressesByUserId);
router.post('/addressadd',addAddress);
router.post('/addressedit',editAddress);
router.post('/addressdelete',deleteAddress);
router.post('/getaddressbyid',getAddressById);
router.post('/haveaccount',existingUser);
router.post('/reset-password',updatePasswordByOtp);
router.post('/send-otp',sendOtp);
router.post('/verify-otp',verifyyOtp);
router.post('/getwallet',getUserWallet);
router.post('/withdraw',createWalletWithdrawal);
router.post('/getwallethistory',getWalletHistoryByWalletId);
router.post('/getallwallethistory',getAllWalletHistory);
router.post('/updatewalletstatus',updateWalletHistoryStatus);








module.exports = router;
