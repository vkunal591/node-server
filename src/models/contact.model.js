import mongoose from "mongoose";
import BaseSchema from "#models/base";

const contactSchema = new BaseSchema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    file: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Contact", contactSchema);
