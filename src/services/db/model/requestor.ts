import { Schema } from "mongoose";

const dataSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
  },
  { _id: false },
);

export { dataSchema as requestorSchema };
