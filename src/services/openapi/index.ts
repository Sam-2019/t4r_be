import z from "zod";
import {
  saleSchema,
  saleIdSchema,
  vehicleSchema,
  vehicleIdSchema,
} from "@/services/validators";
import type { ZodOpenApiOperationObject } from "zod-openapi";

export const createVehicle: ZodOpenApiOperationObject = {
  operationId: "createVehicle",
  summary: "Create a new vehicle",
  description: "Creates a new vehicle in the database.",
  tags: ["vehicle"],
  requestBody: {
    description: "The vehicle to create.",
    content: {
      "application/raw": {
        schema: vehicleSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "The vehicle was created successfully.",
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
  },
};

export const getVehicle: ZodOpenApiOperationObject = {
  operationId: "getVehicle",
  summary: "Get a vehicle",
  description: "Gets a vehicle from the database.",
  tags: ["vehicle"],
  requestParams: {
    path: z.object({ id: vehicleIdSchema }),
  },
  responses: {
    "200": {
      description: "The vehicle was retrieved successfully.",
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
    "404": {
      description: "Vehicle not found.",
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
  },
};

export const getVehicles: ZodOpenApiOperationObject = {
  operationId: "getVehicles",
  summary: "Get vehicles",
  description: "Lists all vehicles from the database.",
  tags: ["vehicle"],
  responses: {
    "200": {
      description: "The vehicles were retrieved successfully.",
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
  },
};

export const createSale: ZodOpenApiOperationObject = {
  operationId: "createSale",
  summary: "Create a new sale",
  description: "Creates a new sale in the database.",
  tags: ["sale"],
  requestBody: {
    description: "The sale to create.",
    content: {
      raw: {
        schema: saleSchema,
      },
    },
  },
  responses: {
    "201": {
      description: "The sale was created successfully.",
      content: {
        "application/json": {
          schema: saleSchema,
        },
      },
    },
  },
};

export const getSale: ZodOpenApiOperationObject = {
  operationId: "getSale",
  summary: "Get a sale",
  description: "Gets a sale from the database.",
  tags: ["sale"],
  requestParams: {
    path: z.object({ id: saleIdSchema }),
  },
  responses: {
    "200": {
      description: "The sale was retrieved successfully.",
      content: {
        "application/json": {
          schema: saleSchema,
        },
      },
    },
    "404": {
      description: "Sale not found.",
      content: {
        "application/json": {
          schema: vehicleSchema,
        },
      },
    },
  },
};

export const getSales: ZodOpenApiOperationObject = {
  operationId: "getSales",
  summary: "Get sales",
  description: "Lists all sales from the database.",
  tags: ["sale"],
  responses: {
    "200": {
      description: "The sales were retrieved successfully.",
      content: {
        "application/json": {
          schema: saleSchema,
        },
      },
    },
  },
};
