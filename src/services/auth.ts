import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { fromNodeHeaders } from "better-auth/node";
import type { Request } from "express";
import { admin } from "better-auth/plugins";
import { config } from "@/config/index";

import mongoose from "mongoose";

declare global {
  var _mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGO_URI = config?.database?.uri;

if (!MONGO_URI) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

const DB_URI: string = MONGO_URI;
const DB_NAME = config.database.name;

let cached = global._mongooseConnection;

if (!cached) {
  cached = global._mongooseConnection = { conn: null, promise: null };
}

async function connectDB() {
  if (cached?.conn) return cached.conn;

  if (!cached?.promise) {
    cached!.promise = mongoose
      .connect(DB_URI, {
        dbName: DB_NAME,
        maxPoolSize: 10,
      })
      .then((mongooseInstance) => {
        console.log("Database connected");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("Database failed to connect", err);
        throw err;
      });
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}

export async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db(process.env.DB_NAME);
}

const client = await getClient();

export const auth = betterAuth({
  database: mongodbAdapter(client),
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  trustedOrigins: [String(config.auth.origin)],
  telemetry: {
    enabled: true,
  },
  logger: {
    disabled: false,
    disableColors: false,
    level: "error",
    log: (level, message, ...args) => {
      // Custom logging implementation
      console.log(`[${level}] ${message}`, ...args);
    },
  },
  session: {
    modelName: "sessions",
    fields: {
      userId: "user_id",
    },
    expiresIn: 604800, // 7 days
    updateAge: 86400, // 1 day
    disableSessionRefresh: true, // Disable session refresh so that the session is not updated regardless of the `updateAge` option. (default: `false`)
    additionalFields: {
      // Additional fields for the session table
      customField: {
        type: "string",
      },
    },
    storeSessionInDatabase: true, // Store session in database when secondary storage is provided (default: `false`)
    preserveSessionInDatabase: false, // Preserve session records in database when deleted from secondary storage (default: `false`)
    cookieCache: {
      enabled: true, // Enable caching session in cookie (default: `false`)
      maxAge: 3000, // 5 minutes
    },
  },
  user: {
    modelName: "users",
    additionalFields: {
      lastName: {
        type: "string",
        required: true,
      },
      firstName: {
        type: "string",
        required: true,
      },
    },
  },
  account: {
    modelName: "accounts",
  },
});

export const getAuthContext = async (headers: Request["headers"]) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(headers),
  });
  return session;
};
