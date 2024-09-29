const mongoose = require('mongoose');
const customerApplicantDetails = require('../models/ApplicantDetails');
const customerInfomations = require('../models/CustomerDetails');

const applicationController = {
    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;

        console.log("test");

        // Check if customerId is provided
        if (!customerId) {
            return res.status(400).json({ status: "fail", message: "Customer ID is required" });
        }

        // Validate customerId as an ObjectId
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        // Validate that applicantDetails is a non-empty array
        if (!Array.isArray(applicantDetails) || applicantDetails.length === 0) {
            return res.status(400).json({ status: "fail", message: "Applicant Details must be a non-empty array" });
        }

        try {
            // Validate and construct the applicant details array
            const validatedApplicants = [];
            for (let applicant of applicantDetails) {
                const { phoneNumber, addressLine1, addressLine2, divisionalSecretariatDivision, district, gender, maritalStatus } = applicant;

                // Validate phone number
                if (phoneNumber.length !== 10 || isNaN(phoneNumber)) {
                    return res.status(400).json({ status: "fail", message: "Invalid Phone Number, it must be exactly 10 digits" });
                }

                const validGenders = ['Male', 'Female'];
                const validMaritalStatuses = ['Married', 'Unmarried'];

                // Validate gender
                if (!validGenders.includes(gender)) {
                    return res.status(400).json({ status: "fail", message: `Invalid Gender. Must be one of ${validGenders.join(', ')}` });
                }

                // Validate marital status
                if (!validMaritalStatuses.includes(maritalStatus)) {
                    return res.status(400).json({ status: "fail", message: `Invalid Marital Status. Must be one of ${validMaritalStatuses.join(', ')}` });
                }

                // Add the validated applicant detail
                validatedApplicants.push({
                    phoneNumber,
                    addressLine1,
                    addressLine2,
                    divisionalSecretariatDivision,
                    district,
                    gender,
                    maritalStatus
                });
            }

            // Create the new application, including the customerId and all applicantDetails
            const newApplication = new customerApplicantDetails({
                customerId,
                applicantDetails: validatedApplicants
            });

            // Save the new application document
            const result = await newApplication.save();
            res.status(200).json({ status: 'success', data: result, insertedId: newApplication._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "fail", message: "Error while registering application", data: error });
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