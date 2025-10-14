import {
  getSale,
  getSales,
  createSale,
  getVehicle,
  getVehicles,
  createVehicle,
} from "./index";
import { createDocument } from "zod-openapi";
import { companyName } from "@/src/config/constants";
import { authorizationSchema, saleSchema, vehicleSchema } from "../validators";

const document = createDocument({
  openapi: "3.1.0",
  info: {
    title: companyName,
    version: "1.0.0",
  },
  paths: {
    "/api/vehicle": {
      post: createVehicle,
      get: getVehicle,
    },
    "/api/vehicles": {
      get: getVehicles,
    },

    "/api/sale": {
      post: createSale,
      get: getSale,
    },
    "/api/sales": {
      get: getSales,
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Bearer <token>",
      },
    },
    schemas: {
      saleSchema,
      vehicleSchema,
      authorizationSchema,
    },
  },
});

export { document };
