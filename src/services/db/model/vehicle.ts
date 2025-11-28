import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  original: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  originalClass: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnailClass: {
    type: String,
    required: true,
    trim: true,
  },
});

const dataSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
    person: { type: Schema.Types.ObjectId, ref: "Person" },
    registrations: [{ type: Schema.Types.ObjectId, ref: "Registration" }],
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
    regId: { type: String, required: true },
    new: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    otherName: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
    mileage: {
      type: String,
      required: false,
      trim: true,
    },
    gearbox: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    matriculationYear: {
      type: String,
      required: false,
      trim: true,
    },
    currency: {
      type: String,
      required: false,
      trim: true,
    },
    taxInclusive: {
      type: Boolean,
      required: true,
    },
    configuration: {
      type: String,
      required: false,
      trim: true,
    },
    axlesCount: {
      type: String,
      required: false,
      trim: true,
    },
    suspensionType: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    currencySuffix: {
      type: String,
      required: true,
      trim: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  },
);

const Vehicle = model("Vehicle", dataSchema);
export default Vehicle;
