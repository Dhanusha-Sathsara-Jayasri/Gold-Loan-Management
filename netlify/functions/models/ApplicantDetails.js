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
  }
},
{
  versionKey: false, 
});

const customerApplicantSchema = mongoose.Schema({
 
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer'
  },
  applicantDetails: {
    type: [applicantDetailsSchema],
    required: true
  }

},
{
  versionKey: false, 
});

const customerApplicantDetails = mongoose.model('Customer-Applicant-Details', customerApplicantSchema);

module.exports = customerApplicantDetails;
