import BaseSchema from "#models/base";
import { saveFile } from "#utils/uploadFile";
import mongoose from "mongoose";

const testimonialSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    file: true,
  },
});

testimonialSchema.pre("save", saveFile);

const TestimonialModel = mongoose.model("testimonial", testimonialSchema);

export default TestimonialModel;
