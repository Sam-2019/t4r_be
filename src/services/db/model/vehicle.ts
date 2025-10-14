import { model, Schema } from "mongoose";

const imageSchema = new Schema({
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
    regId: { type: Schema.Types.UUID, required: true },
    new: {
      type: Boolean,
      required: true,
    },
    name: {
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
    url: {
      type: String,
      required: true,
      trim: true,
    },
    images: [imageSchema],
  },
  {
    timestamps: true,
  },
);

const Vehicle = model("Vehicle", dataSchema);
export default Vehicle;
