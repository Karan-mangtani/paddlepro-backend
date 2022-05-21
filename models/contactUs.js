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
});

function validateContactus(user) {
  const schema = {
    firstName: Joi.string().min(5).max(50).required(),
    lastName: Joi.string().min(5).max(50).required(),
    phoneNo: Joi.Number().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    country: Joi.string().min(1).max(255).required(),
  };
  return Joi.validate(user, schema);
}

var contactUsData = mongoose.model("contactUsdata", contactUsSchema);
// exports.validateContactus = validateContactus;
module.exports = contactUsData;
