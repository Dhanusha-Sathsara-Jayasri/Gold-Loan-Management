const express = require('express');
const router = express.Router();
const mortgageDeedController = require('../controllers/mortgageDeedController');
const upload = require('../api').upload;

router.post('/addMortgageDeed', upload.single('file'), mortgageDeedController.addMortgageDeed);

module.exports = router;