const mongoose = require('mongoose');

const mortgageDeedSchema = mongoose.Schema({
    institution: { type: String, required: true },
    branch: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    contactNumber: { type: String, required: true },
    monthlyRate: { type: Number, required: true },
    yearlyRate: { type: Number, required: true },
    receiptNumber: { type: String, required: true },
    appraisedValue: { type: Number, required: true },
    mortgageAmount: { type: Number, required: true },
    rescueAmount: { type: Number, required: true },
    imageUrl: { type: String, required: true }, 
},
  {
    versionKey: false,
  }
);

const mortgageDeed = mongoose.model('Mortgage-Deed', mortgageDeedSchema);

module.exports = mortgageDeed;