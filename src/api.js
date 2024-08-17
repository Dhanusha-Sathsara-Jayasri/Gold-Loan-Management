const express = require('express');
const mongoose = require('mongoose');
const serverless = require('serverless-http');

// Replace with your actual environment variables
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const router = express.Router();

app.use(express.json());

// Connect to MongoDB with improved error handling
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database Connected Successfully'))
  .catch(err => {
    console.error('Error connecting to database:', err);
    // Handle the error gracefully, e.g., retry or log it
  });

// Collections get here
const customers = require('../models/CustomerDetails'); // Assuming this file exists

// Optimize database queries and error handling
router.get('/test', async (req, res) => {
  try {
    // Assuming you need to fetch data from the database
    const data = await customers.find({}); // Replace with your actual query
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/register', async (req, res) => {
  const { name, whatsApp, NIC } = req.body;

  try {
    const oldCustomer = await customers.findOne({ NIC });
    if (oldCustomer) {
      return res.status(400).json({ message: 'Customer Already Registered' });
    }

    const newCustomer = new customers({ name, whatsApp, NIC });
    await newCustomer.save();
    res.status(201).json({ message: 'Customer Registered Successfully' });
  } catch (error) {
    console.error('Error registering customer:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
