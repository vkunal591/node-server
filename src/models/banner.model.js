import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const bannerSchema = new BaseSchema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    file: true,
  },
});

bannerSchema.pre("save", saveFile);

const BannerModel = mongoose.model("banner", bannerSchema);

export default BannerModel;
