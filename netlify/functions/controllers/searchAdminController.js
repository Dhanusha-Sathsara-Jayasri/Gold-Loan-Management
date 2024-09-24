const AdminData = require('../models/AdminDetails');

const searchAdminController = {
    searchAdmin: async (req, res) => {
        const { userName, password, userType } = req.body;

        try {
            const query = { activeStatus: true };

            if (userName) {
                query.userName = userName;
            }
            if (password) {
                query.password = password;
            }
            if (userType) {
                query.userType = userType;
            }

            const admin = await AdminData.findOne(query);

            if (admin) {
                
                if(userType === 'Marketing Executive'){
                    res.send({ status: 'Marketing Executive', data: admin });
                }else if(userType === 'Recovery Officer'){
                    res.send({ status: 'Recovery Officer', data: admin });
                }else if(userType === 'Backend Officer'){
                    res.send({ status: 'Backend Officer', data: admin });
                }

            } else {
                res.send({ status: 'fail', data: "Admin Not Found" });
            }
        } catch (error) {
            res.send({ status: "Error While Searching Admin", data: error });
        }
    }
};

module.exports = searchAdminController;