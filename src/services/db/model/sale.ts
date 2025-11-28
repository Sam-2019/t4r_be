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
    provider: { type: String, required: true, trim: true },
    providerResponse: { type: Object, required: true, trim: true },
    purchaseInfo: { type: Object, required: true, trim: true },
    transactionId: { type: String, required: true, trim: true },
    externalTransactionId: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  },
);

const Sale = model("Sale", dataSchema);

export default Sale;
