const mongoose = require('mongoose');

const caratSchema = new mongoose.Schema({
    carat: {
        type: String,
        required: true
    },
    goldPercentage: {
        type: String,
        required: true
    },
    loanApprovalValue: {
        type: String,
        required: true
    },
    marketPrice: {
        type: String,
        required: true
    }
});

const marketValueSchema = new mongoose.Schema(
    {
        carats: {
            type: [caratSchema], 
            required: true
        },
        date: {
            type: String,
            required: true
        },

    },
    {
        versionKey: false, 
    }
);

const MarketValue = mongoose.model('Market-Values', marketValueSchema);

module.exports = MarketValue