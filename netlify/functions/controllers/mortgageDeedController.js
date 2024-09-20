const mortgageDeedModel = require('../models/mortgageDeedDetails');
const mongoose = require('mongoose');

// Controller to handle adding a mortgage deed
const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const {
            institution, branch, startDate, endDate, contactNumber, 
            monthlyRate, yearlyRate, receiptNumber, appraisedValue, 
            mortgageAmount, rescueAmount
        } = req.body;

        try {
            // Ensure the file has been uploaded
            if (!req.file) {
                return res.status(400).send({ status: 'fail', message: 'No image file provided' });
            }

            // Create new mortgage deed object with the GridFS file reference (file._id)
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
                imageFileId: mongoose.Types.ObjectId(req.file.id) // Ensuring the file ID is valid
            });

            // Save the new mortgage deed in MongoDB
            await newMortgageDeed.save();

            // Send a success response
            return res.status(201).send({ 
                status: 'success', 
                message: "Mortgage Deed added successfully", 
                insertedId: newMortgageDeed._id 
            });
        } catch (error) {
            console.error('Error while adding mortgage deed:', error);
            return res.status(500).send({ 
                status: 'error', 
                message: 'Error while adding mortgage deed', 
                error: error.message 
            });
        }
    }
};

module.exports = mortgageDeedController;