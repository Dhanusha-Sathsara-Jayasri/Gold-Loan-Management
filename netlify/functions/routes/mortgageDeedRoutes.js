const express = require('express');
const router = express.Router();

const MortgageDeedController = require('../controllers/mortgageDeedController');
router.post('/addMortgageDeed', MortgageDeedController.addMortgageDeed);
router.post('/getMortgageDeed', MortgageDeedController.getMortgageDeed);
module.exports = router;