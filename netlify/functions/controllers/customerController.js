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

            const result = await newCustomer.save();
            res.status(200).json({message:'done',result});
        } catch (error) {
            res.status(500).send({ status: "Error While Registering Customer", data: error });
        }
    }
};
