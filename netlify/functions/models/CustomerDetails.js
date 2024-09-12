const mongoose = require('mongoose');

const customerDetailsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter User Name"],
    },
    whatsApp: {
      type: String,
      required: [true, "Please Enter User WhatsApp Number"],
    },
    NIC: {
      type: String,
      unique: true,
      required: [true, "Please Enter NIC"],
    }
  },
  {
    versionKey: false,
  }

);

const customerInfomations = mongoose.model('Customer-Infomations', customerDetailsSchema);

module.exports = customerInfomations;
