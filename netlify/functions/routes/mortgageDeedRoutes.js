const express = require('express');
const router = express.Router();

module.exports = (upload) => {
    const mortgageDeedController = require('../controllers/mortgageDeedController');

    // Route to add a mortgage deed (with image file)
    router.post('/addMortgageDeed', upload.single('file'), mortgageDeedController.addMortgageDeed);

    return router;
};
