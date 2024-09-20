const mortgageDeedModel = require('../models/mortgageDeedDetails');
const sharp = require('sharp'); // Import Sharp for image compression

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount } = req.body;
        const imageFile = req.file; // Access the uploaded image from Multer

        try {
            let compressedImage = null;
            if (imageFile) {
                // Compress the image using Sharp
                compressedImage = await sharp(imageFile.buffer)
                    .resize({ width: 1024 }) // Resize image to max width of 1024px while maintaining aspect ratio
                    .jpeg({ quality: 80 })   // Compress to JPEG with 80% quality
                    .toBuffer();             // Convert back to buffer

                // Convert the compressed image to base64 for storage in MongoDB (if needed)
                const imageUrl = compressedImage.toString('base64');
            }

            // Create a new Mortgage Deed document with the provided form data and the compressed image
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
                imageUrl: compressedImage ? compressedImage.toString('base64') : null // Save the base64 string of the compressed image
            });

            // Save the document to the database
            await newMortgageDeed.save();

            // Respond with success
            res.send({ status: 'success', data: 'Mortgage Deed Added Successfully' });
        } catch (error) {
            // Handle errors
            res.send({ status: 'Error While Adding Mortgage Deed', data: error.message });
        }
    }
};

module.exports = mortgageDeedController;