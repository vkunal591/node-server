import mongoose from "mongoose";
import BaseSchema from "#models/base";

const productSchema = new BaseSchema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  subcategory: { type: String, required: true },
  colors: { type: [String] },
  sizes: { type: [String] },
  images: { type: [String], required: true,file:true },
});

export default mongoose.model("Product", productSchema);
