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


//Image Upload Part
// Import necessary modules
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure that the 'applicationsImg' directory exists
const uploadDir = 'applicationsImg';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Define file storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Set upload directory to 'applicationsImg'
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using the current timestamp and file extension
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    }
});

// Define a file filter to allow only specific file types (e.g., JPEG, PNG)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false); // Reject the file
    }
};

// Set file size limit (e.g., 5MB)
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    },
    fileFilter
});

// Define the POST route for image uploads
router.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // Handle Multer errors (e.g., file too large)
            return res.status(400).json({ error: err.message });
        } else if (err) {
            // Handle other errors (e.g., invalid file type)
            return res.status(400).json({ error: err.message });
        }

        // If the file is successfully uploaded
        if (req.file) {
            res.json({ filename: req.file.filename });
        } else {
            // If no file was uploaded
            res.status(400).json({ error: 'No file uploaded.' });
        }
    });
});
//Image Upload Part


//Models gets here
const customers = require('./models/CustomerDetails.js');
const MarketValue = require('./models/addMarketValues.js');
const ApplicantDetails = require('./models/ApplicantDetails.js');


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

    const newCustomer = await customers.create({
      name: name,
      whatsApp: whatsApp,
      NIC: NIC
    });
    
    res.send({ status: 'success', data: "Customer Registered Successfully", insertedId: newCustomer._id });
    
  } catch (error) {
    res.send({ status: "Error While Registering Customer", data: error });
  }

});

router.post('/ApplicantDetails', async (req, res) => {
  
  const { customerId, applicantDetails } = req.body;  
  
  const { phoneNumber, addressLine1, addressLine2, divisionalSecretariatDivision, district, gender, maritalStatus } = applicantDetails[0];
  
  
  try {
    await ApplicantDetails.create({
      customerId: customerId,  
      applicantDetails: [{     
        phoneNumber: phoneNumber,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        divisionalSecretariatDivision: divisionalSecretariatDivision,
        district: district,
        gender: gender,
        maritalStatus: maritalStatus
      }]
    });
    
    res.status(200).send({ status: 'success', data: "Customer ApplicantDetails Inserted Successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error while inserting Customer ApplicantDetails", error: error.message });
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