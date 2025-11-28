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
    user: { type: Schema.Types.ObjectId, required: true },
    person: { type: Schema.Types.ObjectId, ref: "Person" },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      trim: true,
      default: "Other",
    },
    subIndustry: {
      type: String,
      trim: true,
      default: "Other",
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
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    clientReference: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: "pending",
    },
    purchaseInfo: { type: Object, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const Transaction = model("Transaction", dataSchema);
export default Transaction;
