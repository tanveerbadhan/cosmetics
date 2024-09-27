const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        100,
        "A product name must have less or equal than 100 characters",
      ],
      minlength: [
        3,
        "A product name must have more or equal than 3 characters",
      ],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "A product must have a description"],
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    supplier: {
      type: mongoose.Schema.ObjectId,
      ref: "Supplier",
      required: [true, "Product must have a supplier"],
    },
    imageCover: {
      type: String,
      required: [true, "A product must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    sku: {
      type: String,
      required: [true, "A product must have a SKU"],
      unique: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "name",
  }).populate({
    path: "supplier",
    select: "name",
  });

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
