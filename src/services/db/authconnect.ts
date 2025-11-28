import mongoose from "mongoose";
import { config } from "@/config/index";

declare global {
  var _mongooseConnection:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const MONGO_URI = config?.database?.uri;
const DB_NAME = config.database.name;

if (!MONGO_URI || !DB_NAME) {
  throw new Error("DATABASE is not defined in environment variables.");
}

const DB_URI: string = MONGO_URI;
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

async function getClient() {
  const conn = await connectDB();
  return conn.connection.getClient().db();
}

export const client = await getClient();
