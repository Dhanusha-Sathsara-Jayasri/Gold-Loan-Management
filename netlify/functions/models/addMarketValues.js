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

const marketValueSchema = new mongoose.Schema({
    carats: {
        type: [caratSchema], // Array of carat objects
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

// Create the model for the schema
const MarketValue = mongoose.model('MarketValue', marketValueSchema);

module.exports = MarketValue