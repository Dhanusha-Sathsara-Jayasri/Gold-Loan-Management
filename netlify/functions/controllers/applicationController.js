const mongoose = require('mongoose');
const applicationModel = require('../models/ApplicantDetails');

const applicationController = {
    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;

        if (!Array.isArray(applicantDetails)) {
            return res.status(400).json({ status: "fail", message: "Applicant Details must be an array" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        for (let applicant of applicantDetails) {
            const { phoneNumber, gender, maritalStatus } = applicant;

            if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
                return res.status(400).json({ status: "fail", message: "Invalid Phone Number, it must be exactly 10 digits" });
            }

            const validGenders = ['Male', 'Female'];
            const validMaritalStatuses = ['Married', 'Unmarried'];

            if (!validGenders.includes(gender)) {
                return res.status(400).json({ status: "fail", message: `Invalid Gender. Must be one of ${validGenders.join(', ')}` });
            }

            if (!validMaritalStatuses.includes(maritalStatus)) {
                return res.status(400).json({ status: "fail", message: `Invalid Marital Status. Must be one of ${validMaritalStatuses.join(', ')}` });
            }
        }

        try {
            const newApplication = new applicationModel({
                customerId,
                applicantDetails
            });

            const result = await newApplication.save();
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Registering Application", data: error });
        }
    }
};

module.exports = applicationController;