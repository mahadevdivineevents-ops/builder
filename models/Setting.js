import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema(
  {
    phone: String,
    email: String,
    bannerImage: String,
    heroTitle: String,
    heroSubtitle: String,
    serviceDefaultsSeeded: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.Setting || mongoose.model("Setting", SettingSchema);
