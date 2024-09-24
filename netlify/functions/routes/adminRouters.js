const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/apply', adminController.addAdminData);
router.post('/search', adminController.loginAdmin); 

module.exports = router;