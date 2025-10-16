import { model, Schema } from "mongoose";

// Define the schema for the vehicle search and contact information
const dataSchema = new Schema(
  {
    // Vehicle Details
    vehicleType: {
      type: String,
      trim: true,
    },
    brand: {
      type: String,
      trim: true,
    },
    specification: {
      type: String,
      trim: true,
    },
    configuration: {
      type: String,
      trim: true,
    },
    suspensionType: {
      type: String,
      trim: true,
    },
    emissionStandard: {
      type: String, // Stored as a string in the JSON example, e.g., "2"
      trim: true,
    },

    // Numerical Ranges (Stored as arrays of two Numbers: [min, max])
    price: {
      type: [Number],
    },
    mileage: {
      type: [Number],
    },
    matriculationYear: {
      type: [Number],
    },

    // Reference
    reference: {
      type: String,
      trim: true,
    },

    // Contact Information
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    // Contact Preferences
    contactPhone: {
      type: Boolean,
      default: false,
    },
    contactWhatsapp: {
      type: Boolean,
      default: false,
    },
    contactEmail: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
); // Adds createdAt and updatedAt fields automatically

// Create the Mongoose Model
const Search = model("Search", dataSchema);
export default Search;
