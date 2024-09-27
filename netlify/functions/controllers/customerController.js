const customerModel = require('../models/CustomerDetails');

const customerController = {
    addCustomer: async (req, res) => {
        const { name, whatsApp, NIC } = req.body;

        try {
            const oldCustomerByNIC = await customerModel.findOne({ NIC: NIC });

            if (oldCustomerByNIC) {
                if (oldCustomerByNIC.whatsApp === whatsApp) {
                    return res.send({ 
                        status: 'NIC&WhatsApp', 
                        data: "You are already in the database with the same NIC and WhatsApp number." 
                    });
                } else {
                    return res.send({ 
                        status: 'NIC', 
                        data: "Customer already registered with this NIC but different WhatsApp number." 
                    });
                }
            }

            const newCustomer = new customerModel({
                name,
                whatsApp,
                NIC
            });

            await newCustomer.save();
            res.send({ status: 'success', data: "Customer Registered Successfully", insertedId: newCustomer._id });

        } catch (error) {
            res.send({ status: 'error', data: "Error While Registering Customer", error: error });
        }
    },

    getCustomers: async (req, res) => {
        try {
            const customers = await customerModel.find({});
            res.send({ status: 'success', data: customers });
        } catch (error) {
            res.send({ status: 'error', data: "Error While Fetching Customers", error: error });
        }
    }
};

module.exports = customerController;