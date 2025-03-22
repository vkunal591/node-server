import mongoose from "mongoose";
import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";

const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "admin",
  },
  profilePic: {
    type: String,
    file: true,
  },
  mobileNo: {
    type: String,
    require:true
  },
  gst: {
    type: String,
  },
  streetAddress: { type: String },
  city: { type: String },
  landMark: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: { type: String },
  isActive: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", saveFile);

export default mongoose.model("User", userSchema);
