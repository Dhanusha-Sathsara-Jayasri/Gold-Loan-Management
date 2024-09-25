const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser'); 

const app = express();

// Use Middleware
app.use(cors);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database connection starts here
const mongoose = require('mongoose');
const url = 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0'
//const url = 'mongodb+srv://intelmdb3gold:P6lJGy1cv64bl7Tf@gold-loans.bs6xu.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Gold-Loans'

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Database Connection Failed", error);
  });

// Routes
const customerRoutes = require('./routes/customerRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const mortgageDeedRoutes = require('./routes/mortgageDeedRoutes');
const adminRouters = require('./routes/adminRouters');
const postRoutes = require('./routes/postRoutes'); 
const marketValueRoutes = require('./routes/marketValueRoutes');

// Server starts here
const router = express.Router();

// Define routes
router.use('/customers', customerRoutes);
router.use('/application', applicantRoutes);
router.use('/mortgageDeed', mortgageDeedRoutes);
router.use('/admins', adminRouters);
router.use('/posts', postRoutes); 
router.use('/api/', marketValueRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World');
});

router.get('/test2', (req, res) => {
  res.send('Hello World');
});

app.use('/api/', router);
module.exports.handler = serverless(app);