// const mortgageDeedModel = require('../models/mortgageDeedDetails');

// const mortgageDeedController = {
//     addMortgageDeed: async (req, res) => {
//         const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount, imageUrl } = req.body;

//         try {
//             const newMortgageDeed = new mortgageDeedModel({
//                 institution,
//                 branch,
//                 startDate,
//                 endDate,
//                 contactNumber,
//                 monthlyRate,
//                 yearlyRate,
//                 receiptNumber,
//                 appraisedValue,
//                 mortgageAmount,
//                 rescueAmount,
//                 imageUrl
//             });
//             await newMortgageDeed.save();
//             // res.send({ status: 'success', data: "Mortgage Deed Added Successfully", insertedId: newMortgageDeed._id });
//             res.send({ status: 'success', data: "Mortgage Deed Added Successfully"});
//         } catch (error) {
//             res.send({ status: "Error While Adding Mortgage Deed", data: error });
//         }
//     }
// };

// module.exports = mortgageDeedController;

const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount, imageUrl } = req.body;

        // Check for missing required fields (400 Bad Request)
        if (!institution || !branch || !startDate || !endDate || !contactNumber || !monthlyRate || !yearlyRate || !receiptNumber || !appraisedValue || !mortgageAmount || !rescueAmount || !imageUrl) {
            return res.status(400).send({
                status: 'error',
                message: 'Missing required fields. Please fill in all the required fields.',
            });
        }

        try {
            // Create a new mortgage deed entry
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

            await newMortgageDeed.save(); // Save to the database

            // Return a success response (201 Created)
            return res.status(201).send({
                status: 'success',
                message: 'Mortgage Deed Added Successfully',
            });

        } catch (error) {
            // Log the error (optional)
            console.error('Error while adding mortgage deed:', error);

            // Return a 500 Internal Server Error response
            return res.status(500).send({
                status: 'error',
                message: 'An error occurred while adding the mortgage deed. Please try again later.',
                error: error.message,
            });
        }
    }
};

module.exports = mortgageDeedController;