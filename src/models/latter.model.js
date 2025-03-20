import mongoose from "mongoose";
import BaseSchema from "#models/base";

const latterSchema = new BaseSchema({
  email: {
    type: String,
    required: true
  },
  subscribe: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Latter", latterSchema);
