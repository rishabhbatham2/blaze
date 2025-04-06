const express = require('express');
const dotenv = require('dotenv');
const { connectDB, sequelize } = require('./config/db');
const upload = require('./config/multer')
const morgan = require("morgan");
const path = require('path');
const DesignModel = require("./models/design");
const PaymentModel = require("./models/payment")
const WalletModel = require('./models/wallet')

const Design = DesignModel(sequelize, require("sequelize").DataTypes);
const Wallet = WalletModel(sequelize, require("sequelize").DataTypes);
const Payment = PaymentModel(sequelize, require("sequelize").DataTypes);
const Razorpay = require('razorpay');
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_nt89OO93hs7lOa',
  key_secret: 'K2Bcit4uwQ1fMdhVr58TDEZj',
});
const { Parser } = require('json2csv');


const crypto = require('crypto');



// Load environment variables from .env file
dotenv.config();

const cors = require('cors')

// Initialize Express
const app = express();
app.use(morgan("combined"));


// Middleware to log request details

const userRoutes = require('./routes/user')
const designRoutes = require('./routes/designs')
const productAccount = require('./routes/products')
const productCategory = require('./routes/productcategory')
const productSubCategory = require('./routes/productsubcategory')
const productPayment = require('./routes/payment')
const coupons = require('./routes/coupon')
const order = require('./routes/order')

// This is your test secret API key.

app.use(cors())
// Middleware to parse JSON
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', productPayment);
app.use('/api/design',designRoutes)
app.use('/api/products',productAccount)
app.use('/api/productcategory',productCategory)
app.use('/api/coupons',coupons)
app.use('/api/productsubcategory',productSubCategory)
app.use('/api/order',order)
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




/* app.use('/comp', express.static(path.join(__dirname, 'front')));
app.get('/comp/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'));
}); */






app.use('/clanfest', express.static(path.join(__dirname, './front')));

// Serve static files for the main frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Handle all routes under /clanfest
app.use('/clanfest/*', (req, res) => {
  res.sendFile(path.join(__dirname, './front', 'index.html'));
});

// Catch-all route for the main frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});






// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables synced!');
});

// Connect to MySQL

connectDB();


// Set the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const UserModel = require("./models/user");
const jwt = require('jsonwebtoken');
const User = UserModel(sequelize, require("sequelize").DataTypes);

const bcrypt = require("bcryptjs");
const { group } = require('console');
const singlModel = require('./models/singleorder');
const orderModel = require('./models/order');
const productModel = require('./models/products');
const listModel = require('./models/list');
const Order =  orderModel(sequelize, require("sequelize").DataTypes);
const Product =  productModel(sequelize, require("sequelize").DataTypes);
const List =  listModel(sequelize, require("sequelize").DataTypes);
const singleOrder = singlModel(sequelize, require("sequelize").DataTypes);

app.post('/create-order', async (req, res) => {
  const { amount } = req.body; // Amount from the frontend
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order); // Send order details to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating payment order');
  }
});
app.post('/create-order-wallet', async (req, res) => {
  const { amount } = req.body; // Amount from the frontend
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order); // Send order details to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating payment order');
  }
});

app.post('/create-order3', async (req, res) => {
  const { amount } = req.body; // Amount from the frontend
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    res.json(order); // Send order details to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating payment order');
  }
});

