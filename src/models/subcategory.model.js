import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const subcategorySchema = new BaseSchema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: { type: String, required: true, unique: true },
  gender: { type: String },
});

subcategorySchema.pre("save", saveFile);

const SubcategoryModel = mongoose.model("subcategory", subcategorySchema);

export default SubcategoryModel;
