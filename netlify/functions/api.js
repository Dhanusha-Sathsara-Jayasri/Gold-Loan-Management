const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Use Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Database connection
const url = 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
let gfs;
connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'uploads' });
});

// Set up GridFS storage for file uploads
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads', // Name of the GridFS bucket
    };
  },
});

const upload = multer({ storage }); // This is the multer instance

// Importing routes
const customerRoutes = require('./routes/customerRoutes');
const mortgageDeedRoutes = require('./routes/mortgageDeedRoutes')(upload); // Call the route as a function and pass 'upload'

app.use('/api/customers', customerRoutes); // Customer routes
app.use('/api/mortgageDeed', mortgageDeedRoutes); // Mortgage routes with file upload

app.get('/test', (req, res) => {
  res.send('Hello World');
});

module.exports.handler = serverless(app);