async function createOrder3(list,orderid) {


  console.log(list)

  try {
    for (const product of list) {
      // Assuming each product in the list has `name`, `size`, `color`, `price`

      const myproduct = await Product.findOne({
        where: { product_id: product.variant.product_id },
       
      });

      console.log('we recived sk')

       
      let image_url = product.variant.image_url.split(',')

      await List.create({
        name: product.variant.variantname,
        size: product.variant.size,
        color: product.variant.color,
        price: product.variant.current_price,
        variant_id:product.variant.variant_id,
       /*  userid: address.userid, */
       image_url:product.variant.image_url,
        orderid:orderid,
        quantity:product.quantity,
        sku:myproduct.sku,
        hsn:myproduct.hsn,
        date:new Date()
      });
    }

    return { status: true, message: 'Orders created successfully' };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}
app.post('/verify-payment', upload.array('images', 5), async (req, res) => {
  const { payment_id, order_id, signature,data} = req.body; // Received from frontend
  
  try {
    // Create the body string for verification: "order_id|payment_id"
    const body = order_id + "|" + payment_id;
    
    // Generate the expected signature using your Razorpay key_secret
    const expectedSignature = crypto
      .createHmac('sha256', razorpayInstance.key_secret)
      .update(body)
      .digest('hex');
    

      console.log('expected signature isssssssss',expectedSignature,signature);
    // Compare the expected signature with the received signature
    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);
    const receivedAmount = paymentDetails.amount
    console.log('recived billllllllllllllllll',data.bill)

    if (expectedSignature === signature) {
     
      await Payment.create({
        userid: data.address.userid, // Assuming userid is passed correctly from the frontend
        status: 'succseed', // Mark as verified
        list:JSON.stringify(data.list),
        amount:receivedAmount/100,
        created_at: new Date(), // Current date

       
      });


      const wallet = await Wallet.findOne({ where: { userid:data.address.userid } });

      if (!wallet || wallet.coins < data.coins) 
        return res.status(400).json({ status: false, message: "Not enough coins" });
    
      wallet.coins -= data.coins;

      console.log('now new coins are',wallet.coins)
      await wallet.save();
      
    




      
    
      const json2csvParser = new Parser();

      const flatData2 = data.list.map(item => ({
        ...item.variant,
        quantity: item.quantity
      }));
      const csvData2 = json2csvParser.parse(flatData2);
        
      const myorder =   await Order.create({
        userid: data.address.userid, // Assuming userid is passed correctly from the frontend
        status: 'Accepted', // Mark as verified
        list:data.list,
        bill:csvData2,
        customername:data.address.username,
        mobileno:data.address.mobileno,
        city:data.address.city,
        zipcode:data.address.zipcode,
        email:data.address.email,
        state:data.address.state,
        addline1:data.address.addline1,
        addline2:data.address.addline2,
        state:data.address.state,
        amount:data.bill.finalPrice,
        discount:data.bill.discount,
        shippingfees:data.bill.shipping,
        paymentmode:'Prepaid',
        created_at:new Date()
       

      })

      console.log('list issssssssssssssssssssssssssssss',data.list)
      
      const result = await createOrder3(data.list,myorder.orderid)

    

      if(result.status){

        res.status(201).json({
          status: true,
          message: "Ordered successfully",
           
           
        });
       }else{

        res.status(201).json({
          status: false,
          message: "failed to create order",
          
           
        });
      }
   
   

    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
});

app.post('/verify-payment-wallet', async (req, res) => {
  const { payment_id, order_id, signature,data } = req.body; // Received from frontend
  
  try {
    // Create the body string for verification: "order_id|payment_id"
    const body = order_id + "|" + payment_id;
    
    // Generate the expected signature using your Razorpay key_secret
    const expectedSignature = crypto
      .createHmac('sha256', razorpayInstance.key_secret)
      .update(body)
      .digest('hex');
    

      console.log('expected signature isssssssss',expectedSignature,signature);
    // Compare the expected signature with the received signature
    const paymentDetails = await razorpayInstance.payments.fetch(payment_id);
    const receivedAmount = paymentDetails.amount
  

    if (expectedSignature === signature) {
     
      await Payment.create({
        userid: data.userid, // Assuming userid is passed correctly from the frontend
        status: 'success', // Mark as verified
        list:'for wallet',
        amount:receivedAmount/100,
        created_at: new Date(), // Current date

       
      });

      const UserWallet = await Wallet.findOne({
        where: { userid: data.userid }
      });

      if (!UserWallet) {
        // Create a new wallet if it doesn't exist
        const newWallet = new Wallet({
          userid:data.userid,
          coins: receivedAmount / 100, // Initialize with received amount
        });
      
        await newWallet.save();
        console.log("New wallet created:", newWallet);
      
        return res.json({status:true, message: "New wallet created", coins: newWallet.coins });
      }
      
      let currentCoins = UserWallet.coins;
      console.log('we got current coins as ',currentCoins,UserWallet)
      let newCoins = currentCoins + receivedAmount / 100;

      console.log('we updated coins coins as ',newCoins)
      
      // Update and save
      UserWallet.coins = newCoins;
      await UserWallet.save();
      
      console.log("Updated wallet:", UserWallet);
      
      res.json({status:true, message: "Coins updated successfully", coins: newCoins });
   

    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
});




async function createOrder2(list,address) {


  console.log(list)

  try {
    for (const product of list) {
      // Assuming each product in the list has `name`, `size`, `color`, `price`
       
      let image_url = product.variant.image_url.split(',')

      await singleOrder.create({
        name: product.variant.variantname,
        size: product.variant.size,
        color: product.variant.color,
        price: product.variant.current_price,
        userid: address.userid,
        mainaddress: address.mainaddress,
        city: address.city,
        zipcode: address.zipcode,
        mobile: address.mobile,
        image_url:image_url[0],
        status: 'Order Accepted',
        date:new Date()
      });
    }

    return { status: true, message: 'Orders created successfully' };
  } catch (error) {
    console.log(error);
    return { status: false, message: error.message };
  }
}


app.post('/verify-payment2', async (req, res) => {
  const { payment_id, order_id, signature,data } = req.body; // Received from frontend
  
  try {
    // Create the body string for verification: "order_id|payment_id"
    const body = order_id + "|" + payment_id;

   
    
    // Generate the expected signature using your Razorpay key_secret
    const expectedSignature = crypto
      .createHmac('sha256', razorpayInstance.key_secret)
      .update(body)
      .digest('hex');
    
    if (expectedSignature === signature) {
    console.log('playment was a successsssssssssssssssssssssssssssssssss')
    
      const paymentDetails = await razorpayInstance.payments.fetch(payment_id);
      const receivedAmount = paymentDetails.amount
      console.log('amount recivbed',receivedAmount)

      await Payment.create({
        userid: data.address.userid, // Assuming userid is passed correctly from the frontend
        status: 'succseed', // Mark as verified
        list:JSON.stringify(data.list),
        amount:receivedAmount/100,
        created_at: new Date(), // Current date
       
      });
      console.log('playment was a successsssssssssssssssssssssssssssssssss')
       const result = await createOrder2(data.list,data.address)

       if(result.status){

        res.status(201).json({
          status: true,
          message: "User created successfully",
           
           
        });
       }else{

        res.status(201).json({
          status: false,
          message: "failed to create order",
          
           
        });

       }



    
   

    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
});

app.post('/verify-payment3', upload.array('images', 5), async (req, res) => {
  const { payment_id, order_id, signature,userid } = req.body; // Received from frontend
  
  try {
    // Create the body string for verification: "order_id|payment_id"
    const body = order_id + "|" + payment_id;
    
    // Generate the expected signature using your Razorpay key_secret
    const expectedSignature = crypto
      .createHmac('sha256', razorpayInstance.key_secret)
      .update(body)
      .digest('hex');
    

      console.log('expected signature isssssssss',expectedSignature,signature);
    // Compare the expected signature with the received signature
    if (expectedSignature === signature) {
     
      await Payment.create({
        userid: userid, // Assuming userid is passed correctly from the frontend
        verified: false, // Mark as verified
        date: new Date(), // Current date
       
      });





      res.status(200).json({ success: true, message: 'Payment verified and logged successfully' });
   

    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error verifying payment');
  }
});

const { QueryTypes } = require('sequelize');

app.post('/dashboard-stats', async (req, res) => {
  try {
   
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastWeekISO = lastWeek.toISOString().slice(0, 19).replace('T', ' ');

    // Total users
    const totalUsers = await User.count();

    // Total orders
    const totalOrders = await singleOrder.count();

    // Total amount collected
    const totalAmountCollected = await Payment.sum('amount') || 0;

    // Total orders last week
    const totalOrdersLastWeek = await sequelize.query(
      `SELECT COUNT(*) AS count FROM singleorder WHERE created_at >= :lastWeek`,
      {
        replacements: { lastWeek: lastWeekISO },
        type: QueryTypes.SELECT,
      }
    );

    // Total amount collected last week
    const totalAmountLastWeek = await sequelize.query(
      `SELECT SUM(amount) AS total FROM payment WHERE created_at >= :lastWeek`,
      {
        replacements: { lastWeek: lastWeekISO },
        type: QueryTypes.SELECT,
      }
    );

    const dashboardStats = {
      totalUsers,
      totalOrders,
      totalAmount: totalAmountCollected,
      totalOrdersLastWeek: totalOrdersLastWeek[0]?.count || 0,
      totalAmountLastWeek: totalAmountLastWeek[0]?.total || 0,
    };

    res.json({data:dashboardStats});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching dashboard stats' });
  }
});


app.post('/search-suggest', async (req, res) => {
  const { query } = req.body;

  if (!query || query.trim() === '') {
    return res.status(400).json({ status: false, message: 'Query is required' });
  }

  try {
    const products = await  Product.findAll({
      where: sequelize.literal(`name LIKE '%${query}%'`),
      limit: 5
    });

    res.json({ status: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error fetching suggestions' });
  }
});


app.post(
  "/upload-banners",
  upload.fields([
    { name: "set1", maxCount: 5 },
    { name: "set2", maxCount: 5 },
    { name: "set3", maxCount: 5 },
  ]),
  (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ success: false, message: "No files uploaded" });
      }

      const desktopBanners = req.files.set1?.map((file) => file.path) || [];
      const tabletBanners = req.files.set2?.map((file) => file.path) || [];
      const mobileBanners = req.files.set3?.map((file) => file.path) || [];

      res.status(200).json({
        success: true,
        message: "Banners uploaded successfully",
        banners: {
          desktop: desktopBanners,
          tablet: tabletBanners,
          mobile: mobileBanners,
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);
