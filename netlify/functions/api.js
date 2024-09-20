const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
// const bodyParser = require('./middleware/bodyParser');
const bodyParser = require('body-parser'); 

const app = express();

// Use Middleware
app.use(cors);
// app.use(bodyParser);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

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
const marketValueRoutes = require('./routes/marketValueRoutes');
const postRoutes = require('./routes/postRoutes'); 

// Server starts here
const router = express.Router();

// Define routes
router.use('/register', customerRoutes);
router.use('/application', applicantRoutes);
router.use('/mortgageDeed', mortgageDeedRoutes);
router.use('/posts', postRoutes); 
router.use('/api/', marketValueRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World');
});

app.use('/api/', router);
module.exports.handler = serverless(app);