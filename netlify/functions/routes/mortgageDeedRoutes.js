const express = require('express');
const router = express.Router();
const MortgageDeedController = require('../controllers/mortgageDeedController');
const multer = require('multer');

// Setup Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Apply 'upload.single' middleware to handle file uploads for the route
router.post('/addMortgageDeed', upload.single('image'), MortgageDeedController.addMortgageDeed);

module.exports = router;