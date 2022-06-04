const Joi = require("joi");
const mongoose = require("mongoose");
const registrationsSchema = mongoose.Schema({
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
  gender: {
      type: String,
      minlength: 4,
      maxlength10: 10
  },
  padelLevel: {
      type: String
  },
  teamName: {
      type: String
  }
});


var contactUsData = mongoose.model("registrations", registrationsSchema);
module.exports = contactUsData;
