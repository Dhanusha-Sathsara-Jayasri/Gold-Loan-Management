const express = require('express');
const router = express.Router();
const MortgageDeedController = require('../controllers/mortgageDeedController');
const multer = require('multer');

// Setup Multer middleware for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200 * 1024 // 200KB file size limit
    }
});

router.post('/addMortgageDeed', (req, res, next) => {
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                status: 'error',
                message: 'File size too large. Maximum allowed size is 200KB.'
            });
        } else if (err) {
            return res.status(500).json({
                status: 'error',
                message: 'An error occurred while uploading the file.'
            });
        }
        // Proceed to the controller if no errors
        MortgageDeedController.addMortgageDeed(req, res);
    });
});


module.exports = router;