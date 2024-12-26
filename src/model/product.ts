import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide a category"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug before saving
productSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
