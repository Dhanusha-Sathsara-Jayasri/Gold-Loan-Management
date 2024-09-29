const express = require('express');
const router = express.Router();

const MortgageDeedController = require('../controllers/mortgageDeedController');
router.post('/addMortgageDeed', MortgageDeedController.addMortgageDeed);
module.exports = router;