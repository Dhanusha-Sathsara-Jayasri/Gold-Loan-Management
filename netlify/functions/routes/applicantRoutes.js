const express = require('express');
const router = express.Router();
const applicantController = require('../controllers/applicationController');
router.post('/insert', applicantController.addApplication);
router.post('/getApplicants', applicantController.getApplications);
module.exports = router; 