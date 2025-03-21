import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const productSchema = new BaseSchema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  images: { type: String, file: true },
});

productSchema.pre("save", saveFile)
export default mongoose.model("Product", productSchema);
 