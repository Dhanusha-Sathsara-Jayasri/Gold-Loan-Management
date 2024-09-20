const express = require('express');
const router = express.Router();
const mortgageDeedController = require('../controllers/mortgageDeedController');

module.exports = function(upload) {
    router.post('/addMortgageDeed', upload.single('file'), mortgageDeedController.addMortgageDeed);

    return router;
};