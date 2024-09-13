const mortgageDeedModel = require('../models/MortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { institution, branch, startDate, endDate, contactNumber, monthlyRate, yearlyRate, receiptNumber, appraisedValue, mortgageAmount, rescueAmount, imageUrl } = req.body;

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
                imageUrl
            });
            await newMortgageDeed.save();
            // res.send({ status: 'success', data: "Mortgage Deed Added Successfully", insertedId: newMortgageDeed._id });
            res.send({ status: 'success', data: "Mortgage Deed Added Successfully"});
        } catch (error) {
            res.send({ status: "Error While Adding Mortgage Deed", data: error });
        }
    }
};

module.exports = mortgageDeedController;