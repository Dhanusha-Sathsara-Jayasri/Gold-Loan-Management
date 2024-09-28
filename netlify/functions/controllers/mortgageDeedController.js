const mongoose = require('mongoose');
const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { customerId, mortgageDeed } = req.body;
        console.log(req.body);

        if (!Array.isArray(mortgageDeed)) {
            return res.status(400).json({ status: "fail", message: "Mortgage Deed details must be an array" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        for (let deed of mortgageDeed) {
            const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount } = deed;

            if (!institution || !branch || !startDate || !endDate || !receiptNumber || !appraisedValue || !mortgageAmount || !rescueAmount || !contactNumber) {
                return res.status(400).json({ status: "fail", message: "All mortgage deed fields are required" });
            }

        }

        try {
            const newMortgageDeed = new mortgageDeedModel({
                customerId,
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