const AdminData = require('../models/AdminDetails');
const customerInfomations = require('../models/CustomerDetails');
const customerMortgageDeedInformations = require('../models/mortgageDeedDetails');
const customerApplicantDetails = require('../models/ApplicantDetails');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || "test";

const adminDataController = {
    addAdminData: async (req, res) => {
        const { userType, fullName, NIC, userName, password } = req.body;

        try {
            const existingAdmin = await AdminData.findOne({ userName });
            if (existingAdmin) {
                return res.status(400).json({ status: 'fail', message: 'Username already exists' });
            }

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

            const token = jwt.sign(
                { userType: newAdminData.userType, id: newAdminData._id },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(201).send({ status: 'success', token, data: newAdminData });

        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Error while adding admin data', error });
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

            const token = jwt.sign(
                { id: admin._id, userType: admin.userType },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.send({ status: admin.userType, token, data: admin });

        } catch (error) {
            res.status(500).send({ status: 'error', message: 'Server error', error });
        }
    },

    getApplicantDetails: async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1]; 
        console.log(token);

        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
            }

            const mortgageDeeds = await customerMortgageDeedInformations
                .find({})
                .populate({
                    path: 'customerId',
                    model: customerInfomations,
                    select: 'name whatsApp NIC',
                })
                .populate({
                    path: 'customerApplicantDetailsId',
                    model: customerApplicantDetails,
                    select: '',
                })
                .exec();

            res.status(200).json({ status: 'success', data: mortgageDeeds });

        } catch (error) {
            console.log(error);
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' });
            }
            res.status(500).json({ status: 'fail', message: 'Error while fetching mortgage deeds', error });
        }
    }
};

module.exports = adminDataController;