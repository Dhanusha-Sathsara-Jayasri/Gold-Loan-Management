const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

// Use Middleware
const app = express();
app.use(cors);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Database connection
const url = 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0';
const connection = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'uploads' });
});

// Set up GridFS storage for file uploads
const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return {
      filename: file.originalname, // You can customize this
      bucketName: 'uploads', // Name of the GridFS bucket
    };
  },
});

const upload = multer({ storage });

// Importing routes
const customerRoutes = require('./routes/customerRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const mortgageDeedRoutes = require('./routes/mortgageDeedRoutes')(upload); // Pass 'upload' to mortgageDeedRoutes
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

// Export app handler with serverless
module.exports.handler = serverless(app);

// Export upload for use in routes
module.exports.upload = upload;