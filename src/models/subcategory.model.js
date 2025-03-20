import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const categorySchema = new BaseSchema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: { type: String, required: true, unique: true },
  gender: { type: String },
});

categorySchema.pre("save", saveFile);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;
