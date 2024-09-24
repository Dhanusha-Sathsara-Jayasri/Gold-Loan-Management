const AdminData = require('../models/AdminDetails');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET; 

const adminDataController = {
    addAdminData: async (req, res) => {
        const { userType, fullName, NIC, userName, password } = req.body;

        try {
            const newAdminData = new AdminData({
                userType,
                fullName,
                NIC,
                userName,
                password
            });
            await newAdminData.save();
            res.send({ status: 'success', data: "Admin Data Added Successfully" });
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

            const token = jwt.sign({ id: admin._id, userType: admin.userType }, JWT_SECRET, { expiresIn: '1h' });
            res.send({ status: 'success', token, userStatus: admin.userType, data: admin });
        } catch (error) {
            res.status(500).send({ status: "Error", message: 'Server error' });
        }
    }
};

module.exports = adminDataController;