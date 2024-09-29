const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicationController');
router.post('/insert', applicantController.addApplication);
router.post('/getApplicant', applicantController.getApplication);
module.exports = router; 