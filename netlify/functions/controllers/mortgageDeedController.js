const mongoose = require('mongoose');
const mortgageDeedModel = require('../models/mortgageDeedDetails');

const mortgageDeedController = {
    addMortgageDeed: async (req, res) => {
        const { customerId, customerApplicantDetailsId, mortgageDeed } = req.body;

        if (!Array.isArray(mortgageDeed)) {
            return res.status(400).json({ status: "fail", message: "Mortgage Deed details must be an array" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
        }

        if (!mongoose.Types.ObjectId.isValid(customerApplicantDetailsId)) {
            return res.status(400).json({ status: "fail", message: "Invalid Applicant Details ID" });
        }

        try {
            const newMortgageDeed = new mortgageDeedModel({
                customerId,
                customerApplicantDetailsId,
                mortgageDeed
            });

            const result = await newMortgageDeed.save();
            res.status(200).json({ status: 'success', data: "Mortgage Deed Added Successfully", result });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Adding Mortgage Deed", data: error });
        }
    },

    // getMortgageDeed: async (req, res) => {
    //     const { customerId/* , customerApplicantDetailsId  */} = req.body;
    //     if (!mongoose.Types.ObjectId.isValid(customerId)) {
    //         return res.status(400).json({ status: "fail", message: "Invalid Customer ID" });
    //     }
    //    /*  if (!mongoose.Types.ObjectId.isValid(customerApplicantDetailsId)) {
    //         return res.status(400).json({ status: "fail", message: "Invalid Applicant Details ID" });
    //     } */
    //     try {
    //         const query = { customerId/* , customerApplicantDetailsId  */};
    //         const mortgageDeed = await mortgageDeedModel.findOne(query);
    //         if (mortgageDeed) {
    //             res.status(200).json({ status: 'success', data: mortgageDeed });
    //         } else {
    //             res.status(200).json({ status: 'fail', data: "Mortgage Deed Not Found" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ status: "fail", message: "Error While Fetching Mortgage Deed", data: error });
    //     }
    // }
};

module.exports = mortgageDeedController;