const express = require('express');
const router = express.Router();

const mortgageDeedController = require('../controllers/mortgageDeedController');

// Route to upload mortgage deed details
router.post('/addMortgageDeed', mortgageDeedController.addMortgageDeed);

// Route to get the uploaded image by filename
router.get('/image/:filename', mortgageDeedController.getImage);

module.exports = router;