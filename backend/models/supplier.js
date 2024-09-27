const mongoose = require("mongoose");
const validator = require("validator");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A supplier must have a name"],
      trim: true,
      maxlength: [
        50,
        "A supplier name must have less or equal than 50 characters",
      ],
    },
    email: {
      type: String,
      required: [true, "A supplier must have an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "A supplier must have a phone number"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Supplier = mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
