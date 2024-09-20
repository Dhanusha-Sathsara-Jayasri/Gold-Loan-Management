const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        // Destructure form fields from req.body
        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount } = req.body;
        
        // Access the uploaded image from req.file
        const imageFile = req.file; // req.file is populated by multer if the image was uploaded
        
        try {
            // Process the image if it exists
            let imageUrl = null;
            if (imageFile) {
                // Convert the image to base64 if you want to store it in MongoDB
                imageUrl = imageFile.buffer.toString('base64');
            }

            // Create a new Mortgage Deed document with the provided form data and image URL
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
                imageUrl // Save the base64 image string or file reference here
            });

            // Save the new document to the database
            await newMortgageDeed.save();

            // Send a success response
            res.send({ status: 'success', data: 'Mortgage Deed Added Successfully' });
        } catch (error) {
            // Handle any errors during saving
            res.send({ status: 'Error While Adding Mortgage Deed', data: error.message });
        }
    }
};

module.exports = mortgageDeedController;