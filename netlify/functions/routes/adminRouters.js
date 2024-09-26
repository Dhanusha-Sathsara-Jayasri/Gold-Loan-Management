const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const JWt= require("../middleware/verifyToken");

router.post('/apply', adminController.addAdminData);
router.post('/search', JWt,adminController.loginAdmin); 

module.exports = router;