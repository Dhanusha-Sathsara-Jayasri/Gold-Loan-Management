const express = require('express');
const router = express.Router();
// const Customer = require('../models/CustomerDetails');


const customerController = require('../controllers/customerController');
router.post('/create', customerController.addCustomer);

// Register Customer
// router.post('/register', async (req, res) => {
//   const { name, whatsApp, NIC } = req.body;

//   const oldCustomer = await Customer.findOne({ NIC: NIC });

//   if (oldCustomer) {
//     return res.send({ status: 'fail', data: "Customer Already Registered" });
//   }

//   try {
//     const newCustomer = new Customer({
//       name,
//       whatsApp,
//       NIC
//     });

//     const result = await newCustomer.save();

//     // res.send({
//     //   status: 'success',
//     //   data: "Customer Registered Successfully",
//     //   insertedId: newCustomer._id
//     // });

//     res.status(200).json({message:'done',result});

//   } catch (error) {
//     res.status(500).send({ status: "Error While Registering Customer", data: error });
//   }
// });

module.exports = router;