const Joi = require("joi");
const mongoose = require("mongoose");
const contactUsSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phoneNo: {
    type: Number,
    required: true,
    minlength: 5,
    maxlength: 15,
    // unique: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // unique: true
  },
  country: {
    type: String,
    required: true,
  },
  registered_on: {
    type: Date,
    default: new Date(),
  },
  dob: {
    type: Date,
  },
});


var contactUsData = mongoose.model("contact_us", contactUsSchema);
module.exports = contactUsData;
