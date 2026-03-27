import mongoose, { Schema } from "mongoose";

const QuoteRequestSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    service: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: "new" },
  },
  { timestamps: true },
);

export default mongoose.models.QuoteRequest ||
  mongoose.model("QuoteRequest", QuoteRequestSchema);
