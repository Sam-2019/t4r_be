import mongoose from "mongoose";
import { config } from "@/config/index";
import { handleDBError } from "@/src/middlewares/error";

const dbConn = mongoose.connection;
dbConn.on("connected", () => {
  console.log("Mongoose connected");
});

const connectDB = async () => {
  const uri = config?.database?.uri;
  if (!uri) {
    throw new Error("Database URI is not defined");
  }

  await mongoose
    .connect(uri, {
      dbName: config.database.name,
    })
    .catch((error) => handleDBError(error));
};

const disconnectDB = () => {
  mongoose.connection.close();
};

export { connectDB, disconnectDB };
