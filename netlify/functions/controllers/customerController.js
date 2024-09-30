const customerModel = require('../models/CustomerDetails');
const customerApplicantDetailsId = require('../models/ApplicantDetails');

const customerController = {
    addCustomer: async (req, res) => {
        const { name, whatsApp, NIC } = req.body;

        try {
            const oldCustomerByNIC = await customerModel.findOne({ NIC: NIC });

            if (oldCustomerByNIC) {
                if (oldCustomerByNIC.whatsApp === whatsApp) {

                    const customerApplicantDetails = await customerApplicantDetailsId.findOne({ customerId: oldCustomerByNIC._id });

                    if(customerApplicantDetails) {
                        return res.send({ 
                            status: 'NIC&WhatsApp&CustomerApplicantDetails', 
                            data: [{
                                customerId: oldCustomerByNIC._id,
                                customerApplicantDetailsId: customerApplicantDetails._id,
                            }], 
                            message: "Customer already registered with this NIC, WhatsApp number and CustomerApplicantDetails." 
                        });
                    }else{
                        return res.send({ 
                            status: 'NIC&WhatsApp', 
                            data: [{
                                customerId: oldCustomerByNIC._id,
                            }], 
                            message: "Customer already registered with this NIC and WhatsApp number." 
                        });
                    }

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
            console.log(error);
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