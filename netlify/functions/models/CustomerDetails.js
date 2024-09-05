const mongoose = require('mongoose');

const customerDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter User Name"],
    },
    NIC: {
      type: String,
      unique: true,
      required: [true, "Please Enter NIC"],
    }, 
    whatsApp: {
      type: String,
      required: [true, "Please Enter User WhatsApp Number"],
    }
  },
  {
    versionKey: false, // Disable the __v field
  }

);

const customerInfornations = mongoose.model('Customer-Infomations', customerDetailsSchema);

module.exports = customerInfornations;
