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
const marketValueRoutes = require('./routes/marketValueRoutes');
const applicantRoutes = require('./routes/applicantRoutes');

// Server starts here
const router = express.Router();

// Define routes
router.use('/api/customerRegister', customerRoutes);
router.use('/api/', marketValueRoutes);
router.use('/api/', applicantRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World');
});

app.use('/api/', router);
module.exports.handler = serverless(app);