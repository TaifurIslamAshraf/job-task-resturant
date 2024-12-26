import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      trim: true,
      unique: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "-");
  next();
});

const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
