const addMarketValuesModel = require('../models/addMarketValues');

const addMarketValuesController = {
    addMarketValues: async (req, res) => {
        const { carats, date } = req.body;
        try {
            const newMarketValue = new addMarketValuesModel({
                carats,
                date
            });
            const result = await newMarketValue.save();
            res.status(200).json({message:'done',result});
        } catch (error) {
            res.status(500).send({ status: "Error While Adding Market Value", data: error });
        }
    }
};
module.exports = addMarketValuesController;