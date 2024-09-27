const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A category must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A category name must have less or equal than 40 characters",
      ],
      minlength: [
        3,
        "A category name must have more or equal than 3 characters",
      ],
    },
    description: {
      type: String,
      trim: true,
    },
    slug: String,
    parent: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
categorySchema.virtual("subcategories", {
  ref: "Category",
  foreignField: "parent",
  localField: "_id",
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
