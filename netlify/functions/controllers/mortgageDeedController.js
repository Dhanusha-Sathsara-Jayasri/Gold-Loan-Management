const mortgageDeedModel = require('../models/mortgageDeedDetails');
const path = require('path');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {

        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount } = req.body;
        const image = req.file;

        if (!institution || !branch || !startDate || !endDate || !contactNumber || !monthlyRate || !yearlyRate || !receiptNumber || !appraisedValue || !mortgageAmount || !rescueAmount || !image) {
            return res.status(400).send({
                status: 'error',
                message: 'Missing required fields. Please fill in all the required fields.',
            });
        }

        console.log("S image :",image);
        console.log("S institution :",institution);

        try {
            console.log("1");

            const imageUrl = path.join('uploads/', image.filename);

            console.log("2");

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

            console.log("3");

            await newMortgageDeed.save();

            console.log("4");

            return res.status(201).send({
                status: 'success',
                message: 'Mortgage Deed Added Successfully',
                data: newMortgageDeed,
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