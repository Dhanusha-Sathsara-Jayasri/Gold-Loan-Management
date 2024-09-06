// Server starts here
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');

const router = express.Router();
const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware for parsing JSON requests
app.use(bodyParser.json());


// Database connection starts here
mongoose
  .connect('mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
  });


//Models gets here
const customers = require('./models/CustomerDetails.js');
const MarketValue = require('./models/addMarketValues.js');

// Routers 
router.post('/addMarketValues', async (req, res) => {
  try {
    const { carats, date } = req.body;

    // Basic validation to check if required fields are present
    if (!carats || !date) {
      return res.status(400).send({ status: 'error', message: 'Carats and date are required.' });
    }

    // Create new market value document
    const marketValue = await MarketValue.create({
      carats,
      date
    });

    // Send success response
    res.send({ status: 'success', data: marketValue });

  } catch (error) {
    // Send error response
    res.status(500).send({ status: 'error', message: 'Something went wrong.', error: error.message });
  }
});


router.post('/register', async (req, res) => {
  const { name, whatsApp, NIC } = req.body
  
  const oldCustomer = await customers.findOne({ NIC: NIC });
  
  if (oldCustomer) {
    return res.send({ status: 'fail', data: "Customer Already Registered" });
  }
  
  try {
    await customers.create({
      name: name,
      whatsApp: whatsApp,
      NIC: NIC
    });
    
    res.send({ status: 'success', data: "Customer Registered Successfully" });
    
  } catch (error) {
    res.send({ status: "Error While Registering Customer", data: error });
  }

});

router.get('/test', async (req, res) => {
  const test = {
    name: "kk done !",
  };

  res.send(test);
});

router.get('/test3', async (req, res) => {
  const test = {
    name: "kk test3 get done !",
  };

  res.send(test);
});

router.post('/test3', async (req, res) => {
  const test = {
    name: "kk test3 post done !",
  };

  res.send(test);
});

app.use('/api/', router);
module.exports.handler = serverless(app);
