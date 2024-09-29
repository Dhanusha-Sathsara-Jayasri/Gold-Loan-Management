const mongoose = require('mongoose');
const customerApplicantDetails = require('../models/ApplicantDetails');
const customerInfomations = require('../models/CustomerDetails');

const applicationController = {

    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;

        if (!customerId) {
            return res.status(400).json({ status: "fail", message: "Customer ID is required" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        if (!Array.isArray(applicantDetails) || applicantDetails.length === 0) {
            return res.status(400).json({ status: "fail", message: "Applicant Details must be a non-empty array" });
        }

        try {
            const validatedApplicants = [];
            for (let applicant of applicantDetails) {
                const { phoneNumber, addressLine1, addressLine2, divisionalSecretariatDivision, district, gender, maritalStatus } = applicant;

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

            const newApplication = new customerApplicantDetails({
                customerId,
                applicantDetails: validatedApplicants
            });

            const result = await newApplication.save();
            res.status(200).json({ status: 'success', data: result, insertedId: newApplication._id });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: "fail", message: "Error while registering application", data: error });
        }
    },

    getApplication: async (req, res) => {
        const { NIC, whatsApp } = req.body;
    
        try {
            const query = {};
            if (NIC) {
                query.NIC = NIC;
            }
            if (whatsApp) {
                query.whatsApp = whatsApp;
            }
    
            const customer = await customerModel.findOne(query);
    
            if (customer) {
                const applications = await customerApplicantDetails
                    .find({ customerId: customer._id }) 
                    .populate({
                        path: 'customerId',
                        model: customerInfomations,
                        select: 'name whatsApp NIC',
                    })
                    .exec();
    
                res.status(200).json({ status: 'success', data: applications });
            } else {
                res.status(404).json({ status: 'fail', data: "Customer Not Found" });
            }
        } catch (error) {
            console.log(error);
        }
    },
    
};

module.exports = applicationController;