const express = require('express');
const router = express.Router();
const ApplicantDetails = require('../models/ApplicantDetails');

router.post('/ApplicantDetails', async (req, res) => {
  const { customerId, applicantDetails } = req.body;
  const { phoneNumber, addressLine1, addressLine2, divisionalSecretariatDivision, district, gender, maritalStatus } = applicantDetails[0];

  try {
    await ApplicantDetails.create({
      customerId,
      applicantDetails: [{
        phoneNumber,
        addressLine1,
        addressLine2,
        divisionalSecretariatDivision,
        district,
        gender,
        maritalStatus
      }]
    });

    res.status(200).send({ status: 'success', data: "Customer ApplicantDetails Inserted Successfully" });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Error while inserting Customer ApplicantDetails", error: error.message });
  }
});

module.exports = router;