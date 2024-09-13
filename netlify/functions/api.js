const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
const bodyParser = require('./middleware/bodyParser');

const app = express();

// Use Middleware
app.use(cors);
app.use(bodyParser);

// Database connection starts here
const mongoose = require('mongoose');
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

// Routes
const customerRoutes = require('./routes/customerRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const mortgageDeedRoutes = require('./routes/mortgageDeedRoutes');
const marketValueRoutes = require('./routes/marketValueRoutes');

// Server starts here
const router = express.Router();

// Define routes
router.use('/register', customerRoutes);
router.use('/application', applicantRoutes);
router.use('/mortgageDeed', mortgageDeedRoutes);
router.use('/api/', marketValueRoutes);


router.get('/test', (req, res) => {
  res.send('Hello World');
});

app.use('/api/', router);
module.exports.handler = serverless(app);