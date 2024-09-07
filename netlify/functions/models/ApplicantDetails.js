const mongoose = require('mongoose');

const applicantDetailsSchema = new mongoose.Schema({
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
    type: String, // Optional field
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

const ApplicantDetails = mongoose.model('Applicant-Details', applicantDetailsSchema);

module.exports = ApplicantDetails;
