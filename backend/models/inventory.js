const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Inventory must belong to a product"],
    },
    quantity: {
      type: Number,
      required: [true, "Inventory must have a quantity"],
      min: [0, "Quantity cannot be negative"],
    },
    location: {
      type: String,
      required: [true, "Inventory must have a storage location"],
    },
    lastRestocked: {
      type: Date,
      default: Date.now(),
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

inventorySchema.virtual("isLowStock").get(function () {
  return this.quantity <= this.lowStockThreshold;
});

inventorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name price",
  });

  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
