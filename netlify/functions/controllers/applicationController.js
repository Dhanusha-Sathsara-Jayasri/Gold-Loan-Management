const mongoose = require('mongoose');
const customerApplicantDetails = require('../models/AdminDetails');
const customerInfomations = require('../models/CustomerDetails');

const applicationController = {
    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;

        // Validate applicantDetails is an array
        if (!Array.isArray(applicantDetails)) {
            return res.status(400).json({ status: "fail", message: "Applicant Details must be an array" });
        }

        // Validate customerId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        // Validate each applicant detail
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
            // Create a new application
            const newApplication = new customerApplicantDetails({
                customerId,
                applicantDetails
            });

            const result = await newApplication.save();
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Registering Application", data: error });
        }
    },

    getApplications: async (req, res) => {
        try {
            const applications = await customerApplicantDetails
                .find({})
                .populate({
                    path: 'customerId',
                    model: customerInfomations,
                    select: 'name whatsApp NIC',
                })
                .exec();

            res.status(200).json({ status: 'success', data: applications });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Fetching Applications", data: error });
        }
    },
};

module.exports = applicationController;