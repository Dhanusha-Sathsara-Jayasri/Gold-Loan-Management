const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount, imageUrl } = req.body;

        if (!institution || !branch || !startDate || !endDate || !contactNumber || !monthlyRate || !yearlyRate || !receiptNumber || !appraisedValue || !mortgageAmount || !rescueAmount || !imageUrl) {
            return res.status(400).send({
                status: 'error',
                message: 'Missing required fields. Please fill in all the required fields.',
            });
        }

        try {
            const newMortgageDeed = new mortgageDeedModel({
                institution,
                branch,
                startDate,
                endDate,
                contactNumber,
                monthlyRate,
                yearlyRate,
                receiptNumber,
                appraisedValue,
                mortgageAmount,
                rescueAmount,
                imageUrl,
            });

            await newMortgageDeed.save(); 

            return res.status(201).send({
                status: 'success',
                message: 'Mortgage Deed Added Successfully',
            });

        } catch (error) {
            console.error('Error while adding mortgage deed:', error);

            return res.status(500).send({
                status: 'error',
                message: 'An error occurred while adding the mortgage deed. Please try again later.',
                error: error.message,
            });
        }
    }
};

module.exports = mortgageDeedController;