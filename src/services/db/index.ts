import mongoose from "mongoose";
import { config } from "@/config/index";
import { handleDBError } from "@/src/middlewares/error";

const dbConn = mongoose.connection;
dbConn.on("connected", () => {
  console.log("Mongoose connected");
});

const connectDB = async () => {
  await mongoose
    .connect(config?.database?.uri, {
      dbName: config.database.name,
    })
    .catch((error) => handleDBError(error));
};

const disconnectDB = () => {
  mongoose.connection.close();
};

export { connectDB, disconnectDB };
