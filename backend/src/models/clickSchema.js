import mongoose from "mongoose";

const { Schema, model } = mongoose;

const clickSchema = new Schema(
  {
    urlId: {
      type: Schema.Types.ObjectId,
      ref: "ShortUrl",
      required: true
    },
    ip: {
      type: String
    },
    deviceType: {
      type: String,
      enum: ["mobile", "desktop"],
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ClickModel = model("Click", clickSchema);
export default ClickModel;
