import mongoose from "mongoose";
import BaseSchema from "#models/base";

const termsAndConditionSchema = new BaseSchema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

export default mongoose.model("TermsAndCondition", termsAndConditionSchema);
