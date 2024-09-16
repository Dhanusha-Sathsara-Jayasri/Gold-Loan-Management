const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the path to store uploaded files
        const uploadPath = path.join(__dirname, '..', 'uploads'); // Adjust as necessary

        // Check if 'uploads' directory exists, if not, create it
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });  // Create directory if not exists
        }

        cb(null, uploadPath); // Store files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        // Rename the file with a timestamp to avoid name collisions
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Import the controller
const MortgageDeedController = require('../controllers/mortgageDeedController');

// Define the route for adding mortgage deeds with image upload
router.post('/addMortgageDeed', upload.single('image'), MortgageDeedController.addMortgageDeed);

module.exports = router;