import { model, Schema } from "mongoose";
import { requestorSchema } from "../../validators";

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

const Sale = model("Sale", dataSchema);

export default Sale;
