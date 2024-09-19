const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');

const app = express();

// Use Middleware
app.use(cors());  // Call cors as a function
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Database connection starts here
//const url = 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0'
const url = 'mongodb+srv://intelmdb3gold:P6lJGy1cv64bl7Tf@gold-loans.bs6xu.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Gold-Loans'

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

let gfs;
const conn = mongoose.connection;

conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('photos'); // Set GridFS collection name
});

// Routes for media retrieval
app.get('/file/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    if (!file) return res.status(404).send('File not found');
    
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).send('Server error');
  }
});

// Routes for other functionalities
const customerRoutes = require('./routes/customerRoutes');
const applicantRoutes = require('./routes/applicantRoutes');
const mortgageDeedRoutes = require('./routes/mortgageDeedRoutes');
const marketValueRoutes = require('./routes/marketValueRoutes');
const uploadImgRoutes = require('./routes/postRoutes');

const router = express.Router();

// Define routes
router.use('/register', customerRoutes);
router.use('/application', applicantRoutes);
router.use('/mortgageDeed', mortgageDeedRoutes);
router.use('/file', uploadImgRoutes); 
router.use('/api/', marketValueRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World');
});

app.use('/api/', router);
module.exports.handler = serverless(app);
