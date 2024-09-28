const AdminData = require('../models/AdminDetails');
const customerInfomations = require('../models/CustomerDetails');
const customerMortgageDeedInformations = require('../models/mortgageDeedDetails');
const customerApplicantDetails = require('../models/ApplicantDetails');


const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = "test";


const adminDataController = {
    addAdminData: async (req, res) => {
        const { userType, fullName, NIC, userName, password } = req.body;

        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newAdminData = new AdminData({
                userType,
                fullName,
                NIC,
                userName,
                password: hashedPassword
            });

            await newAdminData.save();

            const token = jwt.sign({
                userType: newAdminData.userType,
                id: newAdminData._id
            }, JWT_SECRET, {
                expiresIn: '1h'
            });

            res.send({ status: 'success', token, data: newAdminData });

        } catch (error) {
            res.send({ status: "Error While Adding Admin Data", data: error });
        }
    },

    loginAdmin: async (req, res) => {
        const { userName, password } = req.body;

        try {
            const admin = await AdminData.findOne({ userName, activeStatus: true });
            if (!admin) {
                return res.status(401).send({ status: 'fail', message: 'Invalid credentials' });
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).send({ status: 'fail', message: 'Invalid credentials' });
            }

            const token = jwt.sign({
                id: admin._id,
                userType: admin.userType
            }, JWT_SECRET, {
                expiresIn: '1h'
            });

            res.send({ status: admin.userType, token, data: admin });

        } catch (error) {
            res.status(500).send({ status: "Error", message: 'Server error' });
        }
    },

    getApplicantDetails: async (req, res) => {
        let applications = [];
        let mortgageDeeds = [];
    
        try {
            // Fetching customer applicant details
            applications = await customerApplicantDetails
                .find({})
                .populate({
                    path: 'customerId',
                    model: customerInfomations,
                    select: 'name whatsApp NIC',
                })
                .exec();
        } catch (error) {
            return res.status(500).json({ status: "fail", message: "Error While Fetching Applications", data: error });
        }
    
        try {
            // Fetching customer mortgage deed informations
            mortgageDeeds = await customerMortgageDeedInformations
                .find({})
                .populate({
                    path: 'customerId',
                    model: customerInfomations,
                    select: 'institution branch startDate endDate contactNumber monthlyRate yearlyRate receiptNumber appraisedValue mortgageAmount rescueAmount imageUrl',
                })
                .exec();
        } catch (error) {
            return res.status(500).json({ status: "fail", message: "Error While Fetching Mortgage Deeds", data: error });
        }
    
        // Sending both data sets in a single response
        res.status(200).json({
            status: 'success',
            data: {
                applications,
                mortgageDeeds,
            },
        });
    }
    


};

module.exports = adminDataController;