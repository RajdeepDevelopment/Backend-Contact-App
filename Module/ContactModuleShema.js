const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[a-zA-Z]{3,}$/,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    match: /^[a-zA-Z]{3,}$/,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "OTHERS"],
  },
  address: {
    line1: {
      type: String,
      required: true,
      minlength: 8,
    },
    line2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
      uppercase: true,
    },
    zipCode: {
      type: String,
      required: true,
      maxlength: 10,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  other: {
    type: String,
  },
});
module.exports = mongoose.model("Contact", ContactSchema);
