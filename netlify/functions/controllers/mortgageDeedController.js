const mongoose = require('mongoose');
const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { customerId, applicantDetailsId, mortgageDeed } = req.body;
        console.log(req.body);

        if (!Array.isArray(mortgageDeed)) {
            return res.status(400).json({ status: "fail", message: "Mortgage Deed details must be an array" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(applicantDetailsId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Applicant Details ID" });
        }

        try {
            const newMortgageDeed = new mortgageDeedModel({
                customerId,
                applicantDetailsId,
                mortgageDeed
            });

            const result = await newMortgageDeed.save();
            res.status(200).json({ status: 'success', data: "Mortgage Deed Added Successfully", result });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Adding Mortgage Deed", data: error });
        }
    }
};

module.exports = mortgageDeedController;