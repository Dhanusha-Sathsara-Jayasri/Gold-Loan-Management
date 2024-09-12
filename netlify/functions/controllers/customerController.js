const customerModel = require('../models/CustomerDetails');

const customerController = {
    addCustomer: async (req, res) => {
        const { name, whatsApp, NIC } = req.body;
        try {
            const newCustomer = new customerModel({
                name,
                whatsApp,
                NIC
            });

            const oldCustomer = await customers.findOne({ NIC: NIC });
  
            if (oldCustomer) {
              return res.send({ status: 'fail', data: "Customer Already Registered" });
            }

            const result = await newCustomer.save();
            res.send({ status: 'success', data: "Customer Registered Successfully", insertedId: newCustomer._id });

        } catch (error) {
            res.send({ status: "Error While Registering Customer", data: error });
        }
    }
};

module.exports = customerController;