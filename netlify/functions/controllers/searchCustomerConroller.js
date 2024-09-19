const customerModel = require('../models/CustomerDetails');

const searchCustomerController = {
    searchCustomer: async (req, res) => {
        const { NIC, whatsApp } = req.body;

        try {

            const query = {};
            if (NIC) {
                query.NIC = NIC;
            }
            if (whatsApp) {
                query.whatsApp = whatsApp;
            }

            const customer = await customerModel.findOne(query);

            if (customer) {
                res.send({ status: 'success', data: customer });
            } else {
                res.send({ status: 'fail', data: "Customer Not Found" });
            }
        } catch (error) {
            res.send({ status: "Error While Searching Customer", data: error });
        }
    }
};

module.exports = searchCustomerController;
