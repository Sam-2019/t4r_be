import { model, Schema } from "mongoose";

const dataSchema = new Schema(
  {
    provider: { type: String, required: true },
    providerResponse: { type: Object },
    clientReference: { type: String, required: true },
    responseCode: { type: String, required: true },
    message: { type: String, required: true },
    transactionId: { type: String, required: true },
    externalTransactionId: { type: String, required: true },
    paymentDate: { type: Date },
  },
  {
    timestamps: true,
  },
);

const Callback = model("Callback", dataSchema);
export default Callback;
