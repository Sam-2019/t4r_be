import { model, Schema } from "mongoose";

const dataSchema = new Schema(
  {
    name: { type: String, required: true },
    admin: { type: Boolean, default: false },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true, lowercase: true },
    sales: [{ type: Schema.Types.ObjectId, ref: "Sale" }],
    vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }],
    registrations: [{ type: Schema.Types.ObjectId, ref: "Registration" }],
    transactions: [{ type: Schema.Types.ObjectId, ref: "Transaction" }],
  },
  {
    timestamps: true,
  },
);

const Person = model("Person", dataSchema);
export default Person;
