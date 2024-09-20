const express = require('express');
const serverless = require('serverless-http');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const busboy = require('busboy'); // Add busboy for multipart form parsing
const path = require('path'); // For handling file paths (optional)

const app = express();

// Use Middleware
app.use(cors);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Database connection starts here
const url = 'mongodb+srv://admin:admin@cluster0.gzqwq.mongodb.net/Gold-Loan-Management?retryWrites=true&w=majority&appName=Cluster0';

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
router.use('/customers', customerRoutes);
router.use('/application', applicantRoutes);
router.use('/mortgageDeed', mortgageDeedRoutes);
router.use('/posts', postRoutes);
router.use('/api/', marketValueRoutes);

router.get('/test', (req, res) => {
  res.send('Hello World');
});

// Busboy Upload Handler
router.post('/upload', (req, res) => {
  // Parse the incoming request using busboy
  const bb = busboy({ headers: req.headers });
  const fields = { image: [] };

  bb.on('file', (name, file, info) => {
    const { filename, mimeType } = info;
    let fileBuffer = [];

    file.on('data', (data) => {
      fileBuffer.push(data); // Collect the file data in chunks
    });

    file.on('end', () => {
      fields[name].push({
        filename,
        type: mimeType,
        content: Buffer.concat(fileBuffer), // Combine all the chunks
      });
    });
  });

  bb.on('close', () => {
    // Once the upload is complete, handle the file or save it somewhere
    const image = fields.image[0];

    // Here you can save the image to a database or file system
    // For now, we'll just send a response back
    res.status(200).json({ message: 'Image uploaded successfully', image });
  });

  req.pipe(bb); // Pipe the request into busboy for parsing
});

// Use the router
app.use('/api/', router);

module.exports.handler = serverless(app);