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

const saleSchema = z.object({
  vehicleId: z.string().trim().nonempty(),
  type: z.string().trim().nonempty(),
  industry: z.string().trim().nonempty(),
  subIndustry: z.string().trim().nonempty(),
  requestor: requestorSchema,
  pickup: z.string().trim().nonempty(),
  destination: z.string().trim().nonempty(),
  materialType: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  amount: z.number(),
  provider: z.string().trim().nonempty(),
  providerResponse: z.object({}),
  purchaseInfo: purchaseInfoSchema,
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

const requestSchema = z.object({
  vehicleId: z.string().trim().nonempty(),
  type: z.string().trim().nonempty(),
  industry: z.string().trim().nonempty(),
  subIndustry: z.string().trim().nonempty(),
  requestor: requestorSchema,
  pickup: z.string().trim().nonempty(),
  destination: z.string().trim().optional(),
  materialType: z.string().trim().optional(),
  description: z.string().trim().optional(),
  amount: z.number(),
  clientReference: z.string().trim().nonempty(),
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
    id: z.number().nonoptional(),
    source: z.string().trim().nonempty(),
    original: z.string().trim().nonempty(),
    thumbnail: z.string().trim().nonempty(),
    originalClass: z.string().trim().nonempty(),
    thumbnailClass: z.string().trim().nonempty(),
  })
  .meta({
    id: "vehicleImage",
    description: "Vehicle image",
    example:
      "https://i.pinimg.com/originals/df/4a/cc/df4acc54f753d0c85a1f016aa931057a.jpg",
  });

const vehicleSchema = z.object({
  regId: z.string().trim().nonempty(),
  new: z.boolean().nonoptional(),
  name: z.string().trim().nonempty(),
  otherName: z.string().trim().nonempty(),
  number: z.string().trim().nonempty(),
  mileage: z.string().trim().optional(),
  gearbox: z.string().trim().optional(),
  price: z.string().trim().nonempty(),
  matriculationYear: z.string().trim().optional(),
  currency: z.string().trim(),
  taxInclusive: z.boolean(),
  configuration: z.string().trim().optional(),
  axlesCount: z.string().trim().optional(),
  suspensionType: z.string().trim().optional(),
  type: z.string().trim().nonempty(),
  currencySuffix: z.string().trim().nonempty(),
  url: z.string().trim().nonempty(),
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

export {
  saleSchema,
  saleIdSchema,
  searchSchema,
  requestSchema,
  vehicleSchema,
  requestIdSchema,
  vehicleIdSchema,
  referenceSchema,
  requestorSchema,
  queryNumberSchema,
  authorizationSchema,
  searchReferenceSchema,
};
