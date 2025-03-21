import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const categorySchema = new BaseSchema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: false,file:true },
  subcategories: [{
    name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'unisex'], default: 'unisex' },
  }],
});

categorySchema.pre("save", saveFile);

const CategoryModel = mongoose.model("category", categorySchema);

export default CategoryModel;
