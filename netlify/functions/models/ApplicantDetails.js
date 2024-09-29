const mongoose = require('mongoose');

const applicantDetailsSchema = mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String, 
    default: ''
  },
  divisionalSecretariatDivision: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  maritalStatus: {
    type: String,
    enum: ['Married', 'Unmarried'],
    required: true
  },
  createdAt: { 
    type: String,
    default: () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    }
  }
}, {
  versionKey: false, 
});

const customerApplicantSchema = mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer-Infomations' 
  },
  applicantDetails: {
    type: [applicantDetailsSchema],
    required: true
  }
}, {
  versionKey: false,
});

const customerApplicantDetails = mongoose.model('Customer-Applicant-Details', customerApplicantSchema);

module.exports = customerApplicantDetails;