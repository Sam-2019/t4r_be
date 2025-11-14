import { model, Schema } from "mongoose";
import { requestorSchema } from "../../validators";

const dataSchema = new Schema(
  {
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
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

const Transaction = model("Transaction", dataSchema);

export default Transaction;
