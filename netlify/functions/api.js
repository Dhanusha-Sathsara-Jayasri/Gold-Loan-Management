// Server starts here
const express = require('express');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const mongoose = require('mongoose');

const router = express.Router();
const app = express();
app.use(bodyParser.json());

// Database connection starts here
router.use(express.json());
mongoose
  .connect('mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Database Connected Successfully");
  });


  const customers = require('./models/CustomerDetails.js');

// Requests send here
router.get('/test', async (req, res) => {
  const test = {
    name: "kk done !",
  };

  res.send(test);
});

router.post('/register', async (req, res) => {
    const { name, whatsApp, NIC } = req.body

    const oldCustomer = await customers.findOne({ NIC:NIC});

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
})

app.use('/api/', router);
module.exports.handler = serverless(app);
