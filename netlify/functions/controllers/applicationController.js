const applicationModel = require('../models/ApplicantDetails');

const applicationController = {
    addApplication: async (req, res) => {
        const { customerId, applicantDetails } = req.body;

        if (!Array.isArray(applicantDetails)) {
            return res.status(400).json({ status: "fail", message: "Applicant Details must be an array" });
        }

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