const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');
router.post('/create', customerController.addCustomer);

const searchCustomerController = require('../controllers/searchCustomerConroller');
router.post('/search', searchCustomerController.searchCustomer);
module.exports = router;