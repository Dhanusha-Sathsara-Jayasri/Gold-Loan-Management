const applicationModel = require('../models/ApplicantDetails');

const applicationController = {
    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;
        try {
            const newApplication = new applicationModel({
                customerId,
                applicantDetails
            });

            const result = await newApplication.save();
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(500).json({ status: "fail", message: "Error While Registering Application", data: error });
        }
    }
};

module.exports = applicationController;