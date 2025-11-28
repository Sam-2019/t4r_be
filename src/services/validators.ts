import { z } from "zod";

const purchaseInfoSchema = z.object({
  amount: z.number(),
  clientReference: z.string().trim().nonempty(),
  customerPhoneNumber: z.string().trim().nonempty(),
  purchaseDescription: z.string().trim().nonempty(),
});

const requestorSchema = z.object({
  name: z.string().trim().nonempty(),
  contact: z.string().trim().nonempty(),
  email: z.string().trim().nonempty(),
});

const transactionSchema = z.object({
  vehicle: z.string().trim().nonempty(),
  user: z.string().trim().nonempty(),
  type: z.string().trim().nonempty(),
  industry: z.string().trim(),
  subIndustry: z.string().trim(),
  requestor: requestorSchema,
  pickup: z.string().trim().nonempty(),
  destination: z.string().trim().nonempty(),
  materialType: z.string().trim().optional(),
  description: z.string().trim().optional(),
  amount: z.number(),
  provider: z.string().trim().nonempty(),
  clientReference: z.string().trim().nonempty(),
  purchaseInfo: purchaseInfoSchema,
});

const transactionIdSchema = z.object({
  id: z.number().meta({
    id: "trnasactionId",
    example: "1",
    description: "Unique transaction identifier",
  }),
});

const saleSchema = z.object({
  vehicle: z.string().trim().nonempty(),
  user: z.string().trim().nonempty(),
  type: z.string().trim().nonempty(),
  industry: z.string().trim().nonempty(),
  subIndustry: z.string().trim().nonempty(),
  requestor: requestorSchema,
  pickup: z.string().trim().nonempty(),
  destination: z.string().trim().nonempty(),
  materialType: z.string().trim().optional(),
  description: z.string().trim().optional(),
  amount: z.number(),
  provider: z.string().trim().nonempty(),
  providerResponse: z.object({}),
  purchaseInfo: purchaseInfoSchema,
  clientReference: z.string().trim().nonempty(),
  transactionId: z.string().trim().nonempty(),
  externalTransactionId: z.string().trim().nonempty(),
});

const saleIdSchema = z.object({
  id: z.number().meta({
    id: "saleId",
    example: "1",
    description: "Unique sale identifier",
  }),
});

const regisrationSchema = z.object({
  vehicle: z.string().trim().nonempty(),
  user: z.string().trim().nonempty(),
  type: z.string().trim().nonempty(),
  industry: z.string().trim().nonempty(),
  subIndustry: z.string().trim(),
  requestor: requestorSchema,
  pickup: z.string().trim().nonempty(),
  destination: z.string().trim().optional(),
  materialType: z.string().trim().optional(),
  description: z.string().trim().optional(),
  amount: z.number(),
});

const requestIdSchema = z.object({
  id: z.number().meta({
    id: "requestId",
    example: "1",
    description: "Unique request identifier",
  }),
});

const vehicleImageSchema = z
  .object({
    id: z.string().nonoptional(),
    url: z.string().trim().nonempty(),
  })
  .meta({
    id: "vehicleImage",
    description: "Vehicle image",
    example:
      "https://i.pinimg.com/originals/df/4a/cc/df4acc54f753d0c85a1f016aa931057a.jpg",
  });

const vehicleSchema = z.object({
  user: z.string().trim().nonempty(),
  regId: z.string().trim().nonempty(),
  new: z.boolean().nonoptional(),
  name: z.string().trim().nonempty(),
  otherName: z.string().trim().nonempty(),
  number: z.string().trim().nonempty(),
  mileage: z.string().trim().optional(),
  gearbox: z.string().trim().optional(),
  price: z.number().nonoptional(),
  matriculationYear: z.string().trim().optional(),
  currency: z.string().trim(),
  taxInclusive: z.boolean(),
  configuration: z.string().trim().optional(),
  axlesCount: z.string().trim().optional(),
  suspensionType: z.string().trim().optional(),
  type: z.string().trim().nonempty(),
  currencySuffix: z.string().trim().nonempty(),
  isBooked: z.boolean(),
  images: z.array(vehicleImageSchema),
});

const vehicleIdSchema = z.object({
  id: z.number().meta({
    id: "vehicleId",
    example: "1",
    description: "Unique Vehicle Identifier",
  }),
});

const rangeSchema = z
  .array(z.number())
  .length(2, "Must be an array of exactly two numbers [min, max]");

const searchSchema = z.object({
  // Vehicle Details
  vehicleType: z.string().min(1).trim(),
  brand: z.string().min(1).trim(),
  specification: z.string().trim().optional(),
  configuration: z.string().trim().optional(),
  suspensionType: z.string().trim().optional(),
  emissionStandard: z.string().trim().optional(), // Keeping it as string per your JSON example

  // Numerical Ranges (Validated as arrays of two numbers)
  price: rangeSchema,
  mileage: rangeSchema,
  matriculationYear: rangeSchema,

  reference: z.string().trim().optional(),

  // Contact Information
  firstName: z.string().min(1, "First name is required").trim(),
  lastName: z.string().min(1, "Last name is required").trim(),
  email: z.email("Invalid email format").trim().toLowerCase(),
  phoneNumber: z.string().trim().optional(),
  companyName: z.string().trim().optional(),

  // Contact Preferences
  contactPhone: z.boolean().default(false),
  contactWhatsapp: z.boolean().default(false),
  contactEmail: z.boolean().default(false),

  status: z.string().trim().toLowerCase().optional(),
});

const searchReferenceSchema = z.object({
  body: z.object({
    reference: z.string().trim().nonempty(),
  }),
});

const authorizationSchema = z.object({
  headers: z.object({
    authorization: z.string().trim().nonempty(),
  }),
});

const referenceSchema = z.object({
  body: z.object({
    clientReference: z.string().trim().nonempty(),
  }),
});

const queryNumberSchema = z.object({
  body: z.object({
    number: z.string().trim().nonempty(),
  }),
});

const userProfileSchema = z.object({
  body: z.object({
    user: z.string().trim().nonempty(),
  }),
});

const callbackSchema = z.object({
  body: z.object({
    ResponseCode: z.string(),
    Message: z.string(),
    Data: z.object({
      Amount: z.number(),
      Charges: z.number(),
      AmountAfterCharges: z.number(),
      Description: z.string(),
      ClientReference: z.string(),
      TransactionId: z.string(),
      ExternalTransactionId: z.string(),
      AmountCharged: z.number(),
      OrderId: z.string().min(1),
      PaymentDate: z.string(),
    }),
  }),
});

export {
  saleSchema,
  saleIdSchema,
  searchSchema,
  regisrationSchema,
  vehicleSchema,
  callbackSchema,
  requestIdSchema,
  vehicleIdSchema,
  referenceSchema,
  requestorSchema,
  transactionSchema,
  queryNumberSchema,
  userProfileSchema,
  authorizationSchema,
  transactionIdSchema,
  searchReferenceSchema,
};
