import { model, Schema } from "mongoose";

const requestorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const dataSchema = new Schema(
  {
    vehicleId: {
      type: Schema.Types.UUID,
      ref: "Vehicle",
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    subIndustry: {
      type: String,
      required: true,
      trim: true,
    },
    requestor: {
      type: requestorSchema,
      required: true,
    },
    pickup: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    materialType: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Request = model("Request", dataSchema);

export default Request;
