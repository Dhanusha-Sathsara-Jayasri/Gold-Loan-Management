const mongoose = require('mongoose');


const adminDataSchema = mongoose.Schema(
  {
    userType: {
      type: String,
      required: [true, "Please Enter User Type"],
    },
    fullName: {
      type: String,
      required: [true, "Please Enter Full Name"],
    },
    NIC: {
      type: String,
      unique: true,
      required: [true, "Please Enter NIC"],
    },
    userName: {
      type: String,
      required: [true, "Please Enter User Name"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
    },
    activeStatus: {
      type: Boolean,
      default: true,
    }
  },
  {
    versionKey: false,
  }
);

const AdminData = mongoose.model('Admin-Data-Details', adminDataSchema);
module.exports = AdminData;