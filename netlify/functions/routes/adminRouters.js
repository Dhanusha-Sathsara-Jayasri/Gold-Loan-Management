const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
// const JWt= require("../middleware/verifyToken");

router.post('/apply', adminController.addAdminData);
router.post('/search', adminController.loginAdmin); 

router.post('/getApplicantDetails', adminController.getApplicantDetails);

module.exports = router;