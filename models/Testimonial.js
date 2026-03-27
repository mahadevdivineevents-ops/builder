import mongoose, { Schema } from "mongoose";

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true },
);

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
